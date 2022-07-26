import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import Nav from '../Shared/Nav/Nav';
import Footer from '../Shared/Footer/Footer';
import ProtectedRoute from '../Shared/ProtectedRoute/ProtectedRoute';
import AdminPage from '../Pages/AdminPage/AdminPage';
import InfoPage from '../Pages/InfoPage/InfoPage';
import LandingPage from '../Pages/LandingPage/LandingPage';
import LoginPage from '../Auth/LoginPage/LoginPage';
import RegisterPage from '../Auth/RegisterPage/RegisterPage';
import ActivityPage from '../Pages/ActivityPage/ActivityPage';
import ProjectsList from '../ProjectsPage/projects';
import CompaninesPage from '../Pages/CompanyPage/CompaniesPage';
import ArchivedPage from '../Pages/ArchivedPage/ArchivedPage';
import './App.css';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, []);

  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/home" />

         

          <Route
      
            exact
            path="/activity/:projectID"
          >
            <ActivityPage />
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}
          <ProtectedRoute
            // logged in shows UserPage else shows LoginPage
            exact
            path="/Main"
          >
           <CompaninesPage />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/projects/:companyid"
          >
            <ProjectsList />
          </ProtectedRoute>

            <ProtectedRoute
            // logged in shows InfoPage else shows LoginPage
            exact
            path="/Admin"
          >
            <AdminPage />
          </ProtectedRoute>

          <ProtectedRoute
            exact
            path="/company"
          >
            <CompaninesPage />
          </ProtectedRoute>
          
          <ProtectedRoute
            exact
            path="/archives"
          >
            <ArchivedPage />
          </ProtectedRoute>

          <Route
            exact
            path="/login"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /user page
              <Redirect to="/company" />
              :
              // Otherwise, show the login page
              <Redirect to="/home" />
            }
          </Route>

          <Route
            exact
            path="/registration"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/company" />
              :
              // Otherwise, show the registration page
              <LandingPage />
            }
          </Route>

          <Route
            exact
            path="/home"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/company" />
              :
              // Otherwise, show the Landing page
              <LandingPage />
            }
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
