import React, { useState } from 'react';

interface SignInProps {
  onSuccess: () => void;
  onToggle: () => void;
  onBack: () => void;
}

const SignIn: React.FC<SignInProps> = ({ onSuccess, onToggle, onBack }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-emerald-50 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-1 mb-6 cursor-pointer" onClick={onBack}>
            <span className="text-2xl font-bold text-gray-900">Jio</span>
            <span className="text-2xl font-bold text-emerald-500">Resume</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
          <p className="text-gray-500 mt-2">Please enter your details to sign in</p>
        </div>

        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onSuccess(); }}>
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
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <a href="#" className="text-sm text-emerald-600 font-medium hover:text-emerald-700">Forgot password?</a>
            </div>
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
          <button 
            type="submit"
            className="w-full bg-emerald-500 text-white font-bold py-3 rounded-lg hover:bg-emerald-600 transition shadow-lg shadow-emerald-500/20"
          >
            Sign In
          </button>
        </form>

        <div className="my-6 flex items-center">
          <div className="flex-1 border-t border-gray-200"></div>
          <span className="px-4 text-sm text-gray-400">or continue with</span>
          <div className="flex-1 border-t border-gray-200"></div>
        </div>

        <button className="w-full flex items-center justify-center space-x-2 border border-gray-200 py-3 rounded-lg hover:bg-gray-50 transition">
          <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
          <span className="font-medium text-gray-700">Sign in with Google</span>
        </button>

        <p className="text-center text-gray-500 mt-8">
          Don't have an account? 
          <button onClick={onToggle} className="ml-1 text-emerald-600 font-bold hover:text-emerald-700">Sign Up</button>
        </p>
      </div>
    </div>
  );
};

export default SignIn;