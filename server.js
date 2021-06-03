// Load .env vars
require('dotenv').config();
// require('dotenv').config({ path: "./config/config.env" });

const express = require("express");
const cors = require('cors');
const connectDB = require("./config/db");
const auth = require('./middleware/auth.js');
const cookieParser = require('cookie-parser')
const jwt = require("jsonwebtoken");
const path = require('path');


const app = express();
const corsOptions = {
  credentials: true,
  origin: "https://fileinstant.herokuapp.com/"
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
app.use('/uploads', express.static('uploads'));


// Connect to database
connectDB();




// Importing Routers
const loginRoute = require("./routes/login");
const usersRoute = require("./routes/users");
const categoriesRouter = require("./routes/categories");
const softwareManagementRouter = require('./routes/software-management.js');
const latestSoftwareRouter = require('./routes/latest-software.js');
const populorSoftwareRouter = require('./routes/populor-software.js');
const infoPageRouter = require('./routes/info-page.js');
const statisticRouter = require('./routes/statistic.js');
const sendmail = require('./routes/sendmail.js');

// Routing URLS
app.use("/api/login", loginRoute);
app.use("/api/users", usersRoute);
app.use("/api/category", categoriesRouter);
app.use("/api/software-management", softwareManagementRouter);
app.use("/api/latest-software", latestSoftwareRouter);
app.use("/api/popular-software", populorSoftwareRouter);
app.use("/api/info-page", infoPageRouter);
app.use("/api/statistic", statisticRouter);
app.use("/api/sendmail",sendmail);


//Error handler
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
})

// Production setup
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

//App listener
const port = process.env.PORT || 8080;
app.listen(
  port,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${port}`
  )
);
