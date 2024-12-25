import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import CreateRoom from "./routes/CreateRoom";
import Room from "./routes/Room";
import Login from './routes/Login';
import Signup from './routes/Signup.';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Signup} />
        <Route path="/login" exact component={Login} />
        <Route path="/home" exact component={CreateRoom} />
        <Route path="/room/:roomID" exact component={Room} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
