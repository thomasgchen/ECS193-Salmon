import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { fetchCases, updateCase, deleteCase } from '../../redux/actions/cases';
import { fetchLocations } from '../../redux/actions/locations';
import EntryItem from './EntryItem';
import Filters from './Filters';
import _ from 'lodash';
import Grid from '@material-ui/core/Grid';
import { CenteredProgress } from '../Progress';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import { RECORDS_PER_PAGE } from '../../config/constants';

const selectFields = ['age', 'pathogen', 'species', 'LocationId'];
const dateFields = ['date'];
const ignoredFields = ['Location.name'];
const aliasedFields = { LocationId: 'location' };

const styles = {
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
  }
};

export class Entries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: {},
      page: 0
    };
  }

  componentDidMount() {
    this.fetchCasesBasedOnState();
    this.props.fetchLocations();
  }

  fetchCasesBasedOnState() {
    this.props.fetchCases(this.state.page, this.state.filters);
  }

  structuredFields = item => {
    let row = [];
    _.mapKeys(item, (value, key) => {
      if (!ignoredFields.includes(key)) {
        if (key === 'Location.Id') console.log(String(value));
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

  handleUpdate = (id, data) => {
    this.props.updateCase({ ...data, id });
  };

  handleDelete = id => {
    console.log('deleting');
    this.props.deleteCase(id);
  };

  handleLoadMore = () => {
    console.log('loading more...');
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
        console.log('Filters', this.state.filters);
        this.fetchCasesBasedOnState();
      });
    }
  };

  render() {
    const { error, loading: casesLoading, items, noMoreToLoad } = this.props.cases;
    const { loading: locationsLoading, items: locations, lookup } = this.props.locations;
    const loading = casesLoading || locationsLoading;
    const { filters, page } = this.state;

    return (
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
          {items.slice(0, RECORDS_PER_PAGE * (page + 1)).map(item => {
            return (
              <EntryItem
                id={item.id}
                key={item.id + item.caseNum}
                fields={this.structuredFields(item)}
                handleUpdate={this.handleUpdate}
                handleDelete={this.handleDelete}
                extraData={{ locations: locations, lookupTable: lookup }}
              />
            );
          })}
          <div style={{ textAlign: 'center', marginBottom: '10px' }} onClick={this.handleLoadMore}>
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
    );
  }
}

const mapStateToProps = state => {
  return { cases: state.cases, locations: state.locations };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCases: (page, filters) => dispatch(fetchCases(page, filters)),
    deleteCase: id => dispatch(deleteCase(id)),
    updateCase: (id, data) => dispatch(updateCase(id, data)),
    fetchLocations: () => dispatch(fetchLocations())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Entries));

export { default as Field } from './Field';
export { default as EntryItem } from './EntryItem';
