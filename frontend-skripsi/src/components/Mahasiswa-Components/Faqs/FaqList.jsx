import React from 'react'
import { faqs } from '../../../assets/data/faqs'
import FaqItem from './FaqItem'

const FaqList = () => {
  return (
    <div className='mt-[38px]'>
      { faqs.map((item, index) => (
        <FaqItem key={index} item={item} />
      ))}
    </div>
  )
}

export default FaqList
