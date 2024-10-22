import { eq, isNull } from "drizzle-orm";
import { verifyMessage } from "viem";

import { db } from "./db";
import { logErrorToFile } from "./logging";
import { participantTable } from "./schema";

export const isParticipant = async (bscWallet: string): Promise<boolean> => {
    const result = await db
        .select()
        .from(participantTable)
        .where(eq(participantTable.bscAddress, bscWallet.toLowerCase()))
        .limit(1)
        .catch(async (err) => {
            console.log({err})
            await logErrorToFile(err);
            return [];
        });

    if (result.length === 0) {
        return false;
    } else {
        return true;
    }
};

export const participantTokenAmount = async (
    bscWallet: string,
): Promise<{ amountToReceive: number | null }[]> => {
    const result = await db
        .select({
            amountToReceive: participantTable.amountToReceive,
        })
        .from(participantTable)
        .where(eq(participantTable.bscAddress, bscWallet.toLowerCase()))
        .limit(1)
        .catch(async (err) => {
            await logErrorToFile(err);
            return [];
        });

    return result;
};

export const isNotSigned = async (bscAddress: string): Promise<boolean> => {
    const result = await db
        .select({
            isSignatureNull: isNull(participantTable.signature),
        })
        .from(participantTable)
        .where(eq(participantTable.bscAddress, bscAddress))
        .limit(1)
        .catch(async (err) => {
            await logErrorToFile(err);
            return [];
        });

    const isSignatureNull = result[0]?.isSignatureNull ?? true;

    if (isSignatureNull) {
        return true;
    } else {
        return false;
    }
};

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

export const recordData = async (
    bscWallet: `0x${string} `,
    xianWallet: string,
    signature: `0x${string}`,
    agreedToTerms: string,
): Promise<string | undefined> => {
    const isSignatureValid = await verifySignature(
        bscWallet,
        xianWallet,
        signature,
    );
    if (!isSignatureValid) return "signature is invalid";

    if (agreedToTerms !== "agree")
        return "participant do not agree to terms";

    const isElegible = await isParticipant(bscWallet);

    const _isNotSigned = await isNotSigned(bscWallet);

    if (isElegible) {
        if (_isNotSigned) {
            const now = new Date();
            await db
                .update(participantTable)
                .set({
                    xianAddress: xianWallet,
                    timeOfSigning: now.toUTCString(),
                    signature: signature,
                    agreedToTerms: agreedToTerms,
                })
                .where(eq(participantTable.bscAddress, bscWallet.toLowerCase()))
                .catch(async (err) => {
                    await logErrorToFile(err);
                    return "signing unsuccessful";
                });
            return "signing successfull";
        } else {
            return "participant signed already";
        }
    } else {
        return "user not eligible";
    }
};
