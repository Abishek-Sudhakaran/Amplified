import React, { useEffect, useState } from 'react'
import Amplify, { API, graphqlOperation } from 'aws-amplify'
import { createTodo, deleteTodo } from './graphql/mutations'
import { listTodos } from './graphql/queries'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import awsExports from "./aws-exports";
Amplify.configure(awsExports);

const initialState = { name: '', description: '' }
const FEED_QUERY = gql`
  {
    listTodos {
      items {
        id
        name
        description
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`
const App = () => {
  const [formState, setFormState] = useState(initialState)
  const [todos, setTodos] = useState([])

  useEffect(() => {
    // fetchTodos()
  }, [])

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value })
  }

  async function fetchTodos() {
    try {
      const todoData = await API.graphql(graphqlOperation(listTodos, { limit: 2 }))
      const todos = todoData.data.listTodos.items
      setTodos(todos)
    } catch (err) { console.log('error fetching todos', err) }
  }

  async function addTodo() {
    try {
      if (!formState.name || !formState.description) return
      const todo = { ...formState }
      // setTodos([...todos, todo])
      setFormState(initialState)
      console.log(todo)
      await API.graphql(graphqlOperation(createTodo, { input: todo })).then((data) => {
        console.log(data)
      })
    } catch (err) {
      console.log('error creating todo:', err)
    }
  }
  const deleteItem = async (id) => {
    await API.graphql(graphqlOperation(deleteTodo, { input: { id: id } })).then((data) => {
      console.log(data)
    }).catch((e) => (
      console.log(e)
    ))
  }
  return (
    <div style={styles.container}>
      <h2>Amplify Todos</h2>
      <input
        onChange={event => setInput('name', event.target.value)}
        style={styles.input}
        value={formState.name}
        placeholder="Name"
      />
      <input
        onChange={event => setInput('description', event.target.value)}
        style={styles.input}
        value={formState.description}
        placeholder="Description"
      />
      <button style={styles.button} onClick={addTodo}>Create Todo</button>

      <Query query={FEED_QUERY}>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching</div>
          if (error) {
            console.log(error)
            return <div>Error</div>
          }
          const todos = data.listTodos.items
          {
            return todos.map((todo, index) => {
              return <div key={todo.id ? todo.id : index} style={styles.todo} onClick={() => deleteItem(todo.id)}>
                <p style={styles.todoName}>{todo.name}</p>
                <p style={styles.todoDescription}>{todo.description}</p>
              </div>
            })
          }
        }}
      </Query>


    </div>
  )
}

const styles = {
  container: { width: 400, margin: '0 auto', display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center', padding: 20 },
  todo: { marginBottom: 15, backgroundColor: 'red' },
  input: { border: 'none', backgroundColor: '#ddd', marginBottom: 10, padding: 8, fontSize: 18 },
  todoName: { fontSize: 20, fontWeight: 'bold' },
  todoDescription: { marginBottom: 0 },
  button: { backgroundColor: 'black', color: 'white', outline: 'none', fontSize: 18, padding: '12px 0px' }
}

export default App