// db connection
const dbconnection = require("../db/dbConfig");
const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");

const jwt = require("jsonwebtoken");

async function register(req, res) {
  const { username, firstname, lastname, email, password } = req.body;
  if (!username || !firstname || !lastname || !email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "please provide all required information!" });
  }
  try {
    const [user] = await dbconnection.query(
      "SELECT username,userid from users WHERE username = ? or email =? ",
      [username, email]
    );
    if (user.length > 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "username or email already exists!" });
    }
    if (password.length < 6) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "password must be at least 6 characters long!" });
    }

    //encrypting the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //inserting the user into the database
    await dbconnection.query(
      "INSERT INTO users (username, firstname, lastname, email, password) VALUES (?, ?, ?, ?, ?)",
      [username, firstname, lastname, email, hashedPassword]
    );
    return res
      .status(StatusCodes.CREATED)
      .json({ msg: "user registered successfully!" });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "something went wrong ,try again later!" });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "please provide all required information!" });
  }
  try {
    const [user] = await dbconnection.query(
      "SELECT username,userid,password FROM users WHERE email = ?",
      [email]
    );

    if (user.length === 0) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "invalid credentials!" });
    }
    // Check if the password matches
    const isPasswordValid = await bcrypt.compare(password, user[0].password);
    if (!isPasswordValid) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ msg: "invalid credentials!" });
    }
    // Here you would typically generate a token and send it back to the client
    const token = jwt.sign(
      { userid: user[0].userid, username: user[0].username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res
      .status(StatusCodes.OK)
      .json({
        msg: "user login successful!",
        token,
        username: user[0].username,
      });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "something went wrong ,try again later!" });
  }
}

async function checkUser(req, res) {
  const username = req.user.username;
  const userid = req.user.userid;

  res.status(StatusCodes.OK).json({
    msg: "valid user",
    username,
    userid,
  });
}

module.exports = { register, login, checkUser };
