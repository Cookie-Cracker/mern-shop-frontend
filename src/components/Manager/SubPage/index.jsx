import React from "react";
import { Button } from "reactstrap";

const SubPage = (props) => {
  const { title, actionName, handleAction, children } = props;
  return (
    <div className="subpage">
      <div className="subpage-header">
        <h3>{title}</h3>
        {actionName && (
          <Button color="success" size="sm" onClick={handleAction}>
            {actionName}
          </Button>
        )}
      </div>
      <div className="subpage-body">{children}</div>
    </div>
  );
};

export default SubPage;
