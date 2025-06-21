const express = require("express");
const router = express.Router();
// Importing question controller functions
const {
  question,
  getAllQuestions,
  getSingleQuestion,
} = require("../controller/questionController");

// Use the real controller for getting all questions
router.get("/all-questions", getAllQuestions);

// get a specific question by ID
router.get("/:questionId", getSingleQuestion);

// Use the real controller for creating a question
router.post("/question", question);

module.exports = router;
