# RSVP Tracker

RSVP Tracker is a web-based application designed for managing event registrations and tracking responses effectively. The project is divided into two main components:
- **Frontend**: Developed with React and deployed on [Vercel](https://vercel.com).
- **Backend**: Built with Node.js and Express, deployed on [Render](https://render.com).

---

## Features

### Frontend
- User Registration and Login.
- Responsive Design for mobile and desktop users.
- Event creation and sharing with a unique link.
- Event response management for organizers.

### Backend
- Secure authentication with JWT.
- CRUD operations for managing events.
- Token-based protected routes.
- MongoDB integration for storing user and event data.

---

## Tech Stack

### Frontend
- **React**: Component-based UI development.
- **Tailwind CSS**: Styling and responsive design.
- **Vercel**: Deployment and hosting.

### Backend
- **Node.js**: Backend runtime environment.
- **Express.js**: Framework for API development.
- **MongoDB Atlas**: Cloud-based NoSQL database.
- **Render**: Deployment and hosting.

---

## Installation and Setup

### Prerequisites
- Node.js and npm installed.
- MongoDB Atlas account.
- Vercel and Render accounts.

### Cloning the Repository
```bash
git clone <repository-url>
cd RSVP-Tracker
```

### Backend Setup
1. Navigate to the `event-rsvp-backend` folder:
   ```bash
   cd event-rsvp-backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with the following variables:
   ```env
   MONGO_URI=<Your MongoDB connection string>
   JWT_SECRET=<Your JWT secret>
   PORT=5000
   ```
4. Start the server locally:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the `event-rsvp-tracker` folder:
   ```bash
   cd event-rsvp-tracker
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with the following variable:
   ```env
   VITE_API_BASE_URL=<Your Backend URL>
   ```
4. Start the development server locally:
   ```bash
   npm run dev
   ```

---

## Deployment

### Backend on Render
1. Log in to Render and create a new Web Service.
2. Connect your repository and select the `event-rsvp-backend` folder.
3. Set environment variables in the Render dashboard.
4. Deploy the service.

### Frontend on Vercel
1. Log in to Vercel and create a new project.
2. Connect your repository and select the `event-rsvp-tracker` folder.
3. Set the `VITE_API_BASE_URL` environment variable in the Vercel dashboard.
4. Deploy the application.

---

## API Endpoints

### Authentication
- **POST** `/api/auth/register`: Register a new user.
- **POST** `/api/auth/login`: Authenticate user and return a token.

### Events
- **POST** `/api/events`: Create a new event (protected).
- **GET** `/api/events`: Get all events created by the user (protected).
- **GET** `/api/events/:id`: Get details of a specific event.
- **DELETE** `/api/events/:id`: Delete an event (protected).

---

## Usage
1. Register or log in using the frontend.
2. Create an event and share the unique link with invitees.
3. Track responses via the dashboard.


## Screenshots
### Welcome Screen
![Welocme Screen](https://github.com/user-attachments/assets/76c2fd89-0452-419f-869e-4d57db1b6219)

### Home Page
![Home Page](https://github.com/user-attachments/assets/0fb8d0af-0b27-4d1e-b6f2-ec82466e5ae2)

### Create Event Page
![Create Event](https://github.com/user-attachments/assets/9f57a871-7378-42ef-9adc-94ffed073769)

### My Events
![My Events](https://github.com/user-attachments/assets/d26eb526-32e4-4b7c-8477-5a7c9e0a8d54)

### Responses Dashboard
![Responses Dashboard](https://github.com/user-attachments/assets/1ace3fe8-03a5-47e0-b90d-5a514a39a212)

### Shareable Response form
![Shareable Response form](https://github.com/user-attachments/assets/1c0e9845-9722-4c41-8bfe-61d6a9b0946e)

---

## Contributing
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit changes:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Create a Pull Request.

---

## License
This project is licensed under the MIT License.

---

## Acknowledgments
- Inspiration and support from the developer community.
- Thanks to [Vercel](https://vercel.com) and [Render](https://render.com) for hosting services.
