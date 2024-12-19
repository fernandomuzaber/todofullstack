# ToDoChallenge

## Description

This is a full-stack Notes application developed with **NestJS** for the backend and **Angular** for the frontend. It allows users to:
- Create, read, update, and delete notes.
- Organize notes by categories.
- Archive notes.

## Features

- **Backend**: A REST API built with **NestJS** and **PostgreSQL** to handle CRUD operations for notes.
- **Frontend**: A single-page application (SPA) built with **Angular** that allows users to interact with the Notes API.
- **User Stories**:
  - Users can create, update, archive, and delete notes.
  - Notes are displayed in lists based on their status (active or archived).
  - Notes can be organized by categories.

## Technologies Used

- **Frontend**:
  - Angular v19
  - Angular CLI
  - Reactive Forms

- **Backend**:
  - NestJS v10.4.9
  - PostgreSQL (database)
  - TypeORM (ORM)
  
- **Development Tools**:
  - Node.js v18.19.1
  - npm v10.5.0

## Requirements

- Node.js v18.19.1
- npm v10.5.0
- PostgreSQL
- NestJS v10.4.9
- Angular v19
- TypeORM

## Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/ensolvers-github-challenges/Muzaber-96fe1f
    cd ToDoChallenge
    ```

2. Ensure you have Node.js, npm, and PostgreSQL installed.

3. Configure the database:
    - Create a database in PostgreSQL.
    - Update the `ormconfig.json` file in the backend with your PostgreSQL credentials.

## Running the Application

To run the application, simply execute the `start.sh` script:

```bash
./start.sh
```

This script will:
- Configure the database using TypeORM.
- Install dependencies for both the backend and frontend.
- Start the backend (NestJS) and frontend (Angular) servers.

## Installation

Follow these steps to set up the project locally:

### 1. Clone the repository
```bash
git clone https://github.com/ensolvers-github-challenges/Muzaber-96fe1f
cd ToDoChallenge
```

### 2. Backend Setup
Navigate to the backend folder and install the dependencies:

```bash
cd backend
npm install
```

Configure environment variables for NestJS:
Create a `.env` file in the root of the backend folder with the following content:

```plaintext
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your-username
DB_PASSWORD=your-password
DB_DATABASE=notes_db
```

### 3. Frontend Setup
Navigate to the frontend folder and install the dependencies:

```bash
cd frontend
npm install
```

### 4. Run the Application
Start the backend (NestJS):

```bash
cd backend
npm run start:dev
```

The backend will be available at http://localhost:3000.

Start the frontend (Angular):

```bash
cd frontend
ng serve
```

The frontend will be available at http://localhost:4200.

### 5. Test the Application
Once both the frontend and backend are running:

Open the browser and navigate to http://localhost:4200.
You should be able to create, update, delete, and archive notes.

## Additional Information

The backend exposes RESTful endpoints to perform CRUD operations on notes.
CORS is enabled to allow requests from the frontend (Angular).

### Example API Endpoints:
- `POST /notes`: Create a new note.
- `GET /notes`: Get all active notes.
- `PATCH /notes/:id`: Update a note by ID.
- `DELETE /notes/:id`: Delete a note by ID.
- `GET /notes/archived`: Get archived notes.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
