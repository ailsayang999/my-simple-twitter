import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminUsersPage.scss';
import LeftNavAdmin from 'components/LeftNavAdmin';
import UserCard from 'components/UserCard';
import { getUsers } from '../api/admin';

const AdminUsersPage = () => {
  const [users, setUsers] = useState([])
  const navigate = useNavigate();
  const { isAuthenticated, currentMember } = 


  useEffect(() => {
    const getUsers = async () => {
      try {
        const users = await getUsers();
      } catch (error) {
        console.error(error);
      }
    };
    getUsers();
  }, [])

  //若未登入跳轉回"後台登入"頁面
  useEffect(() => {
    if(!isAuthenticated) {
      Navigate('/admin')
    }
  }, [navigate, isAuthenticated]);


  return (
    <div className="adminContainer">
      <LeftNavAdmin/>
      <div className="rightContainer">
        <div className="title">使用者列表</div>
        <div className="tweetBoard">
          {users.map((user) => {
            return (<UserCard className="userCard"
            key={user.id}
            id={user.id}
            cover={user.cover}
            avatar={user.avatar}
            name={user.name}
            account={user.account}
            tweetCount={user.tweetCount}
            likeCount={user.likeCount}
            following={user.following}
            follower={user.follower}
          />)})}
        </div>
      </div>
    </div>
  )
}

export default AdminUsersPage