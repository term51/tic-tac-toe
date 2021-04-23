import React from 'react';
import GameLayout from './hoc/layouts/Game/GameLayout';
import Game from './pages/Game/Game';
import {connect} from 'react-redux';

import {Redirect, Route, Switch} from 'react-router-dom';

class App extends React.Component {

   render() {
      let routes = (
         <Switch>
            <Route path="/auth"/>
            <Route path="/settings"/>
            <Route path="/" exact component={Game}/>
            <Redirect to="/"/>
         </Switch>
      );

      // TODO isAuthenticated

      return (
         <GameLayout>
            {routes}
         </GameLayout>
      );
   }
}


function mapStateToProps(state) {
   return {};
}

function mapDispatchToProps(dispatch) {
   return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
