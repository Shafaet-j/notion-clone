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
        className="  object-contain dark:hidden"
      />
      <Image
        width={400}
        height={400}
        src="/Launch2.png"
        alt="Launch"
        className="  object-contain hidden dark:block"
      />
    </div>
  );
};

export default Hero;
