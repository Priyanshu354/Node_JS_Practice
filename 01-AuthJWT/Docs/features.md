# Title: JWT Auth & RBAC

### Description:
Build a backend system with secure authentication and role-based access control. Your implementation should include the following features:

- User Registration & Login: Users should be able to sign up and log in using email and password. Passwords must be stored securely. Authentication should use JWT tokens.

- Protected Routes: Certain routes must be accessible only to logged-in users. Requests without a valid token should be rejected.

- Role-Based Access Control (RBAC): Users can have roles such as user, admin, or developer. Some routes should be restricted based on the user’s role.

- Role Management: Ability to change a user’s role (e.g., promote a user to admin).

- Error Handling & Security: Proper responses for unauthorized or invalid requests, including invalid tokens and forbidden access.

Your solution should use JWT for authentication, middleware to protect routes, and role-based authorization to control access. The backend should be modular, secure, and follow best practices.