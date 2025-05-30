
// import { useState, useEffect } from "react";
// import { Trash2, Edit, X, Check, AlertCircle } from "lucide-react";
// import './facultylist.css';
// export default function TeachersList() {
//   const [teachers, setTeachers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [editingTeacher, setEditingTeacher] = useState(null);
//   const [editFormData, setEditFormData] = useState({
//     name: "",
//     email: "",
//     departmentname:"",
//   });
//   const [notification, setNotification] = useState(null);

//   useEffect(() => {
//     const fetchTeachers = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch("http://localhost:8080/teachers");

//         if (!response.ok) {
//           throw new Error(`Error fetching teachers: ${response.status}`);
//         }

//         const data = await response.json();
//         setTeachers(data);
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchTeachers();
//   }, []);

//   const showNotification = (message, type = "success") => {
//     setNotification({ message, type });
//     setTimeout(() => setNotification(null), 3000);
//   };

//   const handleEditClick = (teacher) => {
//     setEditingTeacher(teacher.id);
//     setEditFormData({
//       name: teacher.name,
//       email: teacher.email,
//       departmentname:teacher.department_name,
//     });
//   };

//   const handleCancelEdit = () => {
//     setEditingTeacher(null);
//   };

//   const handleEditFormChange = (e) => {
//     const { name, value } = e.target;
//     setEditFormData({
//       ...editFormData,
//       [name]: value,
//     });
//   };

//   const handleSaveEdit = async (teacherId) => {
//     try {
//       const response = await fetch(`http://localhost:8080/teacher/${teacherId}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(editFormData),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to update teacher");
//       }

//       setTeachers(
//         teachers.map((teacher) =>
//           teacher.id === teacherId ? { ...teacher, ...editFormData } : teacher
//         )
//       );

//       setEditingTeacher(null);
//       showNotification("Teacher updated successfully");
//     } catch (err) {
//       showNotification(err.message, "error");
//     }
//   };

//   const confirmDelete = (message) => {
//     return window.confirm(message);
//   };

//   const handleDeleteTeacher = async (teacherId) => {
//     const shouldDelete = confirmDelete(
//       "Are you sure you want to delete this teacher? This will also remove all associated assignments and references."
//     );

//     if (!shouldDelete) return;

//     try {
//       const response = await fetch(`http://localhost:8080/teacher/${teacherId}`, {
//         method: "DELETE",
//       });

//       if (!response.ok) {
//         throw new Error("Failed to delete teacher");
//       }

//       setTeachers(teachers.filter((teacher) => teacher.id !== teacherId));
//       showNotification("Teacher deleted successfully");
//     } catch (err) {
//       showNotification(err.message, "error");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="text-lg font-medium text-gray-500">Loading teachers...</div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
//         <div className="flex">
//           <AlertCircle className="h-5 w-5 text-red-400" />
//           <div className="ml-3">
//             <h3 className="text-sm font-medium text-red-800">Error loading teachers</h3>
//             <div className="mt-2 text-sm text-red-700">{error}</div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="px-4 sm:px-6 lg:px-8 py-8">
//       {notification && (
//         <div
//           className={`fixed top-4 right-4 z-50 p-4 rounded-md shadow-md ${
//             notification.type === "error"
//               ? "bg-red-50 text-red-800"
//               : "bg-green-50 text-green-800"
//           }`}
//         >
//           {notification.message}
//         </div>
//       )}

//       <div className="sm:flex sm:items-center">
//         <div className="sm:flex-auto">
//           <h1 className="text-2xl font-semibold text-gray-900">Teachers</h1>
//           <p className="mt-2 text-sm text-gray-700">
//             A list of all teachers including their name, email, department, and points.
//           </p>
//         </div>
//       </div>

//       <div className="mt-8 flex flex-col">
//         <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
//           <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
//             <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
//               <table className="min-w-full divide-y divide-gray-300">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
//                       Name
//                     </th>
//                     <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
//                       Email
//                     </th>
//                     <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
//                       Department
//                     </th>
//                     <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
//                       Points
//                     </th>
//                     <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
//                       <span className="sr-only">Actions</span>
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200 bg-white">
//                   {teachers.length === 0 ? (
//                     <tr>
//                       <td colSpan="5" className="py-4 text-center text-sm text-gray-500">
//                         No teachers found
//                       </td>
//                     </tr>
//                   ) : (
//                     teachers.map((teacher) => (
//                       <tr key={teacher.id}>
//                         <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
//                           {editingTeacher === teacher.id ? (
//                             <input
//                               type="text"
//                               name="name"
//                               value={editFormData.name}
//                               onChange={handleEditFormChange}
//                               className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                             />
//                           ) : (
//                             <div className="font-medium text-gray-900">{teacher.name}</div>
//                           )}
//                         </td>
//                         <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
//                           {editingTeacher === teacher.id ? (
//                             <input
//                               type="email"
//                               name="email"
//                               value={editFormData.email}
//                               onChange={handleEditFormChange}
//                               className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                             />
//                           ) : (
//                             teacher.email
//                           )}
//                         </td>
//                         <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
//                           {/* {teacher.department_name || "N/A"} */}
//                           {editingTeacher === teacher.id ? (
//                             <input
//                               type="text"
//                               name="departmentname"
//                               value={editFormData.departmentname}
//                               onChange={handleEditFormChange}
//                               className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
//                             />
//                           ) : (
//                             teacher.department_name
//                           )}
//                         </td>
//                         <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
//                           {teacher.point}
//                         </td>
//                         <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
//                           {editingTeacher === teacher.id ? (
//                             <div className="flex space-x-2 justify-end">
//                               <button
//                                 onClick={() => handleSaveEdit(teacher.id)}
//                                 className="text-green-600 hover:text-green-900"
//                               >
//                                 <Check className="w-5 h-5" />
//                               </button>
//                               <button
//                                 onClick={handleCancelEdit}
//                                 className="text-gray-600 hover:text-gray-900"
//                               >
//                                 <X className="w-5 h-5" />
//                               </button>
//                             </div>
//                           ) : (
//                             <div className="flex space-x-2 justify-end">
//                               <button
//                                 onClick={() => handleEditClick(teacher)}
//                                 className="text-indigo-600 hover:text-indigo-900"
//                               >
//                                 <Edit className="w-5 h-5" />
//                               </button>
//                               <button
//                                 onClick={() => handleDeleteTeacher(teacher.id)}
//                                 className="text-red-600 hover:text-red-900"
//                               >
//                                 <Trash2 className="w-5 h-5" />
//                               </button>
//                             </div>
//                           )}
//                         </td>
//                       </tr>
//                     ))
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import { useState, useEffect } from "react";
import { Trash2, Edit, X, Check, AlertCircle } from "lucide-react";
import './facultylist.css';

export default function TeachersList() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
    departmentname: "",
  });
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8080/teachers");

        if (!response.ok) {
          throw new Error(`Error fetching teachers: ${response.status}`);
        }

        const data = await response.json();
        setTeachers(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleEditClick = (teacher) => {
    setEditingTeacher(teacher.id);
    setEditFormData({
      name: teacher.name,
      email: teacher.email,
      departmentname: teacher.department_name,
    });
  };

  const handleCancelEdit = () => {
    setEditingTeacher(null);
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value,
    });
  };

  const handleSaveEdit = async (teacherId) => {
    try {
      const response = await fetch(`http://localhost:8080/teacher/${teacherId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editFormData),
      });

      if (!response.ok) {
        throw new Error("Failed to update teacher");
      }

      setTeachers(
        teachers.map((teacher) =>
          teacher.id === teacherId ? { ...teacher, ...editFormData } : teacher
        )
      );

      setEditingTeacher(null);
      showNotification("Teacher updated successfully");
    } catch (err) {
      showNotification(err.message, "error");
    }
  };

  const confirmDelete = (message) => {
    return window.confirm(message);
  };

  const handleDeleteTeacher = async (teacherId) => {
    const shouldDelete = confirmDelete(
      "Are you sure you want to delete this teacher? This will also remove all associated assignments and references."
    );

    if (!shouldDelete) return;

    try {
      const response = await fetch(`http://localhost:8080/teacher/${teacherId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete teacher");
      }

      setTeachers(teachers.filter((teacher) => teacher.id !== teacherId));
      showNotification("Teacher deleted successfully");
    } catch (err) {
      showNotification(err.message, "error");
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <div className="loading-text">Loading teachers...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-content">
          <AlertCircle className="error-icon" />
          <div>
            <h3 className="error-title">Error loading teachers</h3>
            <div className="error-message">{error}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="teachers-container">
      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}

      <div className="teachers-header">
        <div>
          <h1 className="teachers-title">Teachers</h1>
          <p className="teachers-description">
            A list of all teachers including their name, email, department, and points.
          </p>
        </div>
      </div>

      <div className="table-wrapper">
        <div className="table-container">
          <table className="teachers-table">
            <thead className="table-header">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Points</th>
                <th>
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="table-body">
              {teachers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="empty-state">
                    <div className="empty-state-text">No teachers found</div>
                  </td>
                </tr>
              ) : (
                teachers.map((teacher) => (
                  <tr key={teacher.id} className="table-row">
                    <td className="table-cell">
                      {editingTeacher === teacher.id ? (
                        <input
                          type="text"
                          name="name"
                          value={editFormData.name}
                          onChange={handleEditFormChange}
                          className="edit-input"
                        />
                      ) : (
                        <div className="teacher-name">{teacher.name}</div>
                      )}
                    </td>
                    <td className="table-cell">
                      {editingTeacher === teacher.id ? (
                        <input
                          type="email"
                          name="email"
                          value={editFormData.email}
                          onChange={handleEditFormChange}
                          className="edit-input"
                        />
                      ) : (
                        <div className="teacher-email">{teacher.email}</div>
                      )}
                    </td>
                    <td className="table-cell">
                      {editingTeacher === teacher.id ? (
                        <input
                          type="text"
                          name="departmentname"
                          value={editFormData.departmentname}
                          onChange={handleEditFormChange}
                          className="edit-input"
                        />
                      ) : (
                        <div className="teacher-department">
                          {teacher.department_name || "N/A"}
                        </div>
                      )}
                    </td>
                    <td className="table-cell">
                      <div className="teacher-points">{teacher.point}</div>
                    </td>
                    <td className="table-cell">
                      {editingTeacher === teacher.id ? (
                        <div className="actions-container">
                          <button
                            onClick={() => handleSaveEdit(teacher.id)}
                            className="action-button save-button"
                            title="Save changes"
                          >
                            <Check className="w-5 h-5" />
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="action-button cancel-button"
                            title="Cancel editing"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      ) : (
                        <div className="actions-container">
                          <button
                            onClick={() => handleEditClick(teacher)}
                            className="action-button edit-button"
                            title="Edit teacher"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteTeacher(teacher.id)}
                            className="action-button delete-button"
                            title="Delete teacher"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}