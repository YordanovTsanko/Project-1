import React from "react";
import AliceCarousel from "react-alice-carousel";
import BannerData from "../../Assets/HomePageBanner";
import "react-alice-carousel/lib/alice-carousel.css";
import "./Carousel.css";

const Carousel = () => {
  const responsive = {
    0: { items: 1 },
  };

  const items = BannerData.map((item) => (
    <div className="carousel-item" key={item.name}>
      <img
        src={item.img}
        loading="lazy"
        alt={item.name}
        className="carousel-image"
      />
    </div>
  ));
  
  const renderPrevButton = ({ isDisabled }) => {
    return (
      <button className="carousel-button prev-button" disabled={isDisabled}>
        &lt;
      </button>
    );
  };

  const renderNextButton = ({ isDisabled }) => {
    return (
      <button className="carousel-button next-button" disabled={isDisabled}>
        &gt;
      </button>
    );
  };
  
  return (
    <AliceCarousel
      animationType="fadeout"
      animationDuration={800}
      infinite
      items={items}
      touchTracking
      mouseTracking
      disableDotsControls
      autoPlay
      autoPlayInterval={2500}
      responsive={responsive}
      renderPrevButton={renderPrevButton}
      renderNextButton={renderNextButton}
    />
  );
};

export default Carousel;
