import "./postReplyModal.scss";
import { ReactComponent as ClosedIcon } from "assets/icons/crossIcon.svg";
import { useContext, useEffect } from "react";
import ModalContext from "context/ModalContext";
import { getSpecificTweet } from "api/tweets";

const PostReplyModal = ({
  ReplyInputValue,
  onReplyTextAreaChange,
  specificTweet,
  onAddTweetReply,
  userAvatar,
}) => {
  // 從Context中拿取togglePostModal的function
  const { toggleReplyModal } = useContext(ModalContext);

  // useEffect(() => {
  //   const getSpecificTweetAsync = async () => {
  //     //因為getSpecificTweet是非同步的操作，有可能會失敗，所以我們要用try catch把它包起來
  //     try {
  //       // 先把mainPage的某個一個特定tweet的id拿出來
  //       const specificTweetId = localStorage.getItem("specific-tweetId");
  //       // console.log(typeof specificTweetId);
  //       const specificTweetIdNum = Number(specificTweetId);
  //       const backendSpecificTweet = await getSpecificTweet(specificTweetIdNum); //用await去取得所有後端specificTweet
        
        
  //       setSpecificTweet(backendSpecificTweet);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   getSpecificTweetAsync();
  // }, []);

  console.log("specificTweet::::",specificTweet);
 
  return (
    <div className="reply-post-tweet-modal">
      <div className="reply-overlay">
        <div className="reply-modal-content-wrapper">
          <div className="reply-closed-icon-container">
            <ClosedIcon
              className="reply-cross-icon"
              onClick={()=>{toggleReplyModal();}}
            />
          </div>

          <div className="reply-modal-content">
            {specificTweet.map(
              ({
                id,
                authorAvatar,
                authorName,
                authorAccount,
                description,
                createdAt,
              }) => {
                return (
                  <div className="reply-modal-post-item-container" key={id}>
                    <div className="reply-modal-post-item-wrapper">
                      <img
                        src={authorAvatar}
                        alt=""
                        className="reply-modal-post-item-avatar"
                      />
                      <div className="reply-modal-item-content">
                        <div className="reply-modal-user-post-info">
                          <div className="reply-modal-name">{authorName}</div>
                          <div className="reply-modal-account">
                            @{authorAccount}
                          </div>
                          <div className="reply-modal-time">· {createdAt}</div>
                        </div>

                        <div className="reply-modal-post-content">
                          {description}
                        </div>

                        <div className="reply-modal-reply-to">
                          回覆給
                          <span className="reply-modal-reply-belonger">
                            @{authorAccount}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            )}

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
                    maxLength={140}
                  />
                </span>
              </div>
            </div>

            <div className="reply-textarea-notification-tweet-modal-container">
              {ReplyInputValue.length === 0 && (
                <div
                  className={ "textarea-notification__cannot-be-blank"}
                >
                  內容不可為空白
                </div>
              )}

              {ReplyInputValue.length >= 140 && (
                <div
                  className={
                  "textarea-notification__cannot-be-over-140"
                  }
                >
                  文字上限140字
                </div>
              )}
              <button
                className="reply-tweet-modal-btn"
                onClick={() => onAddTweetReply(ReplyInputValue, specificTweet)}
              >
                回覆
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostReplyModal;
