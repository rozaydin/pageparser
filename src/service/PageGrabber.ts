import axios, { AxiosResponse } from "axios";

export class PageGrabber {
  public constructor() {}

  public async grabPage(url: string): Promise<string> {
    const response: AxiosResponse = await axios.get(url);
    return response.data;
  }
}
