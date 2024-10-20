import React from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip';

interface ITooltipProps {
  anchorId: string
  children?: React.ReactNode
}

export const Tooltip: React.FC<ITooltipProps> = ({ anchorId, children }) => {
  return (
    <ReactTooltip
      anchorSelect={`#${anchorId}`}
      clickable
      style={{
        backgroundColor: '#fff',
        color: '#000',
        borderRadius: '9999px',
        padding: '0.375rem 0.625rem',
      }}
    >
      {children}
    </ReactTooltip>
  );
};
