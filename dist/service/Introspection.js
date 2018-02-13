"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
class Introspection {
    constructor(introspectionUrl) {
        this.introspectionUrl = introspectionUrl;
    }
    introspectToken(toBeIntrospectedToken, accessToken) {
        axios_1.default
            .post(this.introspectionUrl, "token=" + toBeIntrospectedToken, { headers: { "Authorization": "Bearer " + accessToken, "Content-Type": "application/x-www-form-urlencoded" } })
            .then(result => {
            console.log(result);
        })
            .catch(err => {
            console.log(err);
        });
    }
}
exports.Introspection = Introspection;
//# sourceMappingURL=D:/Projects/MindSphereTS/dist/*/service/Introspection.js.map