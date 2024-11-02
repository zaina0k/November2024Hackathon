import sqlite3

# Connect to the SQLite database
conn = sqlite3.connect('ProjectFinderDB.sqlite')
cursor = conn.cursor()

# Enable foreign key support
cursor.execute('PRAGMA foreign_keys = ON')

# Insert dummy data into users table
users_data = [
    ('John', 'Doe', 'hashed_password1', 'john.doe@example.com'),
    ('Jane', 'Smith', 'hashed_password2', 'jane.smith@example.com'),
    ('Alice', 'Johnson', 'hashed_password3', 'alice.johnson@example.com'),
    ('Bob', 'Brown', 'hashed_password4', 'bob.brown@example.com')
]

cursor.executemany('''
    INSERT INTO users (firstname, lastname, password_hash, email)
    VALUES (?, ?, ?, ?)
''', users_data)

# Insert dummy data into ads table
ads_data = [
    (1, 'Ad Title 1', 'Description for Ad 1 posted by John Doe'),
    (2, 'Ad Title 2', 'Description for Ad 2 posted by Jane Smith'),
    (3, 'Ad Title 3', 'Description for Ad 3 posted by Alice Johnson'),
    (1, 'Ad Title 4', 'Description for Ad 4 posted by John Doe')
]

cursor.executemany('''
    INSERT INTO ads (created_by, title, description)
    VALUES (?, ?, ?)
''', ads_data)

# Commit changes and close the connection
conn.commit()
conn.close()

print("Dummy data inserted successfully.")
