import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import "./css/profile.css"; // Import the CSS file

export default function Profile() {
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [passwordHash, setPasswordHash] = useState("");
  const [university, setUniversity] = useState("");
  const [programOfStudy, setProgramOfStudy] = useState("");
  const [studyYear, setStudyYear] = useState("");
  const [skills, setSkills] = useState([]);
  const [biography, setBiography] = useState("");
  const [profilePictureURL, setProfilePictureURL] = useState("");
  const [projectParticipation, setProjectParticipation] = useState("");
  const [socialMediaLinks, setSocialMediaLinks] = useState({
    github: "",
    linkedin: "",
  });
  const [lookingForProject, setLookingForProject] = useState(false);

  useEffect(() => {
      const fetchUserData = async () => {
        const token = localStorage.getItem('access_token');
        const user_id = localStorage.getItem('user_id');
    
        const response = await fetch(`http://localhost:8080/api/user/${user_id}`, { // Use the correct user ID
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
    
        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }
    
        const data = await response.json();
        console.log('User data:', data);

        setFirstName(data.firstname);
        setSurname(data.surname);
        setEmail(data.email);
        setPasswordHash(data.password_hash);
        setUniversity(data.university);
        setProgramOfStudy(data.program_of_study);
        setStudyYear(data.study_year);
        setSkills(data.skills.split(',').map(skill => skill.trim())); // Splitting and trimming the skills string
        setBiography(data.biography);
        setProfilePictureURL(data.profile_picture_url);
        setProjectParticipation(data.project_participation);
        setSocialMediaLinks({
            github: data.github_link,
            linkedin: data.linkedin_link,
        });
    };

    fetchUserData();
  });

  const handleSubmit = (event:any) => {
    event.preventDefault();
    // Handle profile submission logic (e.g., API call)
    console.log({
      firstName,
      surname,
      email,
      passwordHash,
      university,
      programOfStudy,
      studyYear,
      skills,
      biography,
      profilePictureURL,
      projectParticipation,
      socialMediaLinks,
      lookingForProject,
    });
  };

  return (
    <div className="profile-container">
      <h2>Edit Profile Page</h2>
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-group">
          <label htmlFor="first-name">First Name:</label>
          <input
            type="text"
            id="first-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="surname">Surname:</label>
          <input
            type="text"
            id="surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password-hash">Password Hash:</label>
          <input
            type="text"
            id="password-hash"
            value={passwordHash}
            onChange={(e) => setPasswordHash(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="university">University:</label>
          <input
            type="text"
            id="university"
            value={university}
            onChange={(e) => setUniversity(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="program-of-study">Program of Study:</label>
          <input
            type="text"
            id="program-of-study"
            value={programOfStudy}
            onChange={(e) => setProgramOfStudy(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="study-year">Study Year:</label>
          <input
            type="text"
            id="study-year"
            value={studyYear}
            onChange={(e) => setStudyYear(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="skills">Skills (comma separated):</label>
          <input
            type="text"
            id="skills"
            value={skills.join(", ")}
            onChange={(e:any) => setSkills(e.target.value.split(",").map(skill => skill.trim()))}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="biography">Biography:</label>
          <textarea
            id="biography"
            value={biography}
            onChange={(e) => setBiography(e.target.value)}
            required
            className="form-textarea"
          />
        </div>
        <div className="form-group">
          <label htmlFor="profile-picture-url">Profile Picture URL:</label>
          <input
            type="text"
            id="profile-picture-url"
            value={profilePictureURL}
            onChange={(e) => setProfilePictureURL(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="project-participation">Project Participation:</label>
          <input
            type="text"
            id="project-participation"
            value={projectParticipation}
            onChange={(e) => setProjectParticipation(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          {/* <label>Social Media Links:</label> */}
          <div>
            <label htmlFor="github">GitHub:</label>
            <input
              type="text"
              id="github"
              value={socialMediaLinks.github}
              onChange={(e) => setSocialMediaLinks({ ...socialMediaLinks, github: e.target.value })}
              className="form-input"
            />
          </div>
          <div>
            <label htmlFor="linkedin">LinkedIn:</label>
            <input
              type="text"
              id="linkedin"
              value={socialMediaLinks.linkedin}
              onChange={(e) => setSocialMediaLinks({ ...socialMediaLinks, linkedin: e.target.value })}
              className="form-input"
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="looking-for-project">
            <input
              type="checkbox"
              id="looking-for-project"
              checked={lookingForProject}
              onChange={() => setLookingForProject(!lookingForProject)}
            />
            Are you looking for a project?
          </label>
        </div>
        <button type="submit" className="profile-button">Update Profile</button>
      </form>
    </div>
  );
}