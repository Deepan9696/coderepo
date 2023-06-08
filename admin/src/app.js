import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import StudentsPage from './pages/StudentsPage';
import TeachersPage from './pages/TeachersPage';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/students">Students</Link>
            </li>
            <li>
              <Link to="/teachers">Teachers</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/students" component={StudentsPage} />
          <Route path="/teachers" component={TeachersPage} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
