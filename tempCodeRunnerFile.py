
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
