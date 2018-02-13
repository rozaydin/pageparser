"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const cheerio = require("cheerio");
class PageGrabber {
    constructor() { }
    parsePage(url) {
        return new Promise((resolve, reject) => {
            axios_1.default
                .get(url)
                .then((response) => {
                const html = response.data;
                const $ = cheerio.load(html, {
                    normalizeWhitespace: true,
                    xmlMode: true
                });
                resolve(this.parse($));
            })
                .catch(err => reject(err));
        });
    }
    parsePages(urlList) {
        const promiseList = new Array();
        urlList.forEach((url, index) => {
            promiseList.push(this.parsePage(url));
        });
        return Promise.all(promiseList);
    }
    parse($) {
        const ilan$ = $("div.ilanozellikler td");
        const description$ = $("div.ilanaciklamalar");
        const images$ = $(".ilanfotolar img");
        const post = {};
        const tupple = { key: "", value: "" };
        // ilan details
        ilan$.each((index, elem) => {
            // parse
            const $ = cheerio.load(elem);
            if (index == 0) {
                post["price"] = $("h3").text();
            }
            else if (index == 1) {
                let addr = "";
                $("h5 > a").each((index, elem) => {
                    addr += elem.firstChild.data + " ";
                });
                post["addr"] = addr;
            }
            else {
                // name value pairs
                if (elem.firstChild.data != undefined) {
                    tupple[index % 2 == 0 ? "key" : "value"] = elem.firstChild.data;
                    // tupple filled, send to post object
                    if (index % 2 == 1) {
                        post[tupple.key] = tupple.value;
                    }
                }
            }
        });
        // -----------------Aciklamalar------------------ //
        post["description"] = description$.first().html();
        // -----------------Images----------------------- //
        post["images"] = [];
        images$.each((index, element) => post["images"].push("http://www.worldrealestate.world/" + element.attribs["src"]));
        return post;
    }
}
exports.PageGrabber = PageGrabber;
//# sourceMappingURL=D:/Projects/page-exporter/dist/*/src/service/PageGrabber.js.map