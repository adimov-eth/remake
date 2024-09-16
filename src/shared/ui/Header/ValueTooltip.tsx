import React from 'react'
import { Tooltip } from 'react-tooltip'
import { formatNumberGroup } from '@/shared/utils/formatters'

//TODO consider refactoring to telegram-ui

interface ValueTooltipProps {
  value: number
  type: 'quarks' | 'stars'
}

export const ValueTooltip: React.FC<ValueTooltipProps> = ({ value, type }) => (
  <Tooltip
    anchorSelect={`#${type}`}
    clickable
    style={{
      backgroundColor: 'black',
      color: '#fff',
      borderRadius: 50,
      padding: '6px 10px',
    }}
  >
    {type === 'quarks' ? formatNumberGroup(value) : Number(value).toFixed(2)}
  </Tooltip>
)

