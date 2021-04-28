import React from 'react';
import classes from './GameLayout.module.scss';
import Navbar from '../../../components/UI/Navbar';

const GameLayout = props => {
   return (
      <div className={classes.GameLayout}>
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
};

export default GameLayout;