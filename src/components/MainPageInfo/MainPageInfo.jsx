// 更改後端Liked的問題還沒解決，還沒有登入者對某篇貼文isLike的boolean值，要在handleLikeClick那裡處理
import React from "react";
import "./mainPageInfo.scss";
import { ReactComponent as ReplyIcon } from "assets/icons/replyIcon.svg";
import { ReactComponent as LikeIcon } from "assets/icons/likeIcon.svg";
import { ReactComponent as LikeActiveIcon } from "assets/icons/likeIconActive.svg";
import { useState } from "react";
import { ReactComponent as ClosedIcon } from "assets/icons/crossIcon.svg";

//下面之後要串後端
import userAvatar from "assets/images/fakeUserAvatar.png";
import otherAvatar from "assets/images/fakeUserOtherAvatar.png";

// allTweetsDummyData
const allTweetsDummyData = [
  {
    id: 1,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat corrupti temporibus porro dolore, praesentium assumenda. Ea, asperiores! Ut, natus ad?",
    createAt: "2023-08-22",
    likeCount: 1,
    replyCount: 1,
    author: { id: 1, name: "User1", account: "user1", avatar: otherAvatar },
  },
  {
    id: 2,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat corrupti temporibus porro dolore, praesentium assumenda. Ea, asperiores! Ut, natus ad?",
    createAt: "2023-08-22",
    likeCount: 1,
    replyCount: 1,
    author: { id: 2, name: "User2", account: "user2", avatar: otherAvatar },
  },
  {
    id: 3,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat corrupti temporibus porro dolore, praesentium assumenda. Ea, asperiores! Ut, natus ad?",
    createAt: "2023-08-22",
    likeCount: 1,
    replyCount: 1,
    author: { id: 3, name: "User3", account: "user3", avatar: otherAvatar },
  },
  {
    id: 4,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat corrupti temporibus porro dolore, praesentium assumenda. Ea, asperiores! Ut, natus ad?",
    createAt: "2023-08-22",
    likeCount: 1,
    replyCount: 1,
    author: { id: 4, name: "User4", account: "user4", avatar: otherAvatar },
  },
  {
    id: 5,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat corrupti temporibus porro dolore, praesentium assumenda. Ea, asperiores! Ut, natus ad?",
    createAt: "2023-08-22",
    likeCount: 1,
    replyCount: 1,
    author: { id: 5, name: "User5", account: "user5", avatar: otherAvatar },
  },
  {
    id: 6,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat corrupti temporibus porro dolore, praesentium assumenda. Ea, asperiores! Ut, natus ad?",
    createAt: "2023-08-22",
    likeCount: 1,
    replyCount: 1,
    author: { id: 6, name: "User6", account: "user6", avatar: otherAvatar },
  },
  {
    id: 7,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat corrupti temporibus porro dolore, praesentium assumenda. Ea, asperiores! Ut, natus ad?",
    createAt: "2023-08-22",
    likeCount: 1,
    replyCount: 1,
    author: { id: 6, name: "User7", account: "user7", avatar: otherAvatar },
  },
  {
    id: 8,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat corrupti temporibus porro dolore, praesentium assumenda. Ea, asperiores! Ut, natus ad?",
    createAt: "2023-08-22",
    likeCount: 1,
    replyCount: 1,
    author: { id: 8, name: "User8", account: "user8", avatar: otherAvatar },
  },
];

const MainPageInfo = () => {
  //從後端拿到所有貼文資料
  const [tweets, setTweets] = useState(allTweetsDummyData);
  //當點擊like的時候，可以切換愛心顏色
  const [likeActive, setLikeActive] = useState();
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleLikeClick = (id) => {
    setLikeActive(!likeActive);
    //之後後端資料進來要改這裡，要把後端的like資料改掉
    // setTweets({ ...tweets, likeCount: nextLikeCount++  });
  };

  return (
    <div className="main-page-info">
      {/* 感覺以下可以重複使用 */}
      <div className="header-container">
        <header>
          <h4>{"首頁"}</h4>
        </header>
      </div>
      {/* Post Area */}
      <div className="post-area-wrapper">
        <div className="post-area-container">
          <div className="posting-area">
            <img src={userAvatar} alt="" className="user-avatar" />
            <span className="text-area" onClick={toggleModal}>
              有什麼新鮮事
            </span>
          </div>
          <div className="post-tweet-button-container">
            <button className="post-tweet-button">推文</button>
          </div>
        </div>
      </div>

      {/* Render All Tweet Item With map */}
      {tweets.map(
        ({ id, description, author, createAt, likeCount, replyCount }) => {
          return (
            <>
              <div className="post-item-container" key={id}>
                <div className="post-item-wrapper">
                  <img
                    src={author.avatar}
                    alt=""
                    className="post-item-avatar"
                  />

                  <div className="post-item-content">
                    <div className="user-post-info">
                      <div className="name">{author.name}</div>
                      <div className="account">@{author.account}</div>
                      <div className="time">· {createAt}</div>
                    </div>

                    <div className="post-content">{description}</div>

                    <div className="reply-like-container">
                      <div className="reply-container">
                        <ReplyIcon className="reply-icon" />
                        <div className="reply-number">{replyCount}</div>
                      </div>
                      <div className="like-container">
                        <div
                          className="like-icons"
                          onClick={() => {
                            handleLikeClick(id);
                          }}
                        >
                          <LikeIcon
                            className={`like-icon ${
                              !likeActive ? "like-gray" : ""
                            }`}
                          />
                          <LikeActiveIcon
                            className={`liked-icon ${
                              likeActive ? "like-active" : ""
                            }`}
                          />
                        </div>

                        <div className="like-number">{likeCount}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          );
        }
      )}

      {/* Modal */}
      {modal && (
        <div className="modal">
          <div className="overlay">
            <modal className="modal-content-wrapper">
              <div className="closed-icon-container">
                <ClosedIcon className="cross-icon" onClick={toggleModal} />
              </div>

              <div className="modal-content">
                <div className="modal-avatar-text-container">
                  <div className="modal-user-avatar-wrapper">
                    <img
                      src={userAvatar}
                      alt=""
                      className="modal-user-avatar"
                    />
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
                  <button className="tweet-modal-btn" onClick={toggleModal}>
                    推文
                  </button>
                </div>
              </div>
            </modal>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainPageInfo;
