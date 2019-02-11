import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCases, updateCase, deleteCase } from '../../redux/actions/cases';
import EntryItem from './EntryItem';
import _ from 'lodash';
import { CenteredProgress } from '../Progress';

export class Entries extends Component {
  componentDidMount() {
    this.props.fetchCases();
  }

  structuredFields = item => {
    let row = [];
    _.mapKeys(item, (value, key) => {
      row.push({ name: key, value: String(value), formType: 'string' });
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

  render() {
    const { error, loading, items } = this.props.cases;
    if (items === undefined || items === null || items.length === 0) {
      return (
        <div>
          {loading ? <CenteredProgress /> : <p>No items in db.</p>}
          {error && <p>{error}</p>}
        </div>
      );
    } else {
      return (
        <div>
          {items.map(item => {
            return (
              <EntryItem
                id={item.id}
                key={item.id + item.caseNum}
                fields={this.structuredFields(item)}
                handleUpdate={this.handleUpdate}
                handleDelete={this.handleDelete}
              />
            );
          })}
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return { cases: state.cases };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCases: () => dispatch(fetchCases()),
    deleteCase: id => dispatch(deleteCase(id)),
    updateCase: (id, data) => dispatch(updateCase(id, data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Entries);

export { default as Field } from './Field';
export { default as EntryItem } from './EntryItem';
