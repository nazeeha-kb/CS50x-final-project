import { useLottie, useLottieInteractivity } from "lottie-react";
import Confetti from "../assets/lotties/confetti.json";
import React from "react";

const Lottie = ({ className }) => {
  const options = {
    // passing in the animation we want to use
    animationData: Confetti,
    autoplay: true,
  };
  const { View } = useLottie(options); //passing in the options and style object.

  return <div className={`${className}`}>{View}</div>;
};

export default Lottie;
