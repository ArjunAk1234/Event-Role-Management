import React, { useState } from 'react';

function AddTeacher() {
  const [teacher, setTeacher] = useState({
    name: '',
    email: '',
    department: '',
  });

  const [responseMessage, setResponseMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setTeacher({ ...teacher, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('http://localhost:8080/teachers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(teacher)
      });

      if (res.ok) {
        setResponseMessage('Teacher created successfully!');
        setErrorMessage('');
        setTeacher({
          name: '',
          email: '',
          department: '',
        });
      } else {
        const errorData = await res.json();
        setErrorMessage(`Error: ${errorData.error || 'Something went wrong.'}`);
        setResponseMessage('');
      }
    } catch (error) {
      setErrorMessage(`Error: ${error.message}`);
      setResponseMessage('');
    } finally {
      setIsSubmitting(false);
    }
  };

    return (
    <div className="min-h-screen items-start pt-10 p-8 font-sans">
      <div className="max-w-2xl mx-auto bg-white/95 backdrop-blur-sm rounded-3xl p-10 shadow-2xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-2 bg-gradient-to-r from-pink-600 to-pink-800 bg-clip-text text-transparent">
            Add Teacher
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-600 to-pink-800 mx-auto rounded-full"></div>
        </div>

        {/* Success message */}
        {responseMessage && (
          <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <polyline points="20,6 9,17 4,12"></polyline>
                </svg>
              </div>
              <span className="text-green-800 font-semibold">{responseMessage}</span>
            </div>
          </div>
        )}

        {/* Error message */}
        {errorMessage && (
          <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-red-100 border border-red-200 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="15" y1="9" x2="9" y2="15"></line>
                  <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
              </div>
              <span className="text-red-800 font-semibold">{errorMessage}</span>
            </div>
          </div>
        )}

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-lg font-semibold text-gray-700 flex items-center gap-2">
              <span className="text-lg">👨‍🏫</span>
              Teacher Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter teacher's full name"
              value={teacher.name}
              onChange={handleChange}
              className="w-full p-4 border-2 border-gray-200 rounded-2xl bg-white/80 backdrop-blur-sm transition-all duration-300 focus:border-pink-500 focus:outline-none focus:ring-4 focus:ring-pink-100 hover:border-pink-300 text-lg"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-lg font-semibold text-gray-700 flex items-center gap-2">
              <span className="text-lg">📧</span>
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter email address"
              value={teacher.email}
              onChange={handleChange}
              className="w-full p-4 border-2 border-gray-200 rounded-2xl bg-white/80 backdrop-blur-sm transition-all duration-300 focus:border-pink-500 focus:outline-none focus:ring-4 focus:ring-pink-100 hover:border-pink-300 text-lg"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-lg font-semibold text-gray-700 flex items-center gap-2">
              <span className="text-lg">🏢</span>
              Department
            </label>
            <select
              name="department"
              value={teacher.department}
              onChange={handleChange}
              className="w-full p-4 border-2 border-gray-200 rounded-2xl bg-white/80 backdrop-blur-sm transition-all duration-300 focus:border-pink-500 focus:outline-none focus:ring-4 focus:ring-pink-100 hover:border-pink-300 text-lg appearance-none cursor-pointer"
              required
            >
              <option value="">Select Department</option>
              <option value="Computing">Computing</option>
              <option value="Engineering">Engineering</option>
              <option value="Maths">Maths</option>
              <option value="Physics">Physics</option>
              <option value="Biotech">Biotech</option>
            </select>
          </div>

          <button 
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-pink-600 to-pink-800 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 hover:from-pink-700 hover:to-pink-900 hover:-translate-y-1 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-lg flex items-center justify-center gap-3"
          >
            {isSubmitting ? (
              <>
                <div className="w-6 h-6 border-2 border-white/30 border-l-white rounded-full animate-spin"></div>
                Creating Teacher...
              </>
            ) : (
              <>
                <span className="text-xl">➕</span>
                Create Teacher
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddTeacher;