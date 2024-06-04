# GrowFarm

GrowFarm is a social media mobile application designed to be a hub for information, ideas, and doubt sharing among farmers, botanists, and brokers. The project encompasses a mobile application, a commercial website, and a containerized API, providing a comprehensive platform for agricultural networking and knowledge exchange.

## Features

- **Social Media Platform**: Facilitates information exchange and networking among farmers, botanists, and brokers.
- **Mobile Application**: Front-end built with Kotlin.
- **Commercial Website**: Developed using React JS.
- **RESTful Architecture**: Ensures a scalable and maintainable application structure.
- **Containerized API**: Utilizes Docker for containerization.
- **Database Management**: MongoDB is used for managing the application's data.

## Tech Stack

- **Front-End (Mobile App)**: Kotlin
- **Front-End (Website)**: React JS , TailwindCSS
- **Back-End**: Node.js , Express.js
- **Database**: MongoDB , Cloudinary
- **Hosting**: Vercel
- **Containerization**: Docker
## Commercial Website Link
[Growfarm-Web](https://grow-farm-web.vercel.app/)

## Getting Started

Follow these instructions to set up the project on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Docker](https://www.docker.com/)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/vikrampatel0408/api-grow-farm.git
   
2. Navigate to the project directory
    ```sh
    cd api-grow-farm
3. Install dependencies
     ```sh
     npm install
4. Set up your MongoDB connection. Create a .env file in the backend directory and add the following:
   ```env
   MONGO_URI=your_mongo_connection_string
5. Start the back-end server:
   ```sh
   npm start
6. To run the Docker container for the API, navigate back to the backend directory and run:
   ```sh
    docker build -t growfarm-api .
    docker run -p 3000:3000 growfarm-api
7. You can directly run container using Docker command
   ```sh
   docker run vikrampatel/growfarm

## Deployment

Both the application and the website are hosted on Vercel.
### Deployment Overview
- **Frontend:** The website is developed with React JS and deployed on Vercel.
- **Backend:** Backend: The API is developed with Node.js, containerized using Docker, and deployed on Vercel.
