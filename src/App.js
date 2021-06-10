import React, {Suspense} from 'react';
import './App.scss';
import { Route, Switch } from "react-router-dom";
import Spinner from "./components/common/spinner/Spinner";
import Home from "./components/home/Home";
import SignIn from "./components/signin/SignIn";
import Gamezone from "./components/gamezone/Gamezone";

function App() {
  return (
    <div className="App">
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route path="/" exact component={SignIn} />
          <Route path="/home" exact component={Home} />
          <Route path="/gamezone" exact component={Gamezone} />
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
