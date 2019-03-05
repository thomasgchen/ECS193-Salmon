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
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // CSS for confirm alert

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
    this.setState({ changes: {}, isEditing: false }, () => {
      if (this.props.newItem) this.props.handleDelete();
    });
  };

  handleEditPress = event => {
    event.preventDefault();
    this.setState({ isEditing: true });
  };

  handleDeletePress = () => {
    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure you want to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            const { handleDelete, id } = this.props;
            handleDelete(id);
          }
        },
        {
          label: 'No'
        }
      ]
    });
  };

  handleMouseEnter = () => {
    this.setState({ isHovering: true });
  };

  handleMouseLeave = () => {
    this.setState({ isHovering: false });
  };

  render() {
    const { fields, isHeader, classes, id, extraData, newItem, hidden } = this.props;
    const { changes, isHovering } = this.state;
    const isEditing = this.state.isEditing || newItem;
    if (hidden) return <span key={`entryitem-${id}`} />;
    return (
      <Grid
        key={`entryitem-${id}`}
        container
        className={classes.root}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <Grid item xs={1} className={classes.idCell}>
          <p>
            <strong>{newItem ? 'new' : id}</strong>
          </p>
        </Grid>
        <Grid item xs={10}>
          <Grid container spacing={8}>
            {fields.map(field => {
              if (field.name === 'id') return <div key={`id-${id}`} />;
              return (
                <Grid item xs={2} key={`${field.name}-${id}`}>
                  <Field
                    key={field.name}
                    label={field.label}
                    name={field.name}
                    value={newItem ? '' : field.value}
                    currentValue={
                      changes[field.name] === undefined
                        ? newItem
                          ? ''
                          : field.value
                        : changes[field.name]
                    }
                    formType={field.formType}
                    isHeader={isHeader}
                    isEditing={isEditing}
                    handleChange={this.handleFieldChange}
                    locations={field.name === 'LocationId' ? extraData.locations : null}
                    lookupTable={field.name === 'LocationId' ? extraData.lookupTable : null}
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
  hidden: PropTypes.bool,
  newItem: PropTypes.bool,
  id: PropTypes.number.isRequired,
  fields: PropTypes.arrayOf(
    // Should not have id in fields.
    PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.string,
      label: PropTypes.string,
      formType: PropTypes.string
    })
  ).isRequired,
  isLoading: PropTypes.bool, // If true show loading icon
  handleUpdate: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  extraData: PropTypes.object // Optional object of additional data (used to send locations in)
};

export default withStyles(styles)(EntryItem);
