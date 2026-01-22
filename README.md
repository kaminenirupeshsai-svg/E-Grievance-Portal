# E-Grievance-Portal
E-Grievance Redressal Portal is a web-based system that enables users to submit, track, and resolve grievances efficiently through a transparent and role-based digital platform.
# 🌟 Overview
E-Grievance Hub is a digital platform that connects Students, Admins, and SuperAdmins in a single transparent workflow.
It eliminates manual paperwork and delays by enabling online grievance submission and processing.
The system provides real-time updates, tracking, and accountability for efficient campus grievance management.
# 🚀 Key Features
## 🧑‍🎓 For Students
* File grievances quickly
* Choose department, grievance type, priority
* Track real-time grievance progress
* Anonymous grievance option
## 🧑‍💼 For Admins
* View grievances assigned to their department
* Change status: Pending → In Review → Resolved
* Add solution notes & timeline
* Manage student queries
## 🏛️ For Grievance-Officer
* Total complaints
* Monthly trends
* Department-wise performance
# 🧩 Tech Stack
## Frontend
* HTML
* CSS
*J avaScript
## Backend
* Node.js
* Express.js
* MongoDB + Mongoose
# 🔐 System Architecture
  graph TD
    %% Define the main components (Nodes)
    subgraph Frontend (Frontend \(React\))
        SUI[Student UI]
        AD[Admin Dashboard]
        SAP[SuperAdmin Panel]
    end
    API("API Gateway (Express Server)")
    
  %% Define backend components within a logical group
    subgraph Backend
        Auth("Authentication<br>JWT + Middleware")
        Services("Grievance Services<br>CRUD + File Uploads")
        Config("Admin/SuperAdmin<br>Approvals & Config")
    end
    DB("MongoDB Database<br>Users / Admins / Complaints / Logs")

  %% Define the connections (Edges) and flow
    Frontend --> API
    API --> Auth
    API --> Services
    API --> Config
    Services --> DB

  %% Apply optional styling to match the image's simple look
    classDef rect fill:#fff,stroke:#333,stroke-width:2px;
    class Frontend,API,Auth,Services,Config,DB rect;

# 📁 Project Structure (Backend)
## Project Structure

## Project Structure

```text
Grievance-Portal/
│
├── frontend/
│   ├── public/
│   │   └── css/
│   └── pages/
│
└── backend/
    ├── middleware/
    ├── models/
    ├── routes/
    ├── views/
    └── database/
