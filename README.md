# TâcheFlow - Smart Task Management System

A modern, full-stack task management application built specifically for students. TâcheFlow helps students organize their academic tasks efficiently with a clean, intuitive interface.

## 🌟 Features

- **User Authentication**: Secure registration and login system
- **Personal Task Management**: Each student has their own private task list
- **CRUD Operations**: Create, read, update, and delete tasks
- **Task Status Tracking**: Mark tasks as pending or completed
- **Smart Filtering**: Filter tasks by status (All, Pending, Completed)
- **Due Date Management**: Set and track task due dates with visual indicators
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Updates**: Instant updates without page refresh

## 🏗️ Technology Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **express-validator** - Input validation

### Frontend
- **React** - User interface library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Hot Toast** - Toast notifications
- **Lucide React** - Modern icon library
- **CSS3** - Custom styling with responsive design

## 📋 Prerequisites

Before running this application, make sure you have:

- **Node.js** (v14 or higher)
- **MongoDB** (local installation or MongoDB Atlas account)
- **npm** or **yarn** package manager

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd tacheflow
```

### 2. Install Dependencies
```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 3. Environment Configuration

Create a `.env` file in the `backend` directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/tacheflow
JWT_SECRET=your_super_secure_jwt_secret_key_here
NODE_ENV=development
```

**Important**: Replace `your_super_secure_jwt_secret_key_here` with a strong, unique secret key.

### 4. Database Setup

#### Option A: Local MongoDB
1. Install MongoDB on your system
2. Start MongoDB service
3. The application will automatically create the database

#### Option B: MongoDB Atlas (Cloud)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get your connection string
4. Replace `MONGODB_URI` in `.env` with your Atlas connection string

### 5. Start the Application

#### Development Mode (Recommended)
From the root directory:
```bash
npm run dev
```
This starts both backend and frontend concurrently.

#### Manual Start
```bash
# Terminal 1: Start backend
cd backend
npm run dev

# Terminal 2: Start frontend
cd frontend
npm start
```

### 6. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

## 📱 Usage Guide

### Getting Started
1. **Register**: Create a new account with your name, email, and password
2. **Login**: Sign in to access your personal dashboard
3. **Create Tasks**: Click "Add Task" to create your first task
4. **Manage Tasks**: Edit, delete, or mark tasks as completed
5. **Filter Tasks**: Use filters to view all, pending, or completed tasks

### Task Management
- **Title**: Required field (max 100 characters)
- **Description**: Optional detailed description (max 500 characters)
- **Due Date**: Set when the task should be completed
- **Status**: Toggle between pending and completed

### Dashboard Features
- **Statistics**: View total, pending, and completed task counts
- **Visual Indicators**: Color-coded cards and status indicators
- **Smart Sorting**: Tasks organized by creation date and due date
- **Responsive Layout**: Adapts to different screen sizes

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user info

### Tasks
- `GET /api/tasks` - Get user's tasks (with optional filtering)
- `POST /api/tasks` - Create new task
- `GET /api/tasks/:id` - Get specific task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `PATCH /api/tasks/:id/toggle` - Toggle task status

## 🎨 Design Features

### Color Coding
- 🔵 **Blue**: Default/Normal tasks
- 🟢 **Green**: Completed tasks
- 🔴 **Red**: Overdue tasks
- 🟡 **Yellow**: Tasks due today
- 🟣 **Purple**: Tasks due soon

### Responsive Breakpoints
- **Desktop**: 1200px and above
- **Tablet**: 768px - 1199px
- **Mobile**: 480px - 767px
- **Small Mobile**: Below 480px

## 🔒 Security Features

- Password hashing with bcryptjs
- JWT token-based authentication
- Input validation and sanitization
- Protected routes and API endpoints
- CORS configuration
- Environment variable protection

## 📝 Project Structure

```
tacheflow/
├── backend/
│   ├── controllers/     # Route handlers
│   ├── middleware/      # Custom middleware
│   ├── models/         # Database schemas
│   ├── routes/         # API routes
│   ├── .env           # Environment variables
│   ├── package.json   # Backend dependencies
│   └── server.js      # Main server file
├── frontend/
│   ├── public/        # Static files
│   ├── src/
│   │   ├── components/ # Reusable components
│   │   ├── contexts/   # React contexts
│   │   ├── pages/      # Page components
│   │   ├── services/   # API services
│   │   └── App.js      # Main app component
│   └── package.json    # Frontend dependencies
├── package.json        # Root package file
└── README.md          # Project documentation
```

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running locally
   - Check connection string in `.env`
   - Verify network access for MongoDB Atlas

2. **Port Already in Use**
   - Change PORT in backend `.env`
   - Kill process using the port: `lsof -ti:5000 | xargs kill -9`

3. **JWT Secret Error**
   - Ensure JWT_SECRET is set in `.env`
   - Use a strong, unique secret key

4. **CORS Issues**
   - Verify frontend proxy in `package.json`
   - Check CORS configuration in backend

### Development Tips
- Use browser dev tools for debugging
- Check console logs for errors
- Verify API responses in Network tab
- Test with different screen sizes

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Build the frontend: `npm run build`
2. Deploy the `build` folder
3. Set environment variables

### Backend (Render/Railway)
1. Deploy backend code
2. Set environment variables
3. Connect to MongoDB Atlas

### Environment Variables for Production
- Set `NODE_ENV=production`
- Use secure JWT secret
- Configure production MongoDB URI
- Set proper CORS origins

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🎯 Future Enhancements

- Task categories and tags
- File attachments
- Task sharing and collaboration
- Email notifications
- Calendar integration
- Advanced filtering and search
- Dark mode theme
- Mobile app version

## 💬 Support

For support or questions:
- Create an issue in the repository
- Check the troubleshooting section
- Review the API documentation

---

**TâcheFlow** - Streamline your student life with smart task management! 📚✨