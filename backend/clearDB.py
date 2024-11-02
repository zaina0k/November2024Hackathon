import sqlite3

# Connect to the SQLite database
conn = sqlite3.connect('ProjectFinderDB.sqlite')
cursor = conn.cursor()

# Enable foreign key support
cursor.execute('PRAGMA foreign_keys = ON')

# Clear data from ads table
cursor.execute('DELETE FROM ads')

# Clear data from users table
cursor.execute('DELETE FROM users')

# Commit changes and close the connection
conn.commit()
conn.close()

print("All data cleared from ads and users tables.")
