import React from "react";
function Login(props) {
    const username = ('');
    const password = ('');
    const [error, setError] = (null);
    const [loading, setLoading] = (false);
    const handleLogin = () => {
        props.history.push('/dashboard');
      }
     
      return (
        <div>
          Login<br /><br />
          <div>
            Username<br />
            <input type="text" {...username} autoComplete="new-password" />
          </div>
          <div style={{ marginTop: 10 }}>
        Password<br />
        <input type="password" {...password} autoComplete="new-password" />
      </div>
      {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
      <input type="button" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} /><br />
    </div>
  );
}  
export default  Login