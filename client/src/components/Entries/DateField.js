import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { DatePicker } from 'material-ui-pickers';

const styles = theme => ({
  root: {
    margin: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit * 2
  }
});
function SelectField({ theme, name, value, onChange, classes }) {
  return (
    <div className={classes.root}>
      <DatePicker format="MM/DD/YY" disableFuture label={name} value={value} onChange={onChange} />
    </div>
  );
}

SelectField.propTypes = {
  theme: PropTypes.object,
  name: PropTypes.string,
  currentValue: PropTypes.string,
  handleChange: PropTypes.func
};

export default withStyles(styles)(SelectField);
