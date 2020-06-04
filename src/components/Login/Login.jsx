import React, { Fragment, useState }  from "react";
import apiProvider from "commons/scripts/apiHelper";
import config from "config/config";
import "./Login.scss";

const Login = (props) => {
  const [isCreateAccount, setCreateAccount] = useState(false);
  const [loginName, setLoginName] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupUserName, setSignupUserName] = useState("");

  const apiURL = `${config.development.host}${config.development.port}${config.api.userLogin}`;


  const login = () => {
    if(!!!loginName && !!!loginPassword) {
      return;
    }
    // setCreateAccount(!isCreateAccount);
    apiProvider
      .POST(apiURL, { email: loginName, password: loginPassword })
      .then((data) => {
        console.log(data);
        if (data.isError) {
        }
      });
  };

  const signup = () => {
    if(!!!signupEmail && !!!signupPassword && !!!signupUserName && !(signupPassword === document.getElementById("signupConfirmPassword"))) {
      return;
    }
    apiProvider
      .PUT(apiURL, { email: signupEmail, password: signupPassword, name: signupUserName})
      .then((data) => {
        console.log(data);
        if (data.isError) {
        }
      });
  };

  return (
    <Fragment>
      <div className="login-page">
        <div className="login-form-container">
          {
            !isCreateAccount &&
              <div className='login-input-holder'>
                <input id='LoginuserName' className='login-input' type='text' value={loginName} onChange={event=> setLoginName(event.target.value)} required/>
                <label className='login-label' onClick={() => document.getElementById("LoginuserName").focus()}>Username or Email</label>
              </div>
          }

          {
            isCreateAccount &&
              <div className='login-input-holder'>
                <input id='signupName' className='login-input' type='password' value={signupUserName} onChange={event=> setSignupUserName(event.target.value)} required/>
                <label className='login-label' onClick={() => document.getElementById("signupName").focus()}>Username</label>
              </div>
          }

          {
            isCreateAccount &&
            <div className='login-input-holder'>
              <input id='signupEmail' className='login-input' type='text' value={signupEmail} onChange={event=> setSignupEmail(event.target.value)} required/>
              <label className='login-label' onClick={() => document.getElementById("signupEmail").focus()}>Email</label>
            </div>
          }

          {
            !isCreateAccount &&
              <div className='login-input-holder'>
                <input id='password' className='login-input' type='password' value={loginPassword} onChange={event=> setLoginPassword(event.target.value)} required/>
                <label className='login-label' onClick={() => document.getElementById("password").focus()} >Password</label>
              </div>
          }

          {
            isCreateAccount &&
              <div className='login-input-holder'>
                <input id='signupPassword' className='login-input' type='password' value={signupPassword} onChange={event=> setSignupPassword(event.target.value)} required/>
                <label className='login-label' onClick={() => document.getElementById("signupPassword").focus()} >Password</label>
              </div>
          }

          {
            isCreateAccount &&
              <div className='login-input-holder'>
                <input id='signupConfirmPassword' className='login-input' type='password' required/>
                <label className='login-label' onClick={() => document.getElementById("signupConfirmPassword").focus()} >Confirm Password</label>
              </div>
          }

          <div className='login-button-holder'>
            { !isCreateAccount && <button onClick={login} >Login</button>}
            { isCreateAccount && <button onClick={signup} >Sign Up</button>}
          </div>

        </div>
      </div>
    </Fragment>
  );
};

export default Login;
