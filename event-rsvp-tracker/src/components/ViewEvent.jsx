import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ViewEventsPage = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch events created by the logged-in user
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchEvents = async () => {
      try {
        // Use the VITE_BACKEND_URL environment variable for the API base URL
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/events`, {
          headers: { "x-auth-token": token },
        });
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error.response?.data || error.message);
      }
    };

    fetchEvents();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-rose-200 to-yellow-100 p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-semibold text-center text-gray-800 mb-10">
          My Events
        </h1>
        <div className="space-y-8">
          {events.map((event) => (
            <div key={event._id} className="bg-white p-6 rounded-lg shadow-lg flex flex-col space-y-4">
              <h2 className="text-2xl font-semibold text-gray-700">{event.eventName}</h2>
              <button
                onClick={() =>  navigate(`/event/${event._id}/responses`)}
                className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                View Responses
              </button>
              <div className="bg-gray-50 p-4 rounded-md border border-gray-300">
                <h3 className="text-xl font-medium text-gray-700 mb-2">Shareable Link</h3>
                <p className="text-gray-600">
                  {console.log(import.meta.env.VITE_FRONTEND_URL)}
                  <a
                    href={`${import.meta.env.VITE_FRONTEND_URL}/event/${event._id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {`${import.meta.env.VITE_FRONTEND_URL}/event/${event._id}`}
                  </a>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewEventsPage;
