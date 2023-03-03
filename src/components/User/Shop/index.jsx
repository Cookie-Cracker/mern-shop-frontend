import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import {
  Row,
  Col,
  Input,
  FormGroup,
  Label,
  Form,
  Spinner,
  Button,
} from "reactstrap";
import { PriceFilter } from "./ShopFilters";
import { useGetProductsPaginatedQuery } from "../../../features/products/productsApiSlice";
import LoadingBar from "../../Common/Spinner/Loading";
import Product from "./Product";
import SearchBar from "../../../features/brands/SearchBar";

const Shop = () => {
  const { status } = useAuth();

  const navigate = useNavigate();
  const searchTerm = "";
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(1);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500);

  const fetchMore = () => {
    setPageSize((prev) => prev + 2);
  };

  const {
    data: products,
    isFetching,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetProductsPaginatedQuery({
    minPrice: minPrice,
    maxPrice: maxPrice,
    page: page,
    size: pageSize,
  });

  let productsFound;
  if (isLoading) {
    productsFound = <LoadingBar />;
  } else if (isSuccess) {
    const { itemsList, paginator } = products;
    productsFound = (
      <Row>
        {/* <pre>{JSON.stringify(minPrice)}</pre>
        <pre>{JSON.stringify(maxPrice)}</pre> */}

        {itemsList.map((product) => {
          console.log("product.name", product.name);
          return <Product key={product._id} product={product} />;
        })}
        <div className="mt-2 mb-2 text-center">
          <Button color="warning" onClick={fetchMore} disabled={isFetching}>
            {isFetching ? (
              <Spinner color="danger" size={"sm"}>
                Loading...
              </Spinner>
            ) : pageSize <= products.itemsList.length ? (
              "More"
            ) : (
              "No More"
            )}
          </Button>
        </div>
      </Row>
    );
  }

  const content = (
    <div className="shop">
      <Row>
        <Col
          xs={{ size: 12, order: 1 }}
          sm={{ size: 12, order: 1 }}
          md={{ size: 12, order: 1 }}
          lg={{ size: 3, order: 1 }}
        >
          <PriceFilter setMinPrice={setMinPrice} setMaxPrice={setMaxPrice} />
        </Col>
        <Col
          xs={{ size: 12, order: 2 }}
          sm={{ size: 12, order: 2 }}
          md={{ size: 12, order: 2 }}
          lg={{ size: 9, order: 2 }}
        >
          {/* <div class="text-bg-dark p-3">Header</div> */}
          <Row className="align-items-center mx-0 mb-4 mt-4 mt-lg-0 py-3 py-lg-0 bg-white shop-toolbar">
            <Col
              xs={{ size: 12, order: 1 }}
              sm={{ size: 12, order: 1 }}
              md={{ size: 5, order: 1 }}
              lg={{ size: 6, order: 1 }}
              className="text-start text-md-left p-4 mt-3 mt-md-0 mb-1 mb-md-0"
            >
              <span>Products:</span>
            </Col>
            <Col
              xs={{ size: 12, order: 2 }}
              sm={{ size: 12, order: 2 }}
              md={{ size: 5, order: 2 }}
              lg={{ size: 2, order: 2 }}
              className="text-end pr-0 d-none d-md-block"
            ></Col>
            <SearchBar />

            <Col
              xs={{ size: 12, order: 2 }}
              sm={{ size: 12, order: 2 }}
              md={{ size: 5, order: 2 }}
              lg={{ size: 4, order: 2 }}
              className="text-end"
            >
              <div>
                <div class="d-inline-flex mt-2">
                  <div class="mr-2">
                    <label for="from_year">
                      <small>
                        <strong>Search from year:</strong>
                      </small>
                    </label>
                  </div>
                  <div>
                    <select
                      name="from_year"
                      class="form-control form-control-sm"
                      id="from_year"
                    >
                      <option value="1980">1980 (default)</option>

                      <option value="{{ year }}">185</option>
                    </select>
                  </div>
                </div>
                {/* <span className="">Sort By:</span>

                <select className="form-select form-select-sm">
                  <option>Relevance</option>
                  <option>Most Recent</option>
                  <option>Price Low to High</option>
                  <option>Price High to Low</option>
                </select> */}
              </div>
            </Col>
          </Row>

          {productsFound}
        </Col>
      </Row>
    </div>
  );
  return content;
};

export default Shop;
