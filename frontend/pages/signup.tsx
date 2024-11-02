"use client"; // Indicate this is a client component

import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import "./css/signup.css"; // Import the CSS file

export default function Signup() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstname, setFirstname] = useState(''); // New state for firstname
  const [surname, setSurname] = useState(''); // New state for lastname
  const [errorMessage, setErrorMessage] = useState(""); // State for error message

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Reset error message
    setErrorMessage("");

    // Check if passwords match
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match!"); // Set error message
      return;
    }
    if (password.length < 8) {
      setErrorMessage("Password needs to be at least 8 characters long.")
      return;
    }

    console.log("Email:", email);
    console.log("Password:", password);

    // Additional logic for signup (API call, etc.)
    // Define the data to be sent
    const data = {
      email: email,
      password: password,
      firstname: firstname,
      surname: surname,
    };
    
    try {
      // Send a POST request to the '/api/register' endpoint
      const response = await fetch('http://localhost:8080/api/register', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(data), // Convert data to JSON format
      });

      // Check the response status
      if (response.ok) {
          console.log('User registered successfully');
      } else {
          console.log('Failed to register user', response.status);
      }
    } catch (error) {
        console.error('Error:', error);
    }
  };

  return (
    <div className="signin-container">
      <h2>Sign-up Page</h2>
      <form onSubmit={handleSubmit} className="signin-form">
        <div className="form-group">
          <label htmlFor="firstname">First Name:</label>
          <input
              type="text"
              id="firstname"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
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
        <div className="form-group">
          <label htmlFor="confirm-password">Confirm Password:</label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <button type="submit" className="signin-button">
          Sign Up
        </button>
        <text style={{marginTop:30,alignSelf:"center",color:"#71797E",padding:10}}>Already registered? Please sign-in then!</text>
        <button type="submit" className="redirect-button" onClick={()=>router.push("/signin")}>
          Redirect to Sign-in form
        </button>
      </form>
      {/* Display the error message as a popup */}
      {errorMessage && (
        <div className="error-popup">
          {errorMessage}
          <button onClick={() => setErrorMessage("")}>OK</button> {/* Close button */}
        </div>
      )}
    </div>
  );
}
