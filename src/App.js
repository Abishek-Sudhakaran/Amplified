import React from 'react';
import EmployeeList from "./pages/employee/List";
import { Switch, Route } from 'react-router-dom'
import Layout from './components/Layout'


const App = (props) => {
  console.log(props)
  return (
    <Layout>
      <Switch>
        <Route exact path="/employees" component={EmployeeList} />
      </Switch>
    </Layout>
  )
}

export default App