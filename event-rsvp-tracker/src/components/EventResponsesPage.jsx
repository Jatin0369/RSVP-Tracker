import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const EventResponsePage = () => {
  const { eventId } = useParams(); // Get the event ID from URL params
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const token = localStorage.getItem("token"); // Fetch the token
        if (!token) {
          throw new Error("Token not found. Please log in.");
        }

        // Use the Vite environment variable for the API URL
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/events/${eventId}/responses`,
          {
            headers: {
              "x-auth-token": token, // Include the token in headers
            },
          }
        );
        console.log(response.data); // Log the response to ensure structure is correct
        setResponses(response.data); // Set responses
        setLoading(false);
      } catch (err) {
        console.error("Error fetching responses:", err);
        setLoading(false);
      }
    };

    fetchResponses();
  }, [eventId]);

  if (loading) {
    return <p className="text-center text-lg font-medium text-gray-700">Loading responses...</p>;
  }

  if (!responses.length) {
    return <p className="text-center text-lg font-medium text-red-500">No responses found.</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-200 to-cyan-50 flex flex-col">
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md mt-8 flex-grow">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Event Responses</h1>
        
        <table className="min-w-full bg-white border border-gray-300 rounded-md shadow-md">
          <thead>
            <tr>
              <th className="py-2 px-4 text-left border-b">Guest Name</th>
              <th className="py-2 px-4 text-left border-b">Guest Email</th>
              <th className="py-2 px-4 text-left border-b">Answers</th>
            </tr>
          </thead>
          <tbody>
            {responses.map((response, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b">{response.guestName}</td>
                <td className="py-2 px-4 border-b">{response.guestEmail}</td>
                <td className="py-2 px-4 border-b">
                  {/* Check if answers exist */}
                  {response.answers && response.answers.length > 0 ? (
                    response.answers.map((answer, idx) => (
                      <div key={idx}>
                        <strong>{answer.question}: </strong>{answer._doc.answer}
                      </div>
                    ))
                  ) : (
                    <span>No answers provided</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventResponsePage;
