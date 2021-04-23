import React from 'react';
import classes from './GameLayout.module.scss';
import {connect} from 'react-redux';

class GameLayout extends React.Component {
   render() {
      return (
         <div className={classes.GameLayout}>
            {this.props.children}
         </div>
      );
   }
}

export default connect()(GameLayout);