import * as React from 'react';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#134696',
    color: '#fff',
    boxShadow: theme.shadows[1],
    fontSize: 12,
    fontFamily: 'medium',
  },
}));

const CustomTooltip = ({ title, children }) => {
  return (
    <div>
      <LightTooltip title={title}>{children}</LightTooltip>
    </div>
  );
};

export default CustomTooltip;
