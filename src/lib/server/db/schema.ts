import { sqliteTable, integer, text, real } from "drizzle-orm/sqlite-core";

export const participantTable = sqliteTable("participants", {
    id: integer("id").primaryKey(),
    bscAddress: text("bsc_address"), // Allows NULL
    xianAddress: text("xian_address"), // Allows NULL
    signature: text("signature"), // Allows NULL
    amountToReceive: real("amount_to_receive"), // Allows NULL
    agreedToTerms: text("agreed_to_terms"), // Allows NULL
});
