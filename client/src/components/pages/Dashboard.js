import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { EntryItem } from '../Entries';

export class Dashboard extends Component {
  render() {
    const testArray = [
      { name: 'Breed', value: 'CHIN', formType: 'string' },
      { name: 'Age', value: 'adult', formType: 'string' }
    ];

    return (
      <div>
        <p>Dashboard</p>
        <p>Test: {this.props.test}</p>
        <EntryItem id={0} fields={testArray} isHeader />
        <EntryItem id={1} fields={testArray} />
        {/* name, value, formType, isHeader, isEditing */}
        <ul>
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/entry">Data Entry</Link>
          </li>
          <li>
            <Link to="/explorer">Data Explorer</Link>
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { test: state.test };
};
export default connect(mapStateToProps)(Dashboard);
