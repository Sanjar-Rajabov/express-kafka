import {TelegramBotClient} from "../clients/telegram-bot.client";

export class Logger {
    constructor(
        private bot: TelegramBotClient = new TelegramBotClient()
    ) {
    }

    async info(message: string, meta?: unknown) {
        await this.send('INFO', message, meta)
    }

    async error(message: string, meta?: unknown) {
        await this.send('ERROR', message, meta)
    }

    private async send(level: string, message: string, meta?: unknown) {
        const text = `[${level}] ${message}${meta ? '\n' + JSON.stringify(meta, null, 2) : ''}`
        await this.bot.sendMessage(text)
    }
}
