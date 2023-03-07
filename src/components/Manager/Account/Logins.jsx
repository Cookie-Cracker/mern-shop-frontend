import React from "react";
import {
  formatDistance,
  subDays,
  addYears,
  formatRelative,
  format,
} from "date-fns";
import { Row, Col } from "reactstrap";
import { useGetTopFiveLoginsQuery } from "../../../features/users/usersApiSlice";
import LoadingBar from "../../Common/Spinner/Loading";
import { wa } from "../../Common/Notifications";

const Logins = ({ userid }) => {
  const {
    data: logins,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
  } = useGetTopFiveLoginsQuery({
    id: userid,
  });
  let content;
  if (isLoading) content = <LoadingBar />;
  else if (isError) content = <p>{JSON.stringify(error?.data)}</p>;
  else if (isSuccess) {
    content = (
      <>
        {logins.itemsList.map((login) => (
          <div className="container pb-1 mb-1 ">
            {/* <div className="alert alert-info alert-dismissible fade show text-center mb-30">
              <i className="fe-icon-award"></i>&nbsp;&nbsp;With this purchase
              you will earn <strong>2,549</strong> Reward Points.
            </div> */}

            <div className=" d-md-flex justify-content-between m-2">
              <div className="px-1 my-1">
                <div>
                  {/* <strong>Date:</strong>{" "} */}
                  <h6>
                    <span>
                      {format(Date.parse(login.logindate), "MM/dd/yyyy")}
                    </span>
                  </h6>
                  <span className="fst-italic">
                    {" "}
                    {formatRelative(Date.parse(login.logindate), new Date())}
                  </span>
                </div>
              </div>

              <div className="px-1 my-1 text-center">
                <div className="login-item-label ">
                  {" "}
                  {formatDistance(Date.parse(login.logindate), new Date(), {
                    addSuffix: true,
                  })}
                </div>
                <span className="text-xl font-weight-medium"></span>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  }

  return content;
};

export default Logins;
