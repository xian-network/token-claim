import "dotenv/config";
import { writeFile } from 'fs/promises';

export const logErrorToFile = async (error: string) => {
    const timestamp = new Date().toUTCString();
    const logEntry = `${timestamp} - ${error}\n`;
    const logFile = process.env.LOG_FILE_PATH as string;

    try {
        await writeFile(logFile, logEntry);
        console.log('Error logged successfully');
    } catch (err) {
        console.error('Failed to write to log file:', err);
    }
}