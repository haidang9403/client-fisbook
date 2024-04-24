import createApiClient from "./api.service";
import queryString from "@/utils/queryString";

class BookService {
    constructor(baseURL = "/api/bookstore") {
        this.baseURL = baseURL;
        this.api = createApiClient(baseURL);
    }

    async getAll(query = '') {
        return (await this.api.get('/book' + queryString(query))).data;
    }

    async getOne(id) {
        return (await this.api.get("/book/" + id)).data;
    }

    async getAuthor(query = '') {
        return (await this.api.get("/author" + queryString(query))).data;
    }

    async getCategory(query = '') {
        return (await this.api.get("/category" + queryString(query))).data;
    }

    async getPublisher(query = '') {
        return (await this.api.get("/publisher" + queryString(query))).data;
    }
}

export default new BookService();
