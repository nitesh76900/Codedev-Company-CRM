# Super CRM

Super CRM is a multi-tenant Customer Relationship Management (CRM) system designed for businesses to manage tasks, leads, and meetings efficiently. Built with the MERN stack, it offers role-based access control (RBAC) to ensure secure and structured data management.

## Features & Functionality

### 1. User Registration & Authentication
- **Super Admin**: Oversees companies, manages subscriptions, and monitors usage.
- **Company Registration**: Owners register and set up their companies.
- **Employee Registration**: Employees register, select their company from the registered list, and request to join.
- **Approval System**: Companies verify and approve employee requests before granting access.

### 2. Role & Permissions (RBAC)
- **Company Admin**: Assigns roles & permissions to employees.
- **Role-Based Access Control**: Employees get custom access levels for each module.
  - **Leads Module**: Create, Read, Edit, Delete access per user.
  - **Task Assign**: Assign, View, Modify permissions.
  - **Meetings**: Schedule, Edit, Cancel rights.

### 3. Core Modules
- **To-Do Module**: Employees can create, edit, and mark tasks as completed.
- **Task Assignment**: Assign tasks to employees, set priorities & deadlines, track progress.
- **Lead Tracking**: Create & manage leads, assign leads to employees, track lead status (New, In Progress, Closed) based on assigned permissions.
- **Meeting Management**: Schedule meetings with clients or internal teams, set agendas, and notify participants.

## Tech Stack

### Frontend (React)
- React.js (Vite for faster development)
- Redux Toolkit (State management)
- Axios (For API calls)
- Tailwind CSS (UI Styling)
- React Router Dom (Navigation)

### Backend (Node.js & Express)
- Express.js (Server & API)
- Mongoose (MongoDB)
- JWT (JSON Web Token) (Authentication)
- Role-Based Access Control (RBAC) Middleware

### Database (MongoDB)
#### Collections:
- Users
- Companies
- Employees
- Tasks
- Leads
- Meetings
- Roles & Permissions
- ToDo

## Additional Features
- **Email Notifications**: Send approval/rejection emails.
- **Real-time Updates**: WebSockets or Pusher.js for task status changes.
- **Multi-Tenant Support**: Each company has isolated data.

## Project Roadmap

### Phase 1: Authentication & Company Setup
- ✅ Super Admin Panel
- ✅ Company Registration & Employee Onboarding
- ✅ Role-Based Permissions

### Phase 2: Core CRM Modules
- ✅ To-Do Management
- ✅ Task Assignment
- ✅ Lead Tracking
- ✅ Meeting Scheduling

### Phase 3: Advanced Features
- ✅ Notifications & Reminders
- ✅ Real-time Updates
- ✅ Multi-Tenant Enhancements

## Next Steps
- Multi-tenancy: Separate database per company or shared database with company-based filtering?
- SaaS Model: Subscription-based plans for businesses.
- Integrations: WhatsApp, third-party apps, and more.


## Reference

For inspiration and additional insights, check out a similar CRM system: [LeadManage](https://apps.leadmanage.in/). This system offers valuable reference points for features and implementation approaches.

- LeadManage: [https://apps.leadmanage.in](https://apps.leadmanage.in/)


## Getting Started
### Prerequisites
- Node.js & npm
- MongoDB

### Installation
```sh
# Clone the repository
git clone https://github.com/ViolentUJJWAL/company_crm
cd company_crm

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Running the Application
```sh
# Start backend server
cd backend
npm run server

# Start frontend server
cd frontend
npm run dev
```
