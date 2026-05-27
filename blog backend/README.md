# Blog Backend API

A RESTful API for a blog application built with Node.js and Express, featuring user authentication, article management, and admin controls.

## Features

- **User Authentication**: JWT-based authentication with login and registration
- **Article Management**: Create, read, update, and delete articles
- **Role-Based Access**: Author and admin specific endpoints
- **File Uploads**: Integration with Cloudinary for image uploads
- **User Profiles**: User profile management and article authorship

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **File Upload**: Cloudinary with Multer middleware
- **Authentication**: JWT tokens

## Project Structure

```
blog backend/
├── APIs/              # API endpoint handlers
│   ├── AdminApi.js    # Admin-specific endpoints
│   ├── AuthorApi.js   # Author article management
│   ├── CommonApi.js   # Public endpoints
│   └── UserApi.js     # User profile endpoints
├── config/            # Configuration files
│   ├── cloudinary.js
│   ├── cloudinaryUpload.js
│   └── multer.js
├── middleware/        # Express middleware
│   ├── checkAuthor.js
│   └── verifyToken.js
├── models/            # Database models
│   ├── ArticleModel.js
│   └── UserModel.js
├── services/          # Business logic
│   └── authService.js
├── server.js          # Main application file
└── package.json
```

## Installation

1. **Navigate to backend directory**
   ```bash
   cd blog\ backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file with:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   CLOUDINARY_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

4. **Start the server**
   ```bash
   npm start
   ```

Server runs on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login user

### Common Endpoints
- `GET /articles` - Get all articles
- `GET /articles/:id` - Get article by ID

### Author Endpoints
- `POST /articles` - Create new article (protected)
- `PUT /articles/:id` - Update article (protected)
- `DELETE /articles/:id` - Delete article (protected)

### Admin Endpoints
- Admin-specific management endpoints

### User Endpoints
- `GET /users/:id` - Get user profile
- `PUT /users/:id` - Update user profile

## Middleware

- **verifyToken.js** - JWT token verification for protected routes
- **checkAuthor.js** - Authorization check for author operations

## Database Models

### UserModel
- User authentication and profile information
- Email, password, username
- Author metadata

### ArticleModel
- Article content and metadata
- Author reference
- Creation and update timestamps
- Category and tags

## Deployment

Configured for deployment on Render. See `render.yaml` for deployment settings.

## Development

```bash
npm run dev
```

## License

MIT License
