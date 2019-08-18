import Counter from "../scraper/counter";

export class Routes {
  routes(app) {
    // @route   GET /
    // @desc    landing page with search field
    app.get("/", (req, res) => {
      res.status(200).send({
        message: "GET request successfulll!!!!"
      });
    });

    // @route  GET /scrape/t/:user
    // @desc   log twitter user status
    app.get("/scrape/t/:user", async (req, res) => {
      const user = req.params.user;
      try {
        const { followers, following } = await Counter.getTwitterCount(
          `https://twitter.com/${user}`
        );
        res.status(200).send({
          status: {
            user,
            twitterStatus: {
              followers,
              following
            }
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
        const {
          totalKarma,
          commentKarma,
          postKarma
        } = await Counter.getRedditCount(
          `https://www.reddit.com/user/${user}`,
          user.toLowerCase()
        );
        res.status(200).send({
          status: {
            user,
            redditStatus: {
              totalKarma,
              commentKarma,
              postKarma
            }
          }
        });
      } catch (error) {
        res.status(404).send({
          message: "User not found"
        });
      }
    });
  }
}
