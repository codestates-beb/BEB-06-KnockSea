const getMetaMask = async () => {
  if (typeof window.ethereum !== "undefined") {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      //console.log(accounts);
      return accounts[0];
    } catch (error) {
      return false;
    }
  }
  return false;
};

export default getMetaMask;
