import React from 'react';
import { Router, Route } from 'react-router';

import EmailVerification from './email_verification';
import PasswordReset from './password_reset';
import Main from './main';
import Login from './login';
import Signup from './signup';
import LoginAdmin from './admin/login';
import MainAdmin from './admin/main';
import CourseAddingRequests from './admin/course_adding_requests';
import Feedbacks from './admin/feedbacks';

const Routes = (props) => (
  <Router {...props}>
    <Route path='/' component={Main} />
    <Route path='/login' component={Login} />
    <Route path='/signup' component={Signup} />
    <Route path="/email_verification" component={EmailVerification} />
    <Route path="/password_reset" component={PasswordReset} />
    <Route path='/admin' component={MainAdmin} />
    <Route path='/admin/login' component={LoginAdmin} />
    <Route path='/admin/course_adding_requests' component={CourseAddingRequests} />
    <Route path='/admin/feedbacks' component={Feedbacks} />
  </Router>
);

export default Routes;
