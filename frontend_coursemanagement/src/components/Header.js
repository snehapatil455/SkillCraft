import React, { useState } from "react";
import { Link,useHistory } from "react-router-dom";

const Header = () => {
  const[username,setUsername] = useState('');

  const history = useHistory();
  // const user = JSON.parse(localStorage.getItem('user'));
  // console.log("i am from header "+user['username']);
  const user = JSON.parse(localStorage.getItem('user'));

if (user) {
  console.log(user);
  // setUsername(user['username']);
  
  
} else {
  history.push("/");
  // user does not exist in localStorage
  // do something else
}
const logoutUser = () => {
  localStorage.removeItem('user');
  sessionStorage.removeItem('authToken');

history.push('/');
history.go(0);

};

  return (
    <div>
      {/* Top Header */}

      {/* Header */}
      <div className="header">
        <div className="container">
          {/* MOBILE HEADER */}
          <div className="mobile-header">
            <div className="container ">
              <div className="row ">
                <div className="col-6 d-flex align-items-center">
                  <Link className="navbar-brand" to="/home">
                    <img alt="logo" src="/images/logo.png" />
                  </Link>
                </div>
                <div className="col-6 d-flex align-items-center justify-content-end Login-Register">
                  <div className="btn-group">
                    <button
                      type="button"
                      className="name-button dropdown-toggle"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i class="fas fa-user"></i>
                    </button>
                    <div className="dropdown-menu">
                      <Link className="dropdown-item" to="/profile">
                        Profile
                      </Link>

                      <Link className="dropdown-item" to="#">
                        Logout
                      </Link>
                    </div>
                  </div>
                  <Link to="/cart" className="cart-mobile-icon">
                    <i className="fas fa-shopping-bag"></i>
                    <span className="badge">4</span>
                  </Link>
                </div>
                <div className="col-12 d-flex align-items-center">
                  <form className="input-group">
                    <input
                      type="search"
                      className="form-control rounded search"
                      placeholder="Search"
                    />
                    <button type="submit" className="search-button">
                      search
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* PC HEADER */}
          <div className="pc-header">
            <div className="row">
              <div className="col-md-3 col-4 d-flex align-items-center">
                <Link className="navbar-brand" to="/home">
                  <img alt="logo" src="/images/logo.png" />
                </Link>
              </div>
              <div className="col-md-6 col-8 d-flex align-items-center">
                <form className="input-group">
                  <input
                    type="search"
                    className="form-control rounded search"
                    placeholder="Search"
                  />
                  <button type="submit" className="search-button">
                    search
                  </button>
                </form>
              </div>
              <div className="col-md-3 d-flex align-items-center justify-content-end Login-Register">
                <div className="btn-group">
                  <p>Hello {username}</p>
                  <button
                    type="button"
                    className="name-button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false" onClick={logoutUser}
                  >
                    Logout
                  </button>
                </div>


              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
