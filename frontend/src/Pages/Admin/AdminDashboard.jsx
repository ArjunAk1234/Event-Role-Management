// // // // import React, { useState, useEffect } from "react";
// // // // import axios from "axios";
// // // // import { Link, useNavigate } from "react-router-dom";

// // // // // Main Admin Dashboard Component (No longer needs Routes)
// // // // const AdminDashboard = () => {
// // // //   const [events, setEvents] = useState([]);
// // // //   const navigate = useNavigate();
// // // //   const [showCreateForm, setShowCreateForm] = useState(false);
// // // //   const [formData, setFormData] = useState({
// // // //     eventName: "",
// // // //     eventDescription: "",
// // // //     startDate: "",
// // // //     endDate: "",
// // // //   });

// // // //   useEffect(() => {
// // // //     fetchEvents();
// // // //   }, []);

// // // //   const fetchEvents = () => {
// // // //     axios
// // // //       .get("http://localhost:8080/events/current")
// // // //       .then((res) => setEvents(res.data))
// // // //       .catch((err) => console.error("Error fetching events:", err));
// // // //   };

// // // //   const handleInputChange = (e) => {
// // // //     const { name, value } = e.target;
// // // //     setFormData((prev) => ({ ...prev, [name]: value }));
// // // //   };

// // // //   const handleFormSubmit = (e) => {
// // // //     e.preventDefault();
    
// // // //     // In a real application, you'd make a POST request to your backend
// // // //     axios.post("https://09da6b2c-7088-466c-b94a-4662e3e1bd28.mock.pstmn.io/events", {
// // // //       event_name: formData.eventName,
// // // //       event_description: formData.eventDescription,
// // // //       start_date: formData.startDate,
// // // //       end_date: formData.endDate
// // // //     })
// // // //     .then(response => {
// // // //       console.log("Event created:", response.data);
// // // //       // Reset form
// // // //       setFormData({
// // // //         eventName: "",
// // // //         eventDescription: "",
// // // //         startDate: "",
// // // //         endDate: "",
// // // //       });
// // // //       // Hide form
// // // //       setShowCreateForm(false);
// // // //       // Refresh event list
// // // //       fetchEvents();
// // // //     })
// // // //     .catch(error => {
// // // //       console.error("Error creating event:", error);
// // // //     });
// // // //   };

// // // //   return (
// // // //     <div>
// // // //       <h2 className="text-xl font-semibold mb-4">Admin Dashboard</h2>
      
// // // //       <button
// // // //         className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
// // // //         onClick={() => setShowCreateForm(!showCreateForm)}
// // // //       >
// // // //         {showCreateForm ? "Cancel" : "Create Event"}
// // // //       </button>

// // // //       {showCreateForm && (
// // // //         <div className="bg-white shadow rounded p-6 mb-6">
// // // //           <h3 className="text-xl font-semibold mb-4">Create New Event</h3>
// // // //           <form onSubmit={handleFormSubmit} className="space-y-4">
// // // //             <div>
// // // //               <label className="block mb-1 font-medium">Event Name</label>
// // // //               <input
// // // //                 type="text"
// // // //                 name="eventName"
// // // //                 value={formData.eventName}
// // // //                 onChange={handleInputChange}
// // // //                 className="w-full px-3 py-2 border rounded"
// // // //                 required
// // // //               />
// // // //             </div>
// // // //             <div>
// // // //               <label className="block mb-1 font-medium">Event Description</label>
// // // //               <textarea
// // // //                 name="eventDescription"
// // // //                 value={formData.eventDescription}
// // // //                 onChange={handleInputChange}
// // // //                 className="w-full px-3 py-2 border rounded"
// // // //                 rows="3"
// // // //               />
// // // //             </div>
// // // //             <div>
// // // //               <label className="block mb-1 font-medium">Start Date</label>
// // // //               <input
// // // //                 type="date"
// // // //                 name="startDate"
// // // //                 value={formData.startDate}
// // // //                 onChange={handleInputChange}
// // // //                 className="w-full px-3 py-2 border rounded"
// // // //                 required
// // // //               />
// // // //             </div>
// // // //             <div>
// // // //               <label className="block mb-1 font-medium">End Date</label>
// // // //               <input
// // // //                 type="date"
// // // //                 name="endDate"
// // // //                 value={formData.endDate}
// // // //                 onChange={handleInputChange}
// // // //                 className="w-full px-3 py-2 border rounded"
// // // //                 required
// // // //               />
// // // //             </div>
// // // //             <div className="flex items-center gap-4">
// // // //               <button
// // // //                 type="submit"
// // // //                 className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
// // // //               >
// // // //                 Create Event
// // // //               </button>
// // // //               <button
// // // //                 type="button"
// // // //                 className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
// // // //                 onClick={() => setShowCreateForm(false)}
// // // //               >
// // // //                 Cancel
// // // //               </button>
// // // //             </div>
// // // //           </form>
// // // //         </div>
// // // //       )}

// // // //       <div>
// // // //         <h1 className="text-2xl font-bold mb-4">Current Events</h1>
// // // //         <ul className="space-y-2">
// // // //           {events.map((event) => (
// // // //             <li
// // // //               key={event.event_id}
// // // //               className="p-4 border rounded bg-white shadow hover:bg-blue-50 cursor-pointer transition"
// // // //               onClick={() => navigate(`/admin/event/${event.event_id}`)}
// // // //             >
// // // //               <h2 className="text-lg font-semibold">{event.event_name}</h2>
// // // //               <p className="text-sm text-gray-600">{event.event_description}</p>
// // // //               <div className="flex justify-between mt-2">
// // // //                 <span className="text-xs text-gray-500">
// // // //                   {new Date(event.start_date).toLocaleDateString()} - {new Date(event.end_date).toLocaleDateString()}
// // // //                 </span>
// // // //                 <Link
// // // //                   to={`/admin/event/${event.event_id}`}
// // // //                   className="text-blue-600 hover:text-blue-800 text-sm"
// // // //                 >
// // // //                   Manage Event →
// // // //                 </Link>
// // // //               </div>
// // // //             </li>
// // // //           ))}
// // // //         </ul>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default AdminDashboard;
// // // import React, { useState, useEffect } from "react";
// // // import axios from "axios";
// // // import { Link, useNavigate } from "react-router-dom";
// // // import "./AdminDashboard.css"; // Import the CSS file

// // // // Main Admin Dashboard Component
// // // const AdminDashboard = () => {
// // //   const [events, setEvents] = useState([]);
// // //   const navigate = useNavigate();
// // //   const [showCreateForm, setShowCreateForm] = useState(false);
// // //   const [formData, setFormData] = useState({
// // //     eventName: "",
// // //     eventDescription: "",
// // //     startDate: "",
// // //     endDate: "",
// // //   });

// // //   useEffect(() => {
// // //     fetchEvents();
// // //   }, []);

// // //   const fetchEvents = () => {
// // //     axios
// // //       .get("http://localhost:8080/events/current")
// // //       .then((res) => setEvents(res.data))
// // //       .catch((err) => console.error("Error fetching events:", err));
// // //   };

// // //   const handleInputChange = (e) => {
// // //     const { name, value } = e.target;
// // //     setFormData((prev) => ({ ...prev, [name]: value }));
// // //   };

// // //   const handleFormSubmit = (e) => {
// // //     e.preventDefault();
    
// // //     axios.post("http://localhost:8080/events", {
// // //       name: formData.eventName,
// // //       description: formData.eventDescription,
// // //       start_date: formData.startDate,
// // //       end_date: formData.endDate
// // //     })
// // //     .then(response => {
// // //       console.log("Event created:", response.data);
// // //       setFormData({
// // //         eventName: "",
// // //         eventDescription: "",
// // //         startDate: "",
// // //         endDate: "",
// // //       });
// // //       setShowCreateForm(false);
// // //       fetchEvents();
// // //     })
// // //     .catch(error => {
// // //       console.error("Error creating event:", error);
// // //     });
// // //   };

// // //   return (
// // //     <div className="admin-dashboard">
// // //       <div className="dashboard-container">
// // //         <h2 className="dashboard-title">Admin Dashboard</h2>
        
// // //         <button
// // //           className="btn btn-primary mb-6"
// // //           onClick={() => setShowCreateForm(!showCreateForm)}
// // //         >
// // //           {showCreateForm ? "Cancel" : "Create Event"}
// // //         </button>

// // //         {showCreateForm && (
// // //           <div className="create-form">
// // //             <h3 className="form-title">Create New Event</h3>
// // //             <form onSubmit={handleFormSubmit}>
// // //               <div className="form-group">
// // //                 <label className="form-label">Event Name</label>
// // //                 <input
// // //                   type="text"
// // //                   name="eventName"
// // //                   value={formData.eventName}
// // //                   onChange={handleInputChange}
// // //                   className="form-input"
// // //                   required
// // //                 />
// // //               </div>
// // //               <div className="form-group">
// // //                 <label className="form-label">Event Description</label>
// // //                 <textarea
// // //                   name="eventDescription"
// // //                   value={formData.eventDescription}
// // //                   onChange={handleInputChange}
// // //                   className="form-textarea"
// // //                   rows="3"
// // //                 />
// // //               </div>
// // //               <div className="form-group">
// // //                 <label className="form-label">Start Date</label>
// // //                 <input
// // //                   type="date"
// // //                   name="startDate"
// // //                   value={formData.startDate}
// // //                   onChange={handleInputChange}
// // //                   className="form-input"
// // //                   required
// // //                 />
// // //               </div>
// // //               <div className="form-group">
// // //                 <label className="form-label">End Date</label>
// // //                 <input
// // //                   type="date"
// // //                   name="endDate"
// // //                   value={formData.endDate}
// // //                   onChange={handleInputChange}
// // //                   className="form-input"
// // //                   required
// // //                 />
// // //               </div>
// // //               <div className="form-actions">
// // //                 <button type="submit" className="btn btn-success">
// // //                   Create Event
// // //                 </button>
// // //                 <button
// // //                   type="button"
// // //                   className="btn btn-secondary"
// // //                   onClick={() => setShowCreateForm(false)}
// // //                 >
// // //                   Cancel
// // //                 </button>
// // //               </div>
// // //             </form>
// // //           </div>
// // //         )}

// // //         <div>
// // //           <h1 className="section-title">Current Events</h1>
// // //           {events.length === 0 ? (
// // //             <div className="empty-state">
// // //               <div className="empty-state-icon">📅</div>
// // //               <div className="empty-state-text">No events found</div>
// // //               <div className="empty-state-subtext">Create your first event to get started</div>
// // //             </div>
// // //           ) : (
// // //             <div className="events-list">
// // //               {events.map((event) => (
// // //                 <div
// // //                   key={event.event_id}
// // //                   className="event-card fade-in"
// // //                   onClick={() => navigate(`/admin/event/${event.event_id}`)}
// // //                 >
// // //                   <h2 className="event-title">{event.name}</h2>
// // //                   <p className="event-description">{event.description}</p>
// // //                   <div className="event-footer">
// // //                     <span className="event-dates">
// // //                       {new Date(event.start_date).toLocaleDateString()} - {new Date(event.end_date).toLocaleDateString()}
// // //                     </span>
// // //                     <Link
// // //                       to={`/admin/event/${event.event_id}`}
// // //                       className="event-link"
// // //                       onClick={(e) => e.stopPropagation()}
// // //                     >
// // //                       Manage Event →
// // //                     </Link>
// // //                   </div>
// // //                 </div>
// // //               ))}
// // //             </div>
// // //           )}
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default AdminDashboard;
// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import { Link, useNavigate } from "react-router-dom";
// // import "./AdminDashboard.css"; // Import the CSS file

// // // Main Admin Dashboard Component
// // const AdminDashboard = () => {
// //   const [events, setEvents] = useState([]);
// //   const navigate = useNavigate();
// //   const [showCreateForm, setShowCreateForm] = useState(false);
// //   const [formData, setFormData] = useState({
// //     eventName: "",
// //     eventDescription: "",
// //     startDate: "",
// //     endDate: "",
// //   });

// //   useEffect(() => {
// //     fetchEvents();
// //   }, []);

// //   const fetchEvents = () => {
// //     axios
// //       .get("http://localhost:8080/events/current")
// //       .then((res) => setEvents(res.data))
// //       .catch((err) => console.error("Error fetching events:", err));
// //   };

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const handleFormSubmit = (e) => {
// //     e.preventDefault();
    
// //     // Corrected payload to match Go backend Event struct
// //     axios.post("http://localhost:8080/events", {
// //       name: formData.eventName,
// //       description: formData.eventDescription,
// //       start_date: formData.startDate,
// //       end_date: formData.endDate,
// //       start_time: "", // Add empty start_time if not collected
// //       end_time: ""    // Add empty end_time if not collected
// //     })
// //     .then(response => {
// //       console.log("Event created:", response.data);
// //       setFormData({
// //         eventName: "",
// //         eventDescription: "",
// //         startDate: "",
// //         endDate: "",
// //       });
// //       setShowCreateForm(false);
// //       fetchEvents();
// //     })
// //     .catch(error => {
// //       console.error("Error creating event:", error);
// //       // Add user-friendly error handling
// //       alert("Failed to create event. Please try again.");
// //     });
// //   };

// //   return (
// //     <div className="admin-dashboard">
// //       <div className="dashboard-container">
// //         <h2 className="dashboard-title">Admin Dashboard</h2>
        
// //         <button
// //           className="btn btn-primary mb-6"
// //           onClick={() => setShowCreateForm(!showCreateForm)}
// //         >
// //           {showCreateForm ? "Cancel" : "Create Event"}
// //         </button>

// //         {showCreateForm && (
// //           <div className="create-form">
// //             <h3 className="form-title">Create New Event</h3>
// //             <form onSubmit={handleFormSubmit}>
// //               <div className="form-group">
// //                 <label className="form-label">Event Name</label>
// //                 <input
// //                   type="text"
// //                   name="eventName"
// //                   value={formData.eventName}
// //                   onChange={handleInputChange}
// //                   className="form-input"
// //                   required
// //                 />
// //               </div>
// //               <div className="form-group">
// //                 <label className="form-label">Event Description</label>
// //                 <textarea
// //                   name="eventDescription"
// //                   value={formData.eventDescription}
// //                   onChange={handleInputChange}
// //                   className="form-textarea"
// //                   rows="3"
// //                 />
// //               </div>
// //               <div className="form-group">
// //                 <label className="form-label">Start Date</label>
// //                 <input
// //                   type="date"
// //                   name="startDate"
// //                   value={formData.startDate}
// //                   onChange={handleInputChange}
// //                   className="form-input"
// //                   required
// //                 />
// //               </div>
// //               <div className="form-group">
// //                 <label className="form-label">End Date</label>
// //                 <input
// //                   type="date"
// //                   name="endDate"
// //                   value={formData.endDate}
// //                   onChange={handleInputChange}
// //                   className="form-input"
// //                   required
// //                 />
// //               </div>
// //               <div className="form-actions">
// //                 <button type="submit" className="btn btn-success">
// //                   Create Event
// //                 </button>
// //                 <button
// //                   type="button"
// //                   className="btn btn-secondary"
// //                   onClick={() => setShowCreateForm(false)}
// //                 >
// //                   Cancel
// //                 </button>
// //               </div>
// //             </form>
// //           </div>
// //         )}

// //         <div>
// //           <h1 className="section-title">Current Events</h1>
// //           {events.length === 0 ? (
// //             <div className="empty-state">
// //               <div className="empty-state-icon">📅</div>
// //               <div className="empty-state-text">No events found</div>
// //               <div className="empty-state-subtext">Create your first event to get started</div>
// //             </div>
// //           ) : (
// //             <div className="events-list">
// //               {events.map((event) => (
// //                 <div
// //                   key={event.event_id}
// //                   className="event-card fade-in"
// //                   onClick={() => navigate(`/admin/event/${event.event_id}`)}
// //                 >
// //                   <h2 className="event-title">{event.name}</h2>
// //                   <p className="event-description">{event.description}</p>
// //                   <div className="event-footer">
// //                     <span className="event-dates">
// //                       {new Date(event.start_date).toLocaleDateString()} - {new Date(event.end_date).toLocaleDateString()}
// //                     </span>
// //                     <Link
// //                       to={`/admin/event/${event.event_id}`}
// //                       className="event-link"
// //                       onClick={(e) => e.stopPropagation()}
// //                     >
// //                       Manage Event →
// //                     </Link>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AdminDashboard;
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import "./AdminDashboard.css"; // Import the CSS file

// // Main Admin Dashboard Component
// const AdminDashboard = () => {
//   const [events, setEvents] = useState([]);
//   const navigate = useNavigate();
//   const [showCreateForm, setShowCreateForm] = useState(false);
//   const [formData, setFormData] = useState({
//     eventName: "",
//     eventDescription: "",
//     startDate: "",
//     endDate: "",
//   });

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   const fetchEvents = () => {
//     axios
//       .get("http://localhost:8080/events/current")
//       .then((res) => setEvents(res.data))
//       .catch((err) => console.error("Error fetching events:", err));
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleFormSubmit = (e) => {
//     e.preventDefault();
    
//     // Corrected payload to match Go backend Event struct
//     axios.post("http://localhost:8080/events", {
//       name: formData.eventName,
//       description: formData.eventDescription,
//       start_date: formData.startDate,
//       end_date: formData.endDate,
//       start_time: "", // Add empty start_time if not collected
//       end_time: ""    // Add empty end_time if not collected
//     })
//     .then(response => {
//       console.log("Event created:", response.data);
//       setFormData({
//         eventName: "",
//         eventDescription: "",
//         startDate: "",
//         endDate: "",
//       });
//       setShowCreateForm(false);
//       fetchEvents();
//     })
//     .catch(error => {
//       console.error("Error creating event:", error);
//       // Add user-friendly error handling
//       alert("Failed to create event. Please try again.");
//     });
//   };

//   return (
//     <div className="admin-dashboard">
//       <div className="dashboard-container">
//         <h2 className="dashboard-title">Admin Dashboard</h2>
        
//         <button
//           className="btn btn-primary mb-6"
//           onClick={() => setShowCreateForm(!showCreateForm)}
//         >
//           {showCreateForm ? "Cancel" : "Create Event"}
//         </button>

//         {showCreateForm && (
//           <div className="create-form">
//             <h3 className="form-title">Create New Event</h3>
//             <form onSubmit={handleFormSubmit}>
//               <div className="form-group">
//                 <label className="form-label">Event Name</label>
//                 <input
//                   type="text"
//                   name="eventName"
//                   value={formData.eventName}
//                   onChange={handleInputChange}
//                   className="form-input"
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label className="form-label">Event Description</label>
//                 <textarea
//                   name="eventDescription"
//                   value={formData.eventDescription}
//                   onChange={handleInputChange}
//                   className="form-textarea"
//                   rows="3"
//                 />
//               </div>
//               <div className="form-group">
//                 <label className="form-label">Start Date</label>
//                 <input
//                   type="date"
//                   name="startDate"
//                   value={formData.startDate}
//                   onChange={handleInputChange}
//                   className="form-input"
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <label className="form-label">End Date</label>
//                 <input
//                   type="date"
//                   name="endDate"
//                   value={formData.endDate}
//                   onChange={handleInputChange}
//                   className="form-input"
//                   required
//                 />
//               </div>
//               <div className="form-actions">
//                 <button type="submit" className="btn btn-success">
//                   Create Event
//                 </button>
//                 <button
//                   type="button"
//                   className="btn btn-secondary"
//                   onClick={() => setShowCreateForm(false)}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         )}

//         <div>
//           <h1 className="section-title">Current Events</h1>
//           {events.length === 0 ? (
//             <div className="empty-state">
//               <div className="empty-state-icon">📅</div>
//               <div className="empty-state-text">No events found</div>
//               <div className="empty-state-subtext">Create your first event to get started</div>
//             </div>
//           ) : (
//             <div className="events-list">
//               {events.map((event) => (
//                 <div
//                   key={event.event_id}
//                   className="event-card fade-in"
//                   onClick={() => navigate(`/admin/event/${event.event_id}`)}
//                 >
//                   <h2 className="event-title">{event.name}</h2>
//                   <p className="event-description">{event.description}</p>
//                   <div className="event-footer">
//                     <span className="event-dates">
//                       {new Date(event.start_date).toLocaleDateString()} - {new Date(event.end_date).toLocaleDateString()}
//                     </span>
//                     <Link
//                       to={`/admin/event/${event.event_id}`}
//                       className="event-link"
//                       onClick={(e) => e.stopPropagation()}
//                     >
//                       Manage Event →
//                     </Link>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./AdminDashboard.css"; // Import the CSS file

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
    <div className="admin-dashboard">
      <div className="dashboard-container">
        <h2 className="dashboard-title">Admin Dashboard</h2>

        <button
          className="btn btn-primary mb-6"
          onClick={() => setShowCreateForm(!showCreateForm)}
        >
          {showCreateForm ? "Cancel" : "Create Event"}
        </button>

        {showCreateForm && (
          <div className="create-form">
            <h3 className="form-title">Create New Event</h3>
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label className="form-label">Event Name</label>
                <input
                  type="text"
                  name="eventName"
                  value={formData.eventName}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Event Description</label>
                <textarea
                  name="eventDescription"
                  value={formData.eventDescription}
                  onChange={handleInputChange}
                  className="form-textarea"
                  rows="3"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Start Time</label>
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">End Time</label>
                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-actions">
                <button type="submit" className="btn btn-success">
                  Create Event
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowCreateForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div>
          <h1 className="section-title">Current Events</h1>
          {events.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">📅</div>
              <div className="empty-state-text">No events found</div>
              <div className="empty-state-subtext">
                Create your first event to get started
              </div>
            </div>
          ) : (
            <div className="events-list">
              {events.map((event) => (
                <div
                  key={event.event_id}
                  className="event-card fade-in"
                  onClick={() => navigate(`/admin/event/${event.event_id}`)}
                >
                  <h2 className="event-title">{event.name}</h2>
                  <p className="event-description">{event.description}</p>
                  <div className="event-footer">
                    <span className="event-dates">
                      {new Date(event.start_date).toLocaleDateString()} -{" "}
                      {new Date(event.end_date).toLocaleDateString()}
                    </span>
                    <Link
                      to={`/admin/event/${event.event_id}`}
                      className="event-link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Manage Event →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
