import "./postTweetModal.scss";
import { ReactComponent as ClosedIcon } from "assets/icons/crossIcon.svg";
import userAvatar from "assets/images/fakeUserAvatar.png";
import { useContext, useState } from "react";
import ModalContext from "context/ModalContext";

const PostTweetModal = () => {
  // 從Context中拿取togglePostModal的function
  const { togglePostModal } = useContext(ModalContext);
  return (
    <div className="">
      <div className="post-tweet-modal">
        <div className="overlay">
          <modal className="modal-content-wrapper">
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
                      type="text"
                      className="modal-textarea"
                      placeholder="有什麼新鮮事"
                    />
                  </span>
                </div>
              </div>

              <div className="toggle-btn-container">
                <button className="tweet-modal-btn">推文</button>
              </div>
            </div>
          </modal>
        </div>
      </div>
    </div>
  );
};

export default PostTweetModal;
