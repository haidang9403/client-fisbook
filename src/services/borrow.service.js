import createApiClient from "./api.service";
import createApiJwt from "./api.jwt";
import queryString from "@/utils/queryString";

class BorrowService {
    constructor(baseURL = "/api/bookstore") {
        this.baseURL = baseURL;
        this.api = createApiClient(baseURL);
        this.apiJWT = createApiJwt(baseURL);
    }

    async borrow(body) {
        return (await this.apiJWT.post("/borrow", body)).data;
    }
}

export default new BorrowService();
