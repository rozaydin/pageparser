import { Handler, Context, Callback } from "aws-lambda";
import { PageGrabber } from "../service/PageGrabber";
import * as cheerio from "cheerio";

const pparse: Handler = (event: any, context: Context, callback: Callback) => {
  const pageGrabber = new PageGrabber();
  pageGrabber
    .parsePages([
      "http://www.worldrealestate.world/duplex-apartment-for-sale-in-esenyurt-84413779.html",
      "http://www.worldrealestate.world/avcilar-denizkoskler-39-de-400m2-6-1-satilik-villa-64546741.html"
    ])
    .then(results => {            
      callback(undefined, results);
    })
    // err case
    .catch(callback);
};

export { pparse };