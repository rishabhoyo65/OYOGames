import React from "react";
import { render } from "react-dom";
import Carousel from "./index";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import slider from "./index";

const App = () => (
  <div>
    <Carousel />
  </div>
);

render(<App />, document.getElementById("root"));
export default slider;
