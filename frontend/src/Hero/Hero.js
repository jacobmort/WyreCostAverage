import React, { Component } from 'react';
import './Hero.css';
import arrow from "./arrow.png";
import tachart from "./ta-chart.png";
class Hero extends Component {


  render() {
    return (
      <div className="section hero">
        <div className="container">
          <div className="row">
            <div className="one-half column">
              <h4 className="hero-heading">Stop trying to buy the dip</h4>
              <a className="button button-primary" href="http://getskeleton.com">Dollar Cost Average That Shiz</a>
              <div className="noeone">
                <div className="row">
                  <div className="eight columns">&nbsp;</div>
                  <img className="four columns arrow" src={arrow} />
                </div>
                <div>
                  You don't know what this means.  No one knows what this means
                  </div>
              </div>
            </div>
            <div className="one-half column charts">
              <img className="chart" src={tachart} />
              <img className="chart" src={tachart} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Hero;
