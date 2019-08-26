import Counter from "../scraper/counter";

export class Routes {
  routes(app) {
    // @route   GET /
    // @desc    landing page
    app.get("/", (req, res) => {
      res.status(200).send({
        "api-endpoint":
          "https://statusscraperapi.herokuapp.com/scrape/:flag/:username",
        message:
          "status scraper api, replace ':flag' for one of the following letters",
        flags: {
          "twitter.com": "t",
          "reddit.com": "r",
          "github.com": "g",
          "behance.net": "b",
          "quora.com": "q",
          "instagram.com": "i"
        }
      });
    });

    // @route  GET /scrape/t/:user
    // @desc   log twitter user status
    app.get("/scrape/t/:user", async (req, res) => {
      const user = req.params.user;
      try {
        const twitterStatus = await Counter.getTwitterCount(
          `https://twitter.com/${user}`
        );
        res.status(200).send({
          user,
          status: {
            twitterStatus
          }
        });
      } catch (error) {
        res.status(404).send({
          message: "User not found"
        });
      }
    });

    // @route   GET /scrape/r/:user
    // @desc    log reddit user status
    app.get("/scrape/r/:user", async (req, res) => {
      const user = req.params.user;
      try {
        const redditStatus = await Counter.getRedditCount(
          `https://www.reddit.com/user/${user}`,
          user.toLowerCase()
        );
        res.status(200).send({
          user,
          status: {
            redditStatus
          }
        });
      } catch (error) {
        res.status(404).send({
          message: "User not found"
        });
      }
    });

    // @route  GET /scrape/g/:user
    // @desc   log github user status
    app.get("/scrape/g/:user", async (req, res) => {
      const user = req.params.user;
      try {
        const githubStatus = await Counter.getGithubCount(
          `https://github.com/${user}`
        );
        res.status(200).send({ user, status: { githubStatus } });
      } catch (error) {
        res.status(404).send({
          message: "User not found"
        });
      }
    });

    // @route   GET /scrape/b/:user
    // @desc    log behance user status
    app.get("/scrape/b/:user", async (req, res) => {
      const user = req.params.user;
      try {
        const behanceStatus = await Counter.getBehanceCount(
          `https://www.behance.net/${user}`
        );
        res.status(200).send({ user, status: { behanceStatus } });
      } catch (error) {
        res.status(404).send({
          message: "User not found"
        });
      }
    });

    // @route   GET /scrape/q/:user
    // @desc    log quora user status
    app.get("/scrape/q/:user", async (req, res) => {
      const user = req.params.user;
      try {
        const quoraStatus = await Counter.getQuoraCount(
          `https://www.quora.com/profile/${user}`
        );
        res.status(200).send({ user, status: { quoraStatus } });
      } catch (error) {
        res.status(404).send({
          message: "User not found"
        });
      }
    });

    // @route   GET /scrape/i/:user
    // @desc    log instagram user status
    app.get("/scrape/i/:user", async (req, res) => {
      const user = req.params.user;
      try {
        const instagramStatus = await Counter.getInstagramCount(
          `https://www.instagram.com/${user}`
        );
        res.status(200).send({ user, status: { instagramStatus } });
      } catch (error) {
        res.status(404).send({ message: "User not found" });
      }
    });

    // @route   GET *
    // @desc    invalid url
    app.get("*", (req, res) =>
      res.status(403).send({ message: "Invalid url" })
    );
  }
}
