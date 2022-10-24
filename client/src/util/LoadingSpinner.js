import { Bars } from "react-loader-spinner";

const LoadingSpinner = () => {
  return (
    <Bars
      height="80"
      width="80"
      color="#0b4475"
      ariaLabel="bars-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
    />
  );
};

export default LoadingSpinner;
