import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import PropTypes from 'prop-types';
import './OnBoard.css';

class ChooseCurrency extends React.Component {
  state = {
    chosenCurrency: null,
    balanceEth: 0,
    balanceBtc: 0,
    num: 0,
    autoDeposit: false,
    side: 'buy'
  }

  changeCurrency = (evt) => {
    let cryptoType = evt.target.value;
    let balance = 0;
    if (cryptoType === 'ETH') {
      balance = this.state.balanceEth;
    } else if (cryptoType === 'BTC') {
      balance = this.state.balanceBtc
    }
    this.setState({
      liquidateNum: balance,
      chosenCurrency: cryptoType
    })
  }

  changeNum = (evt) => {
    this.setState({
      num: evt.target.value
    })
  }

  changeAutoDeposit = (evt) => {
    this.setState({
      autoDeposit: evt.target.value
    })
  }

  changeSide = (evt) => {
    this.setState({
      side: evt.target.value
    })
  }

  showTheAdditionalOptions() {
    if (this.state.side === 'buy') {
      return <FormControlLabel
        control={
          <Checkbox
            checked={this.state.autoDeposit}
            onChange={this.changeAutoDeposit}
            value="autoDeposit"
          />
        }
        label="Should we automatically deposit money from your bank account to cover buys?"
        margin="dense"
      />
    }
  }

  render() {
    const { buyClick, sellClick, ...other } = this.props;
    let open = true;
    return (
      <Dialog open={open}>
        <DialogTitle id="form-dialog-title">4. Setup DCA</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div>Finally!  Now let's get down to business. Here you will choose what asset you want to buy or sell, the amount, and the date you want it done by</div>
            <div>We'll automatically complete buy/sells on your behalf on Wyre evenly distributed over the time period you give us.</div>
            <div>If you're making a buy and don't have enough USD we can automatically deposit more each time.</div>
            <br />
            <br />
          </DialogContentText>
          <DialogContentText>
            Which currency?
          </DialogContentText>
          <TextField
            id="standard-select-currency"
            select
            value={this.state.chosenCurrency}
            onChange={this.changeCurrency}
            fullWidth
          >
            <MenuItem value="ETH">ETH</MenuItem>
            <MenuItem value="BTC">BTC</MenuItem>
          </TextField>
          <TextField
            label="How Many?"
            value={this.state.num}
            onChange={this.changeNum}
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <DialogContentText>
            When would you like it completed by?
          </DialogContentText>
          <Input
            type="date"
            label="When do you want it done by?"
          />
          <RadioGroup
            aria-label="Side"
            name="side"
            value={this.state.side}
            onChange={this.changeSide}
          >
            <FormControlLabel value="buy" control={<Radio />} label="Buy" />
            <FormControlLabel value="sell" control={<Radio />} label="Sell" />
          </RadioGroup>
          {this.showTheAdditionalOptions()}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => buyClick(this.state)} color="primary">
            Make the First Trade and Schedule Rest
            </Button>
        </DialogActions>
      </Dialog>
    );

    ChooseCurrency.propTypes = {
      handleChoice: PropTypes.func
    };
  }
}
export default ChooseCurrency;