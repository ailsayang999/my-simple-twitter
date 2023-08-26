import React from 'react'
import './AdminUsersPage.scss'
import LeftNavAdmin from 'components/LeftNavAdmin'
import UserCard from 'components/UserCard'

const dummyData = [
    {
        "id": 1,
        "name": "Admin",
        "account": "root",
        "introduction": "Nobis harum aut quam sed eligendi rerum perspiciat",
        "avatar": "https://loremflickr.com/320/240/man/?random=11.459194891146108",
        "cover": "https://loremflickr.com/1440/480/city/?random=86.39469700989608",
        "role": "admin",
        "tweetCount":"2000",
        "likeCount": "123455",
        "following": "599",
        "follower": "20"
    },
    {
        "id": 52,
        "name": "我是一隻貓",
        "account": "cat",
        "introduction": null,
        "avatar": "https://picsum.photos/100/100",
        "cover": "https://picsum.photos/id/237/700/400",
        "role": "user",
        "tweetCount":"2",
        "likeCount": "5",
        "following": "5",
        "follower": "0"
    },
    {
        "id": 50,
        "name": "User49",
        "account": "user49",
        "introduction": "Incidunt sint fuga tempore quam. Veniam quo earum ",
        "avatar": "https://loremflickr.com/320/240/man/?random=18.70303841745551",
        "cover": "https://loremflickr.com/1440/480/city/?random=61.58283660136637",
        "role": "user"
    },
    {
        "id": 51,
        "name": "User50",
        "account": "user50",
        "introduction": "Veritatis est illo praesentium consequatur.",
        "avatar": "https://loremflickr.com/320/240/man/?random=58.14892233392464",
        "cover": "https://loremflickr.com/1440/480/city/?random=43.96337838575563",
        "role": "user"
    },
]

const AdminUsersPage = () => {
  return (
    <div className="adminContainer">
      <LeftNavAdmin/>
      <div className="rightContainer">
        <div className="title">使用者列表</div>
        <div className="tweetBoard">
          {dummyData.map((user) => {
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