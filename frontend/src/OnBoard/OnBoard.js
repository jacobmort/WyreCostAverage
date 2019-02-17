import React from 'react';
import axios from 'axios';
import { WyreContext } from '../WyreContext';
import WyrePmWidget from '../WyreLibs/pm-widget-init';
import ChooseDirection from './ChooseDirection';
import ChooseCurrency from './ChooseCurrency';
import CreateAccount from './CreateAccount';
import Explanation from './Explanation';
import './OnBoard.css';

const endpoint = "https://xji34ppszd.execute-api.us-east-1.amazonaws.com/dev";

class OnBoard extends React.Component {
  constructor() {
    super();
    this.state = {
      currentStep: 1,
      accountId: null
    }
  }

  componentDidMount() {
    this.setState({
      credentials: this.context,
    });
  }

  advance = () => {
    this.setState((prevState, props) => {
      return {
        currentStep: prevState.currentStep + 1
      }
    })
  }

  createAccount = (state) => {
    axios.post(`${endpoint}/account`, state)
      .then(result => {
        console.log(result);
        this.setState((prevState, props) => {
          return {
            accountId: result.accountId,
            currentStep: prevState.currentStep + 1
          }
        })
      })
  }

  handleCurrencyChoice = (symbol, address) => {
    this.setState({
      wyreDestCurrency: symbol,
      wyreDestAddress: address
    });
  }

  connectBank() {
    return new Promise((resolve, reject) => {
      const handler = new WyrePmWidget({
        env: "test",
        onLoad: function () {
          // In this example we open the modal immediately on load. More typically you might have the handler.open() invocation attached to a button.
          handler.open();
        },
        onSuccess: function (result) {
          // Here you would forward the publicToken back to your server in order to  be shipped to the Wyre API
          console.log(result.publicToken);
          resolve(result.publicToken);
        },
        onExit: function (err) {
          console.log("Thingo exited:", err);
          reject(err);
        }
      });
    });
  }

  render() {
    const { onClose, ...other } = this.props;
    let currentDialog;
    if (this.state.currentStep === 0) {
      currentDialog = <Explanation continueClick={this.advance} />;
    } else if (this.state.currentStep === 1) {
      currentDialog = <CreateAccount continueClick={this.createAccount} />;
    } else if (this.state.currentStep === 2) {
      // upload docs
    } else if (this.state.currentStep === 3) {
      // link ACH with plaid
    } else if (this.state.currentStep === 4) {
      // Buy or sell?
    }
    return (
      <div>
        {currentDialog}
      </div>
    );

    // OnBoard.propTypes = {
    //   onClose: PropTypes.func,
    // };
  }
}
OnBoard.contextType = WyreContext;
export default OnBoard;