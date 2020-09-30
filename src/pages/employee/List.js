import React, { useEffect, useState } from 'react';
import Table from '../../components/Table'
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import { createEmployee, updateEmployee, deleteEmployee } from '../../graphql/mutations'
import { listEmployees } from '../../graphql/queries'
import gql from 'graphql-tag'
import { useQuery, useMutation } from "react-apollo-hooks";
import EmployeeForm from './Form'
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import { Grid } from "@material-ui/core";

const tableHeader = () => {
    return [
        { label: "Employee Id", accesor: "id", minWidth: '30%' },
        { label: "Name", accesor: "fullname", minWidth: '20%' },
        { label: "Skills", accesor: "skillset", minWidth: '30%' },
    ];
};


const EmployeeList = () => {
    const [state, setState] = React.useState({ open: false, selectedId: '0', throwAlert: false });
    const { open, selectedId, throwAlert } = state
    const { loading, error, data, refetch } = useQuery(gql(listEmployees));
    const [employees, setEmployeeList] = React.useState([])
    const deleteEmp = useMutation(gql(deleteEmployee));
    const addEmp = useMutation(gql(createEmployee));
    const updateEmp = useMutation(gql(updateEmployee));

    React.useEffect(() => {
        if (data.listEmployees) {
            data.listEmployees.items.map((emp) => {
                emp.fullname = `${emp.firstname} ${emp.lastname}`
                emp.skillset = emp.skills.map((skills) => skills.name)
            })
            setEmployeeList(data.listEmployees.items)
        }
    }, [data])

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;



    const handleClickOpen = (emp, alert) => {
        setState({ open: true, selectedId: emp.id, throwAlert: alert || false })
    };
    const delEmployee = async () => {
        await deleteEmp({
            variables: {
                input: { id: selectedId },
            }
        })
        refetch()
        handleClose()
    }
    const addOrUpdateEmp =async (input) => {
        if (input.id) {
            await updateEmp({ variables: { input } })
        } else {
            await addEmp({ variables: { input } })
        }
        refetch()
        handleClose()
    }
    const handleClose = () => {
        setState({ open: false, selectedId: '0', throwAlert: false });
    };
    const tableBody = () => {
        return <Grid
            spacing={2}
            container
            justify={'flex-end'}
        >
            <Grid item >
                <Button variant="contained" color="primary"
                    onClick={() => setState({ ...state, open: true })}>
                    Add Employee
             </Button>
            </Grid>

            <Table
                headers={tableHeader()}
                rows={employees}
                actions={[
                    { name: 'Edit', action: handleClickOpen },
                    { name: 'Delete', action: (emp) => handleClickOpen(emp, 'THROW_ALERT') }
                ]}
            />
        </Grid>


    }
    return (
        <Container fixed>
            {tableBody()}
            {open && <EmployeeForm
                handleClose={handleClose}
                selectedId={selectedId}
                throwAlert={throwAlert}
                delEmployee={delEmployee}
                addOrUpdateEmp={addOrUpdateEmp}
            />}
        </Container>
    )
}



export default EmployeeList