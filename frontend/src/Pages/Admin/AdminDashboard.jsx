import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    eventName: "",
    eventDescription: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    axios
      .get("http://localhost:8080/events/current")
      .then((res) => setEvents(res.data))
      .catch((err) => console.error("Error fetching events:", err));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/events", {
        name: formData.eventName,
        description: formData.eventDescription,
        start_date: formData.startDate,
        end_date: formData.endDate,
        start_time: formData.startTime,
        end_time: formData.endTime,
      })
      .then((response) => {
        console.log("Event created:", response.data);
        setFormData({
          eventName: "",
          eventDescription: "",
          startDate: "",
          endDate: "",
          startTime: "",
          endTime: "",
        });
        setShowCreateForm(false);
        fetchEvents();
      })
      .catch((error) => {
        console.error("Error creating event:", error);
        alert("Failed to create event. Please try again.");
      });
  };

  return (
    <div className="min-h-screen items-start pt-10  p-8 font-sans">
      <div className="max-w-7xl mx-auto bg-white/95 backdrop-blur-sm rounded-3xl p-10 shadow-2xl">
        {/* Dashboard Title */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-2 bg-customPink bg-clip-text text-transparent">
            Event Dashboard
          </h1>
          <div className="w-24 h-1 bg-customPink mx-auto rounded-full"></div>
        </div>

        {/* Create Event Button */}
        <button
          className="relative overflow-hidden px-6 py-5 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/60 mb-8 group"
          onClick={() => setShowCreateForm(!showCreateForm)}
        >
          <span className="relative z-10">
            {showCreateForm ? "Cancel" : "Create Event"}
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
        </button>

        {/* Create Event Form */}
        {showCreateForm && (
          <div className="bg-white rounded-2xl p-8 mb-8 shadow-xl border border-white/20 animate-in slide-in-from-top-4 duration-300">
            <h3 className="text-2xl font-semibold text-gray-800 text-center mb-6">
              Create New Event
            </h3>
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Event Name
                </label>
                <input
                  type="text"
                  name="eventName"
                  value={formData.eventName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-base transition-all duration-300 focus:outline-none focus:border-blue-500 focus:bg-white focus:shadow-lg focus:shadow-blue-500/10 focus:-translate-y-0.5"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Event Description
                </label>
                <textarea
                  name="eventDescription"
                  value={formData.eventDescription}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-base transition-all duration-300 focus:outline-none focus:border-blue-500 focus:bg-white focus:shadow-lg focus:shadow-blue-500/10 focus:-translate-y-0.5 resize-y min-h-[80px]"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-base transition-all duration-300 focus:outline-none focus:border-blue-500 focus:bg-white focus:shadow-lg focus:shadow-blue-500/10 focus:-translate-y-0.5"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Start Time
                  </label>
                  <input
                    type="time"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-base transition-all duration-300 focus:outline-none focus:border-blue-500 focus:bg-white focus:shadow-lg focus:shadow-blue-500/10 focus:-translate-y-0.5"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-base transition-all duration-300 focus:outline-none focus:border-blue-500 focus:bg-white focus:shadow-lg focus:shadow-blue-500/10 focus:-translate-y-0.5"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    End Time
                  </label>
                  <input
                    type="time"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-base transition-all duration-300 focus:outline-none focus:border-blue-500 focus:bg-white focus:shadow-lg focus:shadow-blue-500/10 focus:-translate-y-0.5"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4 justify-center mt-8">
                <button
                  type="submit"
                  className="relative overflow-hidden px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl shadow-lg shadow-green-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-green-500/60 group"
                >
                  <span className="relative z-10">Create Event</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
                </button>

                <button
                  type="button"
                  className="relative overflow-hidden px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white font-semibold rounded-xl shadow-lg shadow-gray-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-500/60 group"
                  onClick={() => setShowCreateForm(false)}
                >
                  <span className="relative z-10">Cancel</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Current Events Section */}
        <div>
          <h1 className="text-3xl font-semibold  mb-6 relative text-customPink">
            Current Events
          </h1>

          {events.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <div className="text-5xl mb-4 opacity-50">📅</div>
              <div className="text-lg mb-2">No events found</div>
              <div className="text-sm opacity-70">
                Create your first event to get started
              </div>
            </div>
          ) : (
            <div className="grid gap-6 mt-8">
              {Array.isArray(events) && events.length > 0 ? (
                events.map((event) => (
                  <div
                    key={event.event_id}
                    className="relative bg-white rounded-2xl p-6 shadow-lg border border-white/20 cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 group overflow-hidden animate-in fade-in-0 slide-in-from-bottom-4 duration-500"
                    onClick={() => navigate(`/admin/event/${event.event_id}`)}
                  >
                    {/* Top accent line */}
<div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-customPink via-pink-500 to-customPink z-10"></div>



                    <h2 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-indigo-700 transition-colors">
                      {event.name}
                    </h2>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {event.description}
                    </p>

                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 pt-4 border-t border-gray-200">
                      <span className="text-sm text-gray-500 font-medium">
                        {new Date(event.start_date).toLocaleDateString()} -{" "}
                        {new Date(event.end_date).toLocaleDateString()}
                      </span>
                      <Link
                        to={`/admin/event/${event.event_id}`}
                        className="inline-flex items-center text-blue-600 text-sm font-semibold px-4 py-2 rounded-lg bg-blue-100/50 hover:bg-blue-200/50 hover:text-blue-700 transition-all duration-300 hover:translate-x-1 self-start"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Manage Event →
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-8">No events found.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;