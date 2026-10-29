// Resolves an Obsidian link target to a vault path without Obsidian's metadata cache, following its rules:
// a path is tried from the vault root and from the linking note's folder; a bare name matches any file
// with that name, preferring the linking note's folder and then the shortest path.

const normalise = (path: string) => {
    const parts: string[] = [];
    for (const part of path.split("/")) {
        if (part === "" || part === ".") continue;
        if (part === "..") parts.pop();
        else parts.push(part);
    }
    return parts.join("/");
};
const folderOf = (path: string) => path.slice(0, Math.max(0, path.lastIndexOf("/")));

export function resolveLinkpath(target: string, from: string, files: readonly string[]) {
    let link = target.replace(/[#^].*$/, "").trim();
    if (!link) return undefined;
    if (!/\.[^/.]+$/.test(link)) link += ".md";
    const byLower = new Map(files.map((file) => [file.toLowerCase(), file]));
    const folder = folderOf(from);
    for (const candidate of [normalise(link), normalise(`${folder}/${link}`)]) {
        const found = byLower.get(candidate.toLowerCase());
        if (found) return found;
    }
    const suffix = `/${normalise(link).toLowerCase()}`;
    const matches = files.filter((file) => `/${file.toLowerCase()}`.endsWith(suffix));
    return (
        matches.find((file) => folderOf(file) === folder) ??
        matches.sort((a, b) => a.length - b.length || a.localeCompare(b))[0]
    );
}
