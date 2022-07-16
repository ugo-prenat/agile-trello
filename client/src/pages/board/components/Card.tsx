import { TbTrash } from "react-icons/tb"
import { FiEdit2 } from "react-icons/fi"

import { Card as CardModel } from '../../../model'
import { useState } from "react"
import CardDetail from "./CardDetail"

type Props = {
  card: CardModel
  deleteCard: (card: CardModel) => void
}

export default function Card({ card, deleteCard }: Props) {
  const [showBtns, setShowBtns] = useState<boolean>(false)
  const [showCardDetail, setShowCardDetail] = useState<boolean>(false)
  
  
  return (
    <>
    <div
      className='card'
      onMouseEnter={() => setShowBtns(true)}
      onMouseLeave={() => setShowBtns(false)}
    >
      <div className='title-wrapper' onClick={() => setShowCardDetail(true)}>
        <p className='card-title'>{card.title}</p>
      </div>
      { showBtns &&
        <div className="btns">
          <span onClick={() => deleteCard(card)}><TbTrash /></span>
          <span><FiEdit2 /></span>
        </div>
      }
    </div>
    
    { showCardDetail && <CardDetail card={card} hideDetail={setShowCardDetail} /> }
    </>
    
  )
}