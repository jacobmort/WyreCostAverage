import React from 'react';
import axios from 'axios';
import { WyreContext } from '../WyreContext';
import WyrePmWidget from '../WyreLibs/pm-widget-init';
import ChooseCurrency from './ChooseCurrency';
import CreateAccount from './CreateAccount';
import Explanation from './Explanation';
import UploadDocs from './UploadDocs';
import './OnBoard.css';

const endpoint = "https://xji34ppszd.execute-api.us-east-1.amazonaws.com/dev";

class OnBoard extends React.Component {
  constructor() {
    super();
    this.state = {
      currentStep: 4,
      accountId: 'AC_PYMPB8R73EE',
      ethAddress: null,
      btcAddress: null,
      achAddress: null
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
          console.log(result.accountId);
          return {
            accountId: result.accountId,
            currentStep: prevState.currentStep + 1
          }
        })
      })
  }

  uploadDocs = (file) => {
    // const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    const config = { headers: { 'Content-Type': 'image/jpeg' } };
    // let fd = new FormData();
    // fd.append('file', file[0])
    axios.post(`${endpoint}/account/${this.state.accountId}/document`, file, config)
      .then((result) => {
        this.setState((prevState, props) => {
          return {
            currentStep: prevState.currentStep + 1
          }
        })
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

  saveBank(paytoken) {
    axios.post(`${endpoint}/account/${this.state.accountId}/payment/${paytoken}`)
      .then((result) => {
        this.setState((prevState, props) => {
          return {
            achBank: result.id,
            currentStep: prevState.currentStep + 1
          }
        })
      });
  }

  transfer(state) {
    const amountPerTransAndNumToDo = this.calculateFutureTransfers(state.num, state.endDate);;
    let params = {
      sourceAmt: amountPerTransAndNumToDo[0],
      message: "test"
    }
    if (state.side === 'buy') {
      params.srn = this.state.achAddress;
      params.sourceCurrencySymbol = 'USD';
      params.destSrn = state.chosenCurrency === 'BTC' ? this.state.btcAddress : this.state.userEthAddress;
      params.destCurrencySymbol = state.chosenCurrency;
    } else {
      params.sourceCurrencySymbol = state.chosenCurrency;
      params.srn = state.chosenCurrency === 'BTC' ? this.state.btcAddress : this.state.userEthAddress;
      params.destSrn = this.state.achAddress;
      params.destCurrencySymbol = "USD";
    }

    axios.post(`${endpoint}/account/${this.state.accountId}/transfer`, params)
      .then((result) => {
        console.log(result);
        if (amountPerTransAndNumToDo-- > 0) {
          {
            // TODO post remaining to CRON endpoint
          }
        }
        this.setState((prevState, props) => {
          return {
            currentStep: prevState.currentStep + 1
          }
        })
      });
  }

  calculateFutureTransfers(amount, endDate) {
    const today = new Date();
    endDate = new Date(endDate);
    const one_day = 1000 * 60 * 60 * 24;
    const days = Math.ceil((endDate.getTime() - today.getTime()) / (one_day));
    const numOfTransactions = Math.ceil(days / 7); // 1x per week
    const amountPerTransacion = parseInt(amount, 10) / numOfTransactions;
    return [amountPerTransacion, numOfTransactions]
  }

  render() {
    const { onClose, ...other } = this.props;
    let currentDialog;
    if (this.state.currentStep === 0) {
      currentDialog = <Explanation continueClick={this.advance} />;
    } else if (this.state.currentStep === 1) {
      currentDialog = <CreateAccount continueClick={this.createAccount} />;
    } else if (this.state.currentStep === 2) {
      currentDialog = <UploadDocs continueClick={this.uploadDocs} />;
    } else if (this.state.currentStep === 3) {
      this.connectBank().then((payToken) => this.saveBank(payToken));
    } else if (this.state.currentStep === 4) {
      currentDialog = <ChooseCurrency transferClick={this.transfer.bind(this)} />
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