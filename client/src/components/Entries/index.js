import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { fetchCases, updateCase, deleteCase, createCase } from '../../redux/actions/cases';
import { fetchLocations } from '../../redux/actions/locations';
import EntryItem from './EntryItem';
import Filters from './Filters';
import _ from 'lodash';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import { RECORDS_PER_PAGE } from '../../config/constants';

const selectFields = ['age', 'pathogen', 'species', 'LocationId'];
const dateFields = ['date'];
const ignoredFields = ['Location.name'];
const aliasedFields = { LocationId: 'location' };

const styles = theme => ({
  outerRoot: {
    height: '100%',
    width: '100%'
  },
  root: {
    maxHeight: '100%',
    width: '100%',
    flexGrow: 1,
    overflowX: 'hidden',
    flexWrap: 'nowrap'
  },
  filtersSection: {
    maxWidth: '100%',
    width: '100%'
  },
  scrollableSection: {
    maxWidth: '100%',
    width: '100%',
    overflowX: 'hidden',
    overflowY: 'scroll'
  },
  close: {
    padding: theme.spacing.unit / 2
  }
});

export class Entries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: {},
      page: 0,
      snackbarOpen: false
    };
  }

  componentDidMount() {
    this.fetchCasesBasedOnState();
    this.props.fetchLocations();
  }

  componentDidUpdate(prevProps) {
    const newErrorMessage = this.constructErrorMessage(
      this.props.cases.error,
      this.props.locations.error
    );
    const error = newErrorMessage;
    const prevError = this.constructErrorMessage(prevProps.cases.error, prevProps.locations.error);

    if (prevError !== error && newErrorMessage) {
      this.setState({ snackbarOpen: true });
    }
  }

  constructErrorMessage = (casesError, locationsError) => {
    let errorString = '';
    if (casesError && casesError !== null && casesError !== undefined)
      errorString += String(casesError);
    if (locationsError && locationsError !== null && locationsError !== undefined)
      errorString += String(locationsError);

    return errorString;
  };
  fetchCasesBasedOnState() {
    this.props.fetchCases(this.state.page, this.state.filters);
  }

  structuredFields = item => {
    let row = [];
    _.mapKeys(item, (value, key) => {
      if (!ignoredFields.includes(key)) {
        row.push({
          label: aliasedFields[key] || key,
          name: key,
          value: String(value),
          formType: dateFields.includes(key)
            ? 'date'
            : selectFields.includes(key)
            ? 'select'
            : 'string'
        });
      }
    });
    return row;
  };

  handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ snackbarOpen: false });
  };

  handleUpdate = (id, data) => {
    if (id === -1) {
      // New case
      console.log('Creating case', data);
      this.props.createCase(data);
      this.props.handleNewEntryOpen();
    } else {
      this.props.updateCase({ ...data, id });
    }
  };

  handleDelete = id => {
    this.props.deleteCase(id);
  };

  handleLoadMore = () => {
    this.setState({ page: this.state.page + 1 }, () => {
      this.fetchCasesBasedOnState();
    });
  };

  handleFilterChange = (name, event) => {
    const { filters } = this.state;
    let newFilters;
    if (name !== 'clear') {
      newFilters = {
        ...filters,
        [name]: event.value
      };
    } else {
      newFilters = {};
    }

    if (!_.isEqual(newFilters, filters)) {
      this.setState({ filters: newFilters, page: 0 }, () => {
        this.fetchCasesBasedOnState();
      });
    }
  };

  render() {
    const { handleNewEntryOpen, newEntryOpen } = this.props;
    const { error: casesError, loading: casesLoading, items, noMoreToLoad } = this.props.cases;
    const {
      error: locationsError,
      loading: locationsLoading,
      items: locations,
      lookup
    } = this.props.locations;
    const loading = casesLoading || locationsLoading;
    const error = this.constructErrorMessage(casesError, locationsError);
    const { filters, page } = this.state;
    return (
      <div className={this.props.classes.outerRoot}>
        <Grid
          container
          spacing={32}
          direction="column"
          alignItems="center"
          justify="flex-start"
          className={this.props.classes.root}
        >
          <Grid xs={2} item className={this.props.classes.filtersSection}>
            <Filters
              locations={locations}
              handleFilterChange={this.handleFilterChange}
              values={filters}
            />
          </Grid>
          <Grid xs={10} item className={this.props.classes.scrollableSection}>
            {items.map(item => {
              return (
                <EntryItem
                  id={item.id}
                  key={item.id + item.caseNum}
                  fields={this.structuredFields(item)}
                  handleUpdate={this.handleUpdate}
                  handleDelete={this.handleDelete}
                  handleNewEntryOpen={this.props.handleNewEntryOpen}
                  extraData={{ locations: locations, lookupTable: lookup }}
                />
              );
            })}

            <EntryItem
              hidden={!newEntryOpen}
              newItem
              id={-1}
              fields={this.structuredFields(items[0])}
              handleUpdate={this.handleUpdate}
              handleDelete={handleNewEntryOpen}
              extraData={{ locations: locations, lookupTable: lookup }}
            />

            <div
              style={{ textAlign: 'center', marginBottom: '10px' }}
              onClick={this.handleLoadMore}
            >
              {loading && (
                <div style={{ marginBottom: '10px' }}>
                  <CircularProgress color="secondary" />
                </div>
              )}
              {noMoreToLoad ? (
                <p style={{ color: '#bdbdbd' }}>
                  <i>all records loaded</i>
                </p>
              ) : (
                <Button variant="contained" disabled={loading}>
                  Load More
                </Button>
              )}
            </div>
          </Grid>
        </Grid>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          open={this.state.snackbarOpen}
          autoHideDuration={5000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id'
          }}
          message={<span id="message-id">{error}</span>}
          action={[
            // <Button key="undo" color="secondary" size="small" onClick={this.handleClose}>
            //   UNDO
            // </Button>,
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={this.props.classes.close}
              onClick={this.handleSnackbarClose}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </div>
    );
  }
}

Entries.propTypes = {
  newEntryOpen: PropTypes.bool,
  handleNewEntryOpen: PropTypes.func.isRequired,
  classes: PropTypes.any.isRequired
};

const mapStateToProps = state => {
  return { cases: state.cases, locations: state.locations };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCases: (page, filters) => dispatch(fetchCases(page, filters)),
    deleteCase: id => dispatch(deleteCase(id)),
    updateCase: data => dispatch(updateCase(data)),
    createCase: data => dispatch(createCase(data)),
    fetchLocations: () => dispatch(fetchLocations())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Entries));

export { default as Field } from './Field';
export { default as EntryItem } from './EntryItem';
