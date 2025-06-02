import { useState, useEffect } from "react";
import { Trash2, Edit, X, Check, AlertCircle } from "lucide-react";

export default function FacultyList() {
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
      <div className="flex flex-col items-center justify-center h-80 bg-white rounded-xl shadow-lg">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-indigo-500 rounded-full animate-spin"></div>
        <div className="mt-4 text-lg font-medium text-gray-600">Loading teachers...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-xl p-6 mt-4 shadow-lg">
        <div className="flex items-start">
          <AlertCircle className="w-6 h-6 text-red-600 mr-3 flex-shrink-0" />
          <div>
            <h3 className="text-base font-semibold text-red-800 mb-2">Error loading teachers</h3>
            <div className="text-sm text-red-700">{error}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-200 min-h-screen font-sans">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-6 right-6 z-50 px-6 py-4 rounded-lg shadow-xl font-medium animate-pulse max-w-sm border-l-4 ${
          notification.type === 'success' 
            ? 'bg-gradient-to-br from-green-50 to-green-100 text-green-800 border-l-green-500' 
            : 'bg-gradient-to-br from-red-50 to-red-100 text-red-800 border-l-red-500'
        }`}>
          {notification.message}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-8 p-6 bg-white rounded-xl shadow-lg border border-gray-200">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-pink-800 bg-clip-text text-transparent">
            Teachers
          </h1>
          <p className="mt-2 text-base text-gray-600 font-normal">
            A list of all teachers including their name, email, department, and points.
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="mt-8 bg-white rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
              <tr>
                <th className="px-6 py-5 text-left text-sm font-bold text-gray-700 uppercase tracking-wider relative">
                  Name
                </th>
                <th className="px-6 py-5 text-left text-sm font-bold text-gray-700 uppercase tracking-wider relative">
                  Email
                </th>
                <th className="px-6 py-5 text-left text-sm font-bold text-gray-700 uppercase tracking-wider relative">
                  Department
                </th>
                <th className="px-6 py-5 text-left text-sm font-bold text-gray-700 uppercase tracking-wider relative">
                  Points
                </th>
                <th className="px-6 py-5 text-left text-sm font-bold text-gray-700 uppercase tracking-wider relative">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {teachers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-12 py-12 text-center text-lg font-medium text-gray-500 bg-gradient-to-br from-pink-50 to-gray-50">
                    No teachers found
                  </td>
                </tr>
              ) : (
                teachers.map((teacher) => (
                  <tr 
                    key={teacher.id} 
                    className="border-b border-gray-100 transition-all duration-200 ease-in-out hover:bg-gradient-to-r hover:from-pink-50 hover:to-gray-50 hover:-translate-y-0.5 hover:shadow-lg animate-pulse"
                  >
                    <td className="px-6 py-5 text-sm text-gray-700">
                      {editingTeacher === teacher.id ? (
                        <input
                          type="text"
                          name="name"
                          value={editFormData.name}
                          onChange={handleEditFormChange}
                          className="w-full px-3 py-3 border-2 border-gray-200 rounded-lg text-sm transition-all duration-200 bg-white text-gray-700 hover:border-pink-300 focus:outline-none focus:border-pink-500 focus:shadow-lg focus:bg-pink-50"
                        />
                      ) : (
                        <div className="font-semibold text-gray-800 text-base">{teacher.name}</div>
                      )}
                    </td>
                    <td className="px-6 py-5 text-sm text-gray-700">
                      {editingTeacher === teacher.id ? (
                        <input
                          type="email"
                          name="email"
                          value={editFormData.email}
                          onChange={handleEditFormChange}
                          className="w-full px-3 py-3 border-2 border-gray-200 rounded-lg text-sm transition-all duration-200 bg-white text-gray-700 hover:border-pink-300 focus:outline-none focus:border-pink-500 focus:shadow-lg focus:bg-pink-50"
                        />
                      ) : (
                        <div className="text-gray-600 font-mono">{teacher.email}</div>
                      )}
                    </td>
                    <td className="px-6 py-5 text-sm text-gray-700">
                      {editingTeacher === teacher.id ? (
                        <input
                          type="text"
                          name="departmentname"
                          value={editFormData.departmentname}
                          onChange={handleEditFormChange}
                          className="w-full px-3 py-3 border-2 border-gray-200 rounded-lg text-sm transition-all duration-200 bg-white text-gray-700 hover:border-pink-300 focus:outline-none focus:border-pink-500 focus:shadow-lg focus:bg-pink-50"
                        />
                      ) : (
                        <span className="inline-block px-3 py-1 text-pink-600 font-medium bg-pink-100 rounded-full text-sm">
                          {teacher.department_name || "N/A"}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-5 text-sm text-gray-700">
                      <span className="inline-block px-3 py-2 font-bold text-emerald-600 bg-emerald-50 rounded-lg text-base">
                        {teacher.point}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-sm text-gray-700">
                      {editingTeacher === teacher.id ? (
                        <div className="flex gap-2 justify-end">
                          <button
                            onClick={() => handleSaveEdit(teacher.id)}
                            className="p-2 border-none rounded-lg cursor-pointer transition-all duration-200 flex items-center justify-center bg-gradient-to-br from-emerald-100 to-emerald-200 text-emerald-600 hover:from-emerald-200 hover:to-emerald-300 hover:text-emerald-700 hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                            title="Save changes"
                          >
                            <Check className="w-5 h-5" />
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="p-2 border-none rounded-lg cursor-pointer transition-all duration-200 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600 hover:from-gray-200 hover:to-gray-300 hover:text-gray-700 hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                            title="Cancel editing"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex gap-2 justify-end">
                          <button
                            onClick={() => handleEditClick(teacher)}
                            className="p-2 border-none rounded-lg cursor-pointer transition-all duration-200 flex items-center justify-center bg-gradient-to-br from-pink-100 to-pink-200 text-pink-600 hover:from-pink-200 hover:to-pink-300 hover:text-pink-700 hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                            title="Edit teacher"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteTeacher(teacher.id)}
                            className="p-2 border-none rounded-lg cursor-pointer transition-all duration-200 flex items-center justify-center bg-gradient-to-br from-red-100 to-red-200 text-red-600 hover:from-red-200 hover:to-red-300 hover:text-red-700 hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
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