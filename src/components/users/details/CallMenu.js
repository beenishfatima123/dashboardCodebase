import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { makeStyles } from '@mui/styles';
import { ReactComponent as Whatsapp } from '../../../assets/icons/whatsapp.svg';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));
const CallMenu = ({ anchorEl, setAnchorEl, phone }) => {
  const classes = useStyles();
  const open = Boolean(anchorEl);
  const handleCall = () => {
    if (phone) {
      window.open(`tel:${phone}`);
      setAnchorEl(null);
    }
  };
  return (
    <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
      <MenuItem onClick={handleCall}>
        <div className={classes.container}>
          <Whatsapp />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="141"
            height="39.829"
            viewBox="0 0 141 39.829"
          >
            <g
              id="Group_6081"
              data-name="Group 6081"
              transform="translate(-76.372 -11.336)"
            >
              <text
                id="Call_with_Agent"
                data-name="Call with Agent"
                transform="translate(117.372 24.336)"
                fill="#6b7b88"
                fontSize="12"
                fontFamily="HelveticaNeueLTStd-Bd, Helvetica Neue LT Std !important"
              >
                <tspan x="-40.148" y="0">
                  Call with Agent
                </tspan>
              </text>
              <text
                id="_92_323_5430229"
                data-name="+92 323 5430229"
                transform="translate(147.372 46.165)"
                fill="#134696"
                fontSize="18"
                fontFamily="HelveticaNeueLTStd-Bd, Helvetica Neue LT Std !important"
              >
                <tspan x="-69.306" y="0">
                  {phone || 'NAN'}
                </tspan>
              </text>
            </g>
          </svg>
        </div>
      </MenuItem>
    </Menu>
  );
};

export default CallMenu;
