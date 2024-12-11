# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

1. Clone the repository:
   ```bash
   git clone <repository_url>
Navigate into the project directory:
bash
Copy code
cd music-playlist-management
Install dependencies:
bash
Copy code
npm install
npm start
Runs the app in the development mode.
Open http://localhost:3000 to view it in your browser.

Configuring the Backend API
When running the app locally, you need to specify the backend API URL. By default, the app might expect the backend to be running on a different port. To change this:

Open the .env file in the root of your project (if it doesn’t exist, create one).

Add or modify the REACT_APP_BACKEND_API variable to match your local backend port, like this:

env
Copy code
REACT_APP_BACKEND_API=http://localhost:5000/api
Replace http://localhost:5000/api with your backend URL and port if it's different.

Save the .env file.

After setting the BACKEND_API variable, the app will send requests to the correct backend API when running locally.

Deployment
When deploying to production, the app will automatically use the backend URL specified in your Vercel or server configuration. Make sure that the production version of your app points to the live backend URL.

markdown
Copy code

### Summary of Changes:
- Added instructions for configuring the `REACT_APP_BACKEND_API` variable for local development in the `.env` file.
- Mentioned that this will allow the frontend to make API calls to the correct local backend URL.

Let me know if you need further modifications!