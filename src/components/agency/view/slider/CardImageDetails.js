import React from 'react';

const CardImageDetails = ({ property }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="215.424"
      height="24"
      viewBox="0 0 215.424 24"
      style={{
        marginBottom: 20,
        marginLeft: 20,
        zIndex: 10,
      }}
    >
      <g id="Group_5623" data-name="Group 5623" transform="translate(0 1.021)">
        <text
          id="_4"
          data-name="4"
          transform="translate(143.921 17.979)"
          fill="#fff"
          fontSize="18"
          fontFamily="HelveticaNeueLTStd-Bd, Helvetica Neue LT Std !important"
        >
          <tspan x="0" y="0">
            {property?.bedrooms}
          </tspan>
        </text>
        <text
          id="_1_Kanal"
          data-name="1 Kanal"
          transform="translate(22.678 17.979)"
          fill="#fff"
          fontSize="18"
          fontFamily="HelveticaNeueLTStd-Bd, Helvetica Neue LT Std !important"
        >
          <tspan x="0" y="0">
            {parseInt(property?.size) + ' '}
            {property?.unit === 'Square Feet' ? 'Sq ft' : property?.unit}
          </tspan>
        </text>
        <g id="area" transform="translate(0 3.86)">
          <path
            id="Shape"
            d="M16.019,16.44H13.49a.422.422,0,0,1-.422-.422v-.843h-9.7v.843a.422.422,0,0,1-.422.422H.422A.422.422,0,0,1,0,16.019V13.489a.422.422,0,0,1,.422-.422h.843v-9.7H.422A.422.422,0,0,1,0,2.951V.422A.422.422,0,0,1,.422,0H2.951a.422.422,0,0,1,.422.422v.843h9.7V.422A.422.422,0,0,1,13.49,0h2.529a.422.422,0,0,1,.422.422V2.951a.422.422,0,0,1-.422.422h-.843v9.7h.843a.422.422,0,0,1,.422.422v2.529A.422.422,0,0,1,16.019,16.44ZM2.951,13.068a.422.422,0,0,1,.422.422v.843h9.7v-.843a.422.422,0,0,1,.422-.422h.843v-9.7H13.49a.422.422,0,0,1-.422-.422V2.107h-9.7v.843a.422.422,0,0,1-.422.422H2.108v9.7Z"
            transform="translate(0 0)"
            fill="#fff"
          />
        </g>
        <text
          id="_2"
          data-name="2"
          transform="translate(205.424 17.979)"
          fill="#fff"
          fontSize="18"
          fontFamily="HelveticaNeueLTStd-Bd, Helvetica Neue LT Std !important"
        >
          <tspan x="0" y="0">
            {property?.bathrooms}
          </tspan>
        </text>
        <g id="batch" transform="translate(175.893)">
          <path
            id="Path"
            d="M965.151,699.6h-.539v-8.5A2.883,2.883,0,0,0,962,688h-.979a.36.36,0,0,0-.326.387v1.972a1.883,1.883,0,0,0-1.306,1.894.36.36,0,0,0,.326.386h2.611a.36.36,0,0,0,.326-.386,1.883,1.883,0,0,0-1.305-1.894v-1.585H962a2.162,2.162,0,0,1,1.958,2.319v8.5H946.449a.486.486,0,0,0-.441.522v.5a.486.486,0,0,0,.441.522h18.7a.487.487,0,0,0,.441-.522v-.5A.487.487,0,0,0,965.151,699.6Z"
            transform="translate(-946.008 -688)"
            fill="#fff"
          />
          <path
            id="Path-2"
            data-name="Path"
            d="M965.1,711.953H948.194a.183.183,0,0,0-.163.2s0,.005,0,.008c.125,2.752,1.112,5.6,2.556,6.479a1.784,1.784,0,0,0,.06,2.186,1.129,1.129,0,0,0,1.807-.072,1.8,1.8,0,0,0,.17-1.839h8.037a1.783,1.783,0,0,0-.112,1.253,1.242,1.242,0,0,0,1.619.972,1.718,1.718,0,0,0,.528-2.519c1.454-.877,2.441-3.727,2.557-6.479A.183.183,0,0,0,965.1,711.953Z"
            transform="translate(-946.855 -701.649)"
            fill="#fff"
          />
        </g>
        <g id="bed" transform="translate(113.553 4.305)">
          <path
            id="Shape-2"
            data-name="Shape"
            d="M19.167,10.386H0L2.118,7.032V.862L2.98,0H16.186l.862.862V7.032l2.118,3.353Zm-9.584-5a23.1,23.1,0,0,1,5.74.642v-4.3H3.843v4.3A23.106,23.106,0,0,1,9.584,5.387Z"
            transform="translate(0.039 0)"
            fill="#fff"
          />
          <path
            id="Path-3"
            data-name="Path"
            d="M823,715.707v1.724h2.009v2.375h1.725v-2.375H838.51v2.375h1.725v-2.375h2.009v-1.724Z"
            transform="translate(-823 -704.26)"
            fill="#fff"
          />
          <path
            id="Path-4"
            data-name="Path"
            d="M842.659,697.533s-5.328-2.084-6.4-2.084-1.933.484-1.933,1.08v1.508a16.229,16.229,0,0,1,1.924-.361C836.959,697.608,842.659,697.533,842.659,697.533Z"
            transform="translate(-829.273 -693.043)"
            fill="#fff"
          />
          <path
            id="Path-5"
            data-name="Path"
            d="M844.458,698.036v-1.508c0-.6-.866-1.08-1.933-1.08s-6.4,2.084-6.4,2.084,5.7.075,6.405.142A16.229,16.229,0,0,1,844.458,698.036Z"
            transform="translate(-830.27 -693.043)"
            fill="#fff"
          />
        </g>
      </g>
    </svg>
    // </div>
  );
};

export default CardImageDetails;
