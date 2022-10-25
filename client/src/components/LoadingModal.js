import LoadingSpinner from "../util/LoadingSpinner";
import Modal from "../util/Modal";
import "../assets/MintingPage.css";

const LoadingModal = () => {
  return (
    <Modal>
      <div>
        <h3 className="upload-img">is loading...</h3>
        <div className="upload-img">
          <LoadingSpinner />
        </div>
      </div>
    </Modal>
  );
};

export default LoadingModal;
