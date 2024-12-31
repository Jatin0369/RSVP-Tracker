import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Importing useNavigate for redirection
import LogoutButton from './LogoutButton'; // Import the LogoutButton component

const CreateEventPage = () => {
  const [eventName, setEventName] = useState("");
  const [questions, setQuestions] = useState([{ question: "", type: "text", choices: [] }]);
  const navigate = useNavigate(); // Initialize the navigate hook for redirection

  // Handle changes in the question input fields
  const handleQuestionChange = (index, key, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][key] = value;
    setQuestions(updatedQuestions);
  };

  // Add a new question to the form
  const handleAddQuestion = () => {
    setQuestions([...questions, { question: "", type: "text", choices: [] }]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    // Transform questions to match backend schema
    const formattedQuestions = questions.map((q) => ({
      question: q.question,
      responseType: q.type,
      options: q.type === "select" ? q.choices : undefined,
    }));

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/events`, // Use the environment variable for backend URL
        { eventName, questions: formattedQuestions },
        { headers: { "x-auth-token": token } }
      );
      alert("Event created successfully!");
    
    } catch (error) {
      console.error("Error submitting event:", error.response?.data || error.message);
      alert("Failed to create event. Please check the input data.");
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Use the extracted LogoutButton component */}
      <LogoutButton />

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-rose-gold to-amber-50 p-6">
        <div className="bg-white p-10 rounded-lg shadow-lg w-full sm:w-3/4 lg:w-2/3">
          <h1 className="text-6xl font-regular font-fancy text-rose-gold text-center mb-8">
            Create Your Event
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                placeholder="Event Name"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                required
                className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
            <div className="space-y-4">
              {questions.map((q, index) => (
                <div
                  key={index}
                  className="p-4 border border-gray-300 rounded-md bg-gray-50 space-y-2"
                >
                  <input
                    type="text"
                    placeholder={`Question ${index + 1}`}
                    value={q.question}
                    onChange={(e) => handleQuestionChange(index, "question", e.target.value)}
                    required
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <select
                    value={q.type}
                    onChange={(e) => handleQuestionChange(index, "type", e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="text">Text Response</option>
                    <option value="select">Select Box</option>
                  </select>
                  {q.type === "select" && (
                    <input
                      type="text"
                      placeholder="Choices (comma separated)"
                      value={q.choices.join(",")}
                      onChange={(e) =>
                        handleQuestionChange(index, "choices", e.target.value.split(","))
                      }
                      className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={handleAddQuestion}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Add Question
              </button>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEventPage;
