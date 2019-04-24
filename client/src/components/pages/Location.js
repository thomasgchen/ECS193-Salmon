import React, { Component } from 'react';
import { connect } from 'react-redux';
import Navbar from '../Navbar/Navbar';
import { fetchLocations, fetchLocationProfiles } from '../../redux/actions/locations';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Link } from 'react-router-dom';
import { withStyles, Grid, Paper } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Map from '../Map/Map';

const styles = theme => ({
  root: { flexGrow: 1, padding: '1%' },
  centered: { width: '100%', textAlign: 'center' }
});

export class Dashboard extends Component {
  componentDidMount() {
    this.props.fetchLocations();
    this.props.fetchLocationProfiles();
  }

  render() {
    const { classes } = this.props;
    const { loading, error, locations, profiles } = this.props.locations;
    if (loading)
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
        <div className={classes.root}>
          <Grid container spacing={16}>
            <Grid item xs={12}>
              <Paper>
                <Map locations={locations} />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell align="right">Lat</TableCell>
                      <TableCell align="right">Lng</TableCell>
                      <TableCell align="right">Cases</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {profiles &&
                      Object.values(profiles).map(profile => (
                        <TableRow key={profile.id}>
                          <TableCell component="th" scope="row">
                            <Link
                              to={`/locationprofile/${profile.id}`}
                              // style={{ textDecoration: 'none', color: 'white' }}
                            >
                              {profile.name}{' '}
                            </Link>
                          </TableCell>
                          <TableCell align="right">{profile.location.latitude}</TableCell>
                          <TableCell align="right">{profile.location.longitude}</TableCell>
                          <TableCell align="right">{profile.casesCount}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { locations: state.locations };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchLocations: () => dispatch(fetchLocations()),
    fetchLocationProfiles: () => dispatch(fetchLocationProfiles())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Dashboard));
