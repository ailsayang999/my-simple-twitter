import TweetCard from 'components/TweetCard'
import LeftNavAdmin from '../components/LeftNavAdmin'
import './AdminMainPage.scss'

const AdminMainPage = () => {
  return (
    <div className="adminContainer">
      <LeftNavAdmin />
      <div className="rightContainer">
        <div className="title">推文清單</div>
        <div className="tweetBoard">
          {/* 9 筆資料/頁 */}
          <TweetCard />
          <TweetCard />
          <TweetCard />
          <TweetCard />
          <TweetCard />
          <TweetCard />
          <TweetCard />
          <TweetCard />
          <TweetCard />
          
        </div>
      </div>
    </div>
  )
}

export default AdminMainPage