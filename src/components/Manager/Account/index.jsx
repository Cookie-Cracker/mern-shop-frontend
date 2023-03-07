import jwtDecode from "jwt-decode";
import React from "react";
import { useSelector } from "react-redux";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardImg,
  CardSubtitle,
  CardTitle,
  Button,
} from "reactstrap";
import { selectCurrentToken } from "../../../features/auth/authSlice";
import {
  useGetMeQuery,
  usersApiSlice,
} from "../../../features/users/usersApiSlice";
import LoadingBar from "../../Common/Spinner/Loading";
import profileImg from "../../../assets/img/avatar.png";
import Logins from "./Logins";
import { warnNotification } from "../../Common/Notifications";

const Account = () => {
  const token = useSelector(selectCurrentToken);

  const decoded = jwtDecode(token);
  console.log("decoded", decoded);
  const { id } = decoded.UserInfo;
  console.log("id", id);

  const {
    data: user,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetMeQuery({ id: id });

  let content = <p>none</p>;
  if (isLoading) {
    content = <LoadingBar />;
  } else if (isSuccess) {
    content = (
      <div className="account-details">
        <Row>
          <Col
            xs={{ size: 12, order: 1 }}
            sm={{ size: 12, order: 1 }}
            md={{ size: 12, order: 1 }}
            lg={{ size: 4, order: 1 }}
          >
            <Card className="p-4 mb-4 ">
              <div className="flex align-items-center flex-column text-center">
                <img
                  width={"100%"}
                  src={profileImg}
                  className="rounded-circle w-50"
                  alt="img-profile"
                />
                <CardTitle className="m-2" tag={"h5"}>
                  <span className="fw-bold"> {user.username}</span>
                </CardTitle>
                <CardSubtitle className="m-2 text-muted">
                  {user.roles.map((role) => role.name)}
                </CardSubtitle>
                <CardBody>
                  <div>
                    <i class="bi bi-phone-fill"></i>
                    <span>{user.email}</span>
                  </div>
                  <div>
                    <i class="bi bi-envelope-at-fill"></i>
                    <span>{user.phone}</span>
                  </div>
                </CardBody>
                <Button
                  block
                  color="success"
                  onClick={() => warnNotification("No Implemented Yet..")}
                >
                  Edit
                </Button>
              </div>
            </Card>
          </Col>
          <Col
            xs={{ size: 12, order: 2 }}
            sm={{ size: 12, order: 2 }}
            md={{ size: 12, order: 2 }}
            lg={{ size: 8, order: 2 }}
            className="mb-4"
          >
            <Card>
              <div>
                <CardTitle className="d-flex justify-content-between alert alert-info">
                  <h4>Last Logins</h4>
                  <Button
                    onClick={() => warnNotification("No Implemented Yet..")}
                  >
                    History
                  </Button>
                </CardTitle>
                <Logins userid={user._id} />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    );
  } else if (isError) {
    content = <pre>{JSON.stringify(error?.data)}</pre>;
  }
  return content;
};

export default Account;
