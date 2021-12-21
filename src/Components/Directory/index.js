import React from "react";
import shopmen from "../../assests/men_shop.jpg";
import shopwomen from "../../assests/women_shop.jpg";
import "./styles.scss";

const Directory = (props) => {
  return (
    <div className="directory">
      <div className="warp">
        <div className="item" style={{ backgroundImage: `url(${shopwomen})` }}>
          <a className="shopbutton">Women Shop</a>
        </div>
        <div className="item" style={{ backgroundImage: `url(${shopmen})` }}>
          <a className="shopbutton">Men Shop</a>
        </div>
      </div>
    </div>
  );
};

export default Directory;
