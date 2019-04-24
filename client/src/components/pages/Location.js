import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from '../Navbar/Navbar';
import { fetchGraphs } from '../../redux/actions/dashboardGraphs';
import { withStyles } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  root: { flexGrow: 1, padding: '1%' },
  centered: { width: '100%', textAlign: 'center' }
});

export class Dashboard extends Component {
  componentDidMount() {
    // this.props.fetchGraphs();
  }

  render() {
    const { classes } = this.props;
    const { graphs, error, loading } = this.props.dashboardGraphs;
    if (graphs.length <= 0 || loading || error)
      return (
        <div>
          <Navbar />
          <div className={classes.root} style={{ minHeight: '100vh' }}>
            <div className={classes.centered}>
              <CircularProgress />
            </div>
          </div>
        </div>
      );
    return (
      <div>
        <Navbar />
        <div className={classes.root} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { dashboardGraphs: state.dashboardGraphs };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchGraphs: () => dispatch(fetchGraphs())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Dashboard));
