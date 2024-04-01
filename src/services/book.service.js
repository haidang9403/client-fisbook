import createApiClient from "./api.service";


class BookService {
    constructor(baseURL = "/api/bookstore") {
        this.baseURL = baseURL;
        this.api = createApiClient(baseURL);
    }

    async getAll() {
        return (await this.api.get("/book")).data;
    }

    async getOne(id) {
        return (await this.api.get("/book/" + id)).data;
    }

    async getAuthor() {
        return (await this.api.get("/author")).data;
    }

    async getCategory() {
        return (await this.api.get("/category")).data;
    }

    async getPublisher() {
        return (await this.api.get("/publisher")).data;
    }
}

export default new BookService();
