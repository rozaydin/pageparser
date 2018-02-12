import { PageGrabber } from "./service/PageGrabber";
import * as cheerio from "cheerio";

const pageGrabber = new PageGrabber();
const result = pageGrabber.grabPage(
  "http://www.worldrealestate.world/bahcelievler-sirinevler-mah-70m2-2-1-satilik-daire-71244640.html"
);
result.then(html => {
  const $ = cheerio.load(html);
  const details = $.html("#detaylar");
  console.log(details);
});
