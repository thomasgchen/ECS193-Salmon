import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import SelectField from './SelectField';
import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {},
  button: {
    margin: theme.spacing.unit
  }
});

function Filters({ locations, handleFilterChange, classes, values }) {
  return (
    <Grid container className={classes.root} spacing={16} justify="center">
      <Grid item xs={2}>
        <SelectField
          name="age"
          value={values.age ? values.age.value : ''}
          onChange={event => {
            handleFilterChange('age', event);
          }}
        />
      </Grid>
      <Grid item xs={2}>
        <SelectField
          name="pathogen"
          value={values.pathogen ? values.pathogen.value : ''}
          onChange={event => {
            handleFilterChange('pathogen', event);
          }}
        />
      </Grid>
      <Grid item xs={2}>
        <SelectField
          name="species"
          value={values.species ? values.species.value : ''}
          onChange={event => {
            handleFilterChange('species', event);
          }}
        />
      </Grid>
      <Grid item xs={2}>
        <SelectField
          name="LocationId"
          label="location"
          value={values.LocationId ? values.LocationId.value : ''}
          onChange={event => {
            handleFilterChange('LocationId', event);
          }}
          options={locations}
        />
      </Grid>
      <Grid item xs={2}>
        <Button
          color="secondary"
          className={classes.button}
          onClick={() => {
            handleFilterChange('clear', {});
          }}
        >
          Clear Filters
        </Button>
      </Grid>
    </Grid>
  );
}

Filters.propTypes = {
  handleFilterChange: PropTypes.func.isRequired,
  locations: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  values: PropTypes.object.isRequired
};

export default withStyles(styles)(Filters);
