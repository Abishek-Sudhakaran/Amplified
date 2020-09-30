import React, { useEffect, useState } from 'react';
import Table from '../../components/Table'
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import { createEmployee, updateEmployee, deleteEmployee } from '../../graphql/mutations'
import { listEmployees, listSkills } from '../../graphql/queries'
import gql from 'graphql-tag'
import { useQuery } from "react-apollo-hooks";
import EmployeeForm from './Form'

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
    const { loading, error, data } = useQuery(gql(listEmployees));

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    const employees = data.listEmployees.items;
    employees.map((emp) => {
        emp.fullname = `${emp.firstname} ${emp.lastname}`
        emp.skillset = emp.skills.map((skills) => skills.name)
    })

    const handleClickOpen = (emp) => {
        console.log(emp)
        setState({ open: true, selectedId: emp.id })
    };

    const handleClose = () => {
        setState({ open: false, selectedId: '0',throwAlert: false });
    };
    const tableBody = () => {
        return <div style={{ width: '80%' }}>
            <Table
                headers={tableHeader()}
                rows={employees}
                actions={[
                    { name: 'Edit', action: handleClickOpen },
                    { name: 'Delete', action: () => setState({ ...state, open:true,throwAlert: true }) }
                ]}
            />
        </div>

    }
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            {tableBody()}
            {open && <EmployeeForm
                handleClose={handleClose}
                selectedId={selectedId}
                throwAlert={throwAlert}
            />}


        </div>
    )
}



export default EmployeeList