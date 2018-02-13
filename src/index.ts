import { PageGrabber } from "./service/PageGrabber";
import * as cheerio from "cheerio";

const pageGrabber = new PageGrabber();
pageGrabber
  .parsePages([
    "http://www.worldrealestate.world/duplex-apartment-for-sale-in-esenyurt-84413779.html",
    "http://www.worldrealestate.world/avcilar-denizkoskler-39-de-400m2-6-1-satilik-villa-64546741.html"
  ])
  .then(results => {
    // json results
    results.forEach((result, index) => {      
      console.log("--------------------");      
      console.log(JSON.stringify(result));
      console.log("--------------------");
    });
  });
