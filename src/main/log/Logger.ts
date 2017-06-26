/**
 * Simple logger.
 */
export class Logger {

    /**
     * Singleton.
     */
    private static INSTANCE: Logger = new Logger();

    /**
     * Flag to toggle debug logging.
     */
    public debugEnabled: boolean = false;

    /**
     * Get Singleton.
     */
    public static getInstance(): Logger {
        return this.INSTANCE;
    }

    /**
     * Log something if debugEnabled is true.
     *
     * @param message Debug output
     */
    public debug(message: any): void {
        if (this.debugEnabled) {
            // This is the only place we directly log to console.
            // tslint:disable-next-line:no-console
            console.log(message);
        }
    }
}
