import React from 'react'
import { IoClose } from 'react-icons/io5'
import { Card } from '../../../model'


type Props = {
  card: Card
  showDetail: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CardDetail({ card, showDetail }: Props) {
  return (
    <div className="card-detail-wrapper">
      
      <div className="card-detail">
        <span onClick={() => showDetail(false)} className="close-btn"><IoClose /></span>
        <div className='data'>
          <p>{card.title}</p>
        </div>
      </div>
    </div>
  )
}