import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import "../assets/Nav.css";

function Nav() {
  const [account, setAccount] = useState("");
  const onClickConnect = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        setAccount(accounts[0]);
        console.log(accounts);
      } else {
        alert("Install Metamask!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onClickDisConnect = () => {
    setAccount(account === "");
  };

  return (
    <div className="wrapper">
      <Link to="/">
        <div className="logoContainer">
          <img
            src="https://gateway.pinata.cloud/ipfs/QmeYuyNj6JwtNspPTqabkS3MBi7zDe6dAob957b61X5XJn"
            width="40"
            height="40"
            alt=""
          />
          <div className="logoText">KnockSea</div>
        </div>
      </Link>
      <div className="searchBar">
        <div className="searchIcon">
          <AiOutlineSearch />
        </div>
        <input
          className="searchInput"
          placeholder="Search items, collections, and accounts"
        />
      </div>
      <div className="headerItems">
        <Link to="/explore">
          <div className="headerItem">Explore</div>
        </Link>

        <div>
          <a className="headerItem" href="https://opensea.io/rankings">
            Stats
          </a>
        </div>

        <div>
          <a className="headerItem" href="https://support.opensea.io/hc/en-us">
            Resources
          </a>
        </div>

        <Link to="/create">
          <div className="headerItem">Create</div>
        </Link>

        <Link to="/profile">
          <div className="headerItem">Profile</div>
        </Link>

        <div>
          {account ? (
            <div>
              <button
                className="disconnectedButton"
                onClick={onClickDisConnect}
              >
                Disconnect Wallet
              </button>
            </div>
          ) : (
            <div>
              <button className="connectedButton" onClick={onClickConnect}>
                Connect Wallet
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Nav;