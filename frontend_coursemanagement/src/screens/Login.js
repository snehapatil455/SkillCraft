import React from 'react';
import { Link,useHistory } from 'react-router-dom';
import { useState } from 'react';


const Login = (props) => {
    const history = useHistory();

  const [authMode, setAuthMode] = useState('signin');
  const [token, setToken] = useState('');
  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');
  const [email,setEmail] = useState('');
  const [role,setRole] = useState([]);




  const changeAuthMode = () => {
    setAuthMode(authMode === 'signin' ? 'signup' : 'signin');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Get form data
    if(authMode === 'signin'){
      const formData = new FormData(event.target);
      setUsername(formData.get('username'));
      setPassword(formData.get('password'));
  
      
      // Send data to backend
      fetch('http://localhost:8081/api/auth/signin', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })
      .then((response) => {
          if (response.ok) {
           
            // Save token to state
          
            return response.json();
          } else {
            alert("Error: Bad Credetials");
            throw new Error('Network response was not ok');
          }
        })
        .then((data) => {
          localStorage.setItem("user", JSON.stringify(data));
          const cookieHeader = data['cookie'];
          if (cookieHeader) {
            window.sessionStorage.setItem('authToken', cookieHeader.split(';')[0]);
          }else{
          console.log('no cookie found');
        }
              history.push('/home');
        })
        .catch((error) => 
        {
          if (error.message === "Unauthorized") {
            alert("Unauthorized: You don't have permission to access this resource.");
          } else {
            alert("Error: " + error.message);
          }
        });
    }else{
      const formData = new FormData(event.target);
      setEmail(formData.get('email'));
      setUsername(formData.get('username'));
      setPassword(formData.get('password'));
      const adminPhrase = formData.get('admin-pharse');
      let role;
      if(adminPhrase === 'KGF'){
         role= ['admin'];
         console.log("isupdated role " + role);
      }
      
      
      
      // Send data to backend
      fetch('http://localhost:8081/api/auth/signup', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username,email, password,role }),
      })
      .then((response) => {
          if (response.ok) {  
            console.log(response.data);
            alert("user register");
            changeAuthMode();
          }
        })
        .catch((error) => console.log(error));
    }
  };
    

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">{authMode === 'signin' ? 'Sign In' : 'Sign Up'}</h3>
          <div className="text-center" style={{ cursor: 'pointer' }}>
            {authMode === 'signin' ? (
              <>
                Not registered yet?{' '}
                <span className="link-primary" onClick={changeAuthMode}>
                  Sign Up
                </span>
              </>
            ) : (
              <>
                Already registered?{' '}
                <span className="link-primary" onClick={changeAuthMode}>
                  Sign In
                </span>
              </>
            )}
          </div>
          {authMode === 'signup' && (
            <><div className="form-group mt-3">
              <label>email</label>
              <input type="email" name='email' className="form-control mt-1" placeholder="abc@example.com" />
            </div><div className="form-group mt-3">
                <label>Admin Phrase</label>
                <input className="form-control mt-1" name="admin-pharse" placeholder="Admin Pharse" required />
              </div></>
          )}
          <div className="form-group mt-3">
            <label>username</label>
            <input className="form-control mt-1" name="username" placeholder="Username" required />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input type="password" className="form-control mt-1" name="password" placeholder="Password" required />
          </div>
          

          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              {authMode === 'signin' ? 'Sign In' : 'Sign Up'}
            </button>
          </div>
          <p className="text-center mt-2">
            Forgot <Link to="#">password?</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
