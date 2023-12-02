import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <div className="">
      <Image
        width={400}
        height={400}
        src="/Launch.png"
        alt="Launch"
        className="  object-contain"
      />
    </div>
  );
};

export default Hero;
