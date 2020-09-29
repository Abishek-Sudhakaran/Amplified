import React, { useEffect, useState } from 'react';
import Table from './components/Table'
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import { createEmployee, updateEmployee, deleteEmployee } from './graphql/mutations'
import { listEmployees } from './graphql/queries'
import gql from 'graphql-tag'
import { useQuery } from "react-apollo-hooks";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const tableHeader = () => {
  return [
    { label: "Employee Id", accesor: "id", minWidth: '30%' },
    { label: "Name", accesor: "fullname", minWidth: '20%' },
    { label: "Skills", accesor: "skillset", minWidth: '30%' },
  ];
};

const App = () => {
  const [open, setOpen] = React.useState(false);
  const { loading, error, data } = useQuery(gql(listEmployees));

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const employees = data.listEmployees.items;
  employees.map((emp) => {
    emp.fullname = `${emp.firstname} ${emp.lastname}`
    emp.skillset = emp.skills.map((skills) => skills.name)
  })

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const tableBody = () => {
    return <div style={{ width: '80%' }}>
      <Table
        headers={tableHeader()}
        rows={employees}
        actions={[
          { name: 'Edit', action: handleClickOpen },
          { name: 'Delete', action: () => { } }
        ]}
      />
    </div>

  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      {tableBody()}
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Employee Details</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="First Name"
            type="email"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Last Name"
            type="email"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Skills"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}



export default App