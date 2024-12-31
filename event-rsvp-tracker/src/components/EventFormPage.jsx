import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const EventFormPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [responses, setResponses] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch event details using the environment variable for the API base URL
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/events/${eventId}`);
        console.log("Fetched event data:", response.data); // Inspect the API response
        setEvent(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching event details:", err);
        setLoading(false);
      }
    };
    fetchEvent();
  }, [eventId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email) {
      alert("Name and Email are required.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }
  
    console.log("Responses State:", responses);
    console.log("Event Questions:", event.questions);
  
    // Map responses to questionId and answer
    const formattedResponses = Object.entries(responses).map(([question, answer]) => {
      const questionObj = event.questions.find((q) => q.question === question);
      if (!questionObj) {
        console.error(`No matching question found for: ${question}`);
        return null;
      }
      return {
        questionId: questionObj._id, // Ensure this maps correctly
        answer,
      };
    }).filter(Boolean); // Remove null entries
  
    console.log("Formatted Responses:", formattedResponses);
  
    if (formattedResponses.length === 0) {
      alert("No answers to submit. Please complete the form.");
      return;
    }
  
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/events/${eventId}/response`, {
        guestName: name,
        guestEmail: email,
        answers: formattedResponses,
      });
      alert("Response submitted successfully!");
    } catch (err) {
      console.error("Error submitting response:", err);
      alert("Failed to submit response. Please try again.");
    }
  };

  if (loading) {
    return <p className="text-center text-lg font-medium text-gray-700">Loading...</p>;
  }

  if (!event) {
    return <p className="text-center text-lg font-medium text-red-500">Event not found.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md mt-8">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">{event.eventName}</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <div className="flex flex-col">
          <label htmlFor="name" className="text-gray-700 font-medium mb-2">
            Name:
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
            required
          />
        </div>

        {/* Email Field */}
        <div className="flex flex-col">
          <label htmlFor="email" className="text-gray-700 font-medium mb-2">
            Email:
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Dynamic Questions */}
        {event.questions.map((q, index) => (
          <div key={index} className="flex flex-col space-y-2">
            <label className="text-gray-700 font-medium">{q.question}</label>
            {q.responseType === "text" && (
              <input
                type="text"
                onChange={(e) =>
                  setResponses((prev) => ({
                    ...prev,
                    [q.question]: e.target.value,
                  }))
                }
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type your answer"
              />
            )}
            {q.responseType === "select" && Array.isArray(q.options) && q.options.length > 0 && (
              <select
                onChange={(e) =>
                  setResponses((prev) => ({
                    ...prev,
                    [q.question]: e.target.value,
                  }))
                }
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select an option</option>
                {q.options.map((option, idx) => (
                  <option key={idx} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}
          </div>
        ))}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default EventFormPage;
