import Scraper from "./scraper";

class Counter extends Scraper {
  // Get twitter count
  async getTwitterCount(url) {
    const html = await this.getHTML(url);
    const twitterCount = await this.getTwitterStatus(html);
    return twitterCount;
  }

  // Get reddit count
  async getRedditCount(url, user) {
    const html = await this.getHTML(url);
    const redditCount = await this.getRedditStatus(html, user);
    return redditCount;
  }
}

export default new Counter();
