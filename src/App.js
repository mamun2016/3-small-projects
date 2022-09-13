import React from 'react';
import './main.scss';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Home from './components/Home';
import Website from './projects/website/Website';
import Todo from './projects/todo/Todo';
import Weather from './projects/weather/Weather';

const App = () => {
  return (
    <Router>
      <div className="container">
        <h1 className="title-main">
          <Link to="/">
            3 Small Projects
          </Link>
        </h1>
      </div>
      
      <div className="container">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/website" component={Website} />
          <Route path="/todo" component={Todo} />
          <Route path="/weather" component={Weather} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
