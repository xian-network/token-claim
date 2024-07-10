import { db } from "./db";
import { eq, isNull, sql } from "drizzle-orm";
import { participantTable } from "./schema";
import { verifyMessage } from "viem";

export const isParticipant = async (truncWallet: string): Promise<boolean> => {
    const result = await db
        .select()
        .from(participantTable)
        .where(eq(participantTable.bscAddress, truncWallet))
        .limit(1)
        .catch((err) => {
            throw err;
        });

    if (result.length === 0) {
        return false;
    } else {
        return true;
    }
};

export const participantTokenAmount = async (
    truncWallet: string,
): Promise<{ amountToReceive: number | null }[]> => {
    const result = await db
        .select({
            amountToReceive: participantTable.amountToReceive,
        })
        .from(participantTable)
        .where(eq(participantTable.bscAddress, truncWallet))
        .limit(1)
        .catch((err) => {
            throw err;
        });

    return result;
};

export const isNotSigned = async (truncWallet: string): Promise<boolean> => {
    const result = await db
        .select({
            isSignatureNull: isNull(participantTable.signature),
        })
        .from(participantTable)
        .where(eq(participantTable.bscAddress, truncWallet))
        .limit(1)
        .catch((err) => {
            throw err;
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
    }).catch((err) => {
        throw err;
    });
};

export const recordData = async (
    bscWallet: `0x${string} `,
    xianWallet: string,
    signature: `0x${string}`,
    agreedToTerms: string,
): Promise<string | undefined> => {
    await verifySignature(bscWallet, xianWallet, signature);

    const truncAddress = bscWallet.slice(0, 10) + "..." + bscWallet.slice(-9);

    if (agreedToTerms === "disagree") throw "participant do not agree to terms";

    const isElegible = await isParticipant(truncAddress);

    const _isNotSigned = await isNotSigned(truncAddress);

    if (isElegible) {
        if (_isNotSigned) {
            await db
                .update(participantTable)
                .set({
                    xianAddress: xianWallet,
                    signature: signature,
                    agreedToTerms: agreedToTerms,
                })
                .where(eq(participantTable.bscAddress, truncAddress))

                .catch((err) => {
                    throw err;
                });
            return "signing successfull";
        } else {
            return "participant signed already";
        }
    } else {
        return "user not eligible";
    }
};
