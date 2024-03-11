# Reservation Website Frontend

### [Live Site](https://reservation-client-sigma.vercel.app/)

This repository contains the frontend codebase for the Reservation Website project. This frontend application provides the user interface for customers, providers, and admins to interact with the system.

## Features

- **User Authentication**: Login, logout, and user authentication functionalities.
- **User Profile**: Update user profile information such as name, email, phone, and profile picture.
- **Service Management**: View services, book services, and manage bookings.
- **Provider Management**: View providers, view provider details, and manage provider services.
- **Admin Management**: Admin functionalities to manage users, services, and bookings.

## Technologies Used

- **React.js**: JavaScript library for building user interfaces.
- **React Router**: Declarative routing for React applications.
- **Ant Design**: Design system for building React applications with ready-to-use UI components.
- **Redux**: Predictable state container for JavaScript apps.
- **TypeScript**: Superset of JavaScript that adds static typing.

## Getting Started

### Prerequisites

- Node.js installed on your local machine
- npm (Node Package Manager) or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/service-reservation.git
   ```

2. Navigate to the project directory:

   ```bash
   cd reservation-client
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

### Configuration

Create a `.env` file in the root directory of the project with the following environment variables:

```javascript
VITE_BASE_URL=http://localhost:4000/api/v1
VITE_SYNCFUSION_LICENSE_KEY=syncfusion-calendar-license-key
```

### Usage

Start the development server:

```bash
npm run dev
```

By default the application will running at `https://localhost:5173`.
Make sure your reservation server is running. If not, follow the steps in the [reservation server README](https://github.com/NS-Sheam/service-resarvation/tree/main/reservation-server) to start the reservation server.

### Routes

The frontend application has the following routes:

- **`/`** - Home page
- **`/auth`** - Authentication page for login and registration
- **`/auth/verify-email`** - Verify email page
- **`/auth/change-password`** - Change password page
- **`/auth/forget-password`** - Forget password page
- **`/auth/reset-password`** - Reset password page
- **`/services`** - View all services
- **`/services/:id`** - View details of a specific service
- **`/providers`** - View all providers
- **`/providers/:id`** - View details of a specific provider
- **`/provider/my-services`** - View services provided by the logged-in provider
- **`/provider/add-service`** - Add a new service for the logged-in provider
- **`/provider/edit-service/:id`** - Edit an existing service for the logged-in provider
- **`/my-bookings`** - View all bookings made by the logged-in user
- **`/my-bookings/:id`** - View details of a specific booking made by the logged-in user
- **`/profile`** - View and update user profile information

### Additional Notes

- Make sure the backend server is running and accessible at the specified API base URL.
- The frontend uses Ant Design for UI components, which provides a clean and responsive design out of the box.
- Redux is used for state management, providing a centralized store for managing application state.
