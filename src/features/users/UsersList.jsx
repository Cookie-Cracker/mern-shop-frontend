import { useDeleteUserMutation, useGetUsersQuery } from "./usersApiSlice";
import DataTable from "react-data-table-component";

import React, { useEffect, useState } from "react";
import SubPage from "../../components/Manager/SubPage";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import {
  successNotification,
  errorNotification,
} from "../../components/Common/Notifications";
import useAuth from "../../hooks/useAuth";

const UsersList = () => {
  const navigate = useNavigate();

  const { email } = useAuth();
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery("usersList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  const [isCurrentUser, setIsCurrentUser] = useState(false);

  const [
    deleteUser,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteUserMutation();

  const colums = [
    {
      name: "Username",
      selector: (row) => row.username,
      sortable: true,
    },
    { name: "Email", selector: (row) => row.email, sortable: true },
    { name: "Phone", selector: (row) => row.phone, sortable: true },
    // { name: "Roles", selector: (row) => row.roles, sortable: true },
    {
      name: "Roles",
      cell: (rows) =>
        rows.roles.map((role) => (
          <span key={role._id}>{`[${role.name}]`} </span>
        )),
    },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <button
            id="update"
            className="btn btn-outline btn-xs"
            onClick={() => handleUpdate(row._id)}
          >
            <i className="bi bi-pencil icon update"></i>
          </button>
          <button
            id="delete"
            className="btn btn-outline btn-xs"
            onClick={() => onDeleteUserClicked(row)}
          >
            <i className="bi bi-trash3 icon delete"></i>
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (isDelSuccess) {
      successNotification("Success", `User deleted.`);
      if (isCurrentUser) {
        navigate("/signin");
      }
    }
  }, [isDelSuccess]);

  const handleUpdate = () => {
    alert("update");
  };

  const handleDelete = async (user) => {
    await deleteUser({ id: user._id });
  };

  const onDeleteUserClicked = (user) => {
    let mainOptions;
    if (email === user.email) {
      setIsCurrentUser(true);
      mainOptions = {
        title: <i class="bi bi-info-circle-fill fs-5"> Info</i>,
        message: `You are logged in rigth now. You can't delete yourself.`,
        buttons: [
          // {
          //   label: "Yes",
          //   onClick: () => handleDelete(user),
          // },
          {
            label: "Cancel",
            onClick: () => {},
          },
        ],
      };
    } else {
      mainOptions = {
        title: "Confirm deletion",
        message: `Delete the User ${user.username}`,
        buttons: [
          {
            label: "Yes",
            onClick: () => handleDelete(user),
          },
          {
            label: "No",
            onClick: () => {},
          },
        ],
      };
    }

    let extraOptions = {
      closeOnEscape: true,
      closeOnClickOutside: true,
      keyCodeForClose: [8, 32],
      willUnmount: () => {},
      afterClose: () => {},
      onClickOutside: () => {},
      onKeypress: () => {},
      onKeypressEscape: () => {},
      overlayClassName: "overlay-custom-class-name",
    };

    const options = { ...mainOptions, ...extraOptions };
    // const { username } = user;
    confirmAlert(options);
  };

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    content = (
      <section className="users">
        <SubPage
          title="Users"
          actionName="Add"
          handleAction={() => navigate("/dashboard/users/new")}
        />
        {/* <ul>
          {users.map((user, i) => {
            return (
              <li key={i}>
                {user.username}
                {user._id}
              </li>
            );
          })}
        </ul> */}
        <DataTable data={users} columns={colums} />

        {/* <Link to="/dashboard">Back to Welcome</Link> */}
      </section>
    );
  } else if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }
  return content;
};

export default UsersList;
