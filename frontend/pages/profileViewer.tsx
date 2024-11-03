import React, { useEffect, useState } from 'react';
import './css/profileViewer.css';

export default function ProfileViewer() {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const urlPath = window.location.pathname; // Get the current path
    const userId = parseInt(urlPath.split('/').pop(), 10); // Extract the user ID from the path

    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/users/${userId}`); // Adjust the port if necessary
        if (!response.ok) {
          throw new Error('User not found');
        }
        const data = await response.json();
        setProfileData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Show loading state or error
  if (loading) return <div>Loading profile...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="profile-page">
      <div className="profile-left">
        <img
          src={profileData.profilePictureURL}
          alt={`${profileData.firstName} ${profileData.surname}`}
          className="profile-picture"
        />
        <h2>{profileData.firstName} {profileData.surname}</h2>
        <p>{profileData.university}</p>
        <p>{profileData.programOfStudy} - {profileData.studyYear}</p>
        <p><strong>Looking for Project:</strong> {profileData.lookingForProject ? "Yes" : "No"}</p>
        
        <div className="social-links">
          <p><strong>GitHub:</strong> <a href={profileData.socialMediaLinks?.github || '#'} target="_blank" rel="noopener noreferrer">{profileData.socialMediaLinks?.github || 'N/A'}</a></p>
          <p><strong>LinkedIn:</strong> <a href={profileData.socialMediaLinks?.linkedin || '#'} target="_blank" rel="noopener noreferrer">{profileData.socialMediaLinks?.linkedin || 'N/A'}</a></p>
        </div>
      </div>
      
      <div className="profile-right">
        <div className="profile-info">
          <h3>Profile Information</h3>
          <p><strong>Email:</strong> {profileData.email}</p>
          <p><strong>Biography:</strong> {profileData.biography}</p>
          <p><strong>Project Participation:</strong> {profileData.projectParticipation}</p>
          
          <h4>Skills</h4>
          <ul>
            {profileData.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
