import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class LoginDialog extends React.Component {
  state = {
    open: false,
    password: ''
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSubmit = () => {
    this.props.attemptPassword(this.state.password);
    this.setState({ open: true });
  };

  handlePasswordChange = event => {
    this.setState({ password: event.target.value });
  };

  render() {
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Unlock Page (YOU ARE IN READ ONLY MODE)
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Restricted Page</DialogTitle>
          <DialogContent>
            <DialogContentText>
              In order to create, edit, and delete cases you must first provide the admin password
              below.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="password"
              label="Admin Password"
              type="password"
              // value={this.state.password}
              onChange={this.handlePasswordChange}
              fullWidth
            />
            <DialogContentText>{this.props.loading && 'Loading...'}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary" disabled={this.props.loading}>
              Enter
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

Map.propTypes = {
  loading: PropTypes.boolean,
  passwordIsSaved: PropTypes.string,
  attemptPassword: PropTypes.func.isRequired
};
