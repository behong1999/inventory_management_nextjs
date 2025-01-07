# Inventory Management - INVSTOCK

This is a responsive inventory management application built with **Next.js**, **TypeScript**, **Tailwind**, **Postgres**, and various other tools and libraries to provide a smooth user experience for tracking and managing inventory. The backend is hosted on **AWS EC2**, with a scalable database on **AWS RDS**, static file storage in **AWS S3**, and the frontend deployed via **AWS Amplify**.

## Screenshots

<div align="center"> <table> <tr> <td align="center"> <img src="https://github.com/user-attachments/assets/232541b9-d4a3-47a8-b8bf-0f1f17233e93" alt="Screenshot 1" width="550"/> <br/> <strong>Dashboard</strong> </td> <td align="center"> <img src="https://github.com/user-attachments/assets/9ee68518-aadb-4443-af02-0a962c33e522" alt="Screenshot 2" width="550"/> <br/> <strong>Products</strong> </td> </tr> <tr> <td align="center"> <img src="https://github.com/user-attachments/assets/6f8ae80f-cf46-498f-902d-16cb6cafadea" alt="Screenshot 3" width="550"/> <br/> <strong>Inventory</strong> </td> <td align="center"> <img src="https://github.com/user-attachments/assets/092ca14a-c8be-412c-924f-4c4dbed1a6aa"  alt="Screenshot 4" width="550"/> <br/> <strong>Expenses</strong> </td> </tr> </table> </div>

## Technologies Used For Client Side

- **Next.js**: A React framework for server-side rendering (SSR), static site generation (SSG), and API routes.
- **Redux Toolkit**: for managing application state, including reducers, actions, and middleware.
- **React**: for building user interfaces.
- **TailwindCSS**: A utility-first CSS framework for building custom designs quickly.
- **Material-UI**: A popular React component library for building UI elements.
- **Axios**: A promise-based HTTP client for making API requests.
- **Lucide React**: A collection of open-source SVG icons for React.
- **Recharts**: A charting library to create visual data representations.

## Technologies Used For Server Side

- **Express**: for building REST APIs and handling HTTP requests in Node.js.
- **Prisma ORM**: A modern ORM for Node.js that simplifies database queries and migrations.
- **Nodemon**: automatically restarts the server on file changes during development.
- **Body-Parser**: for parsing incoming request bodies.
- **CORS**: enable Cross-Origin Resource Sharing (CORS) for making requests from different domains.
- **Helmet**: Security middleware to set various HTTP headers to secure your app.
- **Morgan**: HTTP request logger middleware for Node.js.
- **Rimraf**: for file system operations like deleting files and directories.
- **Concurrently**: for running multiple npm scripts concurrently.
- **dotenv**: for loading environment variables from a `.env` file.

## Diagrams For This Project
### [Data Model Diagram](https://drawsql.app/teams/frankfurt-uas/diagrams/inventory-management-data-model-diagram)
<img src="https://github.com/user-attachments/assets/0a71de65-b6b8-4fed-b260-5bfb303b96a3" alt="Database Diagram" width="700"/>


### [AWS Architecture Diagram](https://lucid.app/lucidchart/edfdfa57-5d01-429a-b365-f69de0cd8fe1/edit?viewport_loc=830%2C-187%2C2127%2C996%2C0_0&invitationId=inv_2138dc74-5c10-4dcd-bd63-9acc07a0abe2)
<img src="https://github.com/user-attachments/assets/640fc9b2-acf9-42ab-b142-3ff080fcd873" alt="Database Diagram" width="700"/>

### How it works
- **Custom VPC**: Hosts a public and private subnet. The public subnet connects to the internet gateway, while the private subnet routes through the public subnet for secure backend access.
- **EC2 & RDS**: Backend logic runs on EC2, which interacts with the PostgreSQL database hosted on RDS in the private subnet.
- **Amplify & API Gateway**: The Next.js frontend is hosted on Amplify, which communicates with the API Gateway to send requests to the backend.
- **S3**: Users directly access static assets (e.g., images) stored in S3 through pre-signed URLs or public access configurations.

🠊 Flow: Users access the frontend → Amplify calls API Gateway → Gateway routes requests to EC2 → EC2 interacts with RDS → Responses flow back to Amplify.
