import "dotenv/config";
import { writeFile } from "fs/promises";

export const logErrorToFile = async (error: any) => {
    let _error;

    const timestamp = new Date().toUTCString();
    // handle error in all forms
    if (typeof error === "string") {
        _error = error;
    } else if (error instanceof Error) {
        _error = error.stack || error.message;
    } else {
        _error = String(error);
    }

    const logEntry = `${timestamp} - ${_error}\n`;
    const logFile = process.env.LOG_FILE_PATH || './log' as string;

    try {
        await writeFile(logFile, logEntry);
        console.log("Error logged successfully");
    } catch (err) {
        console.error("Failed to write to log file:", err);
    }
};
