import { FC } from 'react'
import { TProps, TStatus } from './types'
import { StatusWrapper } from './styled-components'

const Status: FC<TProps> = ({
  status,
  className
}) => {
  const renderTitle = (status: TStatus): string => {
    switch (status) {
      case 'active':
        return 'Active'
      default: 
        return 'Active'
    }
  }
  return <StatusWrapper status={status} className={className}>
    {renderTitle(status)}
  </StatusWrapper>
}

export default Status