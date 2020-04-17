import React from 'react';

const ResultsModal = (props) => (
  <div className="container" onClick={(e) => props.closeModals(e)}>
    <div className="results-inner" onClick={event => event.stopPropagation()}>
      <div className="inner-header">{props.headerText}</div>
      <div className="single-container">
        {
          props.data && props.data.map((single, index) => {
            return (
              <div className="single" key={index}>
                <div class="picture"><img alt={"single"+index} className="image" src={single.img} /></div>
                <div className="text">{single.text.split('\n').map ((item, i) => <div key={i}>{item}</div>)}</div>
              </div>
            );
          })
        }
      </div>
    </div>
  </div>
);

export default ResultsModal
