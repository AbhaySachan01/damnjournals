# DamnJournals

DamnJournals is a full-stack e-commerce platform designed for selling handcrafted journals and keychains. It provides a seamless user experience from product discovery to secure checkout, along with a dedicated admin panel for efficient business operations.

## Tech Stack

- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** Firebase (Google Login + Email Verification)
- **Payments:** Razorpay
- **Media Storage:** Cloudinary

## Features

### User Features
- Browse handcrafted journals and keychains
- Add products to cart and manage orders
- Secure checkout with Razorpay integration
- Authentication via Google login and email verification

### Admin Features
- Centralized dashboard for managing products
- Inventory tracking and updates
- Order management and status updates
- Customer activity monitoring

## Project Structure


 - client/ -> React frontend
 - server/ -> Node.js backend


## Installation and Setup

### Prerequisites
- Node.js
- MongoDB
- Firebase account
- Razorpay account
- Cloudinary account

### Steps

1. Clone the repository

git clone https://github.com/abhaysachan01/damnjournals.git

cd damnjournals


2. Install dependencies

For backend:

cd server
npm install


For frontend:

cd client
npm install


3. Configure environment variables

Create a `.env` file in the server directory and add:


 - MONGO_URI=your_mongodb_connection
 - RAZORPAY_KEY=your_key
 - RAZORPAY_SECRET=your_secret
 - CLOUDINARY_CLOUD_NAME=your_cloud
 - CLOUDINARY_API_KEY=your_key
 - CLOUDINARY_API_SECRET=your_secret
 - FIREBASE_CONFIG=your_config


4. Run the application

Backend: npm start

Frontend: npm run dev


## Deployment

The application can be deployed using:
- Frontend: Vercel / Netlify
- Backend: EC2 / Render
- Database: MongoDB Atlas

## Future Improvements

- Order tracking system
- Product reviews and ratings
- Advanced analytics dashboard
- Recommendation system

## License

This project is intended for educational and portfolio purposes.
