import React from 'react'
import { AClogo } from '../assets/icons';
import { Link } from 'react-router-dom';
import './homePage.scss'

const HomePage = () => {

  return (
    <div className="mainPageContainer">
      <div className="centerContainer">
        <Link to="/admin">
          <div className="mainHeader">ALPHA CAMP</div>
        </Link>
        <div className="mainContextContainer">
          <div className="mainLeftsideContainer">
            <AClogo className="mainLogo"/>
            <div className="mainTitle">ALPHITTER</div>
          </div>
          <div className="mainRightsideContainer">
            <div className="mainRightsidePop">
              <div className="upperBox">
                <div className="upperBoxTitle">Join Today</div>
                <Link to="/register">
                  <button className="upperBoxRegister">Create Account</button>
                </Link>
              </div>
              <div className="lowerBox">
                <div className="lowerBoxTitle">Already have an account?</div>
                <Link to="/login">
                  <button className="lowerBoxLogin">Sign in</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="mainAuthorContainer">
          <div className="authorBox">
            <div className="authorCard">
              <Link to="https://github.com/ailsayang999">
                <img src={require('../assets/images/AilsaAvartar.jpg')} alt="Author-Avatar" className="authorAvatar" />
                <div className="authorName">Ailsa</div>
              </Link>
              </div>
            <div className="authorCard">
              <Link to="https://github.com/EvvvaHsu">
                <img src={require('../assets/images/EvaAvatar.jpg')} alt="Author-Avatar" className="authorAvatar" />
                <div className="authorName">Eva</div>
              </Link>
            </div>
            <div className="authorCard">
              <Link to="https://github.com/Lynn-Hsiao">
                <img src={require('../assets/images/LynnAvatar.jpg')} alt="Author-Avatar" className="authorAvatar" />
                <div className="authorName">Lynn</div>
              </Link>
            </div>
            <div className="authorCard">
              <Link to="https://github.com/seangotjuice">
                <img src={require('../assets/images/SeanAvartar.jpg')} alt="Author-Avatar" className="authorAvatar" />
                <div className="authorName">Sean</div>
              </Link>
            </div> 
          </div>
          <div className="authorWord">
            Real-time updates, global connections, your voice amplified. Join us and stay informed!
          </div>
        </div>
        <div className="mainFooter">AELS © 2023</div>
      </div>
    </div>
  )
}

export default HomePage