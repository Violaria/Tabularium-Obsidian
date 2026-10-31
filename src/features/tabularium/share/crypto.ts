// Keys of shared notes. Each share has a random 256-bit key K that travels only in the link's fragment; its content is
// encrypted with AES-256-GCM, each file with its own IV. A share with a password uses a key derived from K and the
// password instead. The owner's devices keep K, the shared path and the authorised references in a record sealed with
// a key derived from the vault's E2EE passphrase, which the server does not have.

const encoder = new TextEncoder();
const decoder = new TextDecoder();
const ITERATIONS = 310_000;

export function toBase64Url(bytes: Uint8Array) {
    let text = "";
    for (const byte of bytes) text += String.fromCharCode(byte);
    return btoa(text).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
export function fromBase64Url(text: string) {
    const binary = atob(text.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((text.length + 3) % 4));
    return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}
const buffer = (bytes: Uint8Array) => bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer;

export const newShareKey = () => crypto.getRandomValues(new Uint8Array(32));

async function pbkdf2(secret: string, salt: Uint8Array) {
    const material = await crypto.subtle.importKey("raw", encoder.encode(secret), "PBKDF2", false, ["deriveBits"]);
    return new Uint8Array(await crypto.subtle.deriveBits({ name: "PBKDF2", hash: "SHA-256", salt: buffer(salt), iterations: ITERATIONS }, material, 256));
}
const aesKey = (raw: Uint8Array) => crypto.subtle.importKey("raw", buffer(raw), "AES-GCM", false, ["encrypt", "decrypt"]);

/**
 * The key that seals a vault's share records. The salt is the vault's ID, not the sync parameters' salt: a rebuild
 * replaces that salt and would make the existing shares unreadable to their owner.
 */
export async function vaultShareKey(passphrase: string, vaultId: string) {
    return aesKey(await pbkdf2(passphrase, encoder.encode(`tabularium-share:${vaultId}`)));
}

/** The key the content is encrypted with: K itself, or HKDF over K and the password stretched with PBKDF2. */
export async function contentKey(shareKey: Uint8Array, password?: string) {
    if (!password) return aesKey(shareKey);
    const stretched = await pbkdf2(password, shareKey);
    const material = new Uint8Array(64);
    material.set(shareKey);
    material.set(stretched, 32);
    const hkdf = await crypto.subtle.importKey("raw", buffer(material), "HKDF", false, ["deriveBits"]);
    const bits = await crypto.subtle.deriveBits({ name: "HKDF", hash: "SHA-256", salt: new Uint8Array(32), info: encoder.encode("tabularium-share-content") }, hkdf, 256);
    return aesKey(new Uint8Array(bits));
}

/** IV (12 bytes) followed by the ciphertext and tag. */
export async function encrypt(key: CryptoKey, data: Uint8Array) {
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const sealed = new Uint8Array(await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, buffer(data)));
    const out = new Uint8Array(12 + sealed.length);
    out.set(iv);
    out.set(sealed, 12);
    return out;
}
/** Throws when the key is wrong or the data was altered. */
export async function decrypt(key: CryptoKey, data: Uint8Array) {
    if (data.length < 28) throw new Error("Invalid share data");
    return new Uint8Array(await crypto.subtle.decrypt({ name: "AES-GCM", iv: buffer(data.subarray(0, 12)) }, key, buffer(data.subarray(12))));
}

/** What the owner's devices keep about a share, sealed for the server. */
export interface ShareRecord {
    v: 1;
    /** K in base64url; empty for a public page, whose content the server keeps in plain text. */
    key: string;
    /** Password of the share, so the owner's devices can rebuild its content. */
    password: string;
    /** Shared note or folder ("" for the whole vault). */
    target: string;
    folder: boolean;
    /** References the owner allowed into the share. */
    authorised: string[];
    /** Every reference the owner was shown; references found later are left out and counted. */
    reviewed: string[];
    /** References found by automatic updates that are not in `reviewed`. */
    unreviewed: number;
}
export async function sealRecord(key: CryptoKey, record: ShareRecord) {
    return toBase64Url(await encrypt(key, encoder.encode(JSON.stringify(record))));
}
export async function openRecord(key: CryptoKey, sealed: string): Promise<ShareRecord> {
    return JSON.parse(decoder.decode(await decrypt(key, fromBase64Url(sealed)))) as ShareRecord;
}
