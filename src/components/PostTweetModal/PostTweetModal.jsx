import "./postTweetModal.scss";
import { ReactComponent as ClosedIcon } from "assets/icons/crossIcon.svg";
import { useContext } from "react";
import ModalContext from "context/ModalContext";

const PostTweetModal = ({
  inputValue,
  onTweetTextAreaChange,
  onAddTweet,
  userAvatar,
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
                  <img src={userAvatar} alt="" className="modal-user-avatar" />
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
                    />
                  </span>
                </div>
              </div>

              <div className="textarea-notification-tweet-modal-container">
                <div
                  className={
                    inputValue.length > 140
                      ? "textarea-notification__more-than-140"
                      : "notification-display-none"
                  }
                >
                  字數不可以超過140字
                </div>

                <button
                  className="tweet-modal-btn"
                  onClick={() => onAddTweet(inputValue,userAvatar)}
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
