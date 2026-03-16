import {Consumer, EachMessagePayload} from "kafkajs";
import env from "../../utils/env";
import {kafka} from "./kafka";
import {KafkaTopics} from "../../structures/kafka/kafka-topics";
import {transactionCreatedConsumer} from "./consumers/transaction-created.consumer";

export const consumer: Consumer = kafka.consumer({groupId: env('APP_NAME')})

export async function runConsumer(): Promise<void> {
    await consumer.connect()
    await consumer.subscribe({topics: [KafkaTopics.TransactionCreated]})

    await consumer.run({
        eachMessage: async (payload: EachMessagePayload): Promise<void> => {
            console.log('hi got a new message')
            switch (payload.topic) {
                case KafkaTopics.TransactionCreated:
                    transactionCreatedConsumer(payload)
                    break;
                default:
                    console.log('no topic handler')
                    // warning. no topic
            }
        }
    })
}
