import React, { Component } from 'react';
import './Explanation.css';
class Explanation extends Component {
  render() {
    return (
      <div className="section get-help">
        <div className="container">
          <h3 className="section-heading">What is Dollar Cost Averaging?</h3>
          <p className="section-description">Rather than buying or selling at one price we spread out the transactions over time to try to avoid transacting at an outlier price.</p>
          <p className="section-description">Solid strategy, not guessing</p>
          <a className="button button-primary" href="https://www.investopedia.com/investing/dollar-cost-averaging-pays/">More Details</a>
        </div>
      </div>
    );
  }
}

export default Explanation;
