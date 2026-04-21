# 🏡 Chalets Booking API

A production-ready RESTful API for a chalet booking marketplace built with **Node.js**, **TypeScript**, and **MongoDB**.

🌐 **Live Demo:** https://chalets-booking-api-production.up.railway.app

---

## ✨ Features

- **JWT Authentication** with Access & Refresh Tokens
- **Role-Based Access Control** (Admin / Owner / Customer)
- **Chalet Management** with Admin approval workflow
- **Booking System** with availability check to prevent double reservations
- **Reviews & Ratings** with average score calculation
- **Image Uploads** via Cloudinary
- **Pagination & Filtering** for chalet listings
- **Rate Limiting** & Security middlewares
- **Modular Architecture**

---

## 📘 Swagger API Docs

Interactive API documentation is available via Swagger UI.

**Local**: http://localhost:4000/api-docs
**Production**: https://chalets-booking-api-production.up.railway.app/api-docs (Railway)


## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js |
| Language | TypeScript |
| Framework | Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT |
| Validation | Zod |
| File Upload | Cloudinary + Multer |
| Security | Helmet, Rate Limiting |
| Deployment | Railway + MongoDB Atlas |

---

## 📁 Project Structure

```
src/
├── modules/
│   ├── auth/         → register, login, refresh, logout
│   ├── chalets/      → CRUD + admin approval + image upload
│   ├── bookings/     → create, cancel, availability check
│   └── reviews/      → create, list, average rating
├── middlewares/      → auth, validate, upload, error
├── utils/            → asyncHandler, http, jwt, password
├── config/           → env, cloudinary
└── routes/           → health, debug
```

---

## 📌 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login |
| POST | `/api/auth/refresh` | Refresh access token |
| POST | `/api/auth/logout` | Logout |

### Chalets
| Method | Endpoint | Access |
|--------|----------|--------|
| GET | `/api/chalets` | Public |
| GET | `/api/chalets/:id` | Public |
| POST | `/api/chalets` | Owner |
| PUT | `/api/chalets/:id` | Owner |
| DELETE | `/api/chalets/:id` | Owner |
| GET | `/api/chalets/my` | Owner |
| POST | `/api/chalets/:id/images` | Owner |
| PATCH | `/api/chalets/:id/status` | Admin |

### Bookings
| Method | Endpoint | Access |
|--------|----------|--------|
| POST | `/api/bookings` | Customer |
| GET | `/api/bookings/my` | Customer |
| GET | `/api/bookings/:id` | Customer |
| PATCH | `/api/bookings/:id/cancel` | Customer |
| GET | `/api/bookings/chalet/:chaletId` | Owner |

### Reviews
| Method | Endpoint | Access |
|--------|----------|--------|
| POST | `/api/reviews` | Customer |
| GET | `/api/reviews/chalet/:chaletId` | Public |

---

## ⚙️ Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Cloudinary account

### Installation

```bash
git clone https://github.com/Shatha-AbuShammala/chalets-booking-api.git
cd chalets-booking-api
npm install
cp .env.example .env
```

### Environment Variables

```env
NODE_ENV=development
PORT=4000
MONGODB_URI=your_mongodb_uri
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Run

```bash
npm run dev    # Development
npm run build  # Build
npm start      # Production
```

---

## 🔒 Security

- JWT Authentication with short-lived access tokens
- Password hashing with bcrypt
- Rate limiting (100 requests per 15 minutes)
- Request body size limit (10kb)
- Helmet security headers
- Input validation with Zod

---

## 🌐 Deployment

- **API:** https://chalets-booking-api-production.up.railway.app
- **Database:** MongoDB Atlas
- **Images:** Cloudinary

---

## 🐳 DevOps

- Containerized using Docker
- Multi-service setup with Docker Compose (API + MongoDB)
- CI pipeline using GitHub Actions for automated builds