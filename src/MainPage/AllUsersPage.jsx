import { UserListPage } from '../UserList/UserListPage'
import { CreateUserPage } from '../NewUser/CreateUserPage'
import './AllUsersPage.css'
import { Routes, Route } from 'react-router-dom'

export function AllUsersPage() {
  return (
    <div className="user-list">
      <Routes>
        <Route path="/" element={<UserListPage />} />
        <Route path="/new-user" element={<CreateUserPage />} />
        <Route path="*" element={<UserListPage />} />
      </Routes>
    </div>
  )
}
