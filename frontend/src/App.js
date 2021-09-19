import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"

import Entry from './pages/entry/Entry';
import RegisterForm from './components/register/RegisterForm'
import LoginForm from './components/login/LoginForm'
import ForgotPasswordForm from './components/forgotpassword/ForgotPasswordForm'; 
import DefaultLayout from './layout/DefaultLayout';
import Dashboard from './pages/dashboard/Dashbaord';
import AddTicket from './pages/new-ticket/AddTicket';
import TicketListing from './pages/ticket-listing/TicketListing'
import PrivateRoute from './components/routes/PrivateRoute';
import toast, { Toaster } from 'react-hot-toast';


function App() {
  return (
          
          <Router>
            <Toaster
              position="top-right"
              reverseOrder={false}
            />
            <Switch>

              <Route exact path="/">
                <LoginForm /> 
              </Route>

              <Route exact path="/register">
                <RegisterForm />
              </Route>

              <Route  path="/reset-password">
                <ForgotPasswordForm />
              </Route>

              <PrivateRoute  path="/dashboard">
                  <Dashboard />  
              </PrivateRoute> 

              <PrivateRoute  path="/add-ticket">
                  <AddTicket />  
              </PrivateRoute>

              <PrivateRoute  path="/tickets">
                  <TicketListing />  
              </PrivateRoute>

            </Switch>
            
          </Router>
         
       
      
  );
}

export default App;
