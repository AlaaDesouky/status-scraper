import Scraper from "./scraper";

class Counter extends Scraper {
  // Get twitter count
  async getTwitterCount(url) {
    const html = await this.getHTML(url);
    const twitterCount = await this.getTwitterStatus(html);
    return twitterCount;
  }
}

export default new Counter();
