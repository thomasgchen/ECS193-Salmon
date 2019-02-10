import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCasesBegin } from '../../redux/actions/cases';
import EntryItem from './EntryItem';
import _ from 'lodash';

export class Entries extends Component {
  componentDidMount() {
    this.props.dispatch(fetchCasesBegin());
  }

  structuredFields = item => {
    let row = [];
    _.mapKeys(item, (value, key) => {
      row.push({ name: key, value: String(value), formType: 'string' });
    });
    return row;
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
            />
          )}
          {items.map(item => {
            return <EntryItem id={item.id} key={item.id} fields={this.structuredFields(item)} />;
          })}
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return { cases: state.cases };
};

export default connect(mapStateToProps)(Entries);

export { default as Field } from './Field';
export { default as EntryItem } from './EntryItem';
