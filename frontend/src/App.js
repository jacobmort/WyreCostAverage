import React, { Component } from 'react';
import './App.css';
import Hero from "./Hero/Hero";
import Benefits from "./Benefits/Benefits";
import Explanation from "./Explanation/Explanation";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Hero />
        <Benefits />
        <Explanation />
        {/* <div className="section get-help">
          <div className="container">
            <h3 className="section-heading">Need help getting started?</h3>
            <p className="section-description">Skeleton is an amazingly easy place to start with responsive development. If you want to learn more, just visit the documentation!</p>
            <a className="button button-primary" href="http://getskeleton.com">View Skeleton Docs</a>
          </div>
        </div>

        <div className="section categories">
          <div className="container">
            <h3 className="section-heading">Responsive Images</h3>
            <p className="section-description">Skeleton images sit easily in grid with .u-max-full-width class. I suggest exploring solution to serving different images based on device size.</p>
            <div className="row">
              <div className="one-half column category">
                <img className="u-max-full-width" src="images/placeholder.png" />
              </div>
              <div className="one-half column category">
                <img className="u-max-full-width" src="images/placeholder.png" />
              </div>
            </div>
          </div>
        </div> */}
      </div>
    );
  }
}

export default App;
