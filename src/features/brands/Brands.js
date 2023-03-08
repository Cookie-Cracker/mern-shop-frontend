import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SubPage from "../../components/Manager/SubPage";
import {

  useGetBrandsPaginatedQuery,
} from "./brandsApiSlice";

import { Badge, Button, Row, Col } from "reactstrap";
import { useSelector } from "react-redux";
import { selectCurrentSearch } from "./brandSlice";
import BrandPag from "./BrandPag";
import LoadingBar from "../../components/Common/Spinner/Loading";
import List from "./BrandsList";

const BrandsList = () => {
  const navigate = useNavigate();
  const searchTerm = useSelector(selectCurrentSearch);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [showActive, setShowActive] = useState(true)

  const {
    data: searchResult,
    isLoading: isSearchLoading,
    isSuccess: isSearchSuceess,
    isError: isSearchError,
    error: searchError,
  } = useGetBrandsPaginatedQuery({
    brand: searchTerm,
    page,
    size: pageSize,
    isActive: showActive,
  });


  const pageSizesOptions = [5, 10, 15];

  let content;
  if (isSearchLoading) {
    content = <LoadingBar />;
  } else if (isSearchSuceess) {
    const { itemsList, paginator } = searchResult.data;


    const selectPageSize = (
      <select className="p-1 m-2" onChange={(e) => setPageSize(e.target.value)}>
        {pageSizesOptions.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
    );
    const selectIsActive = (
      <select className="p-1 m-2" onChange={(e) => setShowActive(e.target.value)}>
        <option value={true}>Active</option>
        <option value={false}>Inactive</option>
      </select>
    );

    // const list = itemsList.map((brand) => (
    //   <BrandPag key={brand._id} brand={brand} />
    // ));

    const from = 1 + paginator.perPage * (page - 1);
    const to =
      paginator.pageCount === paginator.currentPage
        ? from - 1 + searchResult.data.itemsList.length
        : from + paginator.perPage - 1;

    content = (
      <section className="brands">
        <SubPage
          title="Brands"
          actionName="Add"
          handleAction={() => navigate("/dashboard/brands/new")}
        >

          <div className="flex align-items-center flex-column  justify-content-between ">
            <Row>
              <Col xs={{ size: 12, order: 1 }}
                sm={{ size: 12, order: 1 }}
                md={{ size: 12, order: 1 }}
                lg={{ size: 6, order: 1 }}
              >
                <div className=" mb-2">
                  <span className="p-1 m-1">Per Page:</span>
                  {selectPageSize}
                  <Button
                    size="sm"
                    color="success"
                    onClick={() => setPage(1)}
                    disabled={page === 1}
                  >
                    {"<|"}
                  </Button>{" "}
                  <Button
                    size="sm"
                    color="success"
                    disabled={page === 1}
                    onClick={() => setPage((prev) => prev - 1)}
                  >
                    {"<"}
                  </Button>{" "}
                  <Button
                    size="sm"
                    color="success"
                    onClick={() => setPage((prev) => prev + 1)}
                    disabled={paginator.currentPage === paginator.pageCount}
                  >
                    {">"}
                  </Button>{" "}
                  <Button
                    size="sm"
                    color="success"
                    disabled={paginator.currentPage === paginator.pageCount}
                    onClick={() => setPage(paginator.pageCount)}
                  >
                    {"|>"}
                  </Button>{" "}
                  <Badge className="text-dark" color="light">
                    {" "}
                    {from} - {to} of {paginator.itemCount}
                  </Badge>
                </div>
              </Col>

              <Col xs={{ size: 12, order: 2 }}
                sm={{ size: 12, order: 2 }}
                md={{ size: 12, order: 2 }}
                lg={{ size: 6, order: 2 }}
              >
                <div>
                  <span className="">Showing: </span>
                  {selectIsActive}
                </div>
              </Col>
            </Row>
          </div>

          {itemsList && itemsList.length > 0
            ? (
              // <div className="b-list">{list}</div>
              <div className="b-list"><List brands={itemsList} /></div>

            )
            : <div className="text-center mt-5"><p>No Brands Found..</p></div>}
        </SubPage>
      </section>
    );
  } else if (isSearchError) {
    content = <p className="errmsg">{searchError.data}</p>;
  }
  return content;
};

export default BrandsList;
