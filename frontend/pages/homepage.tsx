import Navbar from "./components/navBar";
import "./css/homepage.css";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Homepage() {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/ads"); // Adjust the URL to match your Flask server's address
        setAds(response.data);
        console.log("Fetched ads:", response.data);
      } catch (error) {
        console.error("Error fetching ads:", error);
      }
    };

    fetchAds();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        <h2 className="title">Project Finder</h2>
        <div className="adList">
          {ads.map((ad) => (
            <div key={ad.projectid} className="adCard">
              <div className="adImageWrapper">
                <img src={ad.image} alt={`${ad.title} Image`} className="adImage" />
              </div>
              <div className="adContent">
                <h3 className="adTitle">{ad.title}</h3>
                <p className="adDescription">{ad.description}</p>
                <p className="skills">
                  <strong>Skills Required:</strong> {ad.skills_required}
                </p>
                <p className="adDetails">
                  <strong>Project Type:</strong> {ad.project_type}
                </p>
                <p className="adDetails">
                  <strong>Team Size:</strong> {ad.team_size}
                </p>
                <p className="adDetails">
                  <strong>Looking for Mentor:</strong> {ad.looking_for_mentor ? "Yes" : "No"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
