import React from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {  getEmployee } from '../../graphql/queries'
import { createEmployee, updateEmployee, deleteEmployee } from '../../graphql/mutations'
import gql from 'graphql-tag'
import { useQuery, useMutation } from "react-apollo-hooks";
import Autocomplete from '@material-ui/lab/Autocomplete';
import DialogContentText from '@material-ui/core/DialogContentText';
import { Grid } from "@material-ui/core";

const initialState = {
  firstname: '',
  lastname: '',
  skills: []
}

const EmployeeForm = (props) => {
  const { handleClose, selectedId, throwAlert, employeeAction,skillsSeed } = props;
  const [state, setState] = React.useState(initialState);
  const [err, setErr] = React.useState({ firstname: '' })
  // const { data: skillData } = useQuery(gql(listSkills));
  const { data: empData, error, } = useQuery(gql(getEmployee), {
    variables: {
      id: selectedId,
    },
    skip: selectedId==='0' || throwAlert
  });
  const deleteEmp = useMutation(gql(deleteEmployee));
  const addEmp = useMutation(gql(createEmployee));
  const updateEmp = useMutation(gql(updateEmployee));

  React.useEffect(() => {
    if (empData &&empData.getEmployee) {
      const { id, firstname, lastname, skills } = empData.getEmployee
      setState({
        id, firstname, lastname, skills: skills.length !== 0 ?
          skills.map(({ id, name }) => ({ id, name })) : []
      })
    }
  }, [empData])

  if (error) return `Error! ${error.message}`;

  // const skillsSeed = skillData.listSkills ? skillData.listSkills.items.map(({ id, name }) => ({ id, name })) : []

  const onDialogClose = () => {
    setState(initialState)
    handleClose()
  }
  const renderTextField = (label, key) => (
    <Grid item xs={12} >
      <TextField
        id={key}
        error={err[key] ? true : false}
        margin="dense"
        label={label}
        onChange={(event) => {
          const val = { ...state }
          val[key] = event.target.value
          setState(val)
          if (err[key]) { setErr({ ...err, firstname: '' }) }
        }}
        value={state[key]}
        helperText={err[key]}
        fullWidth
      />
    </Grid>

  );
  const renderFormContent = () => (
    <DialogContent>
      <Grid
        spacing={2}
        justify={'center'}
        container
      >
        {renderTextField("First Name", 'firstname')}
        {renderTextField("Last Name", 'lastname')}
        <Grid item xs={12} >
          <Autocomplete
            multiple
            id="tags-standard"
            options={skillsSeed}
            getOptionLabel={(option) => option.name}
            onChange={(event, value) => setState({
              ...state,
              skills: value
            })
            }
            value={state.skills}
            getOptionSelected={(option, value) => option.id === value.id}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Skills"
              />
            )}
          />
        </Grid>
      </Grid>


    </DialogContent>
  )
  const renderAlert = () => (
    <DialogContent>
      <DialogContentText id="alert-dialog-slide-description">
        Are you sure you want to  delete this employee?
      </DialogContentText>
    </DialogContent>
  )

  const triggerEmployeeAction = () => {
    if (throwAlert) {
      employeeAction(deleteEmp, { id: selectedId },'del')
    } else {
      if (state.firstname.trim().length === 0) {
        setErr({ ...err, firstname: 'Name is Required' })
        return;
      }
      selectedId !== '0' ? employeeAction(updateEmp, state)
        : employeeAction(addEmp, state,'add')
    }
  }

  return (
    <Dialog open={true} onClose={onDialogClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">
        {throwAlert ? 'Delete' : 'Employee Details'}
      </DialogTitle>
      {throwAlert ? renderAlert() : renderFormContent()}

      <DialogActions>
        <Button onClick={onDialogClose} color="primary">
          Cancel
         </Button>

        <Button
          onClick={triggerEmployeeAction}
          color="primary">
          {throwAlert ? 'Yes' : selectedId !== '0' ? 'Update' : 'Create'}
        </Button>

      </DialogActions>
    </Dialog>
  )
};

export default EmployeeForm