import { pbkdf2Async } from "./noble-hashes/pbkdf2.js";
import { sha256 } from "./noble-hashes/sha2.js";

const iterations = 600_000;
const derivedKeyLength = 32;
const applicationSalt = "PasswordTea|master-password|pbkdf2-hmac-sha256|v1";
const textEncoder = new TextEncoder();
const applicationSaltBytes = textEncoder.encode(applicationSalt);

function CanUseWebCrypto()
{
    return typeof globalThis.crypto === "object"
        && globalThis.crypto !== null
        && typeof globalThis.crypto.subtle === "object"
        && globalThis.crypto.subtle !== null;
}

async function DeriveWithWebCrypto(normalizedMasterPassword)
{
    const masterPasswordBytes = textEncoder.encode(normalizedMasterPassword);

    try
    {
        const masterKey = await globalThis.crypto.subtle.importKey(
            "raw",
            masterPasswordBytes,
            "PBKDF2",
            false,
            ["deriveBits"]);
        const derivedKey = await globalThis.crypto.subtle.deriveBits(
            {
                name: "PBKDF2",
                hash: "SHA-256",
                salt: applicationSaltBytes,
                iterations,
            },
            masterKey,
            derivedKeyLength * 8);

        return new Uint8Array(derivedKey);
    }
    finally
    {
        masterPasswordBytes.fill(0);
    }
}

async function DeriveMasterKey(masterPassword)
{
    const normalizedMasterPassword = typeof masterPassword === "string"
        ? masterPassword.normalize("NFC")
        : "";

    if(CanUseWebCrypto())
    {
        try
        {
            return await DeriveWithWebCrypto(normalizedMasterPassword);
        }
        catch(error)
        {
            console.warn("Web Crypto PBKDF2 is unavailable. Falling back to the bundled implementation.", error);
        }
    }

    return pbkdf2Async(
        sha256,
        normalizedMasterPassword,
        applicationSalt,
        {
            c: iterations,
            dkLen: derivedKeyLength,
            asyncTick: 8,
        });
}

export {
    DeriveMasterKey,
};
