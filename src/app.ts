import e from "express";
import "reflect-metadata"
import db from "./infrastructure/database/data-source";
import env from "./utils/env";
import {seed} from "./infrastructure/database/seeders";
import {router} from "./routes";
import {producer} from "./infrastructure/kafka/producer";
import {runConsumer} from "./infrastructure/kafka/consumer";

const app: e.Express = e();
const url = env('APP_URL', 'http://localhost:3000')
const port = env('APP_PORT', 3000);

app.use('/', router(e.Router()))

db.initialize()
  .then(() => {
    console.log("Data Source has been initialized!")
    seed().then()
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err)
  })

producer.connect().then()
runConsumer().then()

app.listen(port, () => {
  console.log(`[server]: Server is running at ${url}`);
  if (env('APP_ENV') === 'local') {
    console.log(`[server]: Get postman collection at ${url}/api-docs/postman`)
    console.log(`[server]: Swagger at ${url}/api-docs/swagger`)
  }
})
