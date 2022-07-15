const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const ProjectsRouter = require('./routes/projectsrouter.js');
const activityRouter = require('./routes/activity.router')
const activity_employeeRouter= require('./routes/activity_employee.router')

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
<<<<<<< HEAD
app.use('/api/projects',ProjectsRouter)
=======
app.use('/api/activity', activityRouter)
app.use('/api/activity_employee', activity_employeeRouter)
>>>>>>> 1a2d2a2cdeb440f353606ef8e722eb6699386037

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
