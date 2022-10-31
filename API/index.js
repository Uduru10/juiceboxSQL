const express = require("express");
const apiRouter = express.Router();

//for webtoken
const jwt = require("jsonwebtoken");
const { getUserById } = require("../db");
const { JWT_SECRET } = process.env;

const usersRouter = require("./users");
const postsRouter = require("./posts");
const tagsRouter = require("./tags");
//set 'req.user' if possible
apiRouter.use(async (req, res, next) => {
  const prefix = "Bearer";
  const auth = req.header("Authorization");

  //if authorization is not set. This will most likely happen with the registration or the login. Also if broweser doesnt have a saved token.
  if (!auth) {
    //we have nothing to see here
    next();

    //else if auth was set and if it begins with the bearer followed by a space
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);

    try {
      const { id } = jwt.verify(token, JWT_SECRET);

      if (id) {
        req.user = await getUserById(id);
        next();
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  } else {
    next({
      name: "AuthorizationHeaderError",
      message: `Authorization token must start with ${prefix}`,
    });
  }
});


apiRouter.use("/users", usersRouter);
apiRouter.use("/posts", postsRouter);
apiRouter.use("/tags", tagsRouter);

apiRouter.use((error, req, res, next) => {
  res.send({
    name: error.name,
    message: error.message,
  });
});

module.exports = apiRouter;
