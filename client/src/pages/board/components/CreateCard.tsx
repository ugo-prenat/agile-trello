import { useState } from "react";
import { IoClose, IoAddSharp } from "react-icons/io5";

type Props = {
  createCard: (title: string) => void
}

export default function CreateCard({ createCard }: Props) {
  const [cardTitle, setCardTitle] = useState<string>('')
  const [showCardCreate, setShowCardCreate] = useState<boolean>(false)
  
  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()

    createCard(cardTitle)
    setCardTitle('')
    setShowCardCreate(false)
  }
  
  return (
    <div className="add-btn">
      {
        showCardCreate ?
          <form onSubmit={handleCreate}>
            <input
              type='text'
              placeholder='Nom de la tâche'
              value={cardTitle}
              onChange={e => setCardTitle(e.target.value)}
              required
              autoFocus
            />
            <button type="button" onClick={() => {setShowCardCreate(false);setCardTitle('')}}><IoClose /></button>
          </form>
        :
          <span onClick={() => setShowCardCreate(true)}><IoAddSharp /></span>
      }
    </div>
  )
}