import { iBooks } from "./interface"
import axios from "axios"

export const getBooks = (
  hasUnMounted: Boolean,
  page: number,
  setBooks: React.Dispatch<React.SetStateAction<iBooks[]>>,
  setSnackbar: React.Dispatch<React.SetStateAction<{ open: boolean, message: string }>>
) => {
  axios.get(`${process.env.REACT_APP_BASE_URL}/books/?page=${page}`).then(res => {
    if (!hasUnMounted) {
      if (res.data.results) setBooks(state => ([...state, ...res.data?.results]))

      else setSnackbar({ open: true, message: "Failed to fetch books" })
    }
  }).catch(_ => {
    if (!hasUnMounted) {
      setSnackbar({ open: true, message: "Failed to fetch books" })
    }
  })
}

export const getFavorite = (
  hasUnMounted: boolean,
  setFavorites: React.Dispatch<React.SetStateAction<number[]>>,
  setSnackbar: React.Dispatch<React.SetStateAction<{ open: boolean, message: string }>>
) => {
  axios.get(`${process.env.REACT_APP_SERVER_URL}/favorite`).then(res => {
    if (!hasUnMounted) {
      if (res.data.success) {
        setFavorites(res.data.favorites)
      }
      else setSnackbar({ open: true, message: "Failed to fetch favorite" })
    }
  }).catch(_ => {
    if (!hasUnMounted) {
      setSnackbar({ open: true, message: "Failed to fetch favorite" })
    }
  })
}

export const markFavorite = (
  bookId: number,
  setFavorites: React.Dispatch<React.SetStateAction<number[]>>,
  showSnackbar: Function,
  message: string
) => {
  const body = { bookId }
  axios.post(`${process.env.REACT_APP_SERVER_URL}/favorite`, body).then(res => {
    if (res.data.success) {
      setFavorites(res.data.favorites)
      showSnackbar(message)
    }
    else showSnackbar("Failed to mark favorite")
  }).catch(_ => {
    showSnackbar("Failed to mart favorite")
  })
}