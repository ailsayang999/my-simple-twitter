import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './adminUsersPage.scss';
import LeftNavAdmin from 'components/LeftNavAdmin';
import UserCard from 'components/UserCard';
import { getUsers } from '../api/admin';
import { useAdminAuth} from 'context/AdminAuthContext';




const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const { isAuthenticated } = useAdminAuth();


  useEffect(() => {
    const getUsersAsync = async () => {
      try {
        const users = await getUsers();
        setUsers(users)
      } catch (error) {
        console.error(error);
      }
    };
    getUsersAsync();
  }, []);

  // 若未登入跳轉回"後台登入"頁面
  useEffect(() => {
    if(!isAuthenticated) {
      navigate('/admin');
    }
  }, [navigate, isAuthenticated]);

  return (
    <div className="adminContainer">
      <LeftNavAdmin/>
      <div className="rightContainerAdminUser">
        <div className="title">使用者列表</div>
        <div className="tweetBoard">
          {users.map(({id, cover, avatar, name, account, tweetCount, likeCount, followingCount, followerCount}) => {
            return(
              <UserCard className="userCard"
              key={id}
              id={id}
              cover={cover}
              avatar={avatar}
              name={name}
              account={account}
              tweetCount={tweetCount}
              likeCount={likeCount}
              followingCount={followingCount}
              followerCount={followerCount}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default AdminUsersPage