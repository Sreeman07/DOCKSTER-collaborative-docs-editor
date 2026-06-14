# DOCIFY — Collaborative Docs Editor

A full-stack document editing web application where users can create, edit, save, and delete personal documents using a rich text editor. Built with React on the frontend and Node.js + Express + MongoDB on the backend.

🔗 **Live Demo:** [dockster-collaborative-docs-editor.vercel.app](https://dockster-collaborative-docs-editor.vercel.app)  
🖥️ **Backend API:** [dockster-collaborative-docs-editor.onrender.com/api](https://dockster-collaborative-docs-editor.onrender.com/api)

---

## Features

- **User authentication** — Sign up and log in with email and password (JWT-based)
- **Rich text editing** — Full-featured WYSIWYG editor powered by Jodit React
- **Document management** — Create, view, update, and delete documents
- **Auto-save on blur** — Document content is saved automatically when the editor loses focus
- **Protected routes** — Pages are accessible only to authenticated users
- **User avatars** — Display user profile avatars via react-avatar

---

## Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 19 | UI framework |
| React Router DOM v7 | Client-side routing |
| Jodit React | Rich text (WYSIWYG) editor |
| Tailwind CSS v4 | Utility-first styling |
| React Icons | Icon library |
| React Avatar | User avatar component |
| Vite | Build tool and dev server |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express 5 | REST API server |
| MongoDB + Mongoose | Database and ODM |
| JSON Web Tokens (JWT) | Authentication |
| bcryptjs | Password hashing |
| CORS | Cross-origin resource sharing |
| dotenv | Environment variable management |

### Deployment
| Service | Purpose |
|---|---|
| Vercel | Frontend hosting |
| Render | Backend hosting |

---

## Project Structure

```
DOCIFY-collaborative-docs-editor/
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx          # Dashboard — lists all user docs
│   │   │   ├── createDocs.jsx    # Document editor page
│   │   │   ├── Login.jsx         # Login page
│   │   │   ├── SignUp.jsx        # Sign-up page
│   │   │   └── NoPage.jsx        # 404 page
│   │   ├── Components/
│   │   │   ├── NavBar.jsx        # Navigation bar
│   │   │   └── docs.jsx          # Individual document card
│   │   ├── App.jsx               # Route definitions
│   │   ├── Helper.js             # API base URL config
│   │   └── App.css
│   ├── package.json
│   └── vite.config.js
│
└── backend/
    ├── models/
    │   ├── userModel.js          # User schema (name, email, password, phone, username)
    │   └── docModel.js           # Document schema (title, content, uploadedBy, dates)
    ├── routes/
    │   ├── userRoutes.js         # /signup, /login, /getUser, /logout
    │   └── docRoutes.js          # /create, /upload, /get, /all, /delete
    ├── middleware/
    │   └── verifyToken.js        # JWT auth middleware
    ├── server.js                 # App entry point
    └── package.json
```

---

## API Reference

### User Routes — `/api/user`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/signup` | No | Register a new user |
| POST | `/login` | No | Login and receive a JWT |
| POST | `/getUser` | Yes | Get the current user's profile |
| POST | `/logout` | Yes | Logout the current user |

### Document Routes — `/api/doc`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/create` | Yes | Create a new document |
| POST | `/upload` | Yes | Update document content |
| POST | `/get` | Yes | Fetch a single document by ID |
| POST | `/all` | Yes | Fetch all documents for the current user |
| POST | `/delete` | Yes | Delete a document by ID |

> All authenticated routes require an `Authorization` header with the JWT token.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm
- A [MongoDB](https://www.mongodb.com/) database (local or MongoDB Atlas)

### 1. Clone the Repository

```bash
git clone https://github.com/Sreeman07/DOCIFY-collaborative-docs-editor.git
cd DOCIFY-collaborative-docs-editor
```

### 2. Set Up the Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Start the backend server:

```bash
node server.js
```

The backend will run on `http://localhost:5000`.

### 3. Set Up the Frontend

```bash
cd ../frontend
npm install
```

Open `src/Helper.js` and update the API base URL for local development:

```js
export const api_base_url = "http://localhost:5000/api";
```

Start the frontend dev server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## Usage

1. **Sign up** for a new account at `/signUp`
2. **Log in** at `/login` — you'll receive a JWT stored in localStorage
3. **Dashboard** — view all your documents on the home page
4. **Create a document** — click "Create New Document", enter a title, and you'll be redirected to the editor
5. **Edit** — use the Jodit rich text editor; content auto-saves when you click away
6. **Delete** — remove documents from the dashboard



---

## Author

**Sreeman07** — [GitHub Profile](https://github.com/Sreeman07)
