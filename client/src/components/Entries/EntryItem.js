import React, { Component } from 'react';
import Field from './Field';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    margin: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit * 2
  },
  idCell: {
    textAlign: 'center',
    alignSelf: 'center',
    color: '#F4BBB8'
  },
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
      isHovering: false,
      changes: {}
    };
  }

  handleSubmitChanges = event => {
    event.preventDefault();
    const { fields, handleUpdate, id } = this.props;
    const { changes } = this.state;
    let update_object = {};
    fields.map(field => {
      return (update_object[field.name] = changes[field.name] || field.value);
    });

    this.setState({ changes: {}, isEditing: false });
    handleUpdate(id, changes);
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

  handleDeletePress = event => {
    const { handleDelete, id } = this.props;
    event.preventDefault();
    handleDelete(id);
  };

  handleMouseEnter = () => {
    this.setState({ isHovering: true });
  };

  handleMouseLeave = () => {
    this.setState({ isHovering: false });
  };

  render() {
    const { fields, isHeader, classes, id } = this.props;
    const { isEditing, changes, isHovering } = this.state;
    return (
      <Grid
        container
        className={classes.root}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <Grid item xs={1} className={classes.idCell}>
          <p>
            <strong>{id}</strong>
          </p>
        </Grid>
        <Grid item xs={10}>
          <Grid container spacing={8}>
            {fields.map(field => {
              if (field.name === 'id') return;
              return (
                <Grid item xs={2}>
                  <Field
                    key={field.name}
                    name={field.name}
                    value={field.value}
                    currentValue={
                      changes[field.name] === undefined ? field.value : changes[field.name]
                    }
                    formType={field.formType}
                    isHeader={isHeader}
                    isEditing={isEditing}
                    handleChange={this.handleFieldChange}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
        <Grid item xs={1} className={classes.idCell}>
          {isEditing && (
            <IconButton aria-label="Delete" onClick={this.handleClearChanges}>
              <CloseIcon />
            </IconButton>
          )}
          {isEditing && (
            <IconButton aria-label="Check" onClick={this.handleSubmitChanges}>
              <CheckIcon />
            </IconButton>
          )}
          {!isEditing && !isHeader && isHovering && (
            <span>
              <IconButton aria-label="Edit" onClick={this.handleEditPress}>
                <EditIcon />
              </IconButton>
              {/* TODO: confirmation dialog */}
              <IconButton aria-label="Delete" onClick={this.handleDeletePress}>
                <DeleteIcon />
              </IconButton>
            </span>
          )}
        </Grid>
      </Grid>
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
  handleUpdate: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EntryItem);
