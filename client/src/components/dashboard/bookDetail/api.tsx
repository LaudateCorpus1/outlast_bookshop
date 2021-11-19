import { iBooks } from "../bookListing/interface"
import axios from "axios"

export const getIndividualBook = (
  hasUnMounted: Boolean,
  bookId: string,
  setBook: React.Dispatch<React.SetStateAction<iBooks>>,
  setSnackbar: React.Dispatch<React.SetStateAction<{ open: boolean, message: string }>>
) => {
  axios.get(`${process.env.REACT_APP_BASE_URL}/books/${bookId}`).then(res => {
    if (!hasUnMounted) {
      console.log(res.data)
      if (res.data) setBook(res.data)
      else setSnackbar({ open: true, message: "Failed to fetch book" })
    }
  }).catch(_ => {
    if (!hasUnMounted) {
      setSnackbar({ open: true, message: "Failed to fetch book" })
    }
  })
}