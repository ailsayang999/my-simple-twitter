import "./postTweetModal.scss";
import { ReactComponent as ClosedIcon } from "assets/icons/crossIcon.svg";
import { useContext } from "react";
import ModalContext from "context/ModalContext";

const PostTweetModal = ({
  inputValue,
  onTweetTextAreaChange,
  onAddTweet,
  userInfo,
  userInfoObject,
}) => {
  // 從Context中拿取togglePostModal的function
  const { togglePostModal } = useContext(ModalContext);

  return (
    <div className="">
      <div className="post-tweet-modal">
        <div className="overlay">
          <div className="modal-content-wrapper">
            <div className="closed-icon-container">
              <ClosedIcon className="cross-icon" onClick={togglePostModal} />
            </div>

            <div className="modal-content">
              <div className="modal-avatar-text-container">
                <div className="modal-user-avatar-wrapper">
                  <img
                    src={
                      userInfo.avatar ? userInfo.avatar : userInfoObject.avatar
                    }
                    alt=""
                    className="modal-user-avatar"
                  />
                </div>

                <div className="modal-post-area">
                  <span className="modal-text-area">
                    <textarea
                      id="add-tweet-textarea"
                      type="text"
                      className="modal-textarea"
                      placeholder="有什麼新鮮事"
                      value={inputValue || ""}
                      onChange={(e) => onTweetTextAreaChange?.(e.target.value)}
                      maxLength={140}
                    />
                  </span>
                </div>
              </div>

              <div className="textarea-notification-tweet-modal-container">
                {inputValue.length === 0 && (
                  <div className={"textarea-notification__cannot-be-blank"}>
                    內容不可為空白
                  </div>
                )}

                {inputValue.length >= 140 && (
                  <div className={"textarea-notification__cannot-be-over-140"}>
                    字數不可以超過140字
                  </div>
                )}

                <button
                  className="tweet-modal-btn"
                  onClick={() => onAddTweet(inputValue, userInfo)}
                >
                  推文
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostTweetModal;
