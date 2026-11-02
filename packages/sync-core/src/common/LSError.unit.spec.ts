import { describe, expect, it } from "vitest";
import { SyncError, SyncFatalError } from "./LSError";

describe("SyncError", () => {
    describe("constructor", () => {
        it("should create an instance with a message", () => {
            const error = new SyncError("test message");
            expect(error.message).toBe("test message");
            expect(error.name).toBe("SyncError");
        });

        it("should capture the cause if provided", () => {
            const cause = new Error("original error");
            const error = new SyncError("wrapped error", { cause });
            expect(error.cause).toBe(cause);
        });

        it("[FIX] should wrap non-Error cause in an Error", () => {
            const cause = { status: 404, message: "not found" };
            const error = new SyncError("wrapped error", { cause });
            expect(error.cause).toBeInstanceOf(Error);
            expect((error.cause as Error).message).toContain("Unknown cause");
            expect((error.cause as Error).message).toContain(JSON.stringify(cause));
        });
    });

    describe("status property", () => {
        it("should return 500 by default", () => {
            const error = new SyncError("default error");
            expect(error.status).toBe(500);
        });

        it("should return overrideStatus if set", () => {
            const error = new SyncError("error", { status: 400 });
            expect(error.status).toBe(400);
        });

        it("should extract status from cause if available", () => {
            const cause = new Error("forbidden");
            (cause as any).status = 403;
            const error = new SyncError("error", { cause });
            expect(error.status).toBe(403);
        });

        it("[FIX] should extract status from nested cause if available", () => {
            const rootCause = { status: 418 };
            const midError = new Error("mid error");
            (midError as any).cause = rootCause;
            const error = new SyncError("error", { cause: midError });
            expect(error.status).toBe(418);
        });

        it("should prioritize overrideStatus over cause status", () => {
            const cause = { status: 403 };
            const error = new SyncError("error", { cause, status: 404 });
            expect(error.status).toBe(404);
        });
    });

    describe("isCausedBy static method", () => {
        it("should return true if error is an instance of the class", () => {
            const error = new SyncFatalError("fatal");
            expect(SyncError.isCausedBy(error, SyncFatalError)).toBe(true);
        });

        it("should return true if error.cause is an instance of the class", () => {
            const cause = new SyncFatalError("fatal cause");
            const error = new SyncError("wrapped", { cause });
            expect(SyncError.isCausedBy(error, SyncFatalError)).toBe(true);
        });

        it("should return true if nested cause matches the class", () => {
            const rootCause = new SyncFatalError("root fatal");
            const midError = new Error("mid");
            (midError as any).cause = rootCause;
            const error = new SyncError("wrapped", { cause: midError });
            expect(SyncError.isCausedBy(error, SyncFatalError)).toBe(true);
        });

        it("should return false if no occurrence of the class is found", () => {
            const error = new SyncError("normal error");
            expect(SyncError.isCausedBy(error, SyncFatalError)).toBe(false);
        });

        it("[FIX] should handle circular references gracefully", () => {
            const error: any = new SyncError("circular");
            error.cause = error;
            expect(SyncError.isCausedBy(error, SyncFatalError)).toBe(false);
        });

        it("should return false for null/undefined", () => {
            expect(SyncError.isCausedBy(null, SyncError)).toBe(false);
            expect(SyncError.isCausedBy(undefined, SyncError)).toBe(false);
        });
    });

    describe("fromError static method", () => {
        it("should return the same instance if it matches the class", () => {
            const error = new SyncError("original");
            const wrapped = SyncError.fromError(error);
            expect(wrapped).toBe(error);
        });

        it("should wrap a standard Error", () => {
            const original = new Error("standard");
            const wrapped = SyncError.fromError(original);
            expect(wrapped).toBeInstanceOf(SyncError);
            expect(wrapped.message).toContain("standard");
            expect(wrapped.cause).toBe(original);
            expect(wrapped.stack).toBe(original.stack);
        });

        it("[FIX] should wrap a string error", () => {
            const wrapped = SyncError.fromError("failure");
            expect(wrapped).toBeInstanceOf(SyncError);
            expect(wrapped.message).toContain("failure");
            expect(wrapped.cause).toBeInstanceOf(Error);
            expect((wrapped.cause as Error).message).toContain("failure");
        });

        it("should inherit the correct class name when called on a subclass", () => {
            const original = new Error("oops");
            const wrapped = SyncFatalError.fromError(original);
            expect(wrapped).toBeInstanceOf(SyncFatalError);
            expect(wrapped.name).toBe("SyncFatalError");
        });

        it("[FIX] should extract status from non-Error object in fromError", () => {
            const errorObj = { status: 401, message: "unauthorized" };
            const wrapped = SyncError.fromError(errorObj);
            expect(wrapped.status).toBe(401);
            expect(wrapped.cause).toBeInstanceOf(Error);
        });
    });
});
