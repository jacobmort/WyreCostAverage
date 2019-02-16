import React from 'react';
import { WyreContext } from '../WyreContext';
import ChooseDirection from './ChooseDirection';
import ChooseCurrency from './ChooseCurrency';
import blue from '@material-ui/core/colors/blue';
import './OnBoard.css';

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

  componentDidMount() {
    this.setState({ credentials: this.context });
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