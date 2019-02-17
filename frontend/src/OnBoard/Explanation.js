import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import './OnBoard.css';

class Explanation extends React.Component {
  render() {
    const { continueClick, ...other } = this.props;
    let open = true;
    return (
      <Dialog open={open}
        fullWidth={true}
        maxWidth={'md'}
      >
        <DialogTitle id="form-dialog-title"><h1>Wyre is our gateway to crypto</h1></DialogTitle>
        <DialogContent>
          <DialogContentText>
            <h5><a href="https://www.sendwyre.com/">Wyre</a> is great for getting into/out of crypto. <br />
              Let's get started.  Crypto isn't easy but this process is only 5 steps!
            </h5>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={continueClick} color="primary">
            Continue
            </Button>
        </DialogActions>
      </Dialog >
    );
  }
}
Explanation.propTypes = {
  continueClick: PropTypes.func,
};
export default Explanation;