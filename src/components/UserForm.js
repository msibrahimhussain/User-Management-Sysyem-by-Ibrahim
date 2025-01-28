// src/components/UserForm.js
import {useState, useEffect} from 'react'

const UserForm = ({currentUser, onSave}) => {
  const [user, setUser] = useState({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    department: '',
  })

  useEffect(() => {
    if (currentUser) {
      setUser(currentUser)
    }
  }, [currentUser])

  const handleChange = e => {
    const {name, value} = e.target
    setUser(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (user.firstName && user.lastName && user.email && user.department) {
      onSave(user)
      setUser({id: '', firstName: '', lastName: '', email: '', department: ''}) // Reset form
    } else {
      alert('All fields are required!')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <label htmlFor="fN">First Name</label>
      <input
        type="text"
        name="firstName"
        id="fN"
        value={user.firstName}
        onChange={handleChange}
        required
      />
      <label htmlFor="lN">Last Name</label>
      <input
        type="text"
        name="lastName"
        id="lN"
        value={user.lastName}
        onChange={handleChange}
        required
      />
      <label htmlFor="em">Email</label>
      <input
        type="email"
        name="email"
        id="em"
        value={user.email}
        onChange={handleChange}
        required
      />
      <label htmlFor="dept">Department</label>
      <input
        type="text"
        name="department"
        id="dept"
        value={user.department}
        onChange={handleChange}
        required
      />
      <button type="submit">{user.id ? 'Update User' : 'Add User'}</button>
    </form>
  )
}

export default UserForm
