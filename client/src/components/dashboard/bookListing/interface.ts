export interface iBooks {
  id: number
  title: string
  media_type: string
  download_count: number
  copyright: boolean
  languages: string[]
  bookshelves: string[]
  subjects: string[]
  authors: {
    name: string,
    death_year: number
    birth_year: number
  }
  translators: {
    name: string,
    death_year: number
    birth_year: number
  }
}