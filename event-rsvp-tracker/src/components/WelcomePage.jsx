import { useState } from "react";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";

const WelcomePage = () => {
  const [showLogin, setShowLogin] = useState(true); // Toggle between login and register forms

  return (
    <div className="min-h-screen flex">
      {/* Left Section */}
      <div className="flex-1 bg-gradient-to-b from-purple-300 to-blue-200 flex items-center justify-center">
        <div className="text-center p-10">
          <h1 className="text-7xl font-bold font-fancy text-gray-800 mb-4">Welcome to Eventify</h1>
          <p className="text-lg text-gray-600">
            Create and manage your events seamlessly. Share them with your audience and track their responses effortlessly.
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1  bg-white flex items-center justify-center ">
        <div className="w-full ">
          {showLogin ? (
            <>
              <LoginPage />
            </>
          ) : (
            <>
              <RegisterPage />
              <div className="mt-4 text-center">
                <span className="text-gray-600">Already have an account? </span>
                <button
                  onClick={() => setShowLogin(true)}
                  className="text-green-500 hover:underline"
                >
                  Login
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
