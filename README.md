# MERN 3D Model Viewer (React Three Fiber & Cloudinary)

A full-stack web application built with the MERN (MongoDB, Express, React, Node.js) stack to upload, manage, and display 3D models (GLB/GLTF format). It utilizes Cloudinary for cloud-based file storage and React Three Fiber for interactive 3D rendering in the browser.

## Features

*   Upload 3D models (.glb, .gltf formats).
*   Store model files efficiently on Cloudinary.
*   Manage model metadata (name, URLs) in MongoDB.
*   Display interactive 3D models using React Three Fiber.
*   Play embedded model animations.
*   Toggle helper grid visibility.
*   Toggle animations.
*   Delete models (from database and Cloudinary).

## Technologies Used

*   **Frontend:**
    *   React
    *   React Three Fiber (`@react-three/fiber`)
    *   Zustand (State Management)
    *   Axios (HTTP Requests)
*   **Backend:**
    *   Node.js
    *   Express
    *   MongoDB
    *   Multer (File Upload Handling)
*   **Database:** MongoDB
*   **File Storage:** Cloudinary

## Setup Guide

**Prerequisites:**

*   Node.js (v14.x or higher recommended)
*   MongoDB instance (local or cloud like MongoDB Atlas)
*   Cloudinary Account (get Cloud Name, API Key, API Secret)

**Steps:**

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd <repository-name>
    ```

2.  **Backend Setup:**
    *   Navigate to the backend directory:
        ```bash
        cd backend
        ```
    *   Install dependencies:
        ```bash
        npm install
        ```
    *   Create a `.env` file in the `backend` directory. Copy the following variables and replace the placeholder values with your actual credentials:
        ```ini
        # backend/.env
        PORT=5001 # Or your preferred backend port
        MONGODB_URI=your_mongodb_connection_string
        CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
        CLOUDINARY_API_KEY=your_cloudinary_api_key
        CLOUDINARY_API_SECRET=your_cloudinary_api_secret
        ```
        *(Ensure your MongoDB connection string is correct for your local or cloud instance.)*

3.  **Frontend Setup:**
    *   Navigate to the frontend directory:
        ```bash
        cd frontend
        ```
    *   Install dependencies:
        ```bash
        npm install
        ```

## Running the Application

1.  **Start the Backend Server:**
    *   Open a terminal in the `backend` directory.
    *   Run:
        ```bash
        npm run dev
        ```
    *   The backend should start, typically on `http://localhost:5001`.

2.  **Start the Frontend Development Server:**
    *   Open *another* terminal in the `frontend` directory.
    *   Run:
        ```bash
        npm run dev
        ```
    *   The frontend React app should start, typically on `http://localhost:3000`.

## Basic API Endpoints (Backend)

*   `GET /api/models`: Fetch metadata for all models.
*   `GET /api/models/:id`: Fetch metadata for a specific model by its MongoDB ID.
*   `POST /api/models/upload`: Upload a new model file (`modelFile`) and its name (`name`). Expects `multipart/form-data`.
*   `DELETE /api/models/:id`: Delete a specific model by its MongoDB ID.
