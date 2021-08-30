const auth = require("../components/auth/routes");
const searchAddress = require("../components/search-address/routes");
const passport = require("passport");

const routes = (server) => {
  server.use("/", auth),
    server.use(
      "/",
      passport.authenticate("jwt", { session: false }),
      searchAddress
    );
};

module.exports = routes;
