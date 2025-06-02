// Pages/Admin/EventHistory.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";

const  FacultyEventHistory= () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:8080/events/past") // Replace with your backend URL
      .then((res) => {
        setEvents(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch event history:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading event history...</p>;

  if (events.length === 0) return <p>No past events found.</p>;

return (
  <div className="min-h-screen items-start pt-10 p-8 font-sans">
    <div className="max-w-7xl mx-auto bg-white/95 backdrop-blur-sm rounded-3xl p-10 shadow-2xl">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-800 mb-2 bg-customPink bg-clip-text text-transparent">
          Past Events
        </h1>
        <div className="w-24 h-1 bg-customPink mx-auto rounded-full"></div>
      </div>
      
      <div className="flex flex-col gap-6">
        {events && events.length > 0 ? (
          events.map((event) => (
            <div
              key={event.event_id}
              className="bg-white/95 rounded-3xl shadow-lg backdrop-blur-sm border border-white/20 transition-all duration-300 ease-out overflow-hidden hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="p-8 bg-gradient-to-br from-purple-50/50 to-purple-100/50 hover:from-purple-50/80 hover:to-purple-100/80 transition-all duration-300">
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-gray-800 mb-2 leading-tight">{event.name}</h2>
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">{event.description}</p>
                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-700 min-w-fit">Held on:</span>
                      <span className="text-gray-800 font-medium bg-purple-100 px-3 py-1 rounded-xl text-sm">
                        {event.start_date}
                      </span>
                    </div>
                    {event.end_date && event.end_date !== event.start_date && (
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-700 min-w-fit">to:</span>
                        <span className="text-gray-800 font-medium bg-purple-100 px-3 py-1 rounded-xl text-sm">
                          {event.end_date}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-10">
            <div className="bg-gray-50/80 rounded-xl border-2 border-dashed border-gray-200 p-12">
              <div className="text-4xl mb-4">📅</div>
              <p className="text-lg font-semibold text-gray-600 mb-2">No Past Events</p>
              <p className="text-gray-400 italic">No events available at the moment.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);
};

export default FacultyEventHistory;
