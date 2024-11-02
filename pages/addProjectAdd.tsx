import React, { useState } from 'react';
import './css/addAd.css';

export default function AddProjectAd() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [skillsRequired, setSkillsRequired] = useState([]);
  const [projectType, setProjectType] = useState("");
  const [duration, setDuration] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [teamSize, setTeamSize] = useState("");

  // Generate a random project ID when the form loads
  const projectID = Math.floor(Math.random() * 100000000000);

  const handleSubmit = (event) => {
    event.preventDefault();
    const adData = {
      projectID,
      title,
      description,
      imageURL,
      skillsRequired,
      projectType,
      duration,
      startDate,
      endDate,
      teamSize,
    };
    console.log(adData);
    // Handle ad submission logic, e.g., send to API
  };

  const handleSkillsChange = (e) => {
    const value = e.target.value;
    // Split by commas and trim whitespace
    const skills = value.split(',').map(skill => skill.trim());
    setSkillsRequired(skills);
  };

  return (
    <div className="add-ad-container">
      <h2>Create Project Ad</h2>
      <form onSubmit={handleSubmit} className="add-ad-form">
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="form-textarea"
          />
        </div>
        <div className="form-group">
          <label>Image URL:</label>
          <input
            type="text"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Skills Required (comma separated):</label>
          <input
            type="text"
            value={skillsRequired.join(", ")}
            onChange={handleSkillsChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Project Type:</label>
          <input
            type="text"
            value={projectType}
            onChange={(e) => setProjectType(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Duration (weeks):</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Team Size:</label>
          <input
            type="number"
            value={teamSize}
            onChange={(e) => setTeamSize(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <button type="submit" className="submit-button">Submit Ad</button>
      </form>
    </div>
  );
}
