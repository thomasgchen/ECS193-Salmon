import React, { Component } from 'react';
import Field from './Field';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import EditIcon from '@material-ui/icons/Edit';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: 'none'
  }
});

export class EntryItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      changes: {}
    };
  }

  handleSubmitChanges = event => {
    event.preventDefault();
    const { fields } = this.props;
    const { changes } = this.state;
    let update_object = {};
    fields.map(field => {
      update_object[field.name] = changes[field.name] || field.value;
    });

    this.setState({ changes: {}, isEditing: false });
    console.log(update_object);
  };

  handleFieldChange = (key, value) => {
    const { changes } = this.state;
    this.setState({
      changes: {
        ...changes,
        [key]: value
      }
    });
  };

  handleClearChanges = event => {
    event.preventDefault();
    this.setState({ changes: {}, isEditing: false });
  };

  handleEditPress = event => {
    event.preventDefault();
    this.setState({ isEditing: true });
  };

  render() {
    const { fields, isHeader } = this.props;
    const { isEditing, changes } = this.state;
    return (
      <div>
        {fields.map(field => {
          return (
            <Field
              key={field.name}
              name={field.name}
              value={field.value}
              currentValue={changes[field.name] === undefined ? field.value : changes[field.name]}
              formType={field.formType}
              isHeader={isHeader}
              isEditing={isEditing}
              handleChange={this.handleFieldChange}
            />
          );
        })}
        {isEditing && !isHeader && (
          <IconButton aria-label="Delete" onClick={this.handleClearChanges}>
            <CloseIcon />
          </IconButton>
        )}
        {isEditing && !isHeader && (
          <IconButton aria-label="Check" onClick={this.handleSubmitChanges}>
            <CheckIcon />
          </IconButton>
        )}
        {!isEditing && !isHeader && (
          <IconButton aria-label="Edit" onClick={this.handleEditPress}>
            <EditIcon />
          </IconButton>
        )}
      </div>
    );
  }
}

EntryItem.propTypes = {
  id: PropTypes.number.isRequired,
  fields: PropTypes.arrayOf(
    // Should not have id in fields.
    PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.string,
      formType: PropTypes.string
    })
  ).isRequired,
  isLoading: PropTypes.bool, // If true show loading icon
  isHeader: PropTypes.bool, // If true only display the fields name's not value
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EntryItem);
