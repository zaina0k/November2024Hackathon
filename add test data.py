import sqlite3

# Connect to the SQLite database
conn = sqlite3.connect('ProjectFinderDB.sqlite')
cursor = conn.cursor()

# Enable foreign key support
cursor.execute('PRAGMA foreign_keys = ON')

# Insert dummy data into users table with new fields
users_data = [
    (
        'John', 'Doe', 'john.doe@example.com', 'hashed_password1', 
        'Harvard University', 'Computer Science', 3, 
        'Python, JavaScript, SQL', 'Experienced backend developer with a passion for AI.', 
        'https://example.com/john.jpg', '1,2', 
        'https://github.com/johndoe', 'https://linkedin.com/in/johndoe', 
        1  # looking_for_project=True
    ),
    (
        'Jane', 'Smith', 'jane.smith@example.com', 'hashed_password2', 
        'MIT', 'Data Science', 2, 
        'Data Analysis, Machine Learning', 'Data science enthusiast and researcher.', 
        'https://example.com/jane.jpg', '3', 
        'https://github.com/janesmith', 'https://linkedin.com/in/janesmith', 
        0  # looking_for_project=False
    ),
    (
        'Alice', 'Johnson', 'alice.johnson@example.com', 'hashed_password3', 
        'Stanford University', 'Software Engineering', 1, 
        'C++, Java', 'Software engineering student with a love for algorithms.', 
        'https://example.com/alice.jpg', '4', 
        'https://github.com/alicejohnson', 'https://linkedin.com/in/alicejohnson', 
        1  # looking_for_project=True
    ),
    (
        'Bob', 'Brown', 'bob.brown@example.com', 'hashed_password4', 
        'UC Berkeley', 'Cybersecurity', 4, 
        'Network Security, Python, SQL', 'Senior cybersecurity student interested in ethical hacking.', 
        'https://example.com/bob.jpg', '5', 
        'https://github.com/bobbrown', 'https://linkedin.com/in/bobbrown', 
        0  # looking_for_project=False
    )
]

cursor.executemany('''
    INSERT INTO users (
        firstname, surname, email, password_hash, university, 
        program_of_study, study_year, skills, biography, 
        profile_picture_url, project_participation, github_link, 
        linkedin_link, looking_for_project
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
''', users_data)

# Insert dummy data into ads table with new fields
ads_data = [
    (
        1, 'Project 1: AI Chatbot', 'Developing a chatbot using NLP for customer service.', 
        'https://example.com/chatbot.jpg', 'Python, NLP, Machine Learning', 
        'Research Project', 5, 0  # looking_for_mentor=False
    ),
    (
        2, 'Project 2: E-commerce Website', 'Building a full-stack e-commerce application.', 
        'https://example.com/ecommerce.jpg', 'JavaScript, React, SQL', 
        'Personal Project', 3, 1  # looking_for_mentor=True
    ),
    (
        3, 'Project 3: Data Visualization Tool', 'Creating tools for data analysis and visualization.', 
        'https://example.com/dataviz.jpg', 'Python, D3.js, Data Analysis', 
        'Academic Project', 4, 1  # looking_for_mentor=True
    ),
    (
        1, 'Project 4: Mobile Game', 'Developing a mobile game using Unity.', 
        'https://example.com/game.jpg', 'Unity, C#, Game Design', 
        'Personal Project', 2, 0  # looking_for_mentor=False
    )
]

cursor.executemany('''
    INSERT INTO ads (
        created_by, title, description, image, skills_required, 
        project_type, team_size, looking_for_mentor
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
''', ads_data)

# Commit changes and close the connection
conn.commit()
conn.close()

print("Dummy data inserted successfully.")
