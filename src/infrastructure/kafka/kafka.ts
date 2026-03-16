import {Kafka} from "kafkajs";
import env from "../../utils/env";

export const kafka: Kafka = new Kafka({
  clientId: env('APP_NAME'),
  brokers: env('KAFKA_BROKERS', 'localhost:9092').split(','),
})
