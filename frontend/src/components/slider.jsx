import { useState } from "react";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@mui/icons-material";
import { sliderImages } from "../utils/demoData";

const Slider = () => {
  const [slideIndex, setSlideIndex] = useState(0);

  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
  };

  const transformSlider = {
    transform: `translateX(${slideIndex * -100}vw)`,
  };

  return (
    <div className="slider-container">
      <div className="arrow-left" onClick={() => handleClick("left")}>
        <ArrowLeftOutlined />
      </div>
      <div className="slider-items-wrapper" style={transformSlider}>
        {sliderImages.map((item, index) => (
          <div
            className="slide-item"
            key={index}
            style={{
              backgroundImage: `url(${item.img})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="info-container">
              <h1>{item.title}</h1>
              <p>{item.description}</p>
              <button>Show Now</button>
            </div>
          </div>
        ))}
      </div>
      <div className="arrow-right" onClick={() => handleClick("right")}>
        <ArrowRightOutlined />
      </div>
    </div>
  );
};

export default Slider;
