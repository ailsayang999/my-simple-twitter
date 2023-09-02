import React from "react";
import "./putEditUserSelfInfoModal.scss";
import { ReactComponent as ClosedIcon } from "assets/icons/crossIcon.svg";
import { useContext, useState, useEffect } from "react";
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
  putEditSelfInfo,
}) => {
  // 從Context中拿取toggleEditModal的function
  const { toggleEditModal } = useContext(ModalContext);

  const [editFormValue, setEditFormValue] = useState({
    avatar:
      "https://images.unsplash.com/photo-1586788224331-947f68671cf1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80",
    cover: "https://picsum.photos/id/237/700/400",
    name: "ailsa",
    introduction: "",
    email: "ailsa@gmail.com",
    password: "ailsa",
  });

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

  const handleEditFormSubmit = async (e) => {
    e.preventDefault();
    console.log("給後端的payload:", editFormValue);

    // if (
    //   editFormValue.name.trim().length === 0 ||
    //   editFormValue.introduction.trim().length === 0
    // )
    //   return;
    // // 若自我介紹或是名字長度超過限制，則返回
    // if (editFormValue.name.length > 50 || editFormValue.introduction > 160)
    //   return;

    // API的資訊傳遞(需轉換成 Form-data)
    const formData = new FormData();
    //先帶入暫時儲存在tempDataObject的資料，若有任何改變內容，會用formData.set的方式去改變
    for (let key in userInfoObject) {
      formData.append(key, userInfoObject[key]);
    }
    formData.set("name", editFormValue.name);
    formData.set("introduction", editFormValue.introduction);
    // formData.set("avatar", userAvatar);
    // formData.set("banner", banner);
    for (const pair of formData.entries()) {
      console.log(`${pair[0]}, ${pair[1]}`);
    }

    const res = await putEditSelfInfo(userInfoObject.id, formData);
    if (res.data.message === "Successfully update user.") {
      // localStorage.setItem("userInfoObject", res.data);
      alert(res.data.message);
      console.log("編輯成功, 編輯回傳內容為：", res.data);
      // setEditFormValue({
      //   ...editFormValue,
      //   name: res.data.name,
      //   introduction: res.data.introduction,
      // });

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
                    <img
                      src={editFormValue.cover}
                      alt="userSelfCover"
                      className="put-edit-modal-user-self-cover"
                    />
                    <EditPictureIcon className="edit-cover" />
                    <CloseEditIcon className="edit-cover-close" fill="white" />
                  </div>

                  <div className="put-edit-modal-user-self-avatar-container">
                    <img
                      src={editFormValue.avatar}
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
                  {editFormValue.name.length === 0 && (
                    <div className={"edit__cannot-be-blank"}>
                      內容不可為空白
                    </div>
                  )}
                  {editFormValue.name.length >= 50 && (
                    <div className={"edit__cannot-be-over-limit"}>
                      字數不可以超過50字
                    </div>
                  )}
                  <div className={"edit-user-self-inputCounter"}>
                    {editFormValue ? `${editFormValue.name.length}/50` : ""}
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
                  {editFormValue.introduction.length === 0 && (
                    <div className={"edit__cannot-be-blank"}>
                      內容不可為空白
                    </div>
                  )}
                  {editFormValue.introduction.length >= 160 && (
                    <div className={"edit__cannot-be-over-limit"}>
                      字數不可以超過160字
                    </div>
                  )}
                  <div
                    className={
                      editFormValue.introduction.length > 160
                        ? "edit-intro-errorMsg"
                        : "edit-intro-hide"
                    }
                  >
                    "字數超出上限"
                  </div>
                  <div className={"edit-intro-inputCounter"}>
                    {editFormValue
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
