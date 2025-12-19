import React, { useState } from 'react';

interface SignUpProps {
  onSuccess: () => void;
  onToggle: () => void;
  onBack: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ onSuccess, onToggle, onBack }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-emerald-50 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-1 mb-6 cursor-pointer" onClick={onBack}>
            <span className="text-2xl font-bold text-gray-900">Jio</span>
            <span className="text-2xl font-bold text-emerald-500">Resume</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Create your account</h1>
          <p className="text-gray-500 mt-2">Start building your career today</p>
        </div>

        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onSuccess(); }}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input 
              type="text" 
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
              placeholder="Lethukuthula Mthiyane"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              type="email" 
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
              placeholder="name@company.com"
            />
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type={showPassword ? "text" : "password"}
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
              placeholder="••••••••"
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-[38px] text-gray-400 hover:text-gray-600"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <input 
              type="password"
              required
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition"
              placeholder="••••••••"
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-emerald-500 text-white font-bold py-3 rounded-lg hover:bg-emerald-600 transition shadow-lg shadow-emerald-500/20"
          >
            Sign Up
          </button>
        </form>

        <div className="my-6 flex items-center">
          <div className="flex-1 border-t border-gray-200"></div>
          <span className="px-4 text-sm text-gray-400">or continue with</span>
          <div className="flex-1 border-t border-gray-200"></div>
        </div>

        <button className="w-full flex items-center justify-center space-x-2 border border-gray-200 py-3 rounded-lg hover:bg-gray-50 transition">
          <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
          <span className="font-medium text-gray-700">Sign up with Google</span>
        </button>

        <p className="text-center text-gray-500 mt-8">
          Already have an account? 
          <button onClick={onToggle} className="ml-1 text-emerald-600 font-bold hover:text-emerald-700">Sign In</button>
        </p>
      </div>
    </div>
  );
};

export default SignUp;