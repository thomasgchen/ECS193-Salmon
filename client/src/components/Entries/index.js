import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { fetchCases, updateCase, deleteCase } from '../../redux/actions/cases';
import { fetchLocations } from '../../redux/actions/locations';
import EntryItem from './EntryItem';
import _ from 'lodash';
import { CenteredProgress } from '../Progress';
import CircularProgress from '@material-ui/core/CircularProgress';

const recordsPerPage = 50; // Make sure this matches the endpoint
const selectFields = ['age', 'pathogen', 'species', 'LocationId'];
const dateFields = ['date'];
const ignoredFields = ['Location.name'];
const aliasedFields = { LocationId: 'location' };

export class Entries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0
    };
  }

  componentDidMount() {
    const { page } = this.state;
    this.props.fetchCases(page);
    this.props.fetchLocations();
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
      this.props.fetchCases(this.state.page);
    });
  };

  render() {
    const { error, loading: casesLoading, items } = this.props.cases;
    const { loading: locationsLoading, items: locations, lookup } = this.props.locations;
    const loading = casesLoading || locationsLoading;
    const { page } = this.state;

    if (items === undefined || items === null || items.length === 0) {
      return (
        <div>
          {loading ? <CenteredProgress /> : <p>No items in db.</p>}
          {error && <p>{String(error)}</p>}
        </div>
      );
    } else {
      return (
        <div>
          {items.slice(0, recordsPerPage * (page + 1)).map(item => {
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
            <Button variant="contained" disabled={loading}>
              Load More
            </Button>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return { cases: state.cases, locations: state.locations };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCases: page => dispatch(fetchCases(page)),
    deleteCase: id => dispatch(deleteCase(id)),
    updateCase: (id, data) => dispatch(updateCase(id, data)),
    fetchLocations: () => dispatch(fetchLocations())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Entries);

export { default as Field } from './Field';
export { default as EntryItem } from './EntryItem';
