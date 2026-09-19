import React, { useState } from "react";
import Modal from "./Modal";

const PropertyImg = ({ images }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const imageList = Array.isArray(images)
    ? images.map((img) => (typeof img === "string" ? { url: img } : img))
    : [];

  if (imageList.length === 0) {
    return null;
  }

  const handleShowAllPhotos = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const mainImage = imageList[0]?.url;
  const gridImages = imageList.slice(1, 4);
  const fifthImage = imageList[4]?.url || imageList[imageList.length - 1]?.url || mainImage;

  return (
    <>
      <div className="property-img-container">
        <div className="img-item">
          <img
            src={mainImage}
            className="images"
            style={{
              borderTopLeftRadius: "10px",
              borderBottomLeftRadius: "10px",
            }}
            alt="property-1"
          />
        </div>

        {gridImages.map((image, index) => (
          <div key={index}>
            <img
              className="images"
              src={image.url}
              alt={`property-${index + 2}`}
            />
          </div>
        ))}
        <div>
          <img
            className="images"
            src={fifthImage}
            alt={`property-5`}
            style={{ borderBottomRightRadius: "10px" }}
          />
          {imageList.length > 1 && (
            <button className="similar-photos" onClick={handleShowAllPhotos}>
              <span className="material-symbols-outlined">photo_library</span>
            </button>
          )}
        </div>
      </div>

      <div className="similar-photos-container"></div>
      {isModalOpen && <Modal images={imageList} onClose={handleCloseModal} />}
    </>
  );
};

export default PropertyImg;
