# SkillSphere – MERN Freelance Marketplace

SkillSphere is a full-stack freelance marketplace that connects clients with freelancers. Clients can post gigs, review applications, and hire freelancers, while freelancers can build professional profiles, browse gigs, and apply for opportunities.

## Features

### Authentication
- JWT-based authentication
- Secure login and registration
- Role-based access control
- Protected routes

### Client Features
- Dashboard
- Create, edit, and delete gigs
- View posted gigs
- Review freelancer applications
- Approve or reject applications
- Contact approved freelancers

### Freelancer Features
- Complete professional profile
- Profile completion indicator
- Browse available gigs
- Search and filter gigs
- Apply for gigs
- Track application status
- Contact client after approval

### Gig Management
- Title
- Description
- Budget
- Location
- Category
- Experience Level
- Skills Required
- Deadline

## Tech Stack

### Frontend
- React.js
- React Router
- Context API
- Axios
- Tailwind CSS
- React Toastify
- Lucide React

### Backend
- Node.js
- Express.js
- JWT Authentication
- bcrypt
- REST API

### Database
- MongoDB
- Mongoose

## Project Workflow

Client
```
Create Gig
      ↓
Receive Applications
      ↓
Review Freelancer Profile
      ↓
Approve / Reject
      ↓
Contact Freelancer
```

Freelancer
```
Complete Profile
      ↓
Browse Gigs
      ↓
Apply
      ↓
Track Status
      ↓
Contact Client
```

## Project Structure

```
SkillSphere/
│
├── client/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── services/
│   └── context/
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   └── server.js
│
└── README.md
```

## Installation

### Clone Repository

```bash
git clone https://github.com/<your-username>/SkillSphere.git
```

### Install Dependencies

Client

```bash
cd client
npm install
```

Server

```bash
cd server
npm install
```

### Environment Variables

Create a `.env` file inside the server folder.

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### Run the Backend

```bash
npm run dev
```

### Run the Frontend

```bash
npm run dev
```

## Screenshots

Add screenshots here after deployment.

- Login
- Dashboard
- Browse Gigs
- Gig Details
- Profile
- My Applications
- Received Applications

## Future Enhancements

- Real-time chat
- Email notifications
- Resume upload
- Portfolio upload
- Ratings and reviews
- Payment integration
- Admin dashboard

## Author

**Amritalakshmi M**

GitHub: https://github.com/amritalakshmim