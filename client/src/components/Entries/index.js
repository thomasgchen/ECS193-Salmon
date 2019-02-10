import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCases, updateCases } from '../../redux/actions/cases';
import EntryItem from './EntryItem';
import _ from 'lodash';

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
    this.props.updateCases({ ...data, id });
  };

  render() {
    const { error, loading, items } = this.props.cases;
    if (!items) {
      return (
        <div>
          {loading ? <p>loading...</p> : <p>No items in db.</p>}
          {error && <p>{error}</p>}
        </div>
      );
    } else {
      return (
        <div>
          {items[0] !== undefined && (
            <EntryItem
              id={-1}
              key="header entry"
              fields={this.structuredFields(items[0])}
              isHeader
              handleUpdate={this.handleUpdate}
            />
          )}
          {items.map(item => {
            return (
              <EntryItem
                id={item.id}
                key={item.id}
                fields={this.structuredFields(item)}
                handleUpdate={this.handleUpdate}
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
    updateCases: (id, data) => dispatch(updateCases(id, data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Entries);

export { default as Field } from './Field';
export { default as EntryItem } from './EntryItem';
