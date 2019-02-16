import React, { Component } from 'react';
import './Benefits.css';

class Benefits extends Component {
  render() {
    return (
      <div className="section values">
        <div className="container">
          <div className="row">
            <div className="one-third column value">
              <h2 className="value-multiplier">70+%</h2>
              <h5 className="value-heading">of the time <b>Buy the Dip</b> Fails</h5>
              <p className="value-description">to <a href="https://ofdollarsanddata.com/even-god-couldnt-beat-dollar-cost-averaging/">outperform</a> Dollar Cost Average over 70% of the time.</p>
            </div>
            <div className="one-third column value">
              <h2 className="value-multiplier">100%</h2>
              <h5 className="value-heading">of <b>Technical Analysis</b></h5>
              <p className="value-description">is bullshit.</p>
            </div>
            <div className="one-third column value">
              <h2 className="value-multiplier">0%</h2>
              <h5 className="value-heading">FOMO</h5>
              <p className="value-description">set and forget.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Benefits;




