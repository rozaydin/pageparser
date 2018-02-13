// awsCredentials = "AKIAIZ2YC2X4CHUGGCYA", "L7miQ/2iiet0uuOlYi8Z1UmAx7lYXk5XQnv97JQn";
import { Handler, Context, Callback } from "aws-lambda";
import { PageGrabber } from "../service/PageGrabber";
import * as cheerio from "cheerio";

interface Response {
  statusCode: number;
  body: string;
}

const pparse: Handler = (event: any, context: Context, callback: Callback) => {
  const pageGrabber = new PageGrabber();
  pageGrabber
    .parsePages([
      "http://www.worldrealestate.world/duplex-apartment-for-sale-in-esenyurt-84413779.html",
      "http://www.worldrealestate.world/avcilar-denizkoskler-39-de-400m2-6-1-satilik-villa-64546741.html"
    ])
    .then(results => {
      // json results
      const response: Response = {
        statusCode: 200,
        body: JSON.stringify(results)
      };      
      callback(undefined, response);
    })
    // err case
    .catch(callback);
};

export { pparse };
