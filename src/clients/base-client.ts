import {HttpHelper} from "../utils/http.helper";

export abstract class BaseClient {
    protected abstract baseUrl: string
    protected headers: object = {
        "Accept": "application/json",
        "Content-Type": "application/json",
    }

    protected http() {
        return HttpHelper.instance(this.baseUrl, this.headers)
    }
}
