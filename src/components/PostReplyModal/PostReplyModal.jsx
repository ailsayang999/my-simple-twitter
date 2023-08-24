import "./postReplyModal.scss";
import { ReactComponent as ClosedIcon } from "assets/icons/crossIcon.svg";
import { useContext, useState } from "react";
import ModalContext from "context/ModalContext";

//之後刪掉
import otherAvatar from "assets/images/fakeUserOtherAvatar.png";
import userAvatar from "assets/images/fakeUserAvatar.png";

const PostReplyModal = () => {
  // 從Context中拿取togglePostModal的function
  const { toggleReplyModal } = useContext(ModalContext);

  const specificTweetDummyData = [
    {
      id: 1,
      author: {
        id: 21,
        account: "ailsa",
        name: "Ailsa",
        avatar: otherAvatar,
      },
      description: "This is my First Post!!!!!",
      likeCount: 6,
      replyCount: 1,
      isLiked: true,
      createdAt: "3小時",
    },
  ];

  const [specificTweet, setSpecificTweet] = useState(specificTweetDummyData);

  return (
    <div className="">
      <div className="post-tweet-modal">
        <div className="overlay">
          <modal className="modal-content-wrapper">
            <div className="closed-icon-container">
              <ClosedIcon className="cross-icon" onClick={toggleReplyModal} />
            </div>

            <div className="modal-content">
              {specificTweet.map(({ id, description, author, createdAt }) => {
                return (
                  <>
                    <div className="reply-modal-post-item-container" key={id}>
                      <div className="reply-modal-post-item-wrapper">
                        <img
                          src={author.avatar}
                          alt=""
                          className="reply-modal-post-item-avatar"
                        />

                        <div className="reply-modal-item-content">
                          <div className="reply-modal-user-post-info">
                            <div className="reply-modal-name">
                              {author.name}
                            </div>
                            <div className="reply-modal-account">
                              @{author.account}
                            </div>
                            <div className="reply-modal-time">
                              · {createdAt}
                            </div>
                          </div>

                          <div className="reply-modal-post-content">
                            {description}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
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
                <button className="tweet-modal-btn">回覆</button>
              </div>
            </div>
          </modal>
        </div>
      </div>
    </div>
  );
};

export default PostReplyModal;
