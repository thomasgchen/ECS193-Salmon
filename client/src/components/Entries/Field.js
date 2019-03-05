import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import SelectField from './SelectField';
import DateField from './DateField';

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  header: {
    color: 'black',
    fontWeight: 'bold'
  },
  value: {
    color: '#4F4F4F'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  outlinedShell: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit
  },
  menu: {
    width: 200
  }
});

export class Field extends Component {
  handleChange = event => {
    const { formType, handleChange, name } = this.props;
    // Call the parent's handle change which expects a key and value
    if (formType === 'date') handleChange(name, event.format('MM/DD/YY'));
    else if (formType === 'select') handleChange(name, event.value);
    else handleChange(name, event.target.value);
  };

  render() {
    const {
      name,
      value,
      currentValue,
      formType,
      isEditing,
      classes,
      theme,
      label,
      locations,
      lookupTable
    } = this.props;
    if (isEditing) {
      if (formType === 'date') {
        return (
          <DateField
            id={name}
            name={label}
            value={currentValue}
            onChange={this.handleChange}
            theme={theme}
          />
        );
      } else if (formType === 'select') {
        return (
          <SelectField
            id={name}
            name={label}
            value={{
              value: currentValue,
              label: lookupTable ? lookupTable[currentValue] : currentValue
            }}
            onChange={this.handleChange}
            options={locations}
            theme={theme}
          />
        );
      } else {
        return (
          <TextField
            id={name}
            label={label}
            className={classes.textField}
            value={currentValue}
            onChange={this.handleChange}
            margin="normal"
            // variant="outlined"
          />
        );
      }
    } else {
      return (
        <Paper className={classes.root}>
          <Typography noWrap className={classes.header}>
            {label}
          </Typography>
          <Typography noWrap className={classes.value}>
            {lookupTable ? lookupTable[value] : value}
          </Typography>
        </Paper>
      );
    }
  }
}

Field.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  currentValue: PropTypes.string.isRequired,
  formType: PropTypes.string.isRequired,
  isEditing: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  locations: PropTypes.array,
  lookupTable: PropTypes.object
};

export default withStyles(styles, { withTheme: true })(Field);
