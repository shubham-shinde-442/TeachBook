# Welcome to TeachBook

TeachBook is a MERN stack web application designed to streamline appointment scheduling between students, teachers, and administrators. It provides a user-friendly platform for students to book appointments with teachers, teachers to manage their schedules, and admins to oversee all appointments. The application supports role-based authentication and messaging features, ensuring secure and efficient communication within an educational institution.

## Definition

TeachBook is a full-stack appointment management system built with MongoDB, Express.js, React, and Node.js. It enables students to request appointments with teachers, allows teachers to accept or reject appointments based on availability, and provides admins with comprehensive oversight of all appointments. The system uses JSON Web Tokens (JWT) for secure authentication and Cloudinary for managing teacher profile images. Deployed on Render, TeachBook consists of a backend service, a student-facing frontend, and a dedicated dashboard for teachers and admins.

## Features

- **Role-Based Authentication**:
  - **User (Student)**:
    - Log in and register with email and password.
    - Request appointments with specific teachers.
    - View the status of their appointments (Pending, Accepted, Rejected).
  - **Teacher**:
    - Log in to view incoming appointment requests from students.
    - Accept or reject appointments based on availability.
    - Manage their profile, including uploaded images via Cloudinary.
  - **Admin**:
    - Log in and register new admins or teachers.
    - View and manage all appointments across the system.
    - Oversee teacher and student interactions.
- **Messages**:
  - Users (students) can send messages to admins and teachers.
  - Teachers and admins can view messages sent by students.
- **Responsive Design**: Built with React for a seamless experience across devices.
- **Secure Authentication**: Uses JWT tokens (`studentToken`, `teacherToken`, `adminToken`) stored in HTTP-only cookies for secure access.
- **Cloudinary Integration**: Supports image uploads for teacher profiles.

## Outputs
![123](https://github.com/shubham-shinde-442/Student-Appointment-Booking-System/assets/123376721/329ed6a8-4317-407d-8b13-606693f20798)
![admin](https://github.com/shubham-shinde-442/Student-Appointment-Booking-System/assets/123376721/62bd52f3-557b-47c6-baca-4f4a17711f72)
![register](https://github.com/shubham-shinde-442/Student-Appointment-Booking-System/assets/123376721/1ba95f0d-d50c-47f4-9930-6a303c5263c1)![teachers](https://github.com/shubham-shinde-442/Student-Appointment-Booking-System/assets/123376721/acdf5d4c-7402-4684-8185-d5f5ed2b9321)
![message](https://github.com/shubham-shinde-442/Student-Appointment-Booking-System/assets/123376721/2445cc5a-d523-4d87-8261-f2592472cc1f)
![teachers](https://github.com/shubham-shinde-442/Student-Appointment-Booking-System/assets/123376721/84494733-62b4-47c0-b2da-04bbbd67f64b)




## Installation
To set up this Project, follow these steps:
1. Clone this repository to your local machine.
2. Install the required dependencies by running `npm install`.
3. Configure the database and environment variables.
4. Start the application by running `npm run dev`.
5. Access the application through your web browser.

## Deployed Links -

- Frontend (Student)
[https://teachbook-user.onrender.com](https://teachbook-user.onrender.com)

- Dashboard (Teacher/Admin)
[https://teachbook-dashboard.onrender.com](https://teachbook-dashboard.onrender.com)


## Technologies Used
- Frontend: React js
- Backend: Node.js, Express.js
- Database: MongoDB Atlas
- Authentication: JSON Web Tokens (JWT)
