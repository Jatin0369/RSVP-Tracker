import React from 'react';
import { Link } from 'react-router-dom';
import LogoutButton from './LogoutButton';

const HomePage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-fuchsia-50 border-[1px] border-rose-gold flex-col rounded-xl">
      <LogoutButton />
        <h1 className="text-8xl font-fancy text-rose-400 mb-8">RSVP made Easier</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 p-8">
     
            <div className="bg-gradient-to-r from-amber-50 to-amber-200 text-white rounded-lg p-6 shadow-lg hover:shadow-xl transition">
              <h2 className="text-6xl font-fancy text-rose-gold mb-4">Create a New Event</h2>
              <p className="text-lg font-light font-sans mb-6 text-black">Easily set up and manage your events with customizable options.</p>
              <Link to="/create-event">
              <button className="px-6 py-2 bg-rose-gold text-white rounded-full text-lg font-regular font-fancy hover:bg-amber-400 transition">
                Create Event
              </button>
              </Link>
            </div>

            {/* Option to View Existing Events */}
        <div className="bg-gradient-to-r from-rose-200 to-white text-white rounded-lg p-6 shadow-lg hover:shadow-xl transition">
          <h2 className="text-6xl font-fancy text-yellow-800 mb-4">View Existing Events</h2>
          <p className="text-lg font-light mb-6 text-black">Browse through events that have been created and managed.</p>
          <Link to='/view-event'>
          <button className="px-6 py-2 bg-yellow-800 font-fancy text-white rounded-full text-lg font-regular hover:bg-rose-gold transition">
            View Events
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
