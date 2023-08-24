import "styles/App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  HomePage,
  RegisterPage,
  LoginPage,
  MainPage,
  ReplyPage,
  SettingPage,
  UserSelfPage,
  UserSelfFollowPage,
  UserOtherPage,
  UserOtherFollowPage,
  AdminPage,
  AdminMainPage,
  AdminUsersPage,
} from "pages";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<HomePage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="main" element={<MainPage />} />
          <Route path="reply" element={<ReplyPage />} />
          <Route path="setting" element={<SettingPage />} />
          <Route path="user/self" element={<UserSelfPage />} />
          <Route path="user/self/follow" element={<UserSelfFollowPage />} />
          <Route path="user/other" element={<UserOtherPage />} />
          <Route path="user/other/follow" element={<UserOtherFollowPage />} />
          <Route path="admin" element={<AdminPage />} />
          <Route path="admin_main" element={<AdminMainPage />} />
          <Route path="admin_users" element={<AdminUsersPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
