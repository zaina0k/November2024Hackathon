"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if token exists in localStorage to determine login status
    const token = localStorage.getItem('access_token');
    // WORKINGCODE setIsLoggedIn(!!token); // Set to true if token exists, otherwise false
    setIsLoggedIn(true); // for testing
  }, []);

  const handleLogout = () => {
    // Clear the token from localStorage and update the state
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_id');
    setIsLoggedIn(false);
    router.push('/signin'); // Redirect to sign-in page after logout
  };

  const navigateTo = (path: string) => {
    if (path === '/profile' && !isLoggedIn) {
      // If user tries to access the profile page without being logged in, redirect to sign-up
      router.push('/signup');
    } else {
      router.push(path);
    }
  };

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      padding: '10px 20px',
      alignItems: 'center',
      borderBottom: '1px solid #ccc'
    }}>
      <div style={{ fontWeight: 'bold', fontSize: '1.5rem', color: '#0044cc', cursor: 'pointer' }} onClick={() => navigateTo('/')}>
        Project Finder
      </div>
      <div>
        
        {isLoggedIn ? (
          <>
            <button
              onClick={() => navigateTo('/project-finder')}
              style={{
                margin: '0 10px',
                padding: '8px 12px',
                backgroundColor: '#0044cc',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Project Finder
            </button>
            <button
              onClick={() => navigateTo('/people-search')}
              style={{
                margin: '0 10px',
                padding: '8px 12px',
                backgroundColor: '#0044cc',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              People Finder
            </button>

            <button
              onClick={() => navigateTo('/profile')}
              style={{
                margin: '0 10px',
                padding: '8px 12px',
                backgroundColor: '#0044cc',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Profile
            </button>

            <button
              onClick={handleLogout}
              style={{
                marginLeft: '10px',
                padding: '8px 12px',
                backgroundColor: '#ff4d4d',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            {/* Displays when the user is not logged in */}
            <button
              onClick={() => navigateTo('/signin')}
              style={{
                margin: '0 10px',
                padding: '8px 12px',
                backgroundColor: '#666',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Sign in
            </button>

            <button
              onClick={() => navigateTo('/signup')}
              style={{
                margin: '0 10px',
                padding: '8px 12px',
                backgroundColor: '#fff',
                color: '#000',
                borderWidth: '2px',
                borderColor:'#111',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Sign up
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;


