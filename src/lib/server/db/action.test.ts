import { expect, test } from "vitest";

import { verifyMessage } from "viem";
import { logErrorToFile } from "./logging";

// function to be tested
const verifySignature = async (
    bscWallet: `0x${string}`,
    message: string,
    signature: `0x${string}`,
): Promise<boolean> => {
    return await verifyMessage({
        address: bscWallet,
        message,
        signature,
    }).catch(async (err) => {
        await logErrorToFile(err);
        return false;
    });
};

//tests
test("pass when user signed message with presented wallet", async() => {
    const bscWallet = "0x00000001F742029F3A231da920d47c9bC16D750F";
    const message = "5fa1b314468832fb9d391e8af756140e85325a565d8b411ae2f2001d37c30ef4";
    const signature = "0xebb6eeffbc5496e6b9348885b338e17610d1474fd6dbd559ab0dc3ba5aebde913007a6f942c2dcd32cbfb22223c98625a109d8ddbe4b7bff3c0c815ce277bd2a1b";
    const result = await verifySignature(bscWallet, message, signature);
    expect(result).toBe(true)
})

test("fail when user signature is invalid", async() => {
    const bscWallet = "0x00000001F742029F3A231da920d47c9bC16D750F";
    const message = "5fa1b314468832fb9d391e8af756140e85325a565d8b411ae2f2001d37c30ef4";
    const signature = "0xebb6eeffbc5496e6b9348885b338e17610d1474fd6dbd559ab0dc3ba5aebde813007a6f942c2dcd32cbfb22223c98625a109d8ddbe4b7bff3c0c815ce277bd2a1b";
    const result = await verifySignature(bscWallet, message, signature);
    expect(result).toBe(false)
})