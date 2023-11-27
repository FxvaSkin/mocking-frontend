import './UserListPage.css'
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export function UserListPage() {
  const [users, setUsers] = useState([])
  const [deletedUsers, setDeletedUsers] = useState([])

  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const isNewUserCreated = queryParams.get('userCreated') === 'true'

  useEffect(() => {
    updateList()
  }, [])

  const handleDeleteUser = (userId) => {
    fetch(`http://localhost:3000/api/v1/users/${userId}`, {
      method: 'DELETE',
    })
      .then(() => {
        setDeletedUsers((prevDeletedUsers) => [...prevDeletedUsers, userId])
        updateList()
      })
      .catch((error) => {
        console.error('Error deleting user:', error)
      })
    updateList()
  }

  const updateList = () => {
    fetch('http://localhost:3000/api/v1/users')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data)
      })
      .catch((error) => {
        console.error('Error updating list:', error)
      })
  }

  const isUserDeleted = (userId) => deletedUsers.includes(userId)

  return (
    <div className="main-container">
      <div className="user-list_button-wrapper">
        <h1>User list</h1>
        <Link to="/new-user" className="button-wrapper_add-btn">
          Add user +
        </Link>
      </div>
      <ul>
        {users.map(
          (user) =>
            !isUserDeleted(user.id) && (
              <li key={user.id}>
                {user.name} {user.age}
                <button
                  className="list-button"
                  onClick={() => handleDeleteUser(user.id)}
                >
                  <img
                    src="./trash.png"
                    className="list-button_trash-icon"
                    alt="trash"
                  />
                </button>
              </li>
            ),
        )}
      </ul>
      {isNewUserCreated && (
        <span className="user-created-text">NEW USER CREATED!</span>
      )}
    </div>
  )
}
