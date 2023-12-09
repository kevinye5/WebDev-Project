import pandas as pd
import pymongo
from pymongo import MongoClient


# MongoDB connection
uri = 'mongodb://admin:Sp00ky!@localhost:27017/?authSource=admin'
client = MongoClient(uri)

# Create or switch to a database
db = client['BooksLibrary']

# Define the schema for the collection
schema = {
    'ISBN': {'type': 'string'},
    'Book id': {'type': 'string'},
    'Book-Title': {'type': 'string'},
    'Book-Author': {'type': 'string'},
    'Year-Of-Publication': {'type': 'int'},
    'Publisher': {'type': 'string'},
    'Image-URL-S': {'type': 'string'},
    'Image-URL-M': {'type': 'string'},
    'Image-URL-L': {'type': 'string'}
}

# Create a collection
collection = db['WebDevAssignment']

# Load and transform data from CSV to a DataFrame
df = pd.read_csv('books.csv', sep=',', encoding='latin-1', error_bad_lines=False)

# Transform data to match the schema
# ...

# Convert DataFrame to list of dictionaries (assuming 'data' is the transformed DataFrame)
data = df.to_dict(orient='records')

# Insert data into MongoDB collection
collection.insert_many(data)

# New document example
new_doc = {
    "ISBN": "1234567890",
    "Book id": "B1234",
    "Book-Title": "Sample Book Title",
    "Book-Author": "John Doe",
    "Year-Of-Publication": 2022,
    "Publisher": "Sample Publisher",
    "Image-URL-S": "https://example.com/image_s",
    "Image-URL-M": "https://example.com/image_m",
    "Image-URL-L": "https://example.com/image_l"
}


#1 Selection of all documents in a collection
all_documents = collection.find()

for doc in all_documents:
    print(doc)




# Insert new document into MongoDB collection
#collection.insert_one(new_doc)

# Update statement
#collection.update_one({"bite_date": "YYYY-MM-DD"}, {"$set": {"animal.species": "UpdatedSpecies"}})

# Delete statement
#collection.delete_one({"bite_date": "YYYY-MM-DD"})
