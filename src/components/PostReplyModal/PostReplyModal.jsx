import "./postReplyModal.scss";
import { ReactComponent as ClosedIcon } from "assets/icons/crossIcon.svg";
import { useContext, useState } from "react";
import ModalContext from "context/ModalContext";

//之後刪掉
import otherAvatar from "assets/images/fakeUserOtherAvatar.png";
import userAvatar from "assets/images/fakeUserAvatar.png";

const PostReplyModal = ({
  ReplyInputValue,
  onReplyTextAreaChange,
  onAddTweetReply,
}) => {
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
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ducimus ex illo cupiditate. Nostrum fuga quos tempora ipsum libero repellendus soluta?",
      likeCount: 6,
      replyCount: 1,
      isLiked: true,
      createdAt: "3小時",
    },
  ];

  const [specificTweet, setSpecificTweet] = useState(specificTweetDummyData);

  return (
    <div className="">
      <div className="reply-post-tweet-modal">
        <div className="reply-overlay">
          <div className="reply-modal-content-wrapper">
            <div className="reply-closed-icon-container">
              <ClosedIcon
                className="reply-cross-icon"
                onClick={toggleReplyModal}
              />
            </div>

            <div className="reply-modal-content">
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

                          <div className="reply-modal-reply-to">
                            回覆給
                            <span className="reply-modal-reply-belonger">
                              @{author.account}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}

              <div className="reply-modal-avatar-text-container">
                <div className="reply-modal-user-avatar-wrapper">
                  <img
                    src={userAvatar}
                    alt=""
                    className="reply-modal-user-avatar"
                  />
                </div>

                <div className="reply-modal-post-area">
                  <span className="reply-modal-text-area">
                    <textarea
                      id="reply-tweet-textarea"
                      type="text"
                      className="reply-modal-textarea"
                      placeholder="推你的回覆"
                      value={ReplyInputValue || ""}
                      onChange={(e) => onReplyTextAreaChange?.(e.target.value)}
                    />
                  </span>
                </div>
              </div>

              <div className="reply-textarea-notification-tweet-modal-container">
                <div
                  className={
                    ReplyInputValue.length === 0
                      ? "textarea-notification__cannot-be-blank"
                      : "reply-notification-display-none"
                  }
                >
                  內容不可為空白
                </div>

                <button
                  className="reply-tweet-modal-btn"
                  onClick={() => onAddTweetReply(ReplyInputValue)}
                >
                  回覆
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostReplyModal;
