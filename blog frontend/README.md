# Blog Frontend

A modern, responsive React-based frontend for a blog application built with Vite. Features article browsing, user authentication, and content management.

## Features

- **User Authentication**: Login and registration with JWT support
- **Browse Articles**: View all published articles
- **Create/Edit Articles**: Write and edit articles with rich content
- **User Profiles**: View and manage user profiles
- **Author Dashboard**: View articles by specific authors
- **Protected Routes**: Secure routes requiring authentication
- **Responsive Design**: Mobile-friendly interface with grid layouts
- **Toast Notifications**: User feedback with react-hot-toast

## Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **State Management**: Zustand
- **HTTP Client**: Custom apiClient with axios
- **Notifications**: react-hot-toast
- **Linting**: ESLint

## Project Structure

```
blog frontend/
├── src/
│   ├── components/           # React components
│   │   ├── Home.jsx          # Landing & article listing
│   │   ├── ArticleByID.jsx   # Single article view
│   │   ├── WriteArticle.jsx  # Create article
│   │   ├── EditArticleForm.jsx # Edit article
│   │   ├── AuthorArticles.jsx # Author articles list
│   │   ├── AuthorProfile.jsx # Author profile
│   │   ├── UserProfile.jsx   # User profile & all articles
│   │   ├── Login.jsx         # Login form
│   │   ├── Register.jsx      # Registration form
│   │   ├── ProtectedRoute.jsx # Route protection
│   │   ├── Header.jsx        # Navigation
│   │   ├── Footer.jsx        # Footer
│   │   └── RootLayout.jsx    # Root layout
│   ├── services/             # API integration
│   │   └── apiClient.js
│   ├── store/                # Zustand state management
│   │   └── authStore.js
│   ├── styles/               # Styling
│   │   └── common.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── eslint.config.js
├── package.json
└── vercel.json
```

## Installation

1. **Navigate to frontend directory**
   ```bash
   cd blog\ frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API endpoint**
   Update `src/services/apiClient.js` with your backend URL:
   ```javascript
   const API_BASE_URL = 'http://localhost:5000';
   ```

## Development

Start the development server:
```bash
npm run dev
```

Available at `http://localhost:5173`

## Scripts

- `npm run dev` - Start dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Components

### Authentication
- **Login.jsx** - User login
- **Register.jsx** - User registration
- **ProtectedRoute.jsx** - Route protection wrapper

### Articles
- **Home.jsx** - Article listing
- **ArticleByID.jsx** - Individual article (title, content, author, timestamp in IST)
- **WriteArticle.jsx** - Create new article
- **EditArticleForm.jsx** - Edit article
- **AuthorArticles.jsx** - Articles by author

### User Features
- **UserProfile.jsx** - View all author articles in responsive grid (1-4 cards)
- **AuthorProfile.jsx** - Author's own articles in responsive grid (1-4 cards)
- **Header.jsx** - Navigation
- **Footer.jsx** - Footer
- **RootLayout.jsx** - Root wrapper

## State Management

### authStore (Zustand)
- User authentication state
- JWT token management
- User data persistence

## API Client

Custom HTTP client with:
- Authentication token injection
- Request/response interceptors
- Error handling
- Base URL configuration

## Styling

- Global styles in `src/index.css`
- Shared utilities in `src/styles/common.js`
- Responsive grid layouts (1-4 columns)

## Notifications

Using react-hot-toast:
```javascript
import toast from "react-hot-toast";
toast.success("Account created successfully");
```

Toaster configured in App.jsx:
```jsx
<Toaster position="top-center" reverseOrder={false} />
```

## Deployment

Configured for Vercel. Deploy with:
```bash
npm run build
vercel
```

## License

MIT License
