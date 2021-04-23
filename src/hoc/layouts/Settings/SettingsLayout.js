import React from 'react';
import classes from './SettingsLayout.module.scss';
import {connect} from 'react-redux';

class SettingsLayout extends React.Component {
   render() {
      return (
         <div className={classes.SettingsLayout}>
            {this.props.children}
         </div>
      );
   }
}

export default connect()(SettingsLayout);