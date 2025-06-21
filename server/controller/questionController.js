const dbconnection = require("../db/dbConfig");
const { StatusCodes } = require("http-status-codes");

async function question(req, res) {
  const { title, description, tag } = req.body; // <-- Add tag here
  const userid = req.user.userid; // comes from authMiddleware

  if (!title || !description) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please provide all required information!" });
  }

  try {
    // Generate a unique questionid (for example, using current timestamp and userid)
    const questionid = `q_${userid}_${Date.now()}`;

    await dbconnection.query(
      "INSERT INTO questions (questionid, userid, title, description, tag) VALUES (?, ?, ?, ?, ?)",
      [questionid, userid, title, description, tag || null]
    );

    return res.status(StatusCodes.CREATED).json({
      msg: "Question created successfully!",
      question: { questionid, userid, title, description, tag },
    });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, try again later!" });
  }
}

async function getAllQuestions(req, res) {
  try {
    const [questions] = await dbconnection.query(
      `SELECT q.*, u.username 
       FROM questions q 
       JOIN users u ON q.userid = u.userid`
    );
    return res.status(StatusCodes.OK).json({ questions });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, try again later!" });
  }
}

async function getSingleQuestion(req, res) {
  const { questionId } = req.params; // <-- get from params
  if (!questionId) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Question ID is required!" });
  }

  try {
    const [questions] = await dbconnection.query(
      "SELECT * FROM questions WHERE questionid = ?",
      [questionId]
    );
    if (questions.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ msg: "Question not found!" });
    }
    return res.status(StatusCodes.OK).json({ question: questions[0] });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Something went wrong, try again later!" });
  }
}

module.exports = { question, getAllQuestions, getSingleQuestion };
