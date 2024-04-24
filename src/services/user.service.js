import createApiClient from "./api.service";
import createApiJwt from "./api.jwt";
import queryString from "@/utils/queryString";

class UserService {
    constructor(baseURL = "/api/bookstore") {
        this.baseURL = baseURL;
        this.api = createApiClient(baseURL);
        this.apiJWT = createApiJwt(baseURL);
    }

    async getDetailUser(id) {
        return (await this.apiJWT.get("/user/" + id)).data;
    }

    async update(id, body) {
        return (await this.apiJWT.post("/user/" + id, body)).data;
    }

    async updateFull(id, body) {
        return (await this.apiJWT.post("/user/full/" + id, body)).data;
    }

    async updateImage(id, data) {
        this.apiJwt = createApiJwt(
            this.baseURL,
            {
                'Content-Type': 'multipart/form-data',
                Accept: 'multipart/form-data',
            }
        )

        return (await this.apiJwt.post(`/user/image/${id}`, data)).data;
    }
}

export default new UserService();
