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
        'https://example.com/john.jpg', 'Participated in 5 projects', 
        'https://github.com/johndoe', 'https://linkedin.com/in/johndoe', 
        1, 0, 1  # looking_for_project=True, is_mentor=False, wants_mentor=True
    ),
    (
        'Jane', 'Smith', 'jane.smith@example.com', 'hashed_password2', 
        'MIT', 'Data Science', 2, 
        'Data Analysis, Machine Learning', 'Data science enthusiast and researcher.', 
        'https://example.com/jane.jpg', 'Participated in 3 projects', 
        'https://github.com/janesmith', 'https://linkedin.com/in/janesmith', 
        0, 1, 0  # looking_for_project=False, is_mentor=True, wants_mentor=False
    ),
    (
        'Alice', 'Johnson', 'alice.johnson@example.com', 'hashed_password3', 
        'Stanford University', 'Software Engineering', 1, 
        'C++, Java', 'Software engineering student with a love for algorithms.', 
        'https://example.com/alice.jpg', 'Participated in 2 projects', 
        'https://github.com/alicejohnson', 'https://linkedin.com/in/alicejohnson', 
        1, 0, 1  # looking_for_project=True, is_mentor=False, wants_mentor=True
    ),
    (
        'Bob', 'Brown', 'bob.brown@example.com', 'hashed_password4', 
        'UC Berkeley', 'Cybersecurity', 4, 
        'Network Security, Python, SQL', 'Senior cybersecurity student interested in ethical hacking.', 
        'https://example.com/bob.jpg', 'Participated in 7 projects', 
        'https://github.com/bobbrown', 'https://linkedin.com/in/bobbrown', 
        0, 1, 0  # looking_for_project=False, is_mentor=True, wants_mentor=False
    )
]

cursor.executemany('''
    INSERT INTO users (
        firstname, surname, email, password_hash, university, 
        program_of_study, study_year, skills, biography, 
        profile_picture_url, project_participation, github_link, linkedin_link,
        looking_for_project, is_mentor, wants_mentor
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
''', users_data)

# Commit changes and close the connection
conn.commit()
conn.close()

print("Dummy data inserted successfully.")
