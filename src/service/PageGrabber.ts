import axios, { AxiosResponse } from "axios";
import * as cheerio from "cheerio";

export class PageGrabber {
  public constructor() {}

  public parsePage(url: string): Promise<{ [key: string]: Object }> {
    return new Promise((resolve, reject) => {
      axios
        .get(url)
        .then((response: AxiosResponse) => {
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

  public parsePages(
    urlList: string[]
  ): Promise<Array<{ [key: string]: Object }>> {
    const promiseList = new Array<Promise<{ [key: string]: Object }>>();

    urlList.forEach((url, index) => {
      promiseList.push(this.parsePage(url));
    });

    return Promise.all(promiseList);
  }

  private parse($: CheerioStatic): { [key: string]: Object } {
    const ilan$ = $("div.ilanozellikler td");
    const description$ = $("div.ilanaciklamalar");
    const images$ = $(".ilanfotolar img");

    const post: { [key: string]: Object } = {};
    const tupple: { key: string; value: string } = { key: "", value: "" };

    // ilan details
    ilan$.each((index, elem) => {
      // parse
      const $ = cheerio.load(elem);

      if (index == 0) {
        post["price"] = $("h3").text();
      } else if (index == 1) {
        let addr: string = "";
        $("h5 > a").each((index, elem) => {
          addr += elem.firstChild.data + " ";
        });
        post["addr"] = addr;
      } else {
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
    images$.each((index, element) =>
      (<Array<string>>post["images"]).push(
        "http://www.worldrealestate.world/" + element.attribs["src"]
      )
    );

    return post;
  }
}
