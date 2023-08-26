import "./replyPageInfo.scss";
import { ReactComponent as BackArrowIcon } from "assets/icons/backArrowIcon.svg";
import { ReactComponent as ReplyIcon } from "assets/icons/replyIcon.svg";
import { ReactComponent as LikeIcon } from "assets/icons/likeIcon.svg";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import ModalContext from "context/ModalContext";

//下面userAvatar之後要串後端
import userAvatar from "assets/images/fakeUserAvatar.png";

//處理reply的Modal
import { replyItemsDummyData } from "api/tweets";
import PostReplyModal from "components/PostReplyModal/PostReplyModal";

// 元件切分
const ReplyPost = ({ toggleReplyModal }) => {
  return (
    <div className="reply-post">
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
            Lorem ipsum dolor, sit amet consectetur adipisicing
            elit. Doloremque quisquam provident iure a cumque nulla error
            recusandae temporibus dol.
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
          <ReplyIcon className="tweet-reply-icon" onClick={toggleReplyModal} />
          <LikeIcon className="tweet-like-icon" />
        </div>
      </div>
    </div>
  );
};

const ReplyPageInfo = () => {
  //處理回到主頁的navigation
  const navigate = useNavigate();
  const handleBackArrowClick = () => {
    navigate("/main");
  };

  // 從Context中拿取toggleReplyModal的function
  const { replyModal, toggleReplyModal } = useContext(ModalContext);

  return (
    <div className="reply-page-info">
      {/* 以下header可以重複使用 */}
      <div className="header-container">
        <BackArrowIcon
          className="back-arrow-icon"
          onClick={handleBackArrowClick}
        />
        <h4 className="header-title">推文</h4>
      </div>

      {/* Render reply Post */}
      <ReplyPost toggleReplyModal={toggleReplyModal} />

      {replyItemsDummyData.map(
        ({
          replyId,
          comment,
          replierName,
          replierAvatar,
          replierAccount,
          tweetBelongerAccount,
          createdAt,
        }) => {
          return (
            <>
              <div className="reply-item-container" key={replyId}>
                <div className="reply-item-wrapper">
                  <img
                    src={replierAvatar}
                    alt={replierAvatar}
                    className="reply-item-avatar"
                  />

                  <div className="reply-item-content">
                    <div className="user-reply-info">
                      <div className="replier-name">{replierName}</div>
                      <div className="replier-account">@{replierAccount}</div>
                      <div className="reply-time">· {createdAt}</div>
                    </div>

                    <div className="reply-to-tweet-belonger-account-container">
                      回覆
                      <span className="reply-to-tweet-belonger-account">
                        @{tweetBelongerAccount}
                      </span>
                    </div>

                    <div className="reply-content">{comment}</div>
                  </div>
                </div>
              </div>
            </>
          );
        }
      )}

      {/* Modal ：根據replyModal的布林值決定是否要跳出PostReplyModal component*/}
      {replyModal && <PostReplyModal />}
    </div>
  );
};

export default ReplyPageInfo;
