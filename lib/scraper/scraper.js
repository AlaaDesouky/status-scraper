import axios from "axios";
import cheerio from "cheerio";

class Scraper {
  // Get HTML
  async getHTML(url) {
    const { data: html } = await axios.get(url);
    return html;
  }

  // Get twitter status
  async getTwitterStatus(html) {
    const $ = cheerio.load(html);
    const followers = $('[data-nav="followers"] .ProfileNav-value').data(
      "count"
    );
    const following = $('[data-nav="following"] .ProfileNav-value').data(
      "count"
    );
    return { followers, following };
  }
}

export default Scraper;
