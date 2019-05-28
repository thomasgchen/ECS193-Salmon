import React, { Component } from 'react';
import { connect } from 'react-redux';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { SALMON_COLOR } from '../../config/constants';
import Entries from '../Entries';
import Preview from '../Preview';
import Navbar from '../Navbar/Navbar';
import { Grid } from '@material-ui/core';
import LoginDialog from '../LoginDialog';
import { validatePass } from '../../redux/actions/auth';

export class DataEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newEntryOpen: false
    };
  }

  handleNewEntryOpen = () => {
    this.setState({ newEntryOpen: !this.state.newEntryOpen });
  };

  render() {
    const { newEntryOpen } = this.state;

    return (
      <div style={{ margin: 0, overflow: 'hidden', height: '100vh', width: '100vw' }}>
        <Navbar />
        <div
          style={{
            height: '95%',
            width: '65%',
            paddingRight: '10px',
            paddingBottom: '10px',
            float: 'left',
            overflowX: 'hidden',
            margin: '0'
          }}
        >
          <Entries newEntryOpen={newEntryOpen} handleNewEntryOpen={this.handleNewEntryOpen} />
        </div>
        <div
          style={{
            height: '100%',
            width: '33%',
            overflow: 'hidden',
            margin: '0'
          }}
        >
          <div style={{ flexGrow: 1, height: '100%', width: '100%' }}>
            <Grid
              container
              direction="row"
              justify="center"
              alignContent="center"
              style={{ height: '100%', width: '100%' }}
            >
              <Grid item xs={12} style={{ width: '100%', height: '60%' }}>
                {this.props.auth.pass === '' && (
                  <div style={{ width: '100%', textAlign: 'center', padding: '2%' }}>
                    <LoginDialog
                      attemptPassword={password => {
                        this.props.validatePass(password);
                      }}
                      loading={this.props.auth.loading}
                    />
                  </div>
                )}
                <Preview />
              </Grid>
            </Grid>
          </div>
        </div>
        <Fab
          style={{
            backgroundColor: SALMON_COLOR,
            color: 'white',
            position: 'absolute',
            bottom: '8px',
            right: '8px',
            transition: ''
          }}
          aria-label="Add"
          onClick={this.handleNewEntryOpen}
        >
          {!newEntryOpen ? <AddIcon /> : <AddIcon style={{ transform: 'rotate(45deg)' }} />}
        </Fab>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { auth: state.auth };
};

const mapDispatchToProps = dispatch => {
  return {
    validatePass: pass => dispatch(validatePass(pass))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DataEntry);
