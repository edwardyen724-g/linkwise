# LinkWise

> Effortlessly manage and visualize your hierarchical linked records for research data.

**Status:** 🚧 In Development

## Problem
Data analysts struggle with cluttered outputs when managing multiple linked records, resulting in inefficient workflows. LinkWise streamlines this process to enhance visibility and management of complex data relationships.

## MVP Features
- Hierarchical tree view for visualizing linked records
- Simple drag-and-drop interface for reorganizing linked records
- Customizable filters for quickly accessing specific data subsets
- Export options to CSV and other formats for analysis
- Real-time collaboration with team members on linked records

## Tech Stack
- **Frontend:** Next.js 14 (App Router)
- **Backend:** Next.js API Routes
- **Database:** Firebase Firestore
- **Auth:** Firebase Authentication
- **Payments:** Stripe
- **Hosting:** Vercel

## Architecture Notes
Choosing Next.js allows for server-side rendering and API routes in one framework, streamlining development. Using Firebase for auth and Firestore ensures quick setup and scalability, while leveraging Vercel simplifies deployment and hosting.

## User Stories
- Visualize Linked Records
- Reorganize Linked Records
- Apply Custom Filters
- Export Data
- Collaborate in Real-Time
- User Authentication
- Manage User Roles

## Launch Checklist
- [ ] Complete UI for hierarchical tree view
- [ ] Implement user authentication with Firebase
- [ ] Set up database schema in Firestore
- [ ] Create landing page with email sign-up

## Setup
```bash
cp .env.example .env.local
# Fill in your environment variables
npm install
npm run dev
```