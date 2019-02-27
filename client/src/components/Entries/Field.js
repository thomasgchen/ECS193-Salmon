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
    console.log(event);
    if (formType === 'date') handleChange(name, event.format('MM/DD/YY'));
    else if (formType === 'select') handleChange(name, event.value);
    else handleChange(name, event.target.value);
  };

  render() {
    const { name, value, currentValue, formType, isEditing, classes, theme } = this.props;
    if (isEditing) {
      if (formType === 'date') {
        return (
          <DateField
            id={name}
            name={name}
            value={currentValue}
            onChange={this.handleChange}
            theme={theme}
          />
        );
      } else if (formType === 'select') {
        return (
          <SelectField
            id={name}
            name={name}
            value={{ label: currentValue, value: currentValue }}
            onChange={this.handleChange}
            theme={theme}
          />
        );
      } else {
        return (
          <TextField
            id={name}
            label={name}
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
            {name}
          </Typography>
          <Typography noWrap className={classes.value}>
            {value}
          </Typography>
        </Paper>
      );
    }
  }
}

Field.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  currentValue: PropTypes.string.isRequired,
  formType: PropTypes.string.isRequired,
  isEditing: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default withStyles(styles, { withTheme: true })(Field);
