import { createContext, useState } from "react";

const ModalContext = createContext("");

function ModalContextProvider({ children }) {
  // toggle PostModal: postModal的boolean判斷是否要跳出postTweetModal
  const [postModal, setPostModal] = useState(false);
  const togglePostModal = () => {
    setPostModal(!postModal);
  };
  const [replyModal, setReplyModal] = useState(false);
  const toggleReplyModal = () => {
    setReplyModal(!replyModal);
  };

  const ModalContextValueToShare = {
    postModal,
    setPostModal,
    togglePostModal,
    replyModal,
    setReplyModal,
    toggleReplyModal,
  };

  return (
    <ModalContext.Provider value={ModalContextValueToShare}>
      {children}
    </ModalContext.Provider>
  );
}

export { ModalContextProvider };
export default ModalContext;
