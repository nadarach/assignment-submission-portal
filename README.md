# **Assignment Submission Portal**
This project is a backend system for an assignment submission portal. It allows users and admins to perform specific actions:

- **Users**:
  - Register and log in.
  - Upload assignments.
- **Admins**:
  - Register and log in.
  - View assignments tagged to them.
  - Accept or reject assignments.
 
---
## **Requirements**
1. **Node.js** (v14 or higher).
2. **npm** (Node Package Manager, comes with Node.js).
3. **MongoDB** (Ensure MongoDB is installed and running locally or use a cloud-hosted instance, e.g., MongoDB Atlas).
4. **Postman** (for testing API endpoints).

## **Setup Instructions**

### **1. Clone the Repository**

```bash
git clone https://github.com/nadarach/assignment-submission-portal.git
cd backend-intern-assignment
```
### **2. Install Dependencies**
```bash
npm install
```
### **3. Configure MongoDB**
#### Option 1: Local MongoDB Setup
1. Install MongoDB locally by following the official guide.
2. Start the MongoDB server:
```bash
mongod
``` 
3. By default, the MongoDB server runs on mongodb://127.0.0.1:27017.

#### Option 2: MongoDB Atlas Setup (Cloud)
1. Create an account on MongoDB Atlas.
2. Set up a free cluster and create a database.
3. Whitelist your IP address.
4. Get your MongoDB connection URL (e.g., mongodb+srv://<username>:<password>@cluster.mongodb.net/assignmentPortal).

### **4. Configure Environment Variables**
Create a `.env` file in the `config` directory and add the following :
```makefile
PORT=3000
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```
Replace `your_mongodb_connection_string` with your MongoDB connection URL and `your_jwt_secret` with a secret key for generating JWT tokens.

### **5. Start the Server**
Run the following command to start the development server:
```bash
npm run dev
```

Alternatively, to start the server in production mode:
```bash
npm start
```
The server will run on `http:localhost:3000` by default.

## **API Endpoints**
### **User Endpoints**
| Method        | Endpoint           | Description              | Request Body Example          |
| ------------- |:------------------:| ------------------------:| -----------------------------:|
| POST          | `/register`        | Register a new user.     | { "name": "John", "email": "john@example.com", "password": "123456", "role": "user" } |
| POST          | `/login`           | Log in a user.           | { "email": "john@example.com", "password": "123456" } |
| POST          | `/upload`          | Upload a new assignment. | { "task": "This is my work.", "admin": "admin_id" } |
| GET           | `/admins`          | Fetch all admins.        | None |

### **Admin Endpoints**
| Method        | Endpoint                      | Description                                | Request Body Example          |
| ------------- |:-----------------------------:| ------------------------------------------:| -----------------------------:|
| POST          | `/register`                   | Register a new admin.                      | { "name": "Admin", "email": "admin@example.com", "password": "admin123" } |
| POST          | `/login`                      | Log in an admin.                           | { "email": "admin@example.com", "password": "admin123" } |
| GET           | `/assignments`                | View assignments tagged to the admin.      | None |
| POST          | `/assignments/:id/accept`     | Accept an assignment.                      | { "status": "accepted" } |
| POST          | `/assignments/:id/reject`     | Reject an assignment.                      | { "status": "rejected" } |

```bash
backend-intern-assignment/
├── src/
│   ├── controllers/        # Controller logic
│   ├── config/             # Configuration files (# Environment variables)
│   ├── db/                 # Database connection
│   ├── middleware/         # Authentication & authorization
│   ├── models/             # Database schemas
│   ├── routes/             # API routes
│   ├── app.js              # Express app setup
│   ├── server.js           # App entry point                    
├── package.json            # Node.js dependencies
├── README.md               # Documentation
```

## **Troubleshooting**
* **MongoDB Connection Error**:
  Ensure your MongoDB instance is running and the URL in `.env` is correct.
* **JWT Error**:
  Double-check your `JWT_SECRET` value in `.env`.
* **Port Already in Use**:
  Make sure no other service is running on the specified port (default: 3000).

