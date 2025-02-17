# Fullstack Web Application


A full-stack web application built with React for the frontend and Node.js/Express for the backend. It allows users to book appointments with doctors and provides an admin interface to manage doctors and appointments.

---
## 🖼️ **Screenshots**

![Home Page](https://github.com/medhatjachour/doctorApp/blob/main/samples/1.png?raw=true)
*Home Page - Browse doctors and book appointments.*

![Doctor Profile](https://github.com/medhatjachour/doctorApp/blob/main/samples/2.png?raw=true)
*Doctor Profile - View doctor details and available slots.*

![Appointment Booking](https://github.com/medhatjachour/doctorApp/blob/main/samples/3.png?raw=true)
*Appointment Booking - Select a time slot and confirm your appointment.*

___

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation and Setup](#installation-and-setup)
- [Usage](#usage)
- [File Structure](#file-structure)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

---

## Introduction

This project is a full-stack web application designed to streamline the process of booking appointments with doctors. It includes a user-friendly interface for patients and a robust admin panel for managing doctors and appointments.

---

## Features

### User Interface
- View landing page.
- Create an account or log in.
- Browse available doctors.
- Book, view, and manage appointments.
- Access additional pages like About and Contact.

### Admin and Doctor Interface
- Admin login.
- Dashboard to view system status and latest bookings.
- Manage appointments.
- Add, update, and delete doctors.

---

## Technology Stack

### Frontend
- **React** - Frontend library.
- **Context API** - State management.
- **Tailwind CSS** - Styling.
- **React Router DOM** - Routing.
- **Axios** - HTTP requests.

### Backend
- **Node.js** - Runtime environment.
- **Express.js** - Web framework.
- **Mongoose** - MongoDB object modeling.
- **MongoDB** - Database.
- **JSON Web Token (JWT)** - Authentication.
- **Cloudinary** - Image storage.

---

## Installation and Setup

### Prerequisites
- Node.js
- MongoDB

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/medhatjachour/doctorApp.git
   cd doctorApp
   ```
   
2. Install dependencies for both frontend and backend::
   ```bash
        cd frontend
        npm install
        cd backend
        npm install
        cd backend
        npm install
    ```
3. Create a .env file in the backend  directory and add the following:
   1- frontend directory
   ```bash
        VITE_BACKEND_URL='http://localhost:4000/'
    ```
    2- admin directory
   ```bash
        VITE_BACKEND_URL='http://localhost:4000/'
    ```
    2- backend directory
   ```bash
        MONGOdB_URL = 
        CLOUDINARY_NAME = 'YOUR_CLOUDINARY_NAME'
        CLOUDINARY_API_KEY = 'YOUR_CLOUDINARY_API_KEY'
        CLOUDINARY_SECRET_KEY = 'YOUR_CLOUDINARY_CLOUDINARY_SECRET_KEY_KEY'
        ADMIN_EMAIL = "ADMINpASSWORD@MEGA.COM"
        ADMIN_PASSWORD = "ADMINpASSWORD"
        JWT_SECRET = "ANY_SECRET"
        STRIPE_SECRET_KEY='STRIPE_SECRET_KEY'
        STRIPE_PUBLISH_KEY='STRIPE_PUBLISH_KEY'
        CURRENCY="USD"
    ```
4. Start the backend server:
   ```bash
      cd frontend
      npm run dev 
    ```
    new terminal
    ```bash
      cd admin
      npm run dev 
    ```
      new terminal
    ```bash
      cd admin
      npm run dev 
    ```

### File Structure

#### Frontend

├── src/
│ ├── assets/ # Pics and assets
│ ├── components/ # Reusable components
│ ├── context/ # Context API for state management
│ ├── pages/ # Application pages
│ ├── types/ # Contains all the types needed
│ ├── App.js # Main application component
│ ├── index.js # Entry point
│ └── tailwind.config.js # Tailwind CSS configuration

#### Admin

├── src/
│ ├── assets/ # Pics and assets
│ ├── components/ # Reusable components
│ ├── context/ # Context API for state management
│ ├── pages/ # Application pages
│ ├── types/ # Contains all the types needed
│ ├── App.js # Main application component
│ ├── index.js # Entry point
│ └── tailwind.config.js # Tailwind CSS configuration

#### Backend

├── config/
│ ├── cloudinary.js # Cloudinary configuration
│ └── db.js # MongoDB connection
├── controllers/
│ ├── adminController.js # Admin logic
│ ├── doctorController.js # Doctor logic
│ └── userController.js # User logic
├── middlewares/ # Custom middlewares
├── models/
│ ├── User.js # User model
│ ├── Doctor.js # Doctor model
│ └── Appointment.js # Appointment model
├── routes/
│ ├── adminRoutes.js # Admin routes
│ ├── doctorRoutes.js # Doctor routes
│ └── userRoutes.js # User routes
└── server.js # Entry point


## User Endpoints
- **POST /api/user/users/register** - Register a new user.
- **POST /api/user/users/login** - Log in a user.
- **POST /api/user/update-profile** -  update profile.
- **GET /api/user/get-profile** -  get profile.
- **GET /api/user/appointments** - Get appointments
- **POST /api/user/book-appointment** -  book appointment.
- **POST /api/user/cancel-appointment** - Cancel  appointment.
- **POST /api/user/pay-appointment** - pay appointment.
- **POST /api/user/verify-appointment** - verify appointment.

## Admin Endpoints
- **POST /api/admin/login** - Log in a admin.
- **POST /api/admin/add-doctor** - Add a new doctor.
- **GET /api/admin/all-doctors** - Fetch all doctors.
- **POST /api/admin/change-availability** - Update a doctor change-availability.
- **GET /api/admin/all-appointments** - Fetch all appointments
- **POST /api/admin/cancel-appointments** - cancel appointments
- **GET /api/admin/dashboard** - Fetch dashboard 

## Doctor Endpoints
- **POST /api/doctor/login** - Log in a doctor.
- **GET /api/doctor/list** - Fetch all doctors.
- **GET /api/doctor/appointments** - Fetch all appointments
- **POST /api/doctor/cancel-appointments** - cancel appointments
- **POST /api/doctor/complete-appointments** - complete appointments
- **GET /api/doctor/dashboard** - Fetch dashboard 
- **POST /api/doctor/change-availability** - Update a doctor change-availability.
- **POST /api/doctor/update-profile** -  update profile.
- **GET /api/doctor/get-profile** -  get profile.
---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeatureName`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeatureName`).
5. Open a Pull Request.

---

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

## Contact

For questions or feedback, reach out:  
- **Your Name** - [medhatashour19@gmail.com](mailto:medhatashour19@gmail.com)  
- **Project Link** - [medhatjachour](medhatjachour)  