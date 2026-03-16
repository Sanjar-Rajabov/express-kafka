import {EachMessagePayload} from "kafkajs";

export function transactionCreatedConsumer(payload: EachMessagePayload) {
    console.log('we\'ve received a message: ' + JSON.stringify(
        JSON.parse(Buffer.from(payload.message.value || '').toString())
    ))

    // call some service
}
