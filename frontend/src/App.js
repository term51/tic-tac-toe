import React from 'react';

import Game from './pages/Game/Game';
import Settings from './pages/Settings/Settings';

import {Redirect, Route, Switch} from 'react-router-dom';

const App = () => {

   let routes = (
      <Switch>
         <Route path="/auth"/>
         <Route path="/settings" component={Settings}/>
         <Route path="/" exact component={Game}/>
         <Redirect to="/"/>
      </Switch>
   );

   // TODO isAuthenticated

   return (
      <React.Fragment>
         {routes}
      </React.Fragment>
   );
};


export default App;
