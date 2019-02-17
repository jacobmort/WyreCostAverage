import React from 'react';
import { WyreContext } from '../WyreContext';
import ChooseDirection from './ChooseDirection';
import ChooseCurrency from './ChooseCurrency';
import './OnBoard.css';
import WyrePmWidget from '../WyreLibs/pm-widget-init';

class OnBoard extends React.Component {
  state = {
    currentStep: 3,
    wyreType: null,
    wyreDestCurrency: null,
    wyreDestAddress: null
  };

  handleBuy = () => {
    this.setState({
      currentStep: 1,
      wyreType: 'none'
    });
  };

  handleSell = () => {
    this.setState({
      currentStep: 2,
      wyreType: 'none'
    });
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

  componentDidMount() {
    this.setState({ credentials: this.context });
    this.connectBank();
  }

  render() {
    const { onClose, ...other } = this.props;
    let currentDialog;
    if (this.state.currentStep === 0) {
      currentDialog = <ChooseDirection handleBuy={this.handleBuy} handleSell={this.handleSell} />;
    } else if (this.state.currentStep === 1) {
      currentDialog = <ChooseCurrency handleChoice={this.handleCurrencyChoice} />;
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