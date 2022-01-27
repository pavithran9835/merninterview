import React, { useState } from "react";
import "./CreateUser.css";
import { FiUpload } from "react-icons/fi";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phone: "",
    code: "",
  });

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const createUserHandler = () => {
    axios
      .post(`http://localhost:5000/user/create_user`, {
        firstname: userDetails.firstname,
        lastname: userDetails.lastname,
        email: userDetails.email,
        password: userDetails.password,
        phone: userDetails.phone,
        code: userDetails.code,
      })
      .then((res) => {
        navigate("/list-user");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const listUserHandler = () => {
    navigate("/list-user");
  };

  return (
    <>
      <h1 onClick={listUserHandler}>List User</h1>
      <div className="create_user_container">
        <div className="create_user_form_container">
          <label htmlFor="name">First Name</label>
          <input type="text" name="firstname" onChange={inputChangeHandler} />
          <label htmlFor="name"> last Name</label>
          <input type="text" name="lastname" onChange={inputChangeHandler} />
          <label htmlFor="name">email</label>
          <input type="email" name="email" onChange={inputChangeHandler} />
          <label htmlFor="name">password</label>
          <input
            type="password"
            name="password"
            onChange={inputChangeHandler}
          />
          <label htmlFor="number">phone</label>
          <input
            type="number"
            name="phone"
            numberonChange={inputChangeHandler}
            maxLength="10"
            minLength="10"
          />
          <label htmlFor="name">Image</label>
          <input type="text" name="phone" onChange={inputChangeHandler} />
          <label htmlFor="name">code</label>
          <input
            type="number"
            name="code"
            maxLength="6"
            onChange={inputChangeHandler}
          />
          {/* <div className="user_image_container">
            <label htmlFor="images">upload</label>
            <input
              type="file"
              multiple
              name="images"
              id="images"
              accept="images/*"
              className="image_file_input"
              onChange={userImageUpload}
              style={{ display: "none" }}
            />
          </div> */}

          <button onClick={createUserHandler}>submit</button>
        </div>
      </div>
    </>
  );
};

export default CreateUser;
