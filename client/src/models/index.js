import Web3 from "web3";
import abi from "./abi/erc721Abi";
import contractAddress from "./erc721.js";
const centralAddress = "0xba86342176699Fb0aC42A2c9361d5EEd8de099B4";

const getContract = () => {
  // console.log('http://127.0.0.1:7545')
  // const web3 = new Web3(new Web3.providers.HttpProvider(process.env.PROVIDER));
  return new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
};

const getTonkenId = async (contract) => {
  return await contract.methods.totalSupply().call();
};

const newContractMint = async (web3, address) => {
  //return await new web3.eth.Contract(abi, contractAddress, { from: address, gas: 3000000 });
  if (await pay(centralAddress, address, 0.01)) {
    return await new web3.eth.Contract(abi, contractAddress, {
      from: centralAddress,
      gas: 3000000,
    });
  } else {
    return false;
  }
};

const newContract = async (web3, address) => {
  //return await new web3.eth.Contract(abi, contractAddress, { from: address, gas: 3000000 });
  return await new web3.eth.Contract(abi, contractAddress, {
    from: centralAddress,
    gas: 3000000,
  });
};

const transferToken = async (to, from, tokenId, web3) => {
  const checkSumTo = web3.utils.toChecksumAddress(to);
  const checkSumFrom = web3.utils.toChecksumAddress(from);
  try {
    const contract = await newContract(web3, checkSumFrom);
    return contract.methods
      .transferFrom(checkSumFrom, checkSumTo, tokenId)
      .send({ from: checkSumFrom })
      .on("receipt", (receipt) => {
        if (receipt) {
          return receipt;
        }
        return false;
      });
  } catch (error) {
    console.log(error);
    return false;
  }
};
const ownerOfToken = async (tokenId, address, web3) => {
  //console.log(web3);
  const checkSumAddress = web3.utils.toChecksumAddress(address);
  try {
    const contract = await newContract(web3, checkSumAddress);
    // console.log(contract)
    return await web3.utils.toChecksumAddress(
      await contract.methods.ownerOf(tokenId).call()
    );
  } catch (error) {
    console.log(error);
    return false;
  }
};
const minting = async (address, web3) => {
  try {
    const checkSumAddress = web3.utils.toChecksumAddress(address);
    console.log(checkSumAddress);
    try {
      const contract = await newContractMint(web3, checkSumAddress);
      console.log(contract);
      const tokenId = await getTonkenId(contract);
      console.log(tokenId);
      try {
        const tokenURI = await contract.methods.tokenURI(tokenId).call();
        console.log(tokenURI);
        const newNft = await contract.methods
          .mintNFT(checkSumAddress, String(tokenURI))
          .send();
        return tokenURI;
      } catch (error) {
        console.log(error);
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
    /*
        
        */
  } catch (error) {
    console.log(error);
    return false;
  }
};

const pay = async (_to, _from, price) => {
  if (window.ethereum) {
    try {
      const sendEth = Number(Web3.utils.toWei(String(price), "ether")).toString(
        16
      );
      const params = [
        {
          from: _from,
          to: _to,
          gas: (21000).toString(16),
          gasPrice: "0x9184e72a000",
          value: sendEth,
        },
      ];
      const transactionHash = await window.ethereum.request({
        method: "eth_sendTransaction",
        params,
      });
      //console.log(transactionHash);
      let receipt = await window.ethereum.request({
        method: "eth_getTransactionReceipt",
        params: [transactionHash],
      });
      while (!receipt) {
        setTimeout(async () => {
          receipt = await window.ethereum.request({
            method: "eth_getTransactionReceipt",
            params: [transactionHash],
          });
        }, 1000);
      }
      return receipt;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
  return false;
};
export { minting, getContract, ownerOfToken, transferToken, pay };
