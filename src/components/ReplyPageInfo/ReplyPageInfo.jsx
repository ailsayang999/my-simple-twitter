import "./replyPageInfo.scss";
import { ReactComponent as BackArrowIcon } from "assets/icons/backArrowIcon.svg";

//下面userAvatar之後要串後端
import userAvatar from "assets/images/fakeUserAvatar.png";

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
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloremque quisquam provident iure a cumque nulla error recusandae temporibus dolore voluptas.
          </div>
          <div className="tweet-time-area">
            <div className="tweet-time">上午 10:05·2023年11月10日</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReplyPageInfo;
