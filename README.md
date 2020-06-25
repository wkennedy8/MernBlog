# MernBlog

# Setup
## Backend
  1. cd to the `backend` directory and `yarn` or `yarn install` to add dependencies.
  2. Add .env file in the backend directory with a MONGO_URL key set to your MongoDB Atlas connection string.
  3. type the command `yarn server` to start express server and connect to your DB.
  
## Client
  1. cd to the `client` directory and `yarn` or `yarn install` to add dependencies.
  2. Type the command `yarn start` to start the development server for the client.
  
# IMPORTANT
 
## The client and backend do not run concurrently. Make sure the backend server is connected, then open a second terminal window and run the client developmental server.
  
