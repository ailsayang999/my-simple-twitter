import React from "react";
import "./putEditUserSelfInfoModal.scss";
import { ReactComponent as ClosedIcon } from "assets/icons/crossIcon.svg";
import { useContext, useState, useEffect } from "react";
import ModalContext from "context/ModalContext";
import { ReactComponent as EditPictureIcon } from "assets/icons/ImgEditIcon.svg";
import { ReactComponent as CloseEditIcon } from "assets/icons/ImgCloseIcon.svg";
import { getUserInfo } from "api/tweets";

// 下面這個之後會拿掉

const PutEditUserSelfInfoModal = ({
  editNameInputValue,
  onEditNameInputChange,
  editIntroInputValue,
  onEditIntroInputChange,
  userInfoObject,
  putEditSelfInfo,
  userInfo,
  setUserInfo,
  setUserSelfTweets,
  setUserSelfReply,
  setUserSelfLike,
  getUserSelfTweets,
  getUserSelfReply,
  getUserSelfLike,
}) => {
  // 從Context中拿取toggleEditModal的function
  const { toggleEditModal } = useContext(ModalContext);

  const [editFormValue, setEditFormValue] = useState(userInfoObject);
  const [previewAvatar, setPreviewAvatar] = useState(null);
  const [previewCover, setPreviewCover] = useState(null);

  console.log("當前的userInfoObject：", userInfoObject);

  // const [nameInputValue, setNameInputValue] = useState("");
  // const [intro, setIntro] = useState("");
  // const [userAvatar, setUserAvatar] = useState(null);
  // const [banner, setBanner] = useState(null);

  // useEffect(() => {
  //   setName(userInfoObject.name);
  //   setIntro(userInfoObject.introduction);
  //   setUserAvatar(userInfoObject.avatar);
  //   setBanner(userInfoObject.banner);
  //   console.log("useEffect set")
  // }, []);

  //點擊上傳圖片按鈕
  const handleUserAvatarInputFile = (event) => {
    setPreviewAvatar(URL.createObjectURL(event.target.files[0]));
    setEditFormValue({
      ...editFormValue,
      avatar: event.target.files[0],
    });
  };
  const handleUserCoverInputFile = (event) => {
    setPreviewCover(URL.createObjectURL(event.target.files[0]));
    setEditFormValue({
      ...editFormValue,
      cover: event.target.files[0],
    });
  };

  const handleEditFormSubmit = async (e) => {
    e.preventDefault();
    console.log("給後端的payload:", editFormValue);

    if (
      editFormValue.name.trim().length === 0 ||
      editFormValue.introduction.trim().length === 0
    )
      return;
    if (editFormValue.name.length > 50 || editFormValue.introduction > 160)
      return;

    // API的資訊傳遞(需轉換成 Form-data)
    const formData = new FormData();
    //先帶入暫時儲存在tempDataObject的資料，若有任何改變內容，會用formData.set的方式去改變
    for (let key in userInfoObject) {
      formData.append(key, userInfoObject[key]);
    }
    formData.set("name", editFormValue.name);
    formData.set("introduction", editFormValue.introduction);
    formData.set("avatar", editFormValue.avatar);
    formData.set("cover", editFormValue.cover);
    // formData.set("avatar", userAvatar);
    // formData.set("banner", banner);
    for (const pair of formData.entries()) {
      console.log(`${pair[0]}, ${pair[1]}`);
    }

    const res = await putEditSelfInfo(userInfoObject.id, formData);
    if (res.data.message === "Successfully update user.") {
      alert(res.data.message);
      console.log("編輯成功, 編輯回傳內容為：", res.data);
      //下次form會顯示上次更新後的name和account
      setEditFormValue({
        ...editFormValue,
        name: res.data.data.name,
        introduction: res.data.data.introduction,
      });
      toggleEditModal(); //把modal關起來
      // 把後端傳回來的更新資料放進localStorage
      const userInfoObjectNew = await getUserInfo(res.data.data.id);
      localStorage.setItem(
        "UserInfoObjectString",
        JSON.stringify(userInfoObjectNew)
      );
      setUserInfo(userInfoObjectNew);
      // 再呼叫一次getUserSelfTweets來更新avatar
      const backendUserSelfTweets = await getUserSelfTweets(userInfoObject.id);
      setUserSelfTweets(backendUserSelfTweets);
      // 再呼叫一次getUserSelfReply來更新avatar
      const backendUserSelfReply = await getUserSelfReply(userInfoObject.id);
      setUserSelfReply(backendUserSelfReply);
      // 再呼叫一次getUserSelfLike來更新avatar
      const backendUserSelfLike = await getUserSelfLike(userInfoObject.id);
      setUserSelfLike(backendUserSelfLike);
      return;
    } else {
      return alert("編輯未成功, 後端回傳內容為：", res);
    }
  };

  return (
    <div className="put-edit-user-self-info-modal">
      <div className="overlay">
        <div className="edit-self-modal-content-wrapper">
          {/* 把以下要交出去的資料都放在form裡面 */}
          <form
            onSubmit={handleEditFormSubmit}
            // enctype="multipart/form-data"
            // method="PUT"
            // action="https://mighty-temple-45104-0d6672fb07d0.herokuapp.com"
          >
            <div className="closed-icon-container">
              <ClosedIcon className="cross-icon" onClick={toggleEditModal} />
              <span className="closed-icon-text">編輯個人資料</span>
              <button className="edit-button-save" type="submit">
                儲存
              </button>
            </div>
            {/* 編輯avatar和cover */}
            <div className="put-edit-user-self-modal-content">
              <div className="put-edit-modal-user-self-info-area">
                <div className="put-edit-modal-user-self-avatar-cover">
                  <div className="put-edit-modal-user-self-cover-container">
                    <input
                      className="user-cover-input"
                      type="file"
                      onChange={(e) => {
                        handleUserCoverInputFile(e);
                      }}
                    ></input>
                    <img
                      src={previewCover ? previewCover : editFormValue.cover}
                      alt="userSelfCover"
                      className="put-edit-modal-user-self-cover"
                    />
                    <EditPictureIcon className="edit-cover" />
                    <CloseEditIcon className="edit-cover-close" fill="white" />
                  </div>

                  <div className="put-edit-modal-user-self-avatar-container">
                    <img
                      src={previewAvatar ? previewAvatar : editFormValue.avatar}
                      alt=""
                      className="put-edit-modal-user-self-avatar"
                    />
                    <input
                      className="user-avatar-input"
                      type="file"
                      onChange={(e) => {
                        handleUserAvatarInputFile(e);
                      }}
                    ></input>
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
                    defaultValue={editFormValue.name || ""}
                    placeholder={""}
                    onChange={(e) =>
                      setEditFormValue({
                        ...editFormValue,
                        name: e.target.value,
                      })
                    }
                    maxLength={50}
                  ></input>
                </div>
                <div className="edit-user-self-inputNote">
                  {editFormValue && editFormValue.name.length === 0 && (
                    <div className={"edit__cannot-be-blank"}>
                      內容不可為空白
                    </div>
                  )}
                  {editFormValue && editFormValue.name.length >= 50 && (
                    <div className={"edit__cannot-be-over-limit"}>
                      字數不可以超過50字
                    </div>
                  )}
                  <div className={"edit-user-self-inputCounter"}>
                    {editFormValue && editFormValue
                      ? `${editFormValue.name.length}/50`
                      : ""}
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
                    value={editFormValue.introduction || ""}
                    placeholder={""}
                    onChange={(e) =>
                      setEditFormValue({
                        ...editFormValue,
                        introduction: e.target.value,
                      })
                    }
                    maxLength={160}
                  ></textarea>
                </div>
                <div className="edit-intro-inputNote">
                  {editFormValue.introduction === null
                    ? ""
                    : editFormValue.introduction.length === 0 && (
                        <div className={"edit__cannot-be-blank"}>
                          內容不可為空白
                        </div>
                      )}
                  {editFormValue.introduction === null
                    ? ""
                    : editFormValue.introduction.length >= 160 && (
                        <div className={"edit__cannot-be-over-limit"}>
                          字數不可以超過160字
                        </div>
                      )}
                  <div
                    className={
                      editFormValue.introduction === null
                        ? ""
                        : editFormValue.introduction.length > 160
                        ? "edit-intro-errorMsg"
                        : "edit-intro-hide"
                    }
                  >
                    
                  </div>
                  <div className={"edit-intro-inputCounter"}>
                    {editFormValue.introduction === null
                      ? ""
                      : editFormValue
                      ? `${editFormValue.introduction.length}/160`
                      : ""}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PutEditUserSelfInfoModal;
