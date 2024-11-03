import Navbar from "./components/navBar";
import "./css/homepage.css";

const courses = [
  {
    ProjectID: 1,
    Title: "Math Tutor - AI Trainer",
    Description: "Measure AI chatbot progress, evaluate logic, and solve mathematical problems.",
    Image: "https://static01.nyt.com/images/2016/09/28/us/28xp-pepefrog/28xp-pepefrog-articleLarge.jpg?quality=75&auto=webp",
    SkillsRequired: ["Mathematics", "AI", "Problem Solving"],
    ProjectType: "Full-time",
    Duration: "6 months",
    StartDate: "2024-01-01",
    EndDate: "2024-06-30",
    TeamSize: 5,
  },
  {
    ProjectID: 2,
    Title: "SEN / SEND Tutor",
    Description: "Provide tailored support for students with special needs in Oxfordshire.",
    Image: "https://static01.nyt.com/images/2016/09/28/us/28xp-pepefrog/28xp-pepefrog-articleLarge.jpg?quality=75&auto=webp",
    SkillsRequired: ["Special Education", "Teaching", "Empathy"],
    ProjectType: "Flexible Part-time",
    Duration: "3 months",
    StartDate: "2024-02-01",
    EndDate: "2024-04-30",
    TeamSize: 3,
  },
  {
    ProjectID: 3,
    Title: "SEN / SEND Tutor",
    Description: "Provide tailored support for students with special needs in Oxfordshire.",
    Image: "https://static01.nyt.com/images/2016/09/28/us/28xp-pepefrog/28xp-pepefrog-articleLarge.jpg?quality=75&auto=webp",
    SkillsRequired: ["Special Education", "Teaching", "Empathy"],
    ProjectType: "Flexible Part-time",
    Duration: "3 months",
    StartDate: "2024-02-01",
    EndDate: "2024-04-30",
    TeamSize: 3,
  },
  // Add more course objects here
];

export default function Homepage() {
  return (
    <>
      <Navbar />
      <div className="container">
        <h2 className="title">Course Finder</h2>
        <div className="courseList">
          {courses.map((course) => (
            <div key={course.ProjectID} className="courseCard" >
              <div className="courseImageWrapper">
                <img src={course.Image} alt={`${course.Title} Image`} className="courseImage" />
              </div>
              <div className="courseContent">
                <h3 className="courseTitle">{course.Title}</h3>
                <p className="courseDescription">{course.Description}</p>
                <p className="skills">
                  <strong>Skills Required:</strong> {course.SkillsRequired.join(", ")}
                </p>
                <p className="courseDetails">
                  <strong>Project Type:</strong> {course.ProjectType}
                </p>
                <p className="courseDetails">
                  <strong>Duration:</strong> {course.Duration}
                </p>
                <p className="courseDetails">
                  <strong>Start Date:</strong> {course.StartDate}
                </p>
                <p className="courseDetails">
                  <strong>End Date:</strong> {course.EndDate}
                </p>
                <p className="courseDetails">
                  <strong>Team Size:</strong> {course.TeamSize}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
