"use client"; // Indicate this is a client component

import React, { useState } from "react";
import "./css/signin.css"; // Import the CSS file
import { hashPassword } from '../utils/auth';

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    // Handle sign-in logic here (e.g., API call)
    console.log("Email:", email);
    console.log("Password:", password);

    const hashedPassword = await hashPassword(password); 
    
    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: email, password_hash: hashedPassword }),
      });

      if (!response.ok) {
          throw new Error(`The hashed password - ${hashedPassword} - didn't match.`);
      }

      const data = await response.json();
      const token = data.access_token;  // Get the access token
      const userid = data.userid;

      // Step 2: Store the token for later use
      localStorage.setItem('access_token', token); // Store in local storage
      localStorage.setItem('user_id', userid); // Optionally store the user ID

      // Redirect or update the state as needed
      console.log('Login successful, token stored:', token);
    } catch (error) {
      console.error('Error during login:', error);
    }
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
