import React from 'react';
import classes from './SettingsLayout.module.scss';
import Navbar from '../../../components/UI/Navbar';

const SettingsLayout = props => {
   return (
      <div className={classes.SettingsLayout}>
         <header className="header mb-4" style={{backgroundColor: '#343a40'}}>
            <div className="container">
               <div className="row">
                  <div className="col-12">
                     <Navbar/>
                  </div>
               </div>
            </div>
         </header>
         <div className="container">
            <div className="row">
               <div className="col-12">
                  {props.children}
               </div>
            </div>
         </div>
         <footer className="footer">
            <div className="container">
               <div className="row">
                  <div className="col-12">

                  </div>
               </div>
            </div>
         </footer>
      </div>
   );
}

export default SettingsLayout;