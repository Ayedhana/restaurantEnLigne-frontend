import React, { useState } from 'react'
import {Link} from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
 const baseUrl = "https://restaurantenligne.onrender.com"; 
function Signup() {
  
 const [credentials, setCredentials] = useState({name:"",email:"",password:"",geolocation:""});

  const handleSubmit =async (e) => {
    e.preventDefault();
    const response = await fetch(
      `${baseUrl}/createUser`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
          location: credentials.geolocation,
        }),
      }
    );
    const json=await response.json()
    console.log(json)
    if(!json.success){alert("Enter Valid credentials")}
  };
  const onChange=(event)=>{
    setCredentials({...credentials,[event.target.name]:event.target.value})
  }
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div
        className="container"
        style={{ paddingTop: "60px", paddingBottom: "60px" }}
      >
        <form onSubmit={handleSubmit}>
          <div className="m-3">
            <label htmlFor="name">Name</label>
            <input
              type="texte"
              className="form-control"
              placeholder="Enter name"
              name="name"
              value={credentials.name}
              onChange={onChange}
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="m-3">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              name="email"
              value={credentials.email}
              onChange={onChange}
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="m-3">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              name="password"
              value={credentials.password}
              onChange={onChange}
            />
          </div>
          <div className="m-3">
            <label htmlFor="exampleInputPassword1">Adresse</label>
            <input
              type="text"
              className="form-control"
              placeholder="geolocation"
              name="geolocation"
              value={credentials.geolocation}
              onChange={onChange}
            />
          </div>
          <div className="m-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" for="exampleCheck1">
              Check me out
            </label>
          </div>
          <button type="submit" className="m-3 btn btn-success">
            Submit
          </button>
          <Link to="/login" className="m-3 btn btn-danger ">
            Already a user
          </Link>
        </form>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Signup
