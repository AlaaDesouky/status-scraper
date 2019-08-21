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

  // Get github status
  async getGithubStatus(html) {
    try {
      const $ = cheerio.load(html);
      const status = {};
      $(".Counter").each((i, e) => {
        status[
          e.children[0].parent.prev.data.trim().toLowerCase()
        ] = e.children[0].data.trim();
      });
      return status;
    } catch (error) {
      return error;
    }
  }

  // Get behance status
  async getBehanceStatus(html) {
    try {
      const $ = cheerio.load(html);
      const dataInString = $("#beconfig-store_state").html();
      const pageObject = JSON.parse(dataInString);
      const {
        followers,
        following,
        appreciations,
        views,
        comments
      } = pageObject.profile.owner.stats;

      return {
        followers,
        following,
        appreciations,
        views,
        comments
      };
    } catch (error) {
      return error;
    }
  }

  // Get quora status
  async getQuoraStatus(html) {
    try {
      const $ = cheerio.load(html);
      const status = {};
      $(".list_count").each((i, e) => {
        status[e.children[0].parent.prev.data.toLowerCase()] =
          e.children[0].data;
      });
      return status;
    } catch (error) {
      return error;
    }
  }

  // Get instagram status
  async getInstagramStatus(html) {
    try {
      const $ = cheerio.load(html);
      // get the script containing the data
      let script;
      $('script[type="text/javascript"]').each((i, e) => {
        if (
          e.children[0] !== undefined &&
          e.children[0].data.includes("window._sharedData =")
        ) {
          return (script = e.children[0].data);
        }
      });

      // get json fromat string
      const dataInString = script.split(" = ")[1];

      // convert to json object
      const pageObject = JSON.parse(
        dataInString.slice(0, dataInString.length - 1)
      );

      const {
        edge_followed_by,
        edge_follow,
        edge_owner_to_timeline_media
      } = pageObject.entry_data.ProfilePage[0].graphql.user;

      return {
        followers: edge_followed_by.count,
        following: edge_follow.count,
        posts: edge_owner_to_timeline_media.count
      };
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}

export default Scraper;
