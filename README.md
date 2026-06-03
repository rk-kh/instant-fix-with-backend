# HomeServe - Smart Home Service Booking System
## Assignment 3: MongoDB + User Auth + CRUD

---

## 📁 Folder Structure

```
assignment3/
├── app.js                        ← Main server
├── seed.js                       ← Add sample data to DB (run once)
├── package.json
│
├── models/
│   ├── User.js                   ← User schema (bcrypt password)
│   ├── Booking.js                ← Booking schema (CRUD)
│   └── Service.js                ← Service schema
│
├── middleware/
│   └── authMiddleware.js         ← JWT protect middleware
│
├── routes/
│   ├── pageRoutes.js             ← Public pages
│   ├── authRoutes.js             ← Login / Signup / Logout
│   └── bookingRoutes.js          ← Protected CRUD routes
│
├── controllers/
│   ├── pageController.js         ← Home, About, Services
│   ├── authController.js         ← Register, Login, Logout
│   └── bookingController.js      ← Create, Read, Update, Delete
│
├── views/
│   ├── partials/
│   │   ├── header.ejs
│   │   └── footer.ejs
│   ├── home.ejs
│   ├── about.ejs
│   ├── services.ejs
│   ├── login.ejs
│   ├── signup.ejs
│   └── bookings/
│       ├── index.ejs             ← Dashboard (all bookings)
│       ├── create.ejs            ← New booking form
│       └── edit.ejs              ← Edit booking form
│
└── public/
    └── css/style.css
```

---

## ▶️ How to Run

### Step 1 — Make sure MongoDB is running
```
mongod
```
Or start it from MongoDB Compass.

### Step 2 — Install dependencies
```bash
npm install
```

### Step 3 — Seed the database (run ONCE)
```bash
node seed.js
```

### Step 4 — Start the server
```bash
node app.js
```

### Step 5 — Open in browser
```
http://localhost:3000
```

---

## 🔑 How to Test

1. Go to `http://localhost:3000`
2. Click **Sign Up** → create an account
3. Click **Login** → enter your credentials
4. Click **My Bookings** → see your dashboard
5. Click **New Booking** → fill and submit form (CREATE)
6. Click ✏️ Edit → update booking (UPDATE)
7. Click 🗑️ Delete → remove booking (DELETE)
8. Click **Logout** → session ends

---

## 📦 Packages Used

| Package | Purpose |
|---|---|
| express | Web server |
| ejs | Template engine |
| mongoose | Connect to MongoDB |
| bcrypt | Hash passwords |
| jsonwebtoken | Create/verify JWT tokens |
| cookie-parser | Read cookies in Express |
