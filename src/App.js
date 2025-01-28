// src/App.js
import {useState, useEffect} from 'react'
import UserList from './components/UserList'
import UserForm from './components/UserForm'
import Header from './components/Header'

const App = () => {
  const [users, setUsers] = useState([])
  const [currentUser, setCurrentUser] = useState(null)

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users')
      const data = await response.json()
      const usersWithDetails = data.map(user => ({
        ...user,
        firstName: user.name.split(' ')[0], // Mock first name
        lastName: user.name.split(' ')[1] || '', // Mock last name
        department: 'IT', // Mock department
      }))
      setUsers(usersWithDetails)
    } catch (error) {
      alert('Failed to fetch users')
    }
  }

  // useEffect to fetch users on component mount
  useEffect(() => {
    fetchUsers()
  }, [])

  const addUser = async newUser => {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/users',
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(newUser),
        },
      )
      const data = await response.json()
      setUsers(prevUsers => [...prevUsers, data])
    } catch (error) {
      alert('Failed to add user')
    }
  }

  const editUser = async updatedUser => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${updatedUser.id}`,
        {
          method: 'PUT',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(updatedUser),
        },
      )
      const data = await response.json()
      setUsers(prevUsers =>
        prevUsers.map(user => (user.id === data.id ? data : user)),
      )
    } catch (error) {
      alert('Failed to update user')
    }
  }

  const deleteUser = async userId => {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
        method: 'DELETE',
      })
      setUsers(prevUsers => prevUsers.filter(user => user.id !== userId))
    } catch (error) {
      alert('Failed to delete user')
    }
  }

  const handleSaveUser = user => {
    if (user.id) {
      editUser(user)
    } else {
      addUser(user)
    }
  }

  return (
    <div className="App">
      <Header />
      <UserForm currentUser={currentUser} onSave={handleSaveUser} />
      <UserList users={users} onEdit={setCurrentUser} onDelete={deleteUser} />
    </div>
  )
}

export default App
