import React, { Fragment, useState, useEffect} from "react";
import { Link, useLocation,useNavigate } from "react-router-dom"; 
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { useDispatch, useSelector } from 'react-redux';

import { registerUser,userLogin } from '../../store/actions/authActions';

const LoginRegister = () => {
  let { pathname } = useLocation();
  const { loading, userInfo, error, success } = useSelector(
    (state) => state.auth
  )
  const dispatch = useDispatch();
  const navigate = useNavigate();

      // Define state for the form data
      const [formData, setFormData] = useState({
        username: '',
        userpassword: '',
        useremail: '',
        confirmUserpassword:'',
      });
    
      useEffect(() => {
        if (userInfo) {
          navigate('/')
        }
      }, [navigate, userInfo]);
      

  const { username, userpassword,confirmUserpassword, useremail } = formData;

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  } 

    const handleLogin = (event) => {
      event.preventDefault();
      dispatch(userLogin({ username, userpassword }));
    }
  
    const handleRegister = (event) => {
      event.preventDefault();
      // Handle registration logic here
      console.log("USER DETAILS",formData)
      if (userpassword !== confirmUserpassword) {
        alert('Password mismatch')
      } else {
        dispatch(registerUser({ username:username, password:userpassword,passwordRepeat:confirmUserpassword,email:useremail }));
      }
    }
    
  


  return (
    <Fragment>
      <SEO
        titleTemplate="Login"
        description="Login page of flone react minimalist eCommerce template."
      />
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb 
          pages={[
            {label: "Home", path: process.env.PUBLIC_URL + "/" },
            {label: "Login Register", path: process.env.PUBLIC_URL + pathname }
          ]} 
        />
        <div className="login-register-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 ms-auto me-auto">
                <div className="login-register-wrapper">
                  <Tab.Container defaultActiveKey="login">
                    <Nav variant="pills" className="login-register-tab-list">
                      <Nav.Item>
                        <Nav.Link eventKey="login">
                          <h4>Login</h4>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="register">
                          <h4>Register</h4>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="login">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form onSubmit={handleLogin}>
                              <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                onChange={handleInputChange}
                              />
                              <input
                                type="password"
                                name="userpassword"
                                placeholder="Password"
                                onChange={handleInputChange}
                              />
                              <div className="button-box">
                                <div className="login-toggle-btn">
                                  <input type="checkbox" />
                                  <label className="ml-10">Remember me</label>
                                  <Link to={process.env.PUBLIC_URL + "/"}>
                                    Forgot Password?
                                  </Link>
                                </div>
                                <button type="submit">
                                  <span>Login</span>
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="register">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form onSubmit={handleRegister}>
                              <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                onChange={handleInputChange}
                              />
                              <input
                                type="password"
                                name="userpassword"
                                placeholder="Password"
                                onChange={handleInputChange}
                              />
                                 <input
                                type="password"
                                name="confirmUserpassword"
                                placeholder="Confirm Password"
                                onChange={handleInputChange}
                              />
                              <input
                                name="useremail"
                                placeholder="Email"
                                type="email"
                                onChange={handleInputChange}
                              />
                              <div className="button-box">
                                <button type="submit">
                                  <span>Register</span>
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default LoginRegister;
