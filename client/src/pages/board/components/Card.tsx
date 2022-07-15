import { Card as CardModel } from '../../../model'

type Props = {
  card: CardModel
}

export default function Card({ card }: Props) {
  return (
    <div className='card'>
      <p>{card.title}</p>
    </div>
  )
}