# Teams Messaging App

A real-time messaging application built with Next.js that allows users to register, log in, and exchange messages with other users.

![Teams Messaging App](public/placeholder-logo.svg)

## Features

- 🔐 User authentication (register, login, logout)
- 💬 Real-time messaging between users
- 👥 User discovery
- 📱 Responsive design for mobile and desktop
- 🛡️ Secure session management
- 💾 Persistent data storage

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework for building the UI
- [TypeScript](https://www.typescriptlang.org/) - For type safety
- [Tailwind CSS](https://tailwindcss.com/) - For styling
- [Radix UI](https://www.radix-ui.com/) - Headless UI components
- File-based persistence for data storage

## Getting Started

### Prerequisites

- Node.js (v18 or newer)
- npm or pnpm package manager

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/messaging-app.git
   cd messaging-app
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   pnpm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Deployment

The app can be deployed on [Render](https://render.com/) using the included `render.yaml` configuration file.

1. Fork or push the repository to your GitHub account.
2. Create a new Render account or sign in to your existing one.
3. Connect your GitHub repository to Render.
4. Render will automatically detect the configuration in `render.yaml` and set up the deployment.

## Project Structure

- `/app` - Next.js app directory containing pages and API routes
- `/components` - UI components
- `/data` - Data storage directory for user and message files
- `/public` - Static assets
- `/hooks` - Custom React hooks
- `/lib` - Utility functions

## Security Note

The current implementation stores passwords in plain text, which is not secure for production use. For a production environment, consider implementing:

- Password hashing with bcrypt
- Integration with a proper database
- Environment variables for sensitive information
- HTTPS enforcement

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the styling utilities
- Radix UI for the accessible component primitives
