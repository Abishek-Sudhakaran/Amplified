import React from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { listSkills, getEmployee } from '../../graphql/queries'
import gql from 'graphql-tag'
import { useQuery } from "react-apollo-hooks";
import Autocomplete from '@material-ui/lab/Autocomplete';
import DialogContentText from '@material-ui/core/DialogContentText';

const initialState = {
    id: '',
    firstname: '',
    lastname: '',
    skills: []
}

const EmployeeForm = (props) => {
    const { handleClose, selectedId, throwAlert } = props;
    const { loading, error, data } = useQuery(gql(listSkills));
    const [state, setState] = React.useState(initialState);
    const skills = data.listSkills.items;

    const { data: empData } = useQuery(gql(getEmployee), {
        variables: {
            id: selectedId,
        },
        skip: !selectedId
    });

    React.useEffect(() => {
        if (empData.getEmployee) {
            const { id, firstname, lastname, skills } = empData.getEmployee
            setState({ id, firstname, lastname, skills })
        }
    }, [empData])

    if (loading) return '';
    if (error) return `Error! ${error.message}`;

    const onDialogClose = () => {
        setState(initialState)
        handleClose()
    }
    const renderTextField = (label, key) => (
        <TextField
            autoFocus
            margin="dense"
            id="name"
            label={label}
            onChange={(event) => {
                const val = { ...state }
                val[key] = event.target.value
                setState(val)
            }}
            value={state[key]}
            fullWidth
        />
    );
    const renderFormContent = () => (
        <DialogContent>
            {renderTextField("First Name", 'firstname')}
            {renderTextField("Last Name", 'lastname')}
            <Autocomplete
                multiple
                id="tags-standard"
                options={skills}
                getOptionLabel={(option) => option.name}
                onChange={(event, value) => setState({ ...state, skills: value })}
                value={state.skills}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="standard"
                        label="Skills"
                    />
                )}
            />

        </DialogContent>
    )
    const renderAlert = () => (
        <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
                Are you sure you want to  delete this employee?
            </DialogContentText>
        </DialogContent>
    )

    return (
        <Dialog open={true} onClose={onDialogClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">
               {throwAlert ?'Delete' : 'Employee Details'}
            </DialogTitle>
            {throwAlert ? renderAlert() : renderFormContent()}

            <DialogActions>
                <Button onClick={onDialogClose} color="primary">
                    Cancel
                </Button>
                {throwAlert ?
                    <Button onClick={onDialogClose} color="primary">
                        Delete
                    </Button> :
                    <Button onClick={onDialogClose} color="primary">
                        {selectedId ? 'Update' : 'Create'}
                    </Button>
                }
            </DialogActions>
        </Dialog>
    )
};

export default EmployeeForm