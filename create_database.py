import sqlite3

# Connect to SQLite database (or create it if it doesn't exist)
conn = sqlite3.connect('ProjectFinderDB.sqlite')
cursor = conn.cursor()

# Enable foreign key support
cursor.execute('PRAGMA foreign_keys = ON')

# Create users table with additional attributes
cursor.execute('''
    CREATE TABLE IF NOT EXISTS users (
        userid INTEGER PRIMARY KEY AUTOINCREMENT,
        firstname TEXT NOT NULL,
        surname TEXT,
        email TEXT UNIQUE,
        password_hash TEXT NOT NULL,
        university TEXT,
        program_of_study TEXT,
        study_year INTEGER,
        skills TEXT, -- Store as comma-separated values
        biography TEXT,
        profile_picture_url TEXT,
        project_participation TEXT, -- Store as comma-separated values of project IDs
        github_link TEXT,
        linkedin_link TEXT,
        looking_for_project BOOLEAN
    )
''')

# Create ads (projects) table with additional attributes
cursor.execute('''
    CREATE TABLE IF NOT EXISTS ads (
        projectid INTEGER PRIMARY KEY AUTOINCREMENT,
        created_by INTEGER NOT NULL,
        title TEXT NOT NULL,
        description TEXT,
        image TEXT,
        skills_required TEXT, -- Store as comma-separated values
        project_type TEXT,
        team_size INTEGER,
        looking_for_mentor BOOLEAN,
        FOREIGN KEY (created_by) REFERENCES users(userid)
    )
''')

# Commit changes and close connection
conn.commit()
conn.close()

print("Tables created successfully with additional attributes.")
