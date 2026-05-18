const dotenv = require("dotenv").config();
const JWT = require("jsonwebtoken");
const JWT_SEC = process.env.JWT_SEC;

//not found error handler
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`); //originalUrl returns string displaying URL request params
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statuscode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statuscode);

  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? "null" : err.stack,
  });
  if (err) {
    console.log(err);
  }
};

const verifyToken = (req, res, next) => {
  //user token from login request
  const authHeader = req.headers.authorization;
  console.log("auth header: ", req.headers);
  //check token exists
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    console.log("authorization passed");
    JWT.verify(token, JWT_SEC, (err, user) => {
      if (err) return res.status(403).json("Token is not valid");
      req.user = user; //weve creeated a user method to be sent off alongside the req objecxt containig info on the user object from JWT
      console.log(req.user)
      next();
    });
  } else {
    console.log(req.headers)
    res.status(401).json("User not Authenticated.");
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("Unauthorized access.");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      console.log("isAdmin")
      next();
    } else {
      res.status(403).json("Unauthorized access.");
    }
  });
};

module.exports = {
  notFound,
  errorHandler,
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
};
