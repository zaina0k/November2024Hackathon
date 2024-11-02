import React from 'react';
import './css/profileViewer.css';

export default function ProfileViewer() {
  const profileData = { 
    firstName: "John",
    surname: "Doe",
    email: "johndoe@example.com",
    university: "Example University",
    programOfStudy: "Computer Science",
    studyYear: "3rd Year",
    skills: ["React", "JavaScript", "CSS", "HTML"],
    biography: "I am a passionate computer science student with experience in web development.",
    profilePictureURL: "https://static01.nyt.com/images/2016/09/28/us/28xp-pepefrog/28xp-pepefrog-articleLarge.jpg?quality=75&auto=webp",
    projectParticipation: "Web Dev Bootcamp, Open Source Contributor",
    socialMediaLinks: {
      github: "https://github.com/example",
      linkedin: "https://linkedin.com/in/example"
    },
    lookingForProject: true
  };

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
          <p><strong>GitHub:</strong> <a href={profileData.socialMediaLinks.github} target="_blank" rel="noopener noreferrer">{profileData.socialMediaLinks.github}</a></p>
          <p><strong>LinkedIn:</strong> <a href={profileData.socialMediaLinks.linkedin} target="_blank" rel="noopener noreferrer">{profileData.socialMediaLinks.linkedin}</a></p>
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
