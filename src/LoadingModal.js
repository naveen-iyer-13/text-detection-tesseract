import React from 'react';

const LoadingModal = (props) => (
  <div className="container" onClick={(e) => props.closeModals(e)}>
    <div className="inner" style={{textTransform: "capitalize"}} onClick={event => event.stopPropagation()}>
      {
        props.text
      }
    </div>
  </div>
);

export default LoadingModal
