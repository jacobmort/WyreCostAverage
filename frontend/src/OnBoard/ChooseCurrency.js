import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import blue from '@material-ui/core/colors/blue';
import './OnBoard.css';

class ChooseCurrency extends React.Component {
  state = {
    chosenCurrency: null
  }

  handleChange = (val) => {
    this.setState({
      chosenCurrency: val
    })
  }
  render() {
    const { handleChoice, ...other } = this.props;
    let open = true;
    return (
      <Dialog open={open}>
        <DialogTitle id="form-dialog-title">Buy or sell?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Which asset do you want?
            </DialogContentText>
          <Select
            value={this.state.chosenCurrency}
            onChange={this.handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>ETH</MenuItem>
            <MenuItem value={20}>BTC</MenuItem>
            <MenuItem value={30}>USD</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
        </DialogActions>
      </Dialog>
    );

    ChooseCurrency.propTypes = {
      handleChoice: PropTypes.func
    };
  }
}
export default ChooseCurrency;