import React, { useState, useEffect } from 'react';

const Header = () => {
  // Notification states
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationCount, setNotificationCount] = useState({ total_count: 0, unread_count: 0 });
  const [notificationLoading, setNotificationLoading] = useState(false);
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [currentTeacherId, setCurrentTeacherId] = useState(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Get teacher ID from local storage
        const user = JSON.parse(localStorage.getItem("user"));
        const teacherId = user?.userid;
        
        if (!teacherId) {
          console.error('Teacher ID not found in local storage. Please login again.');
          return;
        }

        setCurrentTeacherId(teacherId);
        
        // Fetch notification count
        await fetchNotificationCount(teacherId);
      } catch (err) {
        console.error('Error fetching initial data:', err);
      }
    };

    fetchInitialData();
  }, []);

  const fetchNotificationCount = async (teacherId) => {
    try {
      const response = await fetch(`http://localhost:8080/teachers/${teacherId}/notifications/count`);
      const data = await response.json();
      setNotificationCount(data);
    } catch (err) {
      console.error('Error fetching notification count:', err);
    }
  };

  const fetchNotifications = async (showReadOnly = true) => {
    if (!currentTeacherId) return;
    
    setNotificationLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8080/teachers/${currentTeacherId}/notifications?show_read=${showReadOnly}`
      );
      const data = await response.json();
      setNotifications(data);
      // Add this in fetchNotifications function after the API call
console.log('Fetched notifications:', data);
console.log('Current teacher ID:', currentTeacherId);
    } catch (err) {
      console.error('Error fetching notifications:', err);
    }
    setNotificationLoading(false);
  };

  const markAsRead = async (notificationId) => {
    try {
      await fetch(`http://localhost:8080/notifications/${notificationId}/read`, {
        method: 'PUT'
      });
      
      // Update local state - Fixed: using consistent ID property
      setNotifications(notifications.map(notif => 
        notif._id === notificationId 
          ? { ...notif, is_read: true, read_at: new Date() }
          : notif
      ));
      
      // Update notification count
      setNotificationCount(prev => ({
        ...prev,
        unread_count: Math.max(0, prev.unread_count - 1)
      }));
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };

  const deleteNotification = async (notificationId) => {
    try {
      await fetch(`http://localhost:8080/notifications/${notificationId}`, {
        method: 'DELETE'
      });
      
      // Update local state - Fixed: using consistent ID property
      const deletedNotification = notifications.find(n => n._id === notificationId);
      setNotifications(notifications.filter(notif => notif._id !== notificationId));
      
      // Update notification count
      setNotificationCount(prev => ({
        total_count: Math.max(0, prev.total_count - 1),
        unread_count: deletedNotification && !deletedNotification.is_read 
          ? Math.max(0, prev.unread_count - 1) 
          : prev.unread_count
      }));
    } catch (err) {
      console.error('Error deleting notification:', err);
    }
  };

  const markAllAsRead = async () => {
    if (!currentTeacherId) return;
    
    try {
      await fetch(`http://localhost:8080/teachers/${currentTeacherId}/notifications/read-all`, {
        method: 'PUT'
      });
      
      // Update local state
      setNotifications(notifications.map(notif => ({
        ...notif,
        is_read: true,
        read_at: new Date()
      })));
      
      // Update notification count
      setNotificationCount(prev => ({
        ...prev,
        unread_count: 0
      }));
    } catch (err) {
      console.error('Error marking all notifications as read:', err);
    }
  };

  const handleNotificationClick = async () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications && notifications.length === 0) {
      await fetchNotifications(!showUnreadOnly);
    }
  };

  const handleFilterChange = async (unreadOnly) => {
    setShowUnreadOnly(unreadOnly);
    await fetchNotifications(!unreadOnly);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <header className="bg-gray-900 text-white px-6 py-4 flex justify-end items-center relative">
      {/* Right side - Notification Icon */}
      <div className="relative">
        <button
          onClick={handleNotificationClick}
          className="bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-full p-2 transition-all duration-200 relative"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          {notificationCount.unread_count > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
              {notificationCount.unread_count > 99 ? '99+' : notificationCount.unread_count}
            </span>
          )}
        </button>

        {/* Notification Panel */}
        {showNotifications && (
          <div className="absolute top-12 right-0 w-96 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 max-h-96 overflow-hidden">
            <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-purple-600">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Notifications</h3>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-white hover:text-gray-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-blue-100 text-sm">
                  {notificationCount.unread_count} unread of {notificationCount.total_count} total
                </span>
                {notificationCount.unread_count > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-blue-100 hover:text-white text-sm underline"
                  >
                    Mark all read
                  </button>
                )}
              </div>
            </div>

            <div className="p-3 bg-gray-50 border-b border-gray-200">
              <div className="flex space-x-2">
                <button
                  onClick={() => handleFilterChange(false)}
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${
                    !showUnreadOnly
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => handleFilterChange(true)}
                  className={`px-3 py-1 text-sm rounded-full transition-colors ${
                    showUnreadOnly
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Unread
                </button>
              </div>
            </div>

            <div className="max-h-80 overflow-y-auto">
              {notificationLoading ? (
                <div className="p-6 text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
                </div>
              ) : notifications.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  <svg className="mx-auto h-12 w-12 text-gray-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  <p>No notifications found</p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification._id}
                    className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                      !notification.is_read ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-1">
                          {!notification.is_read && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                          )}
                          <h4 className="text-sm font-medium text-gray-900">
                            {notification.title}
                          </h4>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          {notification.message}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-400">
                            {formatDate(notification.created_at)}
                          </span>
                          <div className="flex space-x-2">
                            {!notification.is_read && (
                              <button
                                onClick={() => markAsRead(notification._id)}
                                className="text-xs text-blue-600 hover:text-blue-800"
                              >
                                Mark read
                              </button>
                            )}
                            <button
                              onClick={() => deleteNotification(notification._id)}
                              className="text-xs text-red-600 hover:text-red-800"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;