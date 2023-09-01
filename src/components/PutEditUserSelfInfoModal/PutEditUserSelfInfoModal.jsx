import React from "react";
import "./putEditUserSelfInfoModal.scss";
import { ReactComponent as ClosedIcon } from "assets/icons/crossIcon.svg";
import { useContext } from "react";
import ModalContext from "context/ModalContext";
import { ReactComponent as EditPictureIcon } from "assets/icons/ImgEditIcon.svg";
import { ReactComponent as CloseEditIcon } from "assets/icons/ImgCloseIcon.svg";

// 下面這個之後會拿掉

const PutEditUserSelfInfoModal = ({
  editNameInputValue,
  onEditNameInputChange,
  editIntroInputValue,
  onEditIntroInputChange,
  userInfoObject,
  onAddTweet,
  onKeyKeyPressAddTweet,
}) => {
  // 從Context中拿取toggleEditModal的function
  const { toggleEditModal } = useContext(ModalContext);

  return (
    <div className="put-edit-user-self-info-modal">
      <div className="overlay">
        <div className="edit-self-modal-content-wrapper">
          <div className="closed-icon-container">
            <ClosedIcon className="cross-icon" onClick={toggleEditModal} />
            <span className="closed-icon-text">編輯個人資料</span>
            <button className="edit-button-save">儲存</button>
          </div>
          {/* 編輯avatar和cover */}
          <div className="put-edit-user-self-modal-content">
            <div className="put-edit-modal-user-self-info-area">
              <div className="put-edit-modal-user-self-avatar-cover">
                <div className="put-edit-modal-user-self-cover-container">
                  <img
                    src={userInfoObject.cover}
                    alt="userSelfCover"
                    className="put-edit-modal-user-self-cover"
                  />
                  <EditPictureIcon className="edit-cover" />
                  <CloseEditIcon className="edit-cover-close" fill="white" />
                </div>

                <div className="put-edit-modal-user-self-avatar-container">
                  <img
                    src={userInfoObject.avatar}
                    alt=""
                    className="put-edit-modal-user-self-avatar"
                  />
                  <EditPictureIcon className="edit-avatar" />
                </div>
              </div>
            </div>

            {/* 輸入欄位area */}
            {/* 名稱 */}
            <div className="edit-user-self-inputContainer">
              <div className="edit-user-self-inputContent">
                <label className="edit-user-self-inputLabel">名稱</label>
                <input
                  className="edit-user-self-inputField"
                  type="text"
                  value={editNameInputValue || ""}
                  placeholder={""}
                  onChange={(e) => onEditNameInputChange?.(e.target.value)}
                  maxLength={50}
                ></input>
              </div>
              <div className="edit-user-self-inputNote">
                {editNameInputValue.length === 0 && (
                  <div className={"edit__cannot-be-blank"}>內容不可為空白</div>
                )}
                {editNameInputValue.length >= 50 && (
                  <div className={"edit__cannot-be-over-limit"}>
                    字數不可以超過50字
                  </div>
                )}
                {/* <div
                  className={
                    editNameInputValue.length >= 50
                      ? "edit-user-self-errorMsg"
                      : "edit-user-self-hide"
                  }
                >
                  "字數超出上限"
                </div> */}

                <div className={"edit-user-self-inputCounter"}>
                  {editNameInputValue ? `${editNameInputValue.length}/50` : ""}
                </div>
              </div>
            </div>
            {/* 自我介紹 */}
            <div className="edit-intro-inputContainer">
              <div className="edit-intro-inputContent">
                <label className="edit-intro-inputLabel">自我介紹</label>
                <textarea
                  className="edit-intro-inputField"
                  type="text"
                  value={editIntroInputValue || ""}
                  placeholder={""}
                  onChange={(e) => onEditIntroInputChange?.(e.target.value)}
                  maxLength={160}
                ></textarea>
              </div>
              <div className="edit-intro-inputNote">
                {editIntroInputValue.length === 0 && (
                  <div className={"edit__cannot-be-blank"}>內容不可為空白</div>
                )}
                {editIntroInputValue.length >= 160 && (
                  <div className={"edit__cannot-be-over-limit"}>
                    字數不可以超過160字
                  </div>
                )}
                <div
                  className={
                    editIntroInputValue.length > 160
                      ? "edit-intro-errorMsg"
                      : "edit-intro-hide"
                  }
                >
                  "字數超出上限"
                </div>
                <div className={"edit-intro-inputCounter"}>
                  {editIntroInputValue
                    ? `${editIntroInputValue.length}/160`
                    : ""}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PutEditUserSelfInfoModal;
