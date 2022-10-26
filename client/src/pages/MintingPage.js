import React, { useState, useRef, useMemo } from "react";
import "../assets/MintingPage.css";
import BlankImage from "../assets/img/uploadImage.png";
import axios from "axios";
import { minting, getContract, getTokenId } from "../models/index";
import LoadingModal from "../components/LoadingModal";
import getMetaMask from "../models/getWallet";
import { NFTStorage } from "nft.storage";
import APIKey from "../models/APIKey";

const MintingPage = () => {
  // loading spinner 구현을 위한 상태관리
  const [isLoading, setIsLoading] = useState(false);

  //input 값 상태관리
  const [metadata, setMetadata] = useState({
    name: "",
    desc: "",
  });

  const account = localStorage.getItem("userId");

  const onChange = (e) => {
    const { name, value } = e.target;
    setMetadata({
      ...metadata,
      [name]: value,
    });
  };

  //이미지 파일 넘기기 formdata
  const [image, setImage] = useState({});

  //img 관리
  const [imgFile, setImgFile] = useState({});
  const fileInputRef = useRef(null);

  const handleClickFileInput = (e) => {
    fileInputRef.current.click();
  };

  const uploadImage = (e) => {
    //📌이미지 미리보기를 위한 url 및 img 상태관리
    const url = URL.createObjectURL(e.target.files[0]);
    setImgFile(url);

    //📌위와 별도로 이미지 formdata로 데이터 넘겨주는 작업
    // const formData = new FormData();
    setImage(e.target.files[0]);
  };

  //이미지 미리보기 부분
  const showImage = useMemo(() => {
    if (Object.keys(imgFile).length === 0) {
      return <img className="image" src={BlankImage} width="300px" />;
    } else
      return (
        <img className="image" src={imgFile} onClick={handleClickFileInput} />
      );
  });

  const checkElement = () => {
    if (metadata && imgFile) {
      return true;
    } else return false;
  };

  //create 버튼 클릭
  const createHandler = async (e) => {
    e.preventDefault();
    if (checkElement()) {
      setIsLoading(true);

      console.log(APIKey);

      try {
        const nftStorage = {
          image: image,
          name: metadata.name,
          description: metadata.desc,
        };

        const client = new NFTStorage({ token: APIKey });
        console.log(client);
        const nftMetadata = await client.store(nftStorage);
        console.log(nftMetadata);
        const metadataUrl = `https://ipfs.io/ipfs/${nftMetadata.data.image.pathname}`;
        console.log(metadataUrl);
        console.log("NFT data stored!");

        const jsonData = JSON.stringify(nftMetadata.data);
        const obj = JSON.parse(jsonData);
        const replaceUrl = obj.image.replace(
          "ipfs://",
          "https://ipfs.io/ipfs/"
        );

        // const account = await getMetaMask();
        const nftContract = getContract();
        const newNftTokenURI = await minting(account, nftContract, replaceUrl);

        axios
          .post(
            "http://localhost:5000/users/minting",

            {
              account: account,
              image: replaceUrl,
              name: metadata.name,
              description: metadata.desc,
              tokenId: newNftTokenURI,
            },

            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
              withCredentials: true,
            }
          )
          .then((response) => {
            console.log(response);
          });

        setIsLoading(false);
        alert("성공!");
      } catch (e) {
        console.error();
        // }
      }
    } else {
      alert("파일 업로드 후 이름, 설명을 모두 적어주세요.");
    }
  };

  return (
    <React.Fragment>
      {isLoading && <LoadingModal />}
      <h1 className="minting-title">Create New Item</h1>
      <h2 className="minting-subtitle">NFT Image Upload</h2>
      <div>
        {showImage}
        <input
          name="src"
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={uploadImage}
        />
        <button className="button " onClick={handleClickFileInput}>
          Upload
        </button>
      </div>
      <h2 className="minting-subtitle">NFT Name</h2>
      <input
        name="name"
        type="text"
        className="input"
        onChange={onChange}
      ></input>
      <h2 className="minting-subtitle">NFT Description</h2>
      <div>
        <textarea name="desc" className="form" onChange={onChange} />
      </div>
      <button type="submit" className="button" onClick={createHandler}>
        Create
      </button>
    </React.Fragment>
  );
};

export default MintingPage;
