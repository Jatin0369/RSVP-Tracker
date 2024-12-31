const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  responseType: { type: String, enum: ['text', 'select'], required: true },
  options: { type: [String], required: function() { return this.responseType === 'select'; } }
});

const ResponseSchema = new mongoose.Schema({
  guestName: { type: String, required: true },
  guestEmail: { 
    type: String, 
    required: true, 
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ 
  },
  answers: [{ questionId: mongoose.Schema.Types.ObjectId, answer: String }]
});

const EventSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  questions: [QuestionSchema],
  responses: [ResponseSchema],
});

module.exports = mongoose.model('Event', EventSchema);
