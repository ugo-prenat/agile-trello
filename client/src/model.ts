export interface Card {
  id: number
  title: string
  column: number
}
export interface Column {
  id: number
  title: string
  board: number
  cards: Card[]
}
export interface Board {
  id: number
  title: string
  columns: Column[]
}