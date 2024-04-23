const jwt = require("jsonwebtoken");
const db = require("../controllers/db");

module.exports = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      throw new Error("Unauthorized");
    }
    if (!authorization.startsWith("Bearer ")) {
      throw new Error("Unauthorized");
    }
    const token = authorization.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(payload)

    const account = await db.account.findFirstOrThrow({
      where: { id: payload.id },
    });
    delete account.password;

    // console.log(account)
    req.account = account;
    next();
  } catch (err) {
    next(err);
  }
};
