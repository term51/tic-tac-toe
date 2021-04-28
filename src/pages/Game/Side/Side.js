import React from 'react';

const Side = props => {
   return (
      <React.Fragment>
         <h6>Choose a side.</h6>
         <div className="custom-control custom-radio custom-control-inline">
            <input type="radio" id="customRadioInline1" name="customRadioInline" className="custom-control-input"/>
            <label className="custom-control-label" htmlFor="customRadioInline1">X</label>
         </div>
         <div className="custom-control custom-radio custom-control-inline">
            <input type="radio" id="customRadioInline2" name="customRadioInline" className="custom-control-input"/>
            <label className="custom-control-label" htmlFor="customRadioInline2">O</label>
         </div>
      </React.Fragment>
   );
};

export default Side;