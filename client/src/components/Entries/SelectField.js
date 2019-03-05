import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Select from 'react-select';
import { withStyles } from '@material-ui/core/styles';
import { emphasize } from '@material-ui/core/styles/colorManipulator';
import { VALID_AGES, VALID_PATHOGENS, VALID_SPECIES } from '../../config/constants';

const styles = theme => ({
  root: {
    whiteSpace: 'nowrap',
    flexGrow: 1,
    padding: 0,
    marginTop: theme.spacing.unit * 2
  },
  input: {
    display: 'flex',
    flexWrap: 'nowrap',
    padding: 0,
    margin: 0
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'nowrap',
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden'
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
      0.08
    )
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  },
  singleValue: {
    fontSize: 16
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    fontSize: 16
  },
  paper: {
    position: 'absolute',
    zIndex: 1,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0
  },
  divider: {
    height: theme.spacing.unit * 2
  }
});

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function inputComponent({ inputRef, ...props }) {
  return <div style={{ margin: 0, padding: 0, height: '32px' }} ref={inputRef} {...props} />;
}

function Control(props) {
  return (
    <TextField
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps
        }
      }}
      {...props.selectProps.textFieldProps}
    />
  );
}

function Option(props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

function Placeholder(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function SingleValue(props) {
  return (
    <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
      {props.children}
    </Typography>
  );
}

function ValueContainer(props) {
  return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

function Menu(props) {
  return (
    <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
      {props.children}
    </Paper>
  );
}

function SelectField({ theme, name, value, onChange, classes, options, label }) {
  if (name === 'location') console.log(name, value);
  const selectStyles = {
    input: base => ({
      ...base,
      color: theme.palette.text.primary,
      '& input': {
        font: 'inherit'
      }
    })
  };

  let suggestions = [];
  if (options) {
    suggestions = options;
  } else {
    if (name === 'age') suggestions = VALID_AGES;
    else if (name === 'pathogen') suggestions = VALID_PATHOGENS;
    else if (name === 'species') suggestions = VALID_SPECIES;
  }

  return (
    <div className={classes.root}>
      <Select
        classes={classes}
        styles={selectStyles}
        options={suggestions}
        components={components}
        value={value}
        onChange={onChange}
        placeholder={label || name}
        textFieldProps={{
          label: label || name,
          InputLabelProps: {
            shrink: true
          }
        }}
      />
    </div>
  );
}

const components = {
  Control,
  Menu,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer
};

SelectField.propTypes = {
  theme: PropTypes.object,
  label: PropTypes.string,
  name: PropTypes.string,
  currentValue: PropTypes.string,
  handleChange: PropTypes.func,
  options: PropTypes.array // Optional list of options (overides options geussing based on name)
};

export default withStyles(styles, { withTheme: true })(SelectField);
