import React from "react";
import { Link } from "react-router-dom";

function BrandMenu({ brands }) {
  const content = (
    <div className="brand-menu">
      <div className="brands-list">
        <h4 className="mb-0">SHOP BY BRAND</h4>
        <hr />
        <Link
          to={"/brands"}
          className="redirect-link"
          role="menuitem"
          // onClick={handleMenuItemClick}
        >
          See all
        </Link>
        <div className="d-flex align-items-center justify-content-between">
          <div className="brand-block">
            {brands.map((brand, i) => (
              <div className="brand-item">
                <Link key={`${brand}+${i}`} className="brand-link">
                  {brand}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
  return content;
}

export default BrandMenu;
