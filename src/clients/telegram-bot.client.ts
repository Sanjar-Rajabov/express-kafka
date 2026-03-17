import {BaseClient} from "./base-client";
import env from "../utils/env";

export class TelegramBotClient extends BaseClient {
    protected baseUrl = env('TELEGRAM_BOT_URL')
    protected chatId = env('TELEGRAM_CHAT_ID')

    async sendMessage(
        text: string,
        parseMode: 'MarkdownV2' | 'Markdown' | 'HTML' = 'MarkdownV2'
    ): Promise<void> {
        const params: object = {text, chat_id: this.chatId, parse_mode: parseMode}

        try {
            await this.http().get(`/bot${env('TELEGRAM_BOT_TOKEN')}/sendMessage`, {
                params
            })
        } catch (error: any) {
            console.log('[ERROR] Couldn\'t send log to Telegram. Params: ' + JSON.stringify(params))
        }
    }
}
