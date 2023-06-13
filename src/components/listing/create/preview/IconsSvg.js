import React from 'react';

const IconsSvg = ({ data }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="231.627"
      height="21.873"
      viewBox="0 0 231.627 21.873"
      style={{ marginTop: 10 }}
    >
      <g id="Group_5633" data-name="Group 5633" transform="translate(0 1.09)">
        <g id="Group_6081" data-name="Group 6081">
          <text
            id="_1_Kanal"
            data-name="1 Kanal"
            transform="translate(23.217 16.002)"
            fontSize="16"
            fontFamily="HelveticaNeueLTStd-Bd, Helvetica Neue LT Std !important"
          >
            <tspan x="0" y="0">
              {`${data?.size?.substring(0, 3) || 0} ${data?.unit || 'Kanal'}`}
            </tspan>
          </text>
          <g id="area" transform="translate(0 3.952)">
            <path
              id="Shape"
              d="M16.4,16.831H13.81a.432.432,0,0,1-.432-.432v-.863H3.453V16.4a.432.432,0,0,1-.432.432H.432A.432.432,0,0,1,0,16.4V13.81a.432.432,0,0,1,.432-.432h.863V3.452H.432A.432.432,0,0,1,0,3.021V.432A.432.432,0,0,1,.432,0H3.021a.432.432,0,0,1,.432.432v.863h9.926V.432A.432.432,0,0,1,13.81,0H16.4a.432.432,0,0,1,.432.432V3.021a.432.432,0,0,1-.432.432h-.863v9.926H16.4a.432.432,0,0,1,.432.432V16.4A.432.432,0,0,1,16.4,16.831ZM3.021,13.378a.432.432,0,0,1,.432.432v.863h9.926V13.81a.432.432,0,0,1,.432-.432h.863V3.452H13.81a.432.432,0,0,1-.432-.432V2.157H3.453v.863a.432.432,0,0,1-.432.432H2.158v9.926Z"
              transform="translate(0 0)"
            />
          </g>
        </g>
        <text
          id="_2"
          data-name="2"
          transform="translate(222.627 15.91)"
          fontSize="16"
          fontFamily="HelveticaNeueLTStd-Bd, Helvetica Neue LT Std !important"
        >
          <tspan x="0" y="0">
            {data?.bathrooms || 0}
          </tspan>
        </text>
        <g id="batch" transform="translate(192.693)">
          <path
            id="Path"
            d="M965.606,699.873h-.551v-8.707A2.951,2.951,0,0,0,962.381,688h-1a.369.369,0,0,0-.334.4v2.018a1.928,1.928,0,0,0-1.337,1.939.369.369,0,0,0,.334.4h2.673a.369.369,0,0,0,.334-.4,1.927,1.927,0,0,0-1.336-1.939v-1.623h.668a2.213,2.213,0,0,1,2.005,2.374v8.707H946.459a.5.5,0,0,0-.451.534v.514a.5.5,0,0,0,.451.534h19.147a.5.5,0,0,0,.451-.534v-.514A.5.5,0,0,0,965.606,699.873Z"
            transform="translate(-946.008 -688)"
          />
          <path
            id="Path-2"
            data-name="Path"
            d="M965.5,711.953H948.2a.187.187,0,0,0-.167.2s0,.005,0,.008c.128,2.818,1.138,5.734,2.617,6.633a1.826,1.826,0,0,0,.061,2.238,1.156,1.156,0,0,0,1.85-.073,1.845,1.845,0,0,0,.174-1.883h8.228a1.826,1.826,0,0,0-.115,1.282,1.272,1.272,0,0,0,1.658,1,1.759,1.759,0,0,0,.541-2.579c1.489-.9,2.5-3.815,2.617-6.633A.187.187,0,0,0,965.5,711.953Z"
            transform="translate(-946.828 -701.404)"
          />
        </g>
        <g id="Group_6082" data-name="Group 6082">
          <text
            id="_4"
            data-name="4"
            transform="translate(147.34 16.002)"
            fontSize="16"
            fontFamily="HelveticaNeueLTStd-Bd, Helvetica Neue LT Std !important"
          >
            <tspan x="0" y="0">
              {data?.bedrooms || 0}
            </tspan>
          </text>
          <g id="bed" transform="translate(116.25 4.407)">
            <path
              id="Shape-2"
              data-name="Shape"
              d="M19.622,10.632H0L2.169,7.2V.883L3.051,0h13.52l.883.883V7.2l2.168,3.433ZM9.811,5.515a23.645,23.645,0,0,1,5.877.657V1.766H3.934V6.173A23.655,23.655,0,0,1,9.811,5.515Z"
              transform="translate(0.04 0)"
            />
            <path
              id="Path-3"
              data-name="Path"
              d="M823,715.707v1.766h2.057V719.9h1.766v-2.431h12.056V719.9h1.766v-2.431H842.7v-1.766Z"
              transform="translate(-823 -703.988)"
            />
            <path
              id="Path-4"
              data-name="Path"
              d="M842.857,697.583s-5.455-2.134-6.548-2.134-1.979.495-1.979,1.105V698.1a16.6,16.6,0,0,1,1.97-.37C837.022,697.66,842.857,697.583,842.857,697.583Z"
              transform="translate(-829.153 -692.986)"
            />
            <path
              id="Path-5"
              data-name="Path"
              d="M844.656,698.1v-1.544c0-.61-.886-1.105-1.979-1.105s-6.548,2.134-6.548,2.134,5.835.077,6.557.146A16.606,16.606,0,0,1,844.656,698.1Z"
              transform="translate(-830.131 -692.986)"
            />
          </g>
        </g>
      </g>
    </svg>
  );
};

export default IconsSvg;
