import React, { Component } from 'react';
import { connect } from 'react-redux';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import { SALMON_COLOR } from '../../config/constants';
import Entries from '../Entries';
import Preview from '../Preview';
import Navbar from '../Navbar/Navbar';
import { Grid } from '@material-ui/core';

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
            paddingTop: '10px',
            paddingRight: '10xpx',
            display: 'inline-block',
            overflowX: 'hidden',
            margin: '0'
          }}
        >
          <Entries newEntryOpen={newEntryOpen} handleNewEntryOpen={this.handleNewEntryOpen} />
        </div>
        <div
          style={{
            height: '95%',
            width: '33%',
            overflow: 'hidden',
            margin: '0',
            display: 'inline-block'
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
  return { test: state.test };
};

export default connect(mapStateToProps)(DataEntry);
