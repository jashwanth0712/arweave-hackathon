import React, { useEffect } from "react";
import { useLottie } from "lottie-react";
import { useNavigate } from "react-router-dom"; // Import useHistory
import groovyWalkAnimation from "../assets/lottie/animation_lkzu0g6f.json";

const UncontrolledLottie = () => {
  const navigate = useNavigate();

  const options = {
    animationData: groovyWalkAnimation,
    loop: true,
  };

  const { View, play } = useLottie(options);

  useEffect(() => {
    // Start playing the animation
    play();

    // Set a timer to redirect after 3 seconds
    const redirectTimer = setTimeout(() => {
      navigate(-1)
    }, 3000);

    // Clear the timer when the component unmounts
    return () => clearTimeout(redirectTimer);
  }, [navigate, play]);

  return <>{View}</>;
};

export default UncontrolledLottie;
