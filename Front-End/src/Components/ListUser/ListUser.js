import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ListUser.css";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import Modal from "react-modal";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

const customStyles = {
  content: {
    width: "400px",
    height: "400px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    flexDirection: "column",
  },
};

const ListUser = () => {
  const [userList, setuserList] = useState([]);
  const [modelOpen, setmodelOpen] = useState(false);
  const [userDetails, setUserDetails] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    phone: "",
    code: "",
  });
  const [selectedUser, setselectedUser] = useState({});

  function openModal(userId) {
    const seleUser = userList.filter((user) => user._id === userId);
    console.log(seleUser[0]);
    setselectedUser(seleUser[0]);
    setmodelOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setmodelOpen(false);
  }

  useEffect(() => {
    axios
      .get(`http://localhost:5000/user/get_all_user`)
      .then((res) => {
        setuserList(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const openModelHandler = () => {
    setmodelOpen(true);
  };

  const editUserHandler = (userId) => {
    console.log(userId);
    axios
      .put(`http://localhost:5000/user/edit_user/${userId}`, {
        userData: selectedUser,
      })
      .then((res) => {
        let filteredList = userList.filter((user) => user._id !== userId);

        filteredList.push(res.data.user);

        setuserList(filteredList);
        setmodelOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setselectedUser((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const deleteUserHandler = (userId) => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            axios
              .put(`http://localhost:5000/user/delete_user/${userId}`)
              .then((res) => {
                let filteredList = userList.filter(
                  (user) => user._id !== userId
                );

                setuserList(filteredList);
              })
              .catch((err) => {
                console.log(err);
              });
          },
        },
        {
          label: "No",
          onClick: () => null,
        },
      ],
    });
  };

  return (
    <div className="list_user_container">
      <table id="customers">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Lastt Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Phone</th>
            <th>Code</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user, index) => (
            <tr>
              <td>{user.firstname}</td>
              <td>{user.lastname}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{user.phone}</td>
              <td>{user.code}</td>
              <td>
                <AiFillEdit
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    openModal(user._id);
                  }}
                />
              </td>
              <td>
                <AiFillDelete
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    deleteUserHandler(user._id);
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        isOpen={modelOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <label htmlFor="name">First Name</label>
        <input
          type="text"
          name="firstname"
          onChange={inputChangeHandler}
          className="formInput"
          value={selectedUser.firstname}
        />
        <label htmlFor="name"> last Name</label>
        <input
          type="text"
          name="lastname"
          onChange={inputChangeHandler}
          className="formInput"
          value={selectedUser.lastname}
        />
        <label htmlFor="name">email</label>
        <input
          type="email"
          name="email"
          onChange={inputChangeHandler}
          className="formInput"
          value={selectedUser.email}
        />
        <label htmlFor="name">password</label>
        <input
          type="password"
          name="password"
          onChange={inputChangeHandler}
          className="formInput"
          value={selectedUser.password}
        />
        <label htmlFor="name">phone</label>
        <input
          type="phone"
          name="phone"
          onChange={inputChangeHandler}
          className="formInput"
          value={selectedUser.phone}
        />
        <label htmlFor="name">code</label>
        <input
          type="code"
          name="code"
          onChange={inputChangeHandler}
          className="formInput"
          value={selectedUser.code}
        />
        <button
          onClick={() => {
            editUserHandler(selectedUser._id);
          }}
          className="update_button"
        >
          Update User
        </button>
      </Modal>
    </div>
  );
};

export default ListUser;
