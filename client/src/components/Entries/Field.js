import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  menu: {
    width: 200
  }
});

export class Field extends Component {
  handleChange = event => {
    // Call the parent's handle change which expects a key and value
    this.props.handleChange(this.props.name, event.target.value);
  };

  render() {
    const { name, value, currentValue, formType, isHeader, isEditing, classes } = this.props;
    return (
      <div style={{ display: 'inline-block', padding: '10px' }}>
        {isHeader && (
          <p>
            <strong>{name}</strong>
          </p>
        )}
        {!isHeader && isEditing && (
          <TextField
            id={name}
            label={name}
            className={classes.textField}
            value={currentValue}
            onChange={this.handleChange}
            margin="normal"
          />
        )}
        {!isHeader && !isEditing && <p>{value}</p>}
      </div>
    );
  }
}

Field.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  currentValue: PropTypes.string.isRequired,
  formType: PropTypes.string.isRequired,
  isHeader: PropTypes.bool,
  isEditing: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default withStyles(styles)(Field);
