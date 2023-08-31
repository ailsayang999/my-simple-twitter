import TweetCard from 'components/TweetCard'
import LeftNavAdmin from '../components/LeftNavAdmin'
import './AdminMainPage.scss'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTweets } from '../api/admin';
import { useAdminAuth} from 'context/AdminAuthContext';



const AdminMainPage = () => {
  const [tweets, setTweets] = useState([]);
  const navigate = useNavigate();
  const { isAuthenticated } = useAdminAuth();


  useEffect(() => {
    const getTweetsAsync = async () => {
      try {
        const tweets = await getTweets();
        setTweets(tweets)
      } catch (error) {
        console.error(error);
      }
    };
    getTweetsAsync();
  }, []);

  // 若未登入跳轉回"後台登入"頁面
  useEffect(() => {
    if(!isAuthenticated) {
      navigate('/admin');
    }
  }, [navigate, isAuthenticated]);

  return (

    <div className="adminContainer">
      <LeftNavAdmin />
      <div className="rightContainer">
        <div className="title">推文清單</div>
        <div className="mainTweetBoard">
          {tweets.map((tweet) => {
            return (
              <TweetCard key={tweet.id} authorId={tweet.author.id} tweetId={tweet.id} avatar={tweet.author.avatar} name={tweet.author.name} account={tweet.author.account} description={tweet.description} time={tweet.createdAt}/> 
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default AdminMainPage