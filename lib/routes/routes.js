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
    });
  }
}
