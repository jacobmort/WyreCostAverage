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

  transfer() {

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
      currentDialog = <ChooseCurrency transferClick={this.transfer} />
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