import pandas as pd
import pymongo
from pymongo import MongoClient

# MongoDB connection URI
uri = 'mongodb://admin:Sp00ky!@localhost:27017/?authSource=admin'
client = MongoClient(uri)

# Create or switch to a database
db = client['BooksLibrary']

# Create or switch to a collection
collection = db['Books']

# Load data from CSV into a DataFrame
# Update the path to your CSV file if it's not in the same directory as this script
df = pd.read_csv('books.csv', sep=',', encoding='latin-1', on_bad_lines='skip')


# You might want to add here any data transformation you need.
# For example, renaming columns, handling missing values, etc.

# Convert DataFrame to list of dictionaries
data = df.to_dict(orient='records')

# Insert data into MongoDB collection
collection.insert_many(data)

print("Data inserted into MongoDB successfully.")
