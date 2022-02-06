import React from 'react'
import CoverPage from '../cover-page'
import Travolta from './confusedtravolta.jpeg'

const NotFound = () => {
  return <CoverPage
    title='Error 404'
    subtitle='Page not found'
    image={Travolta}
  
  />
}

export default NotFound