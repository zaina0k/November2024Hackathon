"use client"; // Indicate this is a client component

import React, { useState } from "react";
import "./css/Signin.css"; // Import the CSS file

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: any) => {
    event.preventDefault();
    // Handle sign-in logic here (e.g., API call)
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="signin-container">
      <h2>Sign-in Page</h2>
      <form onSubmit={handleSubmit} className="signin-form" >
        <div className="form-group" >
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
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <button type="submit" className="signin-button">
          Sign In
        </button>
      </form>
    </div>
  );
}
