import React from 'react';
import { FormControl, InputLabel } from '@material-ui/core';
import Select from 'react-select';
import { VALID_AGES } from '../../config/constants';

function SelectField() {
  const { theme, name, currentValue, handleChange } = this.props;
  const selectStyles = {
    container: base => ({
      ...base,
      width: '100%',
      marginTop: theme.spacing.unit,
      marginBottom: theme.spacing.unit,
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      zIndex: '100000'
    }),
    valueContainer: base => ({
      ...base,
      opacity: 1
    }),
    input: base => ({
      ...base,
      color: theme.palette.text.primary,
      '& input': {
        font: 'inherit'
      }
    })
  };
  return (
    <FormControl>
      <InputLabel>{name}</InputLabel>
      <Select
        className="basic-single"
        classNamePrefix="select"
        styles={selectStyles}
        isSearchable="true"
        name={name}
        value={{ label: currentValue, value: currentValue }}
        onChange={handleChange}
        options={VALID_AGES}
      />
    </FormControl>
  );
}

export default SelectField;
