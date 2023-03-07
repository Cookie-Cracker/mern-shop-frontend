import React from "react";
import { useNavigate } from "react-router-dom";
import SubPage from "../../components/Manager/SubPage";
import { useGetProductsQuery } from "./productsApiSlice";
import {
  successNotification,
  errorNotification,
} from "../../components/Common/Notifications";
import { confirmAlert } from "react-confirm-alert";
import Datatable from "../../components/Common/DatatableBase";
import { NoData } from "../../components/Common/NoData";
import LoadingBar from "../../components/Common/Spinner/Loading";
// import DataTable from 'react-data-table-component';
import otherGenericImage from "../../assets/img/generic-250x250.jpg";

export const ProductsList = () => {
  const apiURL =
    process.env.NODE_ENV === "production"
      ? "https://mern-shop-api.onrender.com/"
      : "http://localhost:3900/";

  const navigate = useNavigate();

  const {
    data: products,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetProductsQuery("productsList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const columns = [
    {
      name: "Thumb",
      cell: (row) => (
        <div>
          <img
            // src={`http://localhost:3900/${row.image}`}
            src={
              process.env.NODE_ENV === "production"
                ? otherGenericImage
                : `${apiURL}${row.image}`
            }
            // src={`${apiURL}${row.image}`}
            alt={row.name}
            className="thumb"
          />
        </div>
      ),
    },
    {
      name: "Sku",
      selector: (row) => row.sku,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => row.price,
      sortable: true,
    },
    {
      name: "In Stock",
      cell: (row) => (
        <div>
          {row.quantity >= 10 ? (
            <span className="green m-3">{row.quantity}</span>
          ) : (
            <>
              <i className="bi bi-caret-down-fill red"></i>
              <span className="red m-2">{row.quantity}</span>
            </>
          )}
        </div>
      ),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <button
            id="update"
            className="btn btn-outline btn-xs"
            //   onClick={() => handleUpdate(row._id)}
          >
            <i className="bi bi-pencil icon update"></i>
          </button>
          <button
            id="delete"
            className="btn btn-outline btn-xs"
            //   onClick={() => onDeleteUserClicked(row)}
          >
            <i className="bi bi-trash3 icon delete"></i>
          </button>
        </div>
      ),
    },
  ];

  let content;
  if (isLoading) {
    content = <LoadingBar />;
  } else if (isSuccess) {
    content = (
      <section className="products">
        <SubPage
          title="Products"
          actionName="Add"
          handleAction={() => navigate("/dashboard/products/new")}
        ></SubPage>
        {columns.length > 0 ? (
          <Datatable columns={columns} data={products} />
        ) : (
          <NoData />
        )}
      </section>
    );
  } else if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
    // content = <p className="errmsg">{'error message'}</p>;
  }
  return content;
};
