const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
require('dotenv').config();
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// middleware  > app.use is to use middlewares 

app.use(express.static('./public'));
app.use(express.json());

// routes
// here we set common url which will always start from /api/vi/task ,
// and in task route, we store the route logic, and controllers have thr implementations 
app.use('/api/v1/tasks', tasks);  // routes stored in diff file is accessed via this 
// Middleware if user hits route which does not exist!! 
app.use(notFound);
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
