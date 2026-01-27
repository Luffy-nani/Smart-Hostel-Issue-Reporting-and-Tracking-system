import "./Announcements.css";
import DashboardNav from "./DashboardNav"; 

const Announcements = () => {
  const announcements = [
    {
      id: 1,
      title: "Hostel Maintenance Schedule",
      description: "Routine maintenance will be conducted on all floors this Saturday from 9 AM to 2 PM. Water supply may be temporarily interrupted. Please plan accordingly and store water in advance.",
      date: "2024-01-25",
      priority: "high",
      category: "Maintenance",
      location: "All Blocks",
    },
    {
      id: 2,
      title: "New WiFi Password Updated",
      description: "The WiFi password has been updated for security purposes. Please check your email for the new credentials or contact the IT department at the reception.",
      date: "2024-01-24",
      priority: "medium",
      category: "Internet",
      location: "All Blocks"
    },
    {
      id: 3,
      title: "Monthly Hostel Meeting",
      description: "All residents are invited to attend the monthly hostel meeting on Friday at 6 PM in the common room. Your feedback is valuable! We will discuss upcoming events, facility improvements, and address your concerns.",
      date: "2024-01-23",
      priority: "medium",
      category: "Other",
      location: "Common Room",
    },
    {
      id: 4,
      title: "Gym Equipment Upgrade Completed",
      description: "New fitness equipment has been installed in the hostel gym. Please read the usage guidelines posted on the notice board before using the equipment. Enjoy your workouts!",
      date: "2024-01-22",
      priority: "low",
      category: "Other",
      location: "Gym - Block A",
    },
    {
      id: 5,
      title: "Emergency Contact Numbers Updated",
      description: "Emergency contact numbers have been updated. Please save the new numbers: Security - 1234, Medical - 5678, Warden - 9012. These numbers are available 24/7 for any urgent issues.",
      date: "2024-01-20",
      priority: "high",
      category: "Security",
      location: "All Blocks",
    },
    {
      id: 6,
      title: "Water Supply Interruption Tomorrow",
      description: "Water supply will be interrupted tomorrow from 10 AM to 12 PM for tank cleaning. Please store sufficient water beforehand. We apologize for the inconvenience.",
      date: "2024-01-19",
      priority: "high",
      category: "Water",
      location: "Block B",
      author: "Maintenance Team"
    }
  ];

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
      <>
          <div>
      <DashboardNav/>
    </div>
    <div className="announcements-page">
      {/* PAGE HEADER */}
      <div className="page-header">
        <h1>Announcements</h1>
        <p>Stay updated with the latest hostel news and updates</p>
      </div>

      {/* ANNOUNCEMENTS LIST */}
      <div className="announcements-container">
        {announcements.length > 0 ? (
          announcements.map((announcement) => (
            <div key={announcement.id} className="announcement-card">
              
              <div className="announcement-content">
                {/* Header with Title and Priority */}
                <div className="announcement-header">
                  <h2 className="announcement-title">{announcement.title}</h2>
                  <span className={`priority-badge ${announcement.priority}`}>
                    {announcement.priority}
                  </span>
                </div>

                {/* Meta Info: Category and Location */}
                <div className="announcement-meta">
                  <span className={`category-tag ${announcement.category.toLowerCase()}`}>
                    {announcement.category}
                  </span>
                  <span className="location-info">📍 {announcement.location}</span>
                </div>

                {/* Description */}
                <p className="announcement-description">{announcement.description}</p>

                {/* Footer */}
                <div className="announcement-footer">
                  
                  <span className="announcement-date">
                    📅 {formatDate(announcement.date)}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-announcements">
            <div className="no-announcements-icon">📢</div>
            <h3>No Announcements</h3>
            <p>There are no announcements at the moment. Check back later!</p>
          </div>
        )}
      </div>
    </div>
      </>
  );
};

export default Announcements;