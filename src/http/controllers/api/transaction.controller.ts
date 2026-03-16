import e from "express";
import {ResponseHelper} from "../../../utils/response.helper";
import {sendTransactionCreated} from "../../../infrastructure/kafka/producer";
import {Folder} from "../../../api-docs/decorators/folder";
import {Post} from "../../../api-docs/decorators/methods";
import {Body} from "../../../api-docs/decorators/body";

@Folder('Transaction', '/api/transaction')
export class TransactionController {

    @Post('/')
    @Body({
        externalId: "some external id",
        amount: 1000000
    })
    static async create(req: e.Request, res: e.Response) {
        try {
            // some code
            console.log('hi we\'re producing an event to kafka')

            await sendTransactionCreated({
                externalId: 'externalId',
                amount: 1000
            })

            console.log('we\'ve successfully produced an event')
            return res.send('hi')
        } catch (error: any) {
            return ResponseHelper.catchError(res, error)
        }
    }
}
