import { db } from "../src/lib/server/db/db";
import { isNull, and, isNotNull, eq } from "drizzle-orm";
import { participantTable } from "../src/lib/server/db/schema";

import Xian from "xian-js";
import type { I_NetworkSettings, I_TxInfo } from "xian-js";


// GET THE ADDRESSES

export async function get_pending_contributions(db: any) {
    const added: { [key: string]: boolean } = {}
    const total_to_xian_address: any = {}
    const all_contributions: any[] = []

    const signed_but_not_paid = await db.select().from(participantTable).where(and(isNotNull(participantTable.signature), isNull(participantTable.paid), isNotNull(participantTable.xianAddress)))

    for (const participant of signed_but_not_paid) {
        // const xianAddress = participant.xianAddress as string
        if (participant.bscAddress && !added[participant.bscAddress]) {
            const contributions: any[] = await db.select().from(participantTable).where(eq(participantTable.bscAddress, participant.bscAddress))
            console.log({contributions})
            total_to_xian_address[participant.xianAddress] = contributions.reduce((acc, curr) => acc + curr.amountToReceive, 0)
            all_contributions.push(...contributions)
        }
        if (participant.bscAddress) {
            added[participant.bscAddress] = true
        }
    }
    return { total_to_xian_address, all_contributions }
}


export async function distribute_tokens(pending_contributions: any, db: any) {
    const { total_to_xian_address, all_contributions } = pending_contributions

    const hosts = [
        "https://node.xian.org",
    ]
    let network_info: I_NetworkSettings = {
        chain_id: "xian-network-1",
        masternode_hosts: hosts
    };

    const wallet = Xian.Wallet.create_wallet({ sk: "" });

    let addresses: any = []
    let amounts: any = []

    for (const key of Object.keys(total_to_xian_address)) {
        addresses.push(key)
        amounts.push(total_to_xian_address[key] / 1000)
    }

    console.log({addresses, amounts})


    let tx_info: I_TxInfo = {
        senderVk: wallet.vk,
        chain_id: network_info.chain_id,
        contractName: "con_multisend_2",
        methodName: "send",
        kwargs: {
            contract: "currency",
            addresses: addresses,
            amounts: amounts,
        },
        stampLimit: 50000,
    };

    const tx = new Xian.TransactionBuilder(network_info, tx_info);
    const send_res = await tx.send(wallet.sk)

    if (send_res.success) {
        for (const participant of all_contributions) {
            await db.update(participantTable).set({ paid: 1 }).where(eq(participantTable.bscAddress, participant.bscAddress))
        }
    }
    else {
        console.log({ send_res })
    }
    return send_res
}

const pending_contributions = await get_pending_contributions(db)
const send_res = await distribute_tokens(pending_contributions, db)
console.log({ send_res })