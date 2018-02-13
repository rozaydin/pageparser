"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hello = (event, context, callback) => {
    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: Math.floor(Math.random() * 10)
        })
    };
    callback(undefined, response);
};
exports.hello = hello;
//# sourceMappingURL=D:/Projects/page-exporter/dist/*/handler.js.map