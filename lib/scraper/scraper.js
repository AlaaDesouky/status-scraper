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
    try {
      const $ = cheerio.load(html);
      const followers = $('[data-nav="followers"] .ProfileNav-value').data(
        "count"
      );
      const following = $('[data-nav="following"] .ProfileNav-value').data(
        "count"
      );
      return { followers, following };
    } catch (error) {
      return error;
    }
  }

  // Get reddit status
  async getRedditStatus(html, user) {
    try {
      const $ = cheerio.load(html);
      const totalKarma = $(
        "#profile--id-card--highlight-tooltip--karma"
      ).html();
      const dataInString = $("#data")
        .html()
        .split(" = ")[1];
      const pageObject = JSON.parse(
        dataInString.slice(0, dataInString.length - 22)
      );
      const { commentKarma, postKarma } = pageObject.users.models[user];
      return {
        totalKarma,
        commentKarma,
        postKarma
      };
    } catch (error) {
      return error;
    }
  }
}

export default Scraper;
