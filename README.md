# X-Next Clone
## Overview
X-Next is a Twitter (X) clone built with Next.js and Firebase, offering real-time features such as posting tweets, uploading images, commenting, and liking posts. Authentication is handled via Google using NextAuth.js, and the application ensures a seamless user experience with responsive design, state management using Recoil, and a dynamic UI.

## Live Demo
You can view the live demo here (https://x-next-woad.vercel.app).

## Tech Stack
Frontend: Next.js, Tailwind CSS
Backend: Firebase (Firestore, Storage)
Authentication: NextAuth.js with Google Provider
State Management: Recoil
Icons: React Icons (HiIcons)

## Key Features
Google Authentication: Users can sign in via Google, with their profile information dynamically reflected in posts and comments.
Post & Feed System: Users can create posts with text and images, and the feed updates in real-time.
Comment & Like: Users can like and comment on posts, with all interactions tracked in Firebase.
Modal System: Comment modal pops up using Recoil's state management for smooth and intuitive interaction.
Image Upload: Users can upload images to Firebase Storage and display them in their posts.
Responsive Design: Tailwind CSS ensures the app is fully responsive and optimized for mobile and desktop devices.

## Usage
Sign In: Authenticate via Google to access the app's features.
Create a Post: Add a tweet with text and/or images and submit it to the feed, which updates in real time.
Like & Comment: Engage with posts by liking or commenting. Comments can be added via a modal popup for a better experience.
Upload Images: Upload images alongside your post using Firebase Storage.

## Deployment
This project uses Firebase for backend services and can be deployed on platforms such as Vercel. Ensure the following environment variables are set:
Firebase API keys
NextAuth.js Google Provider credentials

## License
This project is licensed under the MIT License.
