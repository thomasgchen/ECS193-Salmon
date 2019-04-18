import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    maxWidth: 300
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  chip: {
    margin: theme.spacing.unit / 4
  },
  noLabel: {
    marginTop: theme.spacing.unit * 3
  }
});

const getStyles = (name, that) => {
  return {
    fontWeight:
      that.props.chosen.indexOf(name) === -1
        ? that.props.theme.typography.fontWeightRegular
        : that.props.theme.typography.fontWeightMedium
  };
};

class Filter extends Component {
  render() {
    const { classes, items, chosen, handleFilterChange, name } = this.props;
    return (
      <FormControl className={classes.formControl}>
        <InputLabel>{name}</InputLabel>
        <Select
          multiple
          value={chosen}
          onChange={handleFilterChange}
          input={<Input id="select-multiple-chip" />}
          renderValue={selected => (
            <div className={classes.chips}>
              {selected.map(value => (
                <Chip key={`${name}-selected-${value}`} label={value} className={classes.chip} />
              ))}
            </div>
          )}
          // MenuProps={MenuProps}
        >
          {items.map(item => (
            <MenuItem
              key={`${name}-${item.value}`}
              value={item.value}
              style={getStyles(item.value, this)}
            >
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }
}

Filter.propTypes = {
  name: PropTypes.string, // The name of the input
  handleFilterChange: PropTypes.func.isRequired, // The function called when a change occurs.
  items: PropTypes.array.isRequired, // The items in the select
  chosen: PropTypes.array // The chosen items in the select
};

export default withStyles(styles, { withTheme: true })(Filter);

export { default as GroupByFilter } from './groupByFilter';
