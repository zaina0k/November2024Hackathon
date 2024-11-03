import React, { useEffect, useState } from 'react';
import Navbar from "./components/navBar";
import "./css/contributersExplorer.css";

export default function ContributorsExplorer() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/users', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Adjust according to your auth method
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }

        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleProfileClick = (userid) => {
    // Redirect to ProfileViewer with user ID
    window.location.href = `/profileViewer/${userid}`;
  };

  if (loading) return <div>Loading users...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Navbar />
      <div className="container">
        <h2 className="title">User Profiles</h2>
        <div className="userList">
          {users.map((user) => (
            <div key={user.userid} className="userCard" onClick={() => handleProfileClick(user.userid)}>
              <div className="profileImageWrapper">
                <img src={user.profile_picture_url} className="profileImage" alt={`${user.firstname} ${user.surname}`} />
              </div>
              <div className="profileContent">
                <h3 className="profileName">{`${user.firstname} ${user.surname}`}</h3>
                <p className="profileUniversity"><strong>University:</strong> {user.university}</p>
                <p className="profileProgram"><strong>Program of Study:</strong> {user.program_of_study}</p>
                <p className="profileYear"><strong>Year of Study:</strong> {user.study_year}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
