"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PageGrabber_1 = require("../service/PageGrabber");
const pparse = (event, context, callback) => {
    const pageGrabber = new PageGrabber_1.PageGrabber();
    pageGrabber
        .parsePages([
        "http://www.worldrealestate.world/duplex-apartment-for-sale-in-esenyurt-84413779.html",
        "http://www.worldrealestate.world/avcilar-denizkoskler-39-de-400m2-6-1-satilik-villa-64546741.html"
    ])
        .then(results => {
        // json results
        const response = {
            statusCode: 200,
            body: JSON.stringify(results)
        };
        callback(undefined, response);
    })
        .catch(callback);
};
exports.pparse = pparse;
//# sourceMappingURL=D:/Projects/page-exporter/dist/*/aws-lambda/handler.js.map