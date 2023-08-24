import "./replyPageInfo.scss";
import { ReactComponent as BackArrowIcon } from "assets/icons/backArrowIcon.svg";
import { ReactComponent as ReplyIcon } from "assets/icons/replyIcon.svg"
import { ReactComponent as LikeIcon } from "assets/icons/likeIcon.svg"

//下面userAvatar之後要串後端
import userAvatar from "assets/images/fakeUserAvatar.png";

// 元件切分
// const ReplyPost = ()=>{}
// const ReplyList = () => {};
// const ReplyItem = () => {};

const ReplyPageInfo = () => {
  return (
    <div className="reply-page-info">
      {/* 感覺以下可以重複使用 */}
      <div className="header-container">
        <BackArrowIcon className="back-arrow-icon" />
        <h4 className="header-title">推文</h4>
      </div>

      {/* Render tweet Area */}

      <div className="tweet-area-wrapper">
        <div className="tweet-area-container">
          <div className="tweet-author-area">
            <img src={userAvatar} alt="" className="author-avatar" />
            <div className="tweet-account-name-area">
              <div className="tweet-author-name">Ailsa</div>
              <div className="tweet-author-account">@ailsa</div>
            </div>
          </div>

          <div className="tweet-text-area">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque
            quisquam provident iure a cumque nulla error recusandae temporibus
            dolore voluptas.
          </div>

          <div className="tweet-time-area">
            <div className="tweet-time">上午 10:05·2023年11月10日</div>
          </div>
        </div>
      </div>

      <div className="reply-like-area-wrapper">
        <div className="reply-like-area">
          <div className="reply-count">
            <div className="reply-num">34</div>
            <div className="reply-text">回覆</div>
          </div>
          <div className="like-count">
            <div className="like-num">808</div>
            <div className="like-text">喜歡次數</div>
          </div>
        </div>
      </div>

      <div className="like-count-icon-area-wrapper">
        <div className="like-count-icon-area">
            <ReplyIcon className="tweet-reply-icon" />
            <LikeIcon className="tweet-like-icon" />
        </div>
      </div>
    </div>
  );
};

export default ReplyPageInfo;
