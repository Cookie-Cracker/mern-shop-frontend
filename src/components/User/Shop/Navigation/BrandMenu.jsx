import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGetBrandsPaginatedQuery } from "../../../../features/brands/brandsApiSlice";

const BrandMenu = ({ sk }) => {
  const [skip, setSkip] = useState(true);

  const {
    data: brands,
    isLoading,
    isFetching,
    isSuccess,
  } = useGetBrandsPaginatedQuery("brandsList", {
    refetchOnFocus: true,
    pollingInterval: 60000,
    refetchOnMountOrArgChange: true,
    skip: sk,
  });

  useEffect(() => {
    setSkip(sk);
  }, [skip]);
  let content;
  if (isLoading) {
    content = "loading";
  } else if (isSuccess) {
    const { itemsList } = brands.data;
    content = (
      <div className="brand-menu">
        <div className="brands-list">
          <h4 className="mb-0">SHOP BY BRAND</h4>
          <hr />
          <Link to={"/brands"} className="redirect-link" role="menuitem">
            See all
          </Link>
          <div className="d-flex align-items-center justify-content-between">
            <div className="brand-block">
              {itemsList.map((brand, i) => (
                <div className="brand-item" key={`${brand.name}+${i}`}>
                  <Link className="brand-link">{brand.name}</Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
    console.log("brands", brands);
  }
  // content = <p>contnt</p>;
  return content;
};

export default BrandMenu;
