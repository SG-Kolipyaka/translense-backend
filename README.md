# translense-backend

Translense Backend is a Node.js With Express application that serves as the backend for managing properties and businesses. It allows users to create, read, update, and delete (CRUD) properties and businesses, with support for image uploads.


## Features

- User authentication (with JWT)
- CRUD operations for properties and businesses
- Image uploads for properties and businesses
- Validation for email and other fields
- Data storage using MongoDB

## Technologies Used

- **Node.js**: JavaScript runtime for building server-side applications.
- **Express**: Web framework for Node.js.
- **Mongoose**: ODM for MongoDB and Node.js.
- **Multer**: Middleware for handling `multipart/form-data`, primarily used for file uploads.
- **Cors**: Package for enabling Cross-Origin Resource Sharing.
- **dotenv**: Module for loading environment variables.

## Installation

1. Clone the repository:
   ```bash
   git clone
   cd translense-backend


npm install
npm start


1. Create a Business
Endpoint: POST /api/business/add
Description: Create a new business with image upload.
Request Body
Form Data: Include an image file under the key image.

2. Retrieve All Businesses
Endpoint: GET /api/business/all
Description: Retrieve a list of all businesses.

3. Retrieve a Business by ID
Endpoint: GET /api/business/:businessId
Description: Retrieve a specific business by ID.

4. Update a Business
Endpoint: PATCH /api/business/update/:businessId
Description: Update a specific business by ID.
Request Body: Same as Create a Business. Include image in form data if updating the image.

5. Delete a Business
Endpoint: DELETE /api/business/delete/:businessId
Description: Delete a specific business by ID.


1. Create Owner
Endpoint: POST /api/owner/add
Description: Creates a new owner record.
Request Body: Form data
full_name: String, required
profile_image: File, required
state: String, required
city: String, required
country: String, required
address: String, required
email: String, required, must be unique
mobile_number: Number, required

2. Get All Owners
Endpoint: GET /api/owner/all
Description: Retrieves all owner records.

3. Get Owner by ID
Endpoint: GET /api/owner/:ownerId
Description: Retrieves a specific owner record by ID.

4. Update Owner
Endpoint: PATCH /api/owner/update/:ownerId
Description: Updates an existing owner record.
Request Body: Form data
All fields are optional; only include the ones you wish to update.

5. Delete Owner
Endpoint: DELETE /api/owner/delete/:ownerId
Description: Deletes an owner record by ID.

6. ### Add Owner to Business

- **Endpoint:** `PATCH /api/business/add-owner/:businessId`
- **Description:** Adds an `ownerId` to a specific business.
- **Request Body:** JSON
  - `ownerId`: String, required (must be a valid ObjectId corresponding to an owner)

### Note on Image Uploads
When creating or updating a business or property that includes an image upload, you must use **form data** in Postman instead of JSON. Here's how to do it:

1. Select the **Body** tab in Postman.
2. Choose the **form-data** option.
3. Add the following key-value pairs:
   - For text fields (e.g., `name`, `country`, etc.), add them as usual with their corresponding values.
   - For the image upload, add a key named `image`, set the type to **File**, and choose the image file you wish to upload.