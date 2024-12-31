const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const auth = require('../middleware/auth');

// Create an Event
router.post('/', auth, async (req, res) => {
  try {
    const { eventName, questions } = req.body;
    const newEvent = new Event({
      eventName,
      questions,
      createdBy: req.user, // Associate the event with the logged-in user
    });
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Add a Question
router.post('/:eventId/questions', async (req, res) => {
  try {
    const { question, responseType, options } = req.body;
    const event = await Event.findById(req.params.eventId);
    if (!event) return res.status(404).json({ error: 'Event not found' });

    event.questions.push({ question, responseType, options });
    await event.save();
    res.status(200).json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


router.get("/", auth, async (req, res) => {
  try {
    const events = await Event.find({ createdBy: req.user });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

// Route to get the event by its ID (for submitting responses or viewing)
router.get("/:eventId", async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) return res.status(404).json({ msg: "Event not found" });
    res.json(event);  // Anyone can view the event details
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch event" });
  }
});

// Route to submit responses to an event (anyone with the link can submit)
router.post("/:eventId/response", async (req, res) => {
  const { guestName, guestEmail, answers } = req.body; // Use 'answers' instead of 'responses'
  console.log("Request body:", req.body);

  if (!guestName || !guestEmail || !Array.isArray(answers) || answers.length === 0) {
    console.error("Validation error: Missing required fields");
    return res.status(400).json({ error: "Invalid request. All fields are required." });
  }

  try {
    // Find the event by ID
    const event = await Event.findById(req.params.eventId);
    if (!event) {
      console.error("Event not found for ID:", req.params.eventId);
      return res.status(404).json({ msg: "Event not found" });
    }

    console.log("Event found:", event);

    // Process each answer and fetch the corresponding question
    const updatedAnswers = [];
    for (const answer of answers) {
      if (!answer.questionId || !answer.answer) {
        console.error("Invalid answer format:", answer);
        return res.status(400).json({ error: "Each answer must include questionId and answer." });
      }

      // Find the question by questionId
      const question = event.questions.find(q => q._id.toString() === answer.questionId.toString());
      console.log("Question found:", question);
      if (!question) {
        console.error("Invalid questionId:", answer.questionId);
        return res.status(400).json({ error: `Invalid questionId: ${answer.questionId}` });
      }

      // Add the question name to the answer
      updatedAnswers.push({
        questionId: answer.questionId,
        question: question.question,  // Store question text directly
        answer: answer.answer
      });
    }

    // Save the response with the answers including the question text
    console.log(updatedAnswers)
    event.responses.push({
      guestName,
      guestEmail,
      answers: updatedAnswers
    });

    // Save the updated event document
    await event.save();
    console.log("Response saved successfully");
    res.status(201).json({ msg: "Response submitted successfully" });
  } catch (err) {
    console.error("Error in submission process:", err);
    res.status(500).json({ error: "Failed to submit response" });
  }
});



// Route to get all responses for an event (only for the creator)
router.get("/:eventId/responses", async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId).populate('questions'); // Populate questions array
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    // Map over the responses to include the question text
    const responses = event.responses.map(response => {
      const answersWithQuestions = response.answers.map(answer => {
        const question = event.questions.find(q => q._id.toString() === answer.questionId.toString());
        return {
          ...answer,
          question: question ? question.question : 'Unknown Question' // Add question text
        };
      });
    
      return {
        guestName: response.guestName,
        guestEmail: response.guestEmail,
        answers: answersWithQuestions
      };
    });
    

    res.json(responses);  // Send back the responses with the questions included
  } catch (err) {
    console.error("Error fetching responses:", err);
    res.status(500).json({ error: "Error fetching responses" });
  }
});



module.exports = router;