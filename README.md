# Zaderi Technologies Admin Panel

A comprehensive admin panel for managing the Zaderi Technologies website, including content management, form submissions, and user administration.

## Features

- **Authentication System**: Secure login with JWT tokens
- **Form Management**: View and manage contact form and demo request submissions
- **Content Management**: Edit website content (hero section, about section, etc.)
- **User Management**: Create, edit, and manage admin users
- **Dashboard Overview**: Statistics and recent activity
- **Responsive Design**: Works on desktop and mobile devices

## Default Admin Credentials

- **Username**: `admin`
- **Password**: `hOst@2026`

## Setup Instructions

### 1. Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### 2. Environment Configuration

Create a `.env` file in the `server` directory:

```env
PORT=3001
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

### 3. Run the Application

#### Development Mode (Frontend + Backend)
```bash
npm run fullstack
```

This will start both the React frontend on port 5173 and the Express backend on port 3001.

#### Production Build
```bash
npm run build:full
```

### 4. Access the Admin Panel

- **Frontend**: `http://localhost:5173`
- **Admin Panel**: `http://localhost:5173/adminpanel`
- **API**: `http://localhost:3001/api`

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user info

### Forms
- `GET /api/forms` - Get all form submissions
- `POST /api/forms` - Submit a new form (public)
- `PUT /api/forms/:id` - Update form status
- `DELETE /api/forms/:id` - Delete a form

### Users (Admin Only)
- `GET /api/users` - Get all users
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Content Management
- `GET /api/content` - Get website content
- `PUT /api/content` - Update website content

### File Upload
- `POST /api/upload` - Upload files

## Project Structure

```
zaderi-retail-experience/
├── server/                    # Backend server
│   ├── server.js             # Main server file
│   ├── package.json          # Server dependencies
│   └── data/                 # Data storage (JSON files)
│       ├── users.json        # Admin users
│       ├── forms.json        # Form submissions
│       └── content.json      # Website content
├── src/
│   ├── pages/
│   │   └── admin/            # Admin panel components
│   │       ├── AdminLogin.tsx
│   │       └── AdminDashboard.tsx
│   └── components/           # Frontend components
├── public/                   # Static assets
└── package.json              # Frontend dependencies
```

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control
- CORS protection
- Input validation

## Data Storage

The application uses JSON file storage for simplicity. In production, consider using:
- PostgreSQL or MySQL for relational data
- MongoDB for document storage
- Redis for session management

## Deployment

### Frontend
```bash
npm run build
# Deploy the 'dist' folder to your web server
```

### Backend
```bash
cd server
npm start
# Use PM2 or similar for production process management
```

### Full Stack Deployment
Consider using services like:
- Vercel + Railway
- Netlify + Heroku
- DigitalOcean App Platform
- AWS/GCP/Azure

## Development

### Adding New Admin Features

1. Add API endpoints in `server/server.js`
2. Create UI components in `src/pages/admin/`
3. Update the dashboard navigation
4. Add proper authentication checks

### Content Management

The content management system allows editing:
- Hero section title and subtitle
- About section content
- Statistics and metrics
- Other website content

### User Management

Admin users can:
- Create new admin accounts
- Change passwords
- Assign roles (admin/user)
- Delete users (except the default admin)

## Troubleshooting

### Common Issues

1. **CORS Errors**: Make sure the backend is running on the correct port
2. **Authentication Issues**: Check JWT token expiration
3. **File Upload Errors**: Ensure upload directories exist
4. **Database Errors**: Check file permissions for JSON data files

### Logs

Check the terminal/console for:
- Server startup messages
- API request/response logs
- Authentication errors
- File system errors

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is proprietary to Zaderi Technologies Ltd.

## Support

For technical support, contact the development team or create an issue in the repository.
