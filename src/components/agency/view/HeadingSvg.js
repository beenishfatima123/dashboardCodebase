import React from "react";

const HeadingSvg = ({ heading, customStyle }) => {
  const darkMode = false;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="910"
      height="82.279"
      viewBox="0 0 910 82.279"
      style={{ maxWidth: "100%", ...customStyle }}
    >
      <defs>
        <linearGradient
          id="linear-gradient"
          x1="0.037"
          y1="-0.321"
          x2="0.983"
          y2="1.201"
          gradientUnits="objectBoundingBox"
        >
          <stop
            offset="0"
            stopColor={darkMode ? "#0ed864" : "#134696"}
            stopOpacity="0"
          />
          <stop offset="0.527" stopColor={darkMode ? "#0ed864" : "#134696"} />
          <stop offset="1" stopColor={darkMode ? "#0ed864" : "#134696"} />
        </linearGradient>
      </defs>
      <g
        id="Group_6522"
        data-name="Group 6522"
        transform="translate(125.781 -885.861)"
      >
        <g
          id="Group_6143"
          data-name="Group 6143"
          transform="translate(-254.339 1022.655) rotate(180)"
        >
          <path
            id="Path_43"
            data-name="Path 43"
            d="M-89.329,82.607v6.9h-83.547A49.183,49.183,0,0,1-212.1,69.083l-11.838-16.32a49.213,49.213,0,0,0-39.216-20.429l-5.795-.053-142.874.1a51.366,51.366,0,0,0,1.151-6.873h150.918A49.265,49.265,0,0,1-220.54,45.943l11.828,16.277a49.2,49.2,0,0,0,39.247,20.418Z"
            transform="translate(-94.576 29.012)"
            fill="url(#linear-gradient)"
          />
          <path
            id="Path_44"
            data-name="Path 44"
            d="M21.872,95.093v6.863H-124.64a48.074,48.074,0,0,1-38.532-20.418L-174.8,65.249a48.074,48.074,0,0,0-38.044-20.418H-315.913a50.984,50.984,0,0,0,3.2-6.831H-209.95a48.115,48.115,0,0,1,38.5,20.418l11.616,16.288a48.129,48.129,0,0,0,38.542,20.482Z"
            transform="translate(-150.43 34.839)"
            fill="url(#linear-gradient)"
          />
        </g>
        <text
          transform="translate(111 920)"
          fill={darkMode ? "#0ed864" : "#134696"}
          fontSize="32"
          fontFamily="heavy"
        >
          <tspan x="-20" y="0">
            {heading}
          </tspan>
        </text>
      </g>
    </svg>
  );
};

export default HeadingSvg;
