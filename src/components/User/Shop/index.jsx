import React, { useState, useEffect } from "react";
import { json, Link, useNavigate } from "react-router-dom";
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
import { selectCurrentProductSearch } from "../../../features/products/productSlice";
import { useSelector } from "react-redux";

const Shop = () => {
  const currentProductSearch = useSelector(selectCurrentProductSearch);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
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
  } = useGetProductsPaginatedQuery(
    // {
    //   refetchOnFocus: true,
    //   refetchOnMountOrArgChange: true,
    //   pollingInterval: 15000,
    // },
    {
      minPrice: minPrice,
      maxPrice: maxPrice,
      name: currentProductSearch,
      page: page,
      size: pageSize,
    }
  );

  let productsFound;
  if (isLoading) {
    // productsFound = (<LoadingBar />)
    productsFound = (
      <>
        <LoadingBar />
      </>
    );
  } else if (isSuccess) {
    const { itemsList, paginator } = products;
    console.log("itemsList", itemsList.length);
    productsFound = (
      <>
        <Row>
          {/* <pre>{JSON.stringify(minPrice)}</pre>
          <pre>{JSON.stringify(maxPrice)}</pre>
          <pre>{JSON.stringify(currentProductSearch)}</pre> */}
          {itemsList.map((product) => {
            return <Product key={product._id} product={product} />;
          })}
        </Row>
        <div className="mt-2 mb-2 text-center">
          <Button color="warning" onClick={fetchMore} disabled={isFetching}>
            {isFetching ? (
              <Spinner color="danger" size={"sm"}>
                Loading...
              </Spinner>
            ) : pageSize <= products.itemsList.length ? (
              "More"
            ) : (
              "No More Products"
            )}
          </Button>
        </div>
      </>
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
          <Row className="align-items-center mx-0 mb-4 mt-4 mt-lg-0 py-3 py-lg-0 bg-white shop-toolbar">
            <Col
              xs={{ size: 12, order: 1 }}
              sm={{ size: 12, order: 1 }}
              md={{ size: 5, order: 1 }}
              lg={{ size: 6, order: 1 }}
              className="text-start text-md-left p-2 mt-3 mt-md-0 mb-1 mb-md-0"
            >
              {isSuccess && products && products.itemsList.length > 0 && (
                <span>
                  {products.itemsList.length} results for{" "}
                  {currentProductSearch ? (
                    <span>{`'${currentProductSearch}'`}</span>
                  ) : (
                    "Products"
                  )}
                </span>
              )}
            </Col>
            <Col
              xs={{ size: 12, order: 2 }}
              sm={{ size: 12, order: 2 }}
              md={{ size: 5, order: 2 }}
              lg={{ size: 2, order: 2 }}
              className="text-start p-2"
            >
              Something
            </Col>

            <Col
              xs={{ size: 12, order: 2 }}
              sm={{ size: 12, order: 2 }}
              md={{ size: 5, order: 2 }}
              lg={{ size: 4, order: 2 }}
              className="text-start"
            >
              <div class="d-inline-flex align-items-center">
                <label htmlFor="sortby">
                  <small>Sort By:</small>
                </label>
                <div className="p-2">
                  <select name="sortby" class="form-control form-control-sm ">
                    <option>A - Z</option>
                    <option>Most Recent</option>
                    <option>Price Low to High</option>
                    <option>Price High to Low</option>
                  </select>
                </div>
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
