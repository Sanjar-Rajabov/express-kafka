import {Producer} from "kafkajs";
import {kafka} from "./kafka";
import {TransactionCreatedMessage} from "../../structures/kafka/transaction-created.message";
import {KafkaTopics} from "../../structures/kafka/kafka-topics";

export const producer: Producer = kafka.producer()

export async function sendTransactionCreated(payload: TransactionCreatedMessage) {
  await producer.send({
    topic: KafkaTopics.TransactionCreated,
    messages: [
      {value: JSON.stringify(payload)},
    ],
  })
}
