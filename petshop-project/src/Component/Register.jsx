import React from 'react';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { data, useNavigate } from 'react-router-dom';
import { useForm} from "react-hook-form";

const Register = () => {
  const {register ,handleSubmit}=useForm();
  const navigate = useNavigate();
  const onSubmit = (data) =>{
    debugger
    localStorage.setItem("user",JSON.stringify(data));
    alert("Registered successfully!");
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-1">Create Account</h2>
        <p className="text-center text-gray-500 mb-6">Join the Pet Shop community today</p>

        <form className="space-y-4">
          {/* Name */}
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Full Name"
              className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400 text-[#8B4513]"
              required
            />
          </div>

          {/* Email */}
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400 text-[#8B4513]"
              required
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400 text-[#8B4513]"
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400 text-[#8B4513]"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transition"
          >
            Register
          </button>
          <button onClick={handleSubmit((onSubmit) => {
                navigate('/Homepage');
              })} style={{ margin: '10px' }}>click me</button>

        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{' '}
          <a href="/login" className="text-orange-500 font-medium hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
