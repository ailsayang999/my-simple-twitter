import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminUsersPage.scss';
import LeftNavAdmin from 'components/LeftNavAdmin';
import UserCard from 'components/UserCard';
import { getUsers } from '../api/admin';
import { useAdminAuth } from 'context/AdminAuthContext';




const AdminUsersPage = () => {
  // const [users, setUsers] = useState([]);
  // const navigate = useNavigate();4 
  // const { isAuthenticated } = useAdminAuth();


  // useEffect(() => {
  //   const getUsersAsync = async () => {
  //     try {
  //       const users = await getUsers();
  //       setUsers(users)
  //       console.log(users)
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   getUsersAsync();
  // }, []);

  //若未登入跳轉回"後台登入"頁面
  // useEffect(() => {
  //   if(!isAuthenticated) {
  //     // navigate('/admin');
  //   }
  // }, [navigate, isAuthenticated]);

  const users = [
    {
        "id": 2,
        "name": "User1",
        "account": "user1",
        "introduction": "Culpa rerum cum pariatur ut nostrum occaecati expl",
        "avatar": "https://loremflickr.com/320/240/man/?random=22.488061823126504",
        "cover": "https://loremflickr.com/1440/480/city/?random=70.08501482339466",
        "tweetCount": 1152,
        "followerCount": 2,
        "followingCount": 0,
        "likeCount": 17
    },
    {
        "id": 3,
        "name": "User2",
        "account": "user2",
        "introduction": "Sed quidem tempora a fuga ea porro. Ullam eum id d",
        "avatar": "https://loremflickr.com/320/240/man/?random=68.61517603334588",
        "cover": "https://loremflickr.com/1440/480/city/?random=30.23345850680026",
        "tweetCount": 5005,
        "followerCount": 3,
        "followingCount": 2,
        "likeCount": 2
    },
    {
        "id": 4,
        "name": "User3",
        "account": "user3",
        "introduction": "Tempora laborum similique aut commodi sunt ipsam a",
        "avatar": "https://loremflickr.com/320/240/man/?random=9.109544268015979",
        "cover": "https://loremflickr.com/1440/480/city/?random=52.500353582087136",
        "tweetCount": 5,
        "followerCount": 1,
        "followingCount": 3,
        "likeCount": 4
    },
    {
        "id": 1,
        "name": "Admin",
        "account": "root",
        "introduction": "Consequatur laborum illum veritatis. Vero facere n",
        "avatar": "https://loremflickr.com/320/240/man/?random=75.01552043957432",
        "cover": "https://loremflickr.com/1440/480/city/?random=64.05716620296167",
        "tweetCount": 5,
        "followerCount": 0,
        "followingCount": 6000,
        "likeCount": 7
    },
    {
        "id": 5,
        "name": "User4",
        "account": "user4",
        "introduction": "Asperiores fugiat ratione dolor aperiam. Nesciunt ",
        "avatar": "https://loremflickr.com/320/240/man/?random=23.513182113941646",
        "cover": "https://loremflickr.com/1440/480/city/?random=12.66073706759907",
        "tweetCount": 5,
        "followerCount": 1211,
        "followingCount": 3,
        "likeCount": 2
    },
    {
        "id": 6,
        "name": "User5",
        "account": "user5",
        "introduction": "Id possimus quod voluptatibus qui aliquid officia ",
        "avatar": "https://loremflickr.com/320/240/man/?random=66.99255368894023",
        "cover": "https://loremflickr.com/1440/480/city/?random=76.34052375936524",
        "tweetCount": 533,
        "followerCount": 32,
        "followingCount": 3,
        "likeCount": 5
    },
    {
        "id": 7,
        "name": "User6",
        "account": "user6",
        "introduction": "Pariatur impedit accusamus nam odit rerum est et. ",
        "avatar": "https://loremflickr.com/320/240/man/?random=88.16168947945091",
        "cover": "https://loremflickr.com/1440/480/city/?random=30.76582458406991",
        "tweetCount": 5,
        "followerCount": 299,
        "followingCount": 0,
        "likeCount": 622
    }]

  return (
    <div className="adminContainer">
      <LeftNavAdmin/>
      <div className="rightContainer">
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