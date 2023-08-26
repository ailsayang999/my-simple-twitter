import React from 'react'
import './AdminUsersPage.scss'
import LeftNavAdmin from 'components/LeftNavAdmin'
import UserCard from 'components/UserCard'

const AdminUsersPage = () => {
  return (
    <div className="adminContainer">
      <LeftNavAdmin />
      <div className="rightContainer">
        <div className="title">使用者列表</div>
        <div className="tweetBoard">
          <UserCard className="userCard" />
          <UserCard className="userCard" />
          <UserCard className="userCard" />
          <UserCard className="userCard" />
          <UserCard className="userCard" />
          <UserCard className="userCard" />
          <UserCard className="userCard" />
          <UserCard className="userCard" />
          <UserCard className="userCard" /> 
          <UserCard className="userCard" />
          <UserCard className="userCard" />
          <UserCard className="userCard" />
          <UserCard className="userCard" />
          <UserCard className="userCard" />
          <UserCard className="userCard" />
          <UserCard className="userCard" />
        </div>
      </div>
    </div>
  )
}

export default AdminUsersPage