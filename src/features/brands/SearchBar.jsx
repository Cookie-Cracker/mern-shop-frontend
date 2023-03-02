import React, { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  clearSearchBrand,
  searchBrand,
  selectCurrentSearch,
} from "./brandSlice";
import {
  FormGroup,
  Input,
  Form,
  Row,
  Col,
  Label,
  Button,
  Badge,
} from "reactstrap";
import { addListener } from "@reduxjs/toolkit";

const SearchBar = () => {
  const dispatch = useDispatch();
  // const brandSearch = useSelector(selectCurrentSearch);

  const searchRef = useRef(null);
  const [brandCount, setBrandsCount] = useState(10);
  const currentSearch = useSelector(selectCurrentSearch);
  const [search, setSearchValue] = useState(currentSearch);

  const location = useLocation();
  const path = location.pathname;
  console.log("path", path);

  useEffect(() => {
    searchRef.current.focus();
  }, []);

  const onChangeSearch = (e) => {
    const searchValue = e.target.value;
    setSearchValue(searchValue);
    if (searchValue.length === 0) {
      dispatch(clearSearchBrand());
    }
  };

  const onSubmitSearch = (e) => {
    e.preventDefault();
    path === "/dashboard/brands" && dispatch(searchBrand(search));
  };
  return (
    <>
      <div className="pb-3 flex">
        <Form onSubmit={onSubmitSearch}>
          <Row className="row-cols-lg-auto g-3 align-items-center">
            <Col xs={"9"} md={"9"} lg={"10"}>
              <Input
                id="search"
                onChange={onChangeSearch}
                // onChange={(e) => setSearchValue(e.target.value)}
                value={search}
                innerRef={searchRef}
                name="search"
                placeholder="Search brand..."
                type="search"
              />
            </Col>

            <Col xs={"3"} md={"3"} lg={"2"}>
              <Button block type="submit">
                <i className="bi bi-search"></i>
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default SearchBar;
