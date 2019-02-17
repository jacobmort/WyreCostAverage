import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';

class CreateAccount extends React.Component {
  constructor() {
    super();
    this.state = {
      fullName: null,
      email: null,
      cellphone: null,
      street1: null,
      street2: "",
      city: null,
      state: null,
      postalCode: null,
      country: null,
      ssn: null,
      dob: null,
    };
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    let open = true;
    const { continueClick, ...other } = this.props;
    return (
      <Dialog
        open={open}
        fullWidth={true}
        maxWidth={'md'}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title"><h1>1. Let's Create a Wyre Account</h1></DialogTitle>
        <DialogContent>
          <Grid container spacing={24}>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Full Name"
              type="name"
              onChange={this.handleChange('fullName')}
              fullWidth
            />
            <TextField
              margin="dense"
              id="ssn"
              label="SSN"
              type="ssn"
              onChange={this.handleChange('ssn')}
            />
            <TextField
              margin="dense"
              id="dob"
              label="Dob"
              type="dob"
              onChange={this.handleChange('dob')}
            />
            <TextField
              margin="dense"
              id="phone"
              label="Cell Phone"
              type="phone"
              onChange={this.handleChange('cellphone')}
            />
            <TextField
              id="email"
              label="Email"
              type="email"
              onChange={this.handleChange('email')}
              fullWidth
            />
            <TextField
              margin="dense"
              id="addres"
              label="Address"
              type="address"
              onChange={this.handleChange('street1')}
              fullWidth
            />
            <TextField
              margin="dense"
              id="city"
              label="City"
              type="city"
              onChange={this.handleChange('city')}
            />
            <TextField
              margin="dense"
              id="city"
              label="State"
              type="city"
              onChange={this.handleChange('state')}
            />
            <TextField
              margin="dense"
              id="zip"
              label="Zipcode"
              type="zip"
              onChange={this.handleChange('postalCode')}
            />
            <TextField
              margin="dense"
              id="country"
              label="country"
              type="country"
              onChange={this.handleChange('country')}
            />
          </Grid>

        </DialogContent>
        <DialogActions>
          <Button onClick={() => continueClick(this.state)} color="primary">
            Continue
            </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default CreateAccount;