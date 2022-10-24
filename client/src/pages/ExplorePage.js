import React, { useState } from "react";

const NFTdata = [
  {
    name: "KnockNFT",
    imageUrl:
      "https://cdn3d.iconscout.com/3d/free/preview/metamask-6432337-5326393@0.png?w=0&h=700&f=jpeg",
  },
  {
    name: "KnockNFT2",
    imageUrl:
      "https://cdn3d.iconscout.com/3d/free/preview/nft-5176479-4323415@0.png?w=0&h=700&f=jpeg",
  },
  {
    name: "KnockNFT3",
    imageUrl:
      "https://cdn3d.iconscout.com/3d/free/preview/cryptocurrency-art-3678195-3061790@0.png?w=0&h=700&f=jpeg",
  },
  {
    name: "KnockNFT4",
    imageUrl:
      "https://cdn3d.iconscout.com/3d/free/preview/ethereum-3443536-2879620@0.png?w=0&h=700&f=jpeg",
  },
  {
    name: "KnockNFT5",
    imageUrl:
      "https://cdn3d.iconscout.com/3d/free/preview/nft-logo-3678194-3061789@0.png?w=0&h=700&f=jpeg",
  },
  {
    name: "KnockNFT6",
    imageUrl:
      "https://cdn3d.iconscout.com/3d/free/preview/ethereum-plant-3678191-3061801@0.png?w=0&h=700&f=jpeg",
  },
  {
    name: "KnockNFT7",
    imageUrl:
      "https://cdn3d.iconscout.com/3d/free/preview/premium-quality-3078217-2560925@0.png?w=0&h=700&f=jpeg",
  },
];

const ExporePage = () => {
  const [NFTs, setNFTs] = React.useState(NFTdata);

  return (
    <React.Fragment>
      <h1>Explore NFTs</h1>
      {NFTs.map(function (NFTdata, index) {
        return (
          <div className="profile-itemCard">
            <img className="NFT-img" src={NFTdata.imageUrl} />
          </div>
        );
      })}
    </React.Fragment>
  );
};

export default ExporePage;
