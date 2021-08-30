const authCtrl = {};
const store = require("./store");
const bcrypt = require("bcrypt");
const passportJWT = require("passport-jwt");
const config = require("../../config/index");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const ExtractJwt = passportJWT.ExtractJwt;

const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = config.JWT_TOKEN;

const passport = require("passport");

const JwtStrategy = passportJWT.Strategy;

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = config.JWT_TOKEN;

const strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
  console.log("payload received", jwt_payload);
  const user = store.findOne({
    where: {
      id: {
        [Op.eq]: jwt_payload.id,
      },
    },
  });
  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});
passport.use(strategy);

authCtrl.Login = async function (req, res) {
  const { email, password } = req.body;
  if (email && password) {
    const user = await store.findOne({
      where: {
        email: {
          [Op.eq]: email,
        },
      },
    });
    if (!user) {
      res.status(401).json({ error: "No such user found" });
      return;
    }
    const result = await bcrypt.compare(password, user.password);
    if (result) {
      const payload = { id: user.id };
      const token = jwt.sign(payload, jwtOptions.secretOrKey);
      res.json({ status: 200, token: token });
      return;
    } else {
      res.status(401).json({ error: "User or password incorrect" });
    }
  }
};

authCtrl.register = async (req, res) => {
  let message, newUser;
  try {
    const { firstname, lastname, email, password } = req.body;
    if (!firstname || !lastname || !email || !password) {
      message = {
        code: 403,
        status: "Error",
        error: "Incomplete data",
      };
    } else {
      const rounds = 10;
      const hash = bcrypt.hashSync(password, rounds);
      existUser = await store.findOne({
        where: {
          email: {
            [Op.eq]: email,
          },
        },
      });
      if (!existUser) {
        newUser = await store.create({
          firstname,
          lastname,
          email,
          password: hash,
        });
        message = {
          code: 201,
          status: "Ok",
          user: {
            id: newUser.id,
            firstname: newUser.firstname,
            lastname: newUser.lastname,
            email: newUser.email,
          },
        };
      } else {
        message = {
          code: 403,
          status: "Error",
          error: "User is already registered",
        };
      }
    }
    res.status(message.code).json(message);
  } catch (error) {
    console.log(error);
    message = {
      code: 403,
      status: "Error",
      error: "Error registering data",
    };
    res.status(message.code).json(message);
  }
};

module.exports = authCtrl;
