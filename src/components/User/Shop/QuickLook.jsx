import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Badge,
} from "reactstrap";
import otherGenericImage from "../../../assets/img/mike-petrucci-c9FQyqIECds-unsplash.jpg";

const QuickLookModal = (args) => {
  const apiURL =
    process.env.NODE_ENV === "production"
      ? "https://mern-shop-api.onrender.com/"
      : "http://localhost:3900/";

  const { modal, product, toggle } = args;

  return (
    <Modal isOpen={modal} toggle={toggle} size={"xl"} centered>
      <ModalHeader toggle={toggle}></ModalHeader>
      <ModalBody>
        <div className="product-detail-modal-body">
          <div className="pics">
            <img
              src={
                process.env.NODE_ENV === "production"
                  ? otherGenericImage
                  : `${apiURL}${product.image}`
              }
              // src={`${apiURL}${product.image}`}
              alt=""
              className="main-img"
            />
          </div>
          <div className="product-info">
            <span className="category">Category</span>
            <h2>{product.name}</h2>
            {product.quantity > 0 ? (
              <Badge color="success">In Stock</Badge>
            ) : (
              <Badge color="alert">Sold Out</Badge>
            )}

            <div className="block-price">
              <span className="price-new">${product.price}</span>
              <span className="price-old">${product.price}</span>
            </div>
            <div className="descr">
              <p>{product.description}</p>
            </div>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="success" onClick={toggle}>
          Add to Cart
        </Button>{" "}
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default QuickLookModal;
