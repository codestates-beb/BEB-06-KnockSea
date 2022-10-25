import React, { useState, useRef, useMemo } from "react";
import "../assets/MintingPage.css";
import BlankImage from "../assets/img/uploadImage.png";
import axios from "axios";
import { minting, getContract } from "../models/index";
import LoadingModal from "../components/LoadingModal";
import getMetaMask from "../models/getWallet";

const MintingPage = () => {
  // loading spinner 구현을 위한 상태관리
  const [isLoading, setIsLoading] = useState(false);

  //이미지 파일 넘기기 formdata
  const [image, setImage] = useState({});

  //input 값 상태관리
  const [metadata, setMetadata] = useState({
    name: "",
    desc: "",
  });

  const account = localStorage.getItem("userId");

  // const { name, desc, src } = metadata;

  const onChange = (e) => {
    const { name, value } = e.target;
    setMetadata({
      ...metadata,
      [name]: value,
    });
  };

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

      const account = await getMetaMask();
      const nftContract = getContract();
      const newNftTokenURI = await minting(account, nftContract);

      if (newNftTokenURI) {
        try {
          let formData = new FormData();
          formData.append("file", image);
          formData.append("name", metadata.name);
          formData.append("desc", metadata.desc);
          formData.append("account", account);

          for (let key of formData.keys()) {
            console.log(key);
          }
          for (let value of formData.values()) {
            console.log(value);
          }

          //❗❗여기서 formData처리와 axios 처리를 해야함

          axios
            .post(
              "http://localhost:5000/users/minting",

              formData,

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
          alert("..드디어 성공인가?");
        } catch (e) {
          console.error();
        }
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
