import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    maxWidth: 300
  }
});

const GroupByFilter = ({ classes, handleChange, value }) => {
  return (
    <FormControl className={classes.formControl}>
      <InputLabel>Group By</InputLabel>
      <Select
        value={value}
        onChange={handleChange}
        inputProps={{
          name: 'group-by'
        }}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={'age'}>Age</MenuItem>
        <MenuItem value={'species'}>Species</MenuItem>
        <MenuItem value={'pathogen'}>Pathogen</MenuItem>
      </Select>
    </FormControl>
  );
};

GroupByFilter.propTypes = {
  handleChange: PropTypes.func.isRequired, // The function called when a change occurs.
  value: PropTypes.string
};

export default withStyles(styles, { withTheme: true })(GroupByFilter);
