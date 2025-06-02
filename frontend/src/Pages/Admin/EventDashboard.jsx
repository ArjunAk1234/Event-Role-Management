import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EventDashboard = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [eventDetails, setEventDetails] = useState(null);
  const [facultyList, setFacultyList] = useState([]);
  const [roles, setRoles] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAssignForm, setShowAssignForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [assignmentFormData, setAssignmentFormData] = useState({
    teacherId: "",
    roleId: "",
    eventId: "",
    assignmentId: ""
  });

  useEffect(() => {
    fetchAllData();
  }, [eventId]);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      // Fetch event details
      const eventResponse = await axios.get(`http://localhost:8080/eventid/${eventId}`);
      setEventDetails(eventResponse.data);
      
      // Fetch faculty/teachers list
      const teachersResponse = await axios.get(`http://localhost:8080/teachers`);
      setFacultyList(Array.isArray(teachersResponse.data) ? teachersResponse.data : []);
      
      // Fetch roles for this event
      const rolesResponse = await axios.get(`http://localhost:8080/event/${eventId}/roles`);
      setRoles(Array.isArray(rolesResponse.data) ? rolesResponse.data : []);
      
      // Fetch assignments for this event
      const assignmentsResponse = await axios.get(`http://localhost:8080/events/assigned-teachers/${eventId}`);
      setAssignments(Array.isArray(assignmentsResponse.data) ? assignmentsResponse.data : []);
    } catch (err) {
      console.error("Error fetching data:", err);
      // Set arrays to empty arrays on error to prevent null reference errors
      setFacultyList([]);
      setRoles([]);
      setAssignments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAssignmentInputChange = (e) => {
    const { name, value } = e.target;
    setAssignmentFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const resetForm = () => {
    setAssignmentFormData({
      teacherId: "",
      roleId: "",
      eventId: eventId,
      assignmentId: ""
    });
    setIsEditMode(false);
    setShowAssignForm(false);
  };

  const handleAssignRole = async (e) => {
    e.preventDefault();
    
    try {
      if (isEditMode) {
        // Delete the old assignment
        await axios.post(`http://localhost:8080/deleteAssignment`, {
          assignment_id: assignmentFormData.assignmentId,
          deduct_points: true // Deduct points when removing assignment
        });
        
        // Create new assignment with updated values
        await axios.post(`http://localhost:8080/assignTeacher`, {
          teacher_id: assignmentFormData.teacherId,
          role_id: assignmentFormData.roleId,
          event_id: eventId
        });
        
        console.log("Role assignment updated");
      } else {
        await axios.post(`http://localhost:8080/assignments`, {
          teacher_id: assignmentFormData.teacherId,
          role_id: assignmentFormData.roleId,
          event_id: eventId
        });
        
        console.log("Role assigned");
      }
      
      // Refresh data
      fetchAllData();
      resetForm();
    } catch (error) {
      console.error("Error assigning/updating role:", error);
      alert(error.response?.data?.error || "An error occurred");
    }
  };

  const handleDeleteAssignment = async (assignmentId) => {
    if (window.confirm("Are you sure you want to remove this assignment?")) {
      try {
        await axios.delete(`http://localhost:8080/delete-role-assignment`, {
          data: {
            assignment_id: assignmentId,
            deduct_points: true // Deduct points when removing assignment
          }
        });
        
        console.log("Assignment removed");
        fetchAllData();
      } catch (error) {
        console.error("Error removing assignment:", error);
        alert(error.response?.data?.error || "An error occurred");
      }
    }
  };

  const handleEditAssignment = (assignment) => {
    setAssignmentFormData({
      teacherId: assignment.teacher_id,
      roleId: assignment.role_id,
      eventId: eventId,
      assignmentId: assignment._id
    });
    
    setIsEditMode(true);
    setShowAssignForm(true);
  };

  // Function to create a new role
  const handleCreateRole = async () => {
    const roleName = prompt("Enter role name:");
    if (!roleName) return;
    
    const roleDescription = prompt("Enter role description:");
    const rolePoints = parseInt(prompt("Enter points for this role:")) || 0;
    const headCount = parseInt(prompt("Enter maximum number of teachers for this role:")) || 1;
    
    try {
      await axios.post(`http://localhost:8080/roles/${eventId}`, {
        name: roleName,
        description: roleDescription,
        point: rolePoints,
        head_count: headCount
      });
      
      console.log("Role created");
      fetchAllData();
    } catch (error) {
      console.error("Error creating role:", error);
      alert(error.response?.data?.error || "An error occurred");
    }
  };

  const getProgressIndicatorClass = (assigned, total) => {
    if (assigned === 0) return "bg-green-100 text-green-700";
    if (assigned >= total) return "bg-red-100 text-red-700";
    return "bg-yellow-100 text-yellow-700";
  };

  const getProgressText = (assigned, total) => {
    if (assigned === 0) return "Available";
    if (assigned >= total) return "Full";
    return "Partial";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center items-center h-64 bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20">
            <div className="flex items-center space-x-4 text-gray-600">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
              <span className="text-lg font-medium">Loading event details...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4 md:p-8">
  <div className="max-w-7xl mx-auto">
    {/* Main Container */}
    <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
      
      {/* Header */}
      <div className="bg-customPink p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-white text-center md:text-right">
            Event Dashboard: {eventDetails?.name || eventId}
          </h1>
        </div>
      </div>

      {/* Content Sections */}
      <div className="p-6 md:p-8 space-y-8">
        <button
            onClick={() => navigate("/admin")}
          className="relative overflow-hidden px-6 py-5 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/60 mb-2 group"
          >
            <span>←</span>
            <span>Back to Dashboard</span>
          </button>
        {/* Event Details Section */}
        {eventDetails && (
          <div className="border-b border-gray-200 pb-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="w-2 h-8 bg-customPink rounded-full mr-4"></span>
              Event Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="group p-6 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl border-l-4 border-indigo-500 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2">Event Name</div>
                <div className="text-lg font-semibold text-gray-800">{eventDetails.name}</div>
              </div>
              <div className="group p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl border-l-4 border-purple-500 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-2">Description</div>
                <div className="text-lg font-semibold text-gray-800">{eventDetails.description}</div>
              </div>
              <div className="group p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl border-l-4 border-green-500 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="text-xs font-bold text-green-600 uppercase tracking-wider mb-2">Duration</div>
                <div className="text-lg font-semibold text-gray-800">
                  {new Date(eventDetails.start_date).toLocaleDateString()} - {new Date(eventDetails.end_date).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Roles Section */}
        <div className="border-b border-gray-200 pb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center">
              <span className="w-2 h-8 bg-customPink rounded-full mr-4"></span>
              Event Roles
            </h2>
            <button
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-medium transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-green-500/25"
              onClick={handleCreateRole}
            >
              <span className="text-lg">+</span>
              <span>Add New Role</span>
            </button>
          </div>

          <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-gray-700 to-gray-800 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wide">Role Name</th>
                    <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wide">Description</th>
                    <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wide">Points</th>
                    <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wide">Assignment Status</th>
                    <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wide">Capacity</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {roles && roles.length > 0 ? roles.map(role => {
                    const assignedCount = assignments ? assignments.filter(a => a.role_id === role.id).length : 0;
                    
                    return (
                      <tr key={role._id} className="transition-all duration-300 hover:bg-gray-50 group">
                        <td className="px-6 py-4"><span className="font-bold text-gray-900">{role.name}</span></td>
                        <td className="px-6 py-4 text-gray-700">{role.description}</td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-indigo-100 text-indigo-800">
                            {role.point} pts
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-3 py-2 rounded-full text-sm font-medium ${getProgressIndicatorClass(assignedCount, role.head_count)}`}>
                            {assignedCount} / {role.head_count} assigned
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-semibold text-gray-900">{role.head_count}</span>
                        </td>
                      </tr>
                    );
                  }) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-16 text-center">
                        <div className="text-gray-500">
                          <div className="text-lg font-medium mb-2">No roles defined yet</div>
                          <div className="text-sm">Click "Add New Role" to get started</div>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Faculty Assignments Section */}
        <div>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center">
              <span className="w-2 h-8 bg-customPink rounded-full mr-4"></span>
              Faculty Assignments
            </h2>
            <button
              className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-medium transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-indigo-500/25"
              onClick={() => {
                resetForm();
                setAssignmentFormData(prev => ({...prev, eventId}));
                setShowAssignForm(!showAssignForm);
              }}
            >
              <span>{showAssignForm ? "✕" : "+"}</span>
              <span>{showAssignForm ? "Cancel" : "Assign Role"}</span>
            </button>
          </div>

          {/* Assignment Form */}
          {showAssignForm && (
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 mb-8 border-2 border-blue-200">
              <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
                <span className="w-1.5 h-6 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full mr-3"></span>
                {isEditMode ? "Update Role Assignment" : "Assign Role to Faculty"}
              </h3>
              <form onSubmit={handleAssignRole} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">Faculty Member</label>
                    <select
                      name="teacherId"
                      value={assignmentFormData.teacherId}
                      onChange={handleAssignmentInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-base transition-all duration-300 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 bg-white"
                      required
                    >
                      <option value="">-- Select Faculty --</option>
                      {facultyList && facultyList.map(faculty => (
                        <option key={faculty.id} value={faculty.id}>
                          {faculty.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">Role</label>
                    <select
                      name="roleId"
                      value={assignmentFormData.roleId}
                      onChange={handleAssignmentInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl text-base transition-all duration-300 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 bg-white"
                      required
                    >
                      <option value="">-- Select Role --</option>
                      {roles && roles.map(role => {
                        const assignedCount = assignments ? assignments.filter(a => a.role_id === role.id).length : 0;
                        const isAtCapacity = assignedCount >= role.head_count;
                        const isSelected = role._id === assignmentFormData.roleId;
                        const isDisabled = isAtCapacity && !isSelected && !isEditMode;
                        
                        return (
                          <option key={role.id} value={role.id} disabled={isDisabled}>
                            {role.name} ({assignedCount}/{role.head_count}) - {role.point} points
                            {isAtCapacity && !isSelected ? " - FULL" : ""}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    type="submit"
                    className={`flex items-center justify-center px-8 py-3 rounded-xl font-medium transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                      isEditMode 
                        ? "bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-orange-500/25" 
                        : "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-green-500/25"
                    }`}
                  >
                    {isEditMode ? "Update Assignment" : "Assign Role"}
                  </button>
                  
                  {isEditMode && (
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-8 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-xl font-medium transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-500/25"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          )}

          {/* Assignments Table */}
          <div className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-gray-700 to-gray-800 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wide">Faculty</th>
                    <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wide">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wide">Role</th>
                    <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wide">Points</th>
                    <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wide">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {assignments && assignments.length > 0 ? assignments.map(assignment => {
                    const role = roles ? roles.find(r => r._id === assignment.roleid) : null;
                    
                    return (
                      <tr key={assignment.id} className="transition-all duration-300 hover:bg-gray-50 group">
                        <td className="px-6 py-4"><span className="font-bold text-gray-900">{assignment.teachername}</span></td>
                        <td className="px-6 py-4 text-gray-600">{assignment.teacheremail}</td>
                        <td className="px-6 py-4"><span className="font-semibold text-gray-900">{assignment.rolename}</span></td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-green-100 text-green-800">
                            {role?.point || "N/A"} pts
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-3">
                            <button 
                              className="px-4 py-2 bg-indigo-500 text-white rounded-lg text-sm font-medium transition-all duration-300 hover:bg-indigo-600 hover:-translate-y-1 hover:shadow-lg"
                              onClick={() => handleEditAssignment(assignment.id)}
                            >
                              Edit
                            </button>
                            <button 
                              className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-medium transition-all duration-300 hover:bg-red-600 hover:-translate-y-1 hover:shadow-lg"
                              onClick={() => handleDeleteAssignment(assignment.id)}
                            >
                              Remove
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  }) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-16 text-center">
                        <div className="text-gray-500">
                          <div className="text-lg font-medium mb-2">No faculty assignments yet</div>
                          <div className="text-sm">Click "Assign Role" to get started</div>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</div>
  );
};

export default EventDashboard;