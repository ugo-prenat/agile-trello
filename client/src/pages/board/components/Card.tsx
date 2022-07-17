import { TbTrash } from "react-icons/tb"
import { FiEdit2 } from "react-icons/fi"

import { Card as CardModel } from '../../../model'
import { useState } from "react"
import CardDetail from "./CardDetail"
import { IoClose } from "react-icons/io5"

import TextareaAutosize from 'react-textarea-autosize';

type Props = {
  card: CardModel
  deleteCard: (card: CardModel) => void
  updateCard: (card: CardModel) => void
}

export default function Card({ card, deleteCard, updateCard }: Props) {
  const [showBtns, setShowBtns] = useState<boolean>(false)
  const [showCardDetail, setShowCardDetail] = useState<boolean>(false)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [titleUpdate, setTitleUpdate] = useState<string>(card.title)
  
  const handleEdit = (e: React.KeyboardEvent) => {
    if (e.key !== 'Enter') return
    if (titleUpdate.trim() === "") {
      setIsEdit(false)
      setTitleUpdate(card.title)
      return
    }
    
    const newCard:CardModel = {
      ...card,
      title: titleUpdate
    }
    updateCard(newCard)
    setIsEdit(false)
  }
    
  
  return (
    <>
      <div
        className='card'
        onMouseEnter={() => setShowBtns(true)}
        onMouseLeave={() => setShowBtns(false)}
      >
        { isEdit ?
          <form>
            <TextareaAutosize
              placeholder='Nom de la tâche'
              value={titleUpdate}
              onChange={e => setTitleUpdate(e.target.value)}
              onKeyDown={e => handleEdit(e)}
              autoFocus
            />
            <button type="button" onClick={() => {setIsEdit(false);setTitleUpdate(card.title)}}><IoClose /></button>
          </form>
          :
          <>
          <div className='title-wrapper' onClick={() => setShowCardDetail(true)}>
            <p className='card-title'>{titleUpdate}</p>
          </div>
          { showBtns &&
            <div className="btns">
              <span onClick={() => deleteCard(card)}><TbTrash /></span>
              <span onClick={() => setIsEdit(true)}><FiEdit2 /></span>
            </div>
          }
          </>
        }
      </div>
      { showCardDetail && <CardDetail card={card} hideDetail={setShowCardDetail} /> }
    </>
  )
}