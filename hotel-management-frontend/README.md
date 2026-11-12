# StayFinder – Hotel Listing Frontend

React + Vite frontend for the hotel listing assignment. Redux Toolkit manages hotel state and browser localStorage acts as a dummy backend. No real server/database is included.

## Run locally
1. Install Node.js 18 or newer.
2. Extract the ZIP and open the `hotel-management-frontend` folder in VS Code.
3. Open a terminal in that folder (the folder containing `package.json`).
4. Run `npm install` and then `npm run dev`.
5. Open the localhost URL printed by Vite (usually http://localhost:5173).

## Two interfaces
- **User page**: `/` — browse hotel cards, search, price filter, pagination and view details/map. Users cannot add, edit or delete hotels.
- **Admin login**: `/admin/login` — demo username `admin`, password `admin123`.
- **Admin dashboard**: `/admin/dashboard` — add, edit, delete, search and filter hotel listings.

## Features
- Separate admin and user interfaces with route checks for admin pages
- Shared hotel data in Redux Toolkit and localStorage, so admin updates appear in the user listing
- Reusable add/edit form, image preview, required-field and numeric validation
- Responsive hotel cards, title search, price range filters and pagination
- Delete confirmation and success notice
- Hotel details page with OpenStreetMap embed using hotel coordinates
- React Router and React Helmet Async page metadata

## Important security note
This is a frontend-only demonstration. The demo login and role stored in localStorage are not secure authentication. A real application must validate users and permissions on a backend.

## Storage note
Changes are saved in this browser's localStorage only. They are not shared between devices/browsers. Use small images because browser storage has limits.
