import React, { Component } from 'react';
import './Hero.css';
import OnBoard from '../OnBoard/OnBoard';
import arrow from "./arrow.png";
import tachart from "./ta-chart.png";

// configure the widget to authenticate using the generated key
class Hero extends Component {
  state = {
    onBoardFlow: false
  }

  handleOpen = () => {
    this.setState({
      onBoardFlow: true
    })
  };

  render() {
    let onBoardDialog;
    if (this.state.onBoardFlow) {
      onBoardDialog = <OnBoard />;
    }

    return (
      <div className="section hero">
        <div className="container">
          <div className="row">
            <div className="one-half column">
              <h4 className="hero-heading">Stop trying to buy the dip</h4>
              <span className="button button-primary" onClick={this.handleOpen}>Dollar Cost Average Your Trades</span>
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
        {onBoardDialog}
      </div>
    );
  }
}
export default Hero;
