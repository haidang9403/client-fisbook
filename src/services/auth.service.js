import createApiClient from "./api.service";

class AuthService {
    constructor(baseURL = "/api/bookstore") {
        this.api = createApiClient(baseURL);
    }

    async login(data) {
        return (await this.api.post("/login", data)).data;
    }

    async register(data) {
        return (await this.api.post("/register", data)).data;
    }

    async logout() {
        return (await this.api.post("/logout")).data;
    }

    async refreshToken() {
        return (await this.api.post("/refresh-token")).data;
    }

    async getRefeshToken() {
        return (await this.api.get("/get-token")).data;
    }
}

export default new AuthService();