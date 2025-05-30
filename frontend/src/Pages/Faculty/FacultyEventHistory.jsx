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
    <div>
      <h1 className="text-2xl font-bold mb-4">Past Events</h1>
      <ul className="space-y-4">
        {events.map((event) => (
          <li
            key={event.event_id}
            className="p-4 border rounded shadow-sm bg-white hover:bg-gray-50"
          >
            <h2 className="text-lg font-semibold">{event.name}</h2>
            <p className="text-sm text-gray-700">{event.description}</p>
            <p className="text-xs text-gray-500">Held on: {event.start_date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FacultyEventHistory;
