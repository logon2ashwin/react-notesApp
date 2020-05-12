import React, { Fragment, useState }  from "react";
import { CSSTransition } from "react-transition-group";
import "./Login.scss";

const Login = (props) => {
  const [isCreateAccount, setCreateAccount] = useState(false);

  const login = () => {

  };

  const signup = () => {
    setCreateAccount(!isCreateAccount);
  };

  return (
    <Fragment>
      <div className="login-page">
        <div className="login-form-container">
          {
            !isCreateAccount &&
              <div className='login-input-holder'>
                <input id='LoginuserName' className='login-input' type='text' required/>
                <label className='login-label' onClick={() => document.getElementById("LoginuserName").focus()}>Username or Email</label>
              </div>
          }

          {
            isCreateAccount &&
              <div className='login-input-holder'>
                <input id='signupName' className='login-input' type='text' required/>
                <label className='login-label' onClick={() => document.getElementById("signupName").focus()}>Username</label>
              </div>
          }

          {
            isCreateAccount &&
            <div className='login-input-holder'>
              <input id='signupEmail' className='login-input' type='text' required/>
              <label className='login-label' onClick={() => document.getElementById("signupEmail").focus()}>Email</label>
            </div>
          }

          <div className='login-input-holder'>
            <input id='password' className='login-input' type='text' required/>
            <label className='login-label' onClick={() => document.getElementById("password").focus()} >Password</label>
          </div>

          {
            isCreateAccount &&
              <div className='login-input-holder'>
                <input id='signupConfirmPassword' className='login-input' type='text' required/>
                <label className='login-label' onClick={() => document.getElementById("signupConfirmPassword").focus()} >Confirm Password</label>
              </div>
          }

          <div className='login-button-holder'>
            <button onClick={login} >Login</button>
            <button onClick={signup} >Sign Up</button>
          </div>

        </div>
      </div>
    </Fragment>
  );
};

export default Login;
