import React, { useEffect, useState } from "react";
import axios from "axios";

const EventHistory = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedEvent, setExpandedEvent] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/events/past")
      .then((res) => {
        setEvents(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch event history:", err);
        setLoading(false);
      });
  }, []);

  const toggleEventDetails = (eventId) => {
    setExpandedEvent(expandedEvent === eventId ? null : eventId);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-96 gap-4">
        <div className="w-12 h-12 border-4 border-purple-200 border-l-purple-500 rounded-full animate-spin"></div>
        <p className="text-xl text-gray-600 font-medium">Loading event history...</p>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-96 gap-4">
        <div className="text-6xl opacity-50">📅</div>
        <p className="text-xl text-gray-500 font-medium">No past events found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen items-start pt-10  p-8 font-sans">
    <div className="max-w-7xl mx-auto bg-white/95 backdrop-blur-sm rounded-3xl p-10 shadow-2xl">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-800 mb-2 bg-customPink bg-clip-text text-transparent">
          Past Events
        </h1>
        <div className="w-24 h-1 bg-customPink mx-auto rounded-full"></div>
      </div>
      
      <div className="flex flex-col gap-6">
        {Array.isArray(events) && events.length > 0 ? (
          events.map((event) => (
            <div
              key={event.event_id}
              className={`bg-white/95 rounded-3xl shadow-lg backdrop-blur-sm border border-white/20 transition-all duration-300 ease-out overflow-hidden hover:-translate-y-1 hover:shadow-xl ${
                expandedEvent === event.event_id ? '-translate-y-0.5 shadow-lg' : ''
              }`}
            >
              <div 
                className="p-8 cursor-pointer flex justify-between items-start bg-gradient-to-br from-purple-50/50 to-purple-100/50 hover:from-purple-50/80 hover:to-purple-100/80 transition-all duration-300"
                onClick={() => toggleEventDetails(event.event_id)}
              >
                <div className="flex-1 mr-4">
                  <h2 className="text-3xl font-bold text-gray-800 mb-2 leading-tight">{event.name}</h2>
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">{event.description}</p>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-700 min-w-12">Start:</span>
                      <span className="text-gray-800 font-medium bg-purple-100 px-3 py-1 rounded-xl text-sm">
                        {formatDate(event.start_date)} at {formatTime(event.start_time)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-700 min-w-12">End:</span>
                      <span className="text-gray-800 font-medium bg-purple-100 px-3 py-1 rounded-xl text-sm">
                        {formatDate(event.end_date)} at {formatTime(event.end_time)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 text-white transition-all duration-300 hover:scale-110">
                  <svg 
                    className={`w-6 h-6 transition-transform duration-300 ${expandedEvent === event.event_id ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <polyline points="6,9 12,15 18,9"></polyline>
                  </svg>
                </div>
              </div>

              {expandedEvent === event.event_id && (
                <div className="px-8 pb-8 border-t border-gray-200/80 bg-white/50 animate-in slide-in-from-top-5 duration-300">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <span className="text-lg">🎯</span>
                        Roles ({event.roles?.length || 0})
                      </h3>
                      {event.roles && event.roles.length > 0 ? (
                        <div className="flex flex-wrap gap-3">
                          {event.roles.map((role) => (
                            <div key={role.id} className="bg-gradient-to-r from-purple-500 to-purple-700 text-white px-4 py-2 rounded-full font-semibold text-sm shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300">
                              {role.name}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-400 italic text-center p-8 bg-gray-50/80 rounded-xl border-2 border-dashed border-gray-200">
                          No roles defined for this event.
                        </p>
                      )}
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <span className="text-lg">👨‍🏫</span>
                        Assigned Teachers ({event.assginedteachers?.length || 0})
                      </h3>
                      {event.assginedteachers && event.assginedteachers.length > 0 ? (
                        <div className="flex flex-col gap-4">
                          {event.assginedteachers.map((teacher) => (
                            <div key={teacher.AssignmentID} className="bg-white/80 border border-gray-200/80 rounded-2xl p-5 flex justify-between items-center transition-all duration-300 hover:bg-white hover:border-purple-300 hover:translate-x-1">
                              <div className="flex-1">
                                <div className="text-lg font-semibold text-gray-800 mb-1">{teacher.teachername}</div>
                                <div className="text-sm text-gray-600 font-medium">Role: {teacher.rolename}</div>
                              </div>
                              <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-2 rounded-2xl text-xs font-semibold shadow-md">
                                <span className="flex items-center gap-1">
                                  Assigned
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-400 italic text-center p-8 bg-gray-50/80 rounded-xl border-2 border-dashed border-gray-200">
                          No teachers assigned to this event.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-10">
            No events available at the moment.
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default EventHistory;