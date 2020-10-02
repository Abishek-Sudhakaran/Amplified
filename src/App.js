import React from 'react';
import EmployeeList from "./pages/employee/List";
import { Switch, Route } from 'react-router-dom'
import Layout from './components/Layout'

const containerStyle = {
  background: '#f2f3f3',
  height: '100vh',
  overflow: 'auto'
}
const App = () => {
  return (
    <div style={containerStyle}>
      <Layout>
        <Switch>
          <Route exact path="/employees" component={EmployeeList} />
        </Switch>
      </Layout>
    </div>
  )
}

export default App