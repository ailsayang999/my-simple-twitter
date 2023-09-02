import "./settingPageInfo.scss";
import { useState, useEffect } from 'react';
import InputSet from 'components/InputSet'
import NotiBoxSuccess from 'components/NotiBoxSuccess' 
import NotiBoxFail from 'components/NotiBoxFail' 
import { useAuth } from 'context/AuthContext';

const SettingPageInfo = () => {
  const [account, setAccount] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [showNotiBoxSuccess, setShowNotiBoxSuccess] = useState(false);
  const [showNotiBoxFail, setShowNotiBoxFail] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const { setUserInfo } = useAuth();

  const handleClick = async () => {
    const userId = JSON.parse(localStorage.getItem('userInfo')).id
    console.log(userId)

    if (account.length > 20) {
      setShowNotiBoxFail(true)
      setErrorMsg('帳號長度應小於20字')
      return;
    }
    if (account === "root") {
      setShowNotiBoxFail(true)
      setErrorMsg('此帳號不存在!')
      return;
    }
    if (name.length > 50) {
      setShowNotiBoxFail(true)
      setErrorMsg('名稱長度應小於50字')
      return;
    }
    if (password.length > 0) {
      if (password.length < 5 || password.length > 20) {
      setShowNotiBoxFail(true)
      setErrorMsg('請設定5~20字英數字密碼!')
      return;
      }
      if (password !== checkPassword) {
        setShowNotiBoxFail(true)
        setErrorMsg('密碼不相符，請重新確認!')
        return;
      }
    }

    //可能需要useEffect來確保作業完成後資料匯入
    try {
      const success  = await setUserInfo({
      id:userId,
      name,
      account,
      email,
      password,
      checkPassword
      });
      console.log(`SettingPage中的success:${success}`)
      if (success) {
        console.log(`修改成功!`)
        setShowNotiBoxSuccess(true)
        return;
      } 
      console.log('沒有成功，請再存一次!')
      setShowNotiBoxFail(true)

    } catch(errorMsg) {
      console.log(`SettingPage error: ${errorMsg}`)
      setShowNotiBoxFail(true)
      setErrorMsg(errorMsg)
    }
    
  };
      
  useEffect(() => {
    if (showNotiBoxSuccess) {
      const timeout = setTimeout(() => {
        setShowNotiBoxSuccess(false);
      }, 1500);

      return () => clearTimeout(timeout);
    }
  }, [showNotiBoxSuccess]);

  useEffect(() => {
  if (showNotiBoxFail) {
    const timeout = setTimeout(() => {
      setShowNotiBoxFail(false);
      setErrorMsg('');
    }, 1500);

    return () => clearTimeout(timeout);
  }
  }, [errorMsg, showNotiBoxFail]);

  return (
    <div className="main-info-container">
      <div className="outerContainer">
        {showNotiBoxSuccess && <NotiBoxSuccess notiText={"修改成功!"} />}
        {showNotiBoxFail && <NotiBoxFail notiText={errorMsg} />}
        <div className="settingPageTitle">帳戶設定</div>
        <div className="settingPageInputContainer">
          <InputSet 
          item={"前台帳號"}
          label={"帳號"} 
          placeholder={"請輸入20字以內帳號"} 
          value={account}
          onChange={(accountInputValue) => setAccount(accountInputValue)}
          pattern={"[0-9a-zA-Z]+"}
          /> 
        <InputSet 
          label={"名稱"} 
          placeholder={"請輸入使用者名稱(50字以內)"} 
          value={name}
          onChange={(nameInputValue) => setName(nameInputValue)}
          pattern={"[0-9a-zA-Z]+"}
          />
        <InputSet 
          label={"Email"} 
          placeholder={"請輸入Email"} 
          type="email"
          value={email}
          onChange={(emailInputValue) => setEmail(emailInputValue)}
          />
        <InputSet 
          type={"password"}
          label={"密碼"} 
          placeholder={"請設定5~20字密碼"} 
          value={password}
          pattern={"[0-9a-zA-Z]+"}
          onChange={(passwordInputValue) => setPassword(passwordInputValue)}
          />  
        <InputSet 
          type={"password"}
          label={"密碼確認"} 
          placeholder={"請再次輸入密碼"} 
          value={checkPassword}
          onChange={(checkPasswordInputValue) => setCheckPassword(checkPasswordInputValue)}
          pattern={"[0-9a-zA-Z]+"}
          />   
        </div>        
        <div className="settingPagefooter">
          <button className="settingPageButton" onClick={handleClick}>儲存</button>
        </div>
    </div>
    </div>
  ) 
}

export default SettingPageInfo;
