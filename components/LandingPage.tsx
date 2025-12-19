
import React from 'react';

interface LandingPageProps {
  onStart: () => void;
  onDashboard: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart, onDashboard }) => {
  return (
    <div className="min-h-screen bg-white font-['Inter',_sans-serif]">
      {/* Section 1: Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          
          {/* Logo - Left */}
          <a href="/" className="flex items-center space-x-1">
            <span className="text-2xl font-bold text-gray-900">Jio</span>
            <span className="text-2xl font-bold text-emerald-500">Resume</span>
          </a>

          {/* Navigation Links - Center */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-600 hover:text-emerald-600 font-medium transition">Resume</a>
            <a href="#" className="text-gray-600 hover:text-emerald-600 font-medium transition">Cover Letter</a>
            <a href="#" className="text-gray-600 hover:text-emerald-600 font-medium transition">CV</a>
            <a href="#" className="text-gray-600 hover:text-emerald-600 font-medium transition">Career Blog</a>
          </div>

          {/* Buttons - Right */}
          <div className="flex items-center space-x-3">
            <button 
              onClick={onDashboard}
              className="px-5 py-2.5 text-gray-700 font-medium hover:text-emerald-600 transition"
            >
              My Account
            </button>
            <button 
              onClick={onStart}
              className="px-6 py-2.5 bg-emerald-500 text-white font-semibold rounded-full hover:bg-emerald-600 transition shadow-lg shadow-emerald-500/30"
            >
              Build My Resume
            </button>
          </div>
        </div>
      </nav>

      {/* Section 2: Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-emerald-50/50 to-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Side - Text Content */}
            <div className="space-y-6">
              {/* Small Badge */}
              <div className="inline-flex items-center px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                Online Resume Builder
              </div>

              {/* Main Heading */}
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Only 2% of resumes satisfy, we'll make sure 
                <span className="text-emerald-500"> yours is one</span>
              </h1>

              {/* Subheading */}
              <p className="text-lg text-gray-600 leading-relaxed">
                Use professional field-tested resume templates that follow the exact 'resume rules' employers look for. Easy to use and done within minutes - try now for free!
              </p>

              {/* CTA Button */}
              <div className="pt-4">
                <button 
                  onClick={onStart}
                  className="px-8 py-4 bg-emerald-500 text-white font-semibold text-lg rounded-full hover:bg-emerald-600 transition shadow-xl shadow-emerald-500/30 flex items-center"
                >
                  Create My Resume
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                  </svg>
                </button>
              </div>

              {/* Trust Stats */}
              <div className="flex items-center space-x-8 pt-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-gray-900">2M+</p>
                  <p className="text-sm text-gray-500">Resumes Created</p>
                </div>
                <div className="h-12 w-px bg-gray-200"></div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-gray-900">4.8</p>
                  <div className="flex items-center justify-center text-yellow-400">
                    <span>★★★★★</span>
                  </div>
                </div>
                <div className="h-12 w-px bg-gray-200"></div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-gray-900">50+</p>
                  <p className="text-sm text-gray-500">Templates</p>
                </div>
              </div>
            </div>

            {/* Right Side - Resume Preview Image */}
            <div className="relative">
              <div className="relative z-10">
                <div className="bg-white rounded-2xl shadow-2xl p-6 transform hover:scale-105 transition-transform duration-500">
                  <img 
                    src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=800&auto=format&fit=crop" 
                    alt="Resume Preview" 
                    className="w-full rounded-lg"
                  />
                </div>
              </div>
              <div className="absolute -z-10 top-10 -right-10 w-72 h-72 bg-emerald-200 rounded-full blur-3xl opacity-30"></div>
              <div className="absolute -z-10 -bottom-10 -left-10 w-72 h-72 bg-blue-200 rounded-full blur-3xl opacity-30"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Trusted By */}
      <section className="py-12 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-gray-500 text-sm font-medium mb-8 uppercase tracking-widest">Trusted by professionals from</p>
          <div className="flex flex-wrap items-center justify-center gap-12 opacity-50 grayscale">
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" className="h-6"/>
            <img src="https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" alt="Microsoft" className="h-6"/>
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" className="h-6"/>
            <img src="https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" alt="Meta" className="h-6"/>
            <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" className="h-6"/>
          </div>
        </div>
      </section>

      {/* Section 4: Features Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Features designed to help you win your dream job
            </h2>
            <p className="text-lg text-gray-600">
              We've got everything you need to create a professional resume that will help you land your next job.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl hover:border-emerald-200 transition-all duration-300 group">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald-500 transition-colors">
                <svg className="w-6 h-6 text-emerald-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Easy to Use</h3>
              <p className="text-gray-600">Our intuitive builder makes creating a resume quick and simple. No design skills needed.</p>
            </div>
            {/* Feature 2 */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl hover:border-emerald-200 transition-all duration-300 group">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-500 transition-colors">
                <svg className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">AI-Powered</h3>
              <p className="text-gray-600">Let AI write your bullet points and professional summary. Get instant suggestions.</p>
            </div>
            {/* Feature 3 */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl hover:border-emerald-200 transition-all duration-300 group">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-500 transition-colors">
                <svg className="w-6 h-6 text-purple-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">ATS-Friendly</h3>
              <p className="text-gray-600">All our templates are optimized for Applicant Tracking Systems to ensure your resume gets seen.</p>
            </div>
            {/* Feature 4 */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl hover:border-emerald-200 transition-all duration-300 group">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-orange-500 transition-colors">
                <svg className="w-6 h-6 text-orange-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Customizable</h3>
              <p className="text-gray-600">Personalize colors, fonts, and layouts to match your personal brand and style.</p>
            </div>
            {/* Feature 5 */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl hover:border-emerald-200 transition-all duration-300 group">
              <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-pink-500 transition-colors">
                <svg className="w-6 h-6 text-pink-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Multiple Formats</h3>
              <p className="text-gray-600">Download your resume as PDF, DOCX, or TXT. Share directly via link or email.</p>
            </div>
            {/* Feature 6 */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl hover:border-emerald-200 transition-all duration-300 group">
              <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-cyan-500 transition-colors">
                <svg className="w-6 h-6 text-cyan-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Privacy First</h3>
              <p className="text-gray-600">Your data stays private. We don't share your information with anyone. Ever.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Templates Showcase */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider">Templates</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-4 mb-4">
              Professional templates for every industry
            </h2>
            <p className="text-lg text-gray-600">
              Choose from our collection of professionally designed templates. Each one is ATS-friendly and fully customizable.
            </p>
          </div>

          <div className="flex items-center justify-center space-x-4 mb-12">
            <button className="px-6 py-2 bg-emerald-500 text-white font-medium rounded-full">All</button>
            <button className="px-6 py-2 bg-white text-gray-600 font-medium rounded-full border border-gray-200 hover:border-emerald-500 hover:text-emerald-600 transition">Simple</button>
            <button className="px-6 py-2 bg-white text-gray-600 font-medium rounded-full border border-gray-200 hover:border-emerald-500 hover:text-emerald-600 transition">Professional</button>
            <button className="px-6 py-2 bg-white text-gray-600 font-medium rounded-full border border-gray-200 hover:border-emerald-500 hover:text-emerald-600 transition">Modern</button>
            <button className="px-6 py-2 bg-white text-gray-600 font-medium rounded-full border border-gray-200 hover:border-emerald-500 hover:text-emerald-600 transition">Creative</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="group cursor-pointer">
                <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 relative">
                  <div className="aspect-[3/4] bg-gray-100 relative overflow-hidden">
                    <img 
                      src={`https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=400&auto=format&fit=crop&sig=${i}`} 
                      alt="Template Preview" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button className="px-6 py-3 bg-white text-gray-900 font-semibold rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform">
                        Use This Template
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-gray-900">Template {i}</h4>
                    <p className="text-sm text-gray-500">Clean & Contemporary</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="px-8 py-3 bg-white text-emerald-600 font-semibold rounded-full border-2 border-emerald-500 hover:bg-emerald-500 hover:text-white transition">
              View All Templates
            </button>
          </div>
        </div>
      </section>

      {/* Section 6: How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider">How It Works</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-4">
              Create your resume in 3 simple steps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-16 left-1/4 right-1/4 h-0.5 bg-emerald-200"></div>

            <div className="text-center relative">
              <div className="w-16 h-16 bg-emerald-500 text-white text-2xl font-bold rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">1</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Pick a Template</h3>
              <p className="text-gray-600">Choose from our collection of professional, ATS-friendly resume templates.</p>
            </div>

            <div className="text-center relative">
              <div className="w-16 h-16 bg-emerald-500 text-white text-2xl font-bold rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">2</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Add Your Content</h3>
              <p className="text-gray-600">Fill in your details with help from our AI writing assistant for perfect wording.</p>
            </div>

            <div className="text-center relative">
              <div className="w-16 h-16 bg-emerald-500 text-white text-2xl font-bold rounded-full flex items-center justify-center mx-auto mb-6 relative z-10">3</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Download & Apply</h3>
              <p className="text-gray-600">Download your polished resume and start applying to your dream jobs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Testimonials */}
      <section className="py-20 bg-emerald-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider">Testimonials</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-4">
              Loved by thousands of job seekers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-center text-yellow-400 mb-4 text-xs">★★★★★</div>
                <p className="text-gray-600 mb-6 italic">
                  "This resume builder helped me land my dream job. The AI suggestions were incredibly helpful and the templates are beautiful!"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-emerald-600 font-bold">U{i}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">User Name {i}</p>
                    <p className="text-sm text-gray-500">Professional Title</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 8: CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-500 to-teal-500">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to build your winning resume?</h2>
          <p className="text-xl text-emerald-100 mb-8">Join over 2 million professionals who have created their resumes with us.</p>
          <button 
            onClick={onStart}
            className="px-10 py-4 bg-white text-emerald-600 font-bold text-lg rounded-full hover:shadow-2xl transition shadow-xl"
          >
            Create My Resume Now — It's Free
          </button>
          <p className="text-emerald-100 mt-4 text-sm">No credit card required</p>
        </div>
      </section>

      {/* Section 9: Footer */}
      <footer className="bg-gray-900 text-gray-400 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-1 mb-4">
                <span className="text-2xl font-bold text-white">Jio</span>
                <span className="text-2xl font-bold text-emerald-500">Resume</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-sm">
                Create professional, ATS-optimized resumes in minutes. Land your dream job faster with our AI-powered resume builder.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-emerald-400 transition">Resume Builder</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition">Cover Letter</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition">CV Builder</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Resources</h4>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-emerald-400 transition">Resume Examples</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition">Career Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-emerald-400 transition">About Us</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-xs">
            <p>© 2024 JioResume. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
