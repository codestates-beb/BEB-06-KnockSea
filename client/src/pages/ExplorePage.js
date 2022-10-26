import React, { useState, useEffect } from "react";
import axios from "axios";

const ExporePage = () => {
  const [NFTs, setNFTs] = React.useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/nftlist").then((response) => {
      console.log(response.data.tokenlist);
      setNFTs(response.data.tokenlist);
    });
  }, []);

  return (
    <React.Fragment>
      <h1>Explore NFTs</h1>
      {NFTs.map(function (NFTdata, index) {
        return (
          <div className="profile-itemCard">
            <div>{NFTdata.name}</div>
            <img className="NFT-img" src={NFTdata.imageUrl} />
          </div>
        );
      })}
    </React.Fragment>
  );
};

export default ExporePage;
