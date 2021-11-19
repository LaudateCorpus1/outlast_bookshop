import { useEffect, useState } from "react";
import { Box, CircularProgress, Divider, IconButton, Paper, Typography } from "@material-ui/core";
import { getIndividualBook } from "./api";
import { useParams, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/styles"
import { ArrowBack, Book, Person, Subject, Translate } from "@material-ui/icons";
import Dashboard from "..";
import NotificationSnackbar from "../../common/snackbar";

const useStyles = makeStyles(() => ({
  icon: { fontSize: 20 },
  secondaryHeading: { fontWeight: 600 }
}))

const BookDetail = () => {
  const classes = useStyles()
  const history = useHistory()
  const { bookId }: { bookId: string } = useParams();
  const [book, setBook] = useState<any>({});
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  useEffect(() => {
    let hasUnMounted = false;
    getIndividualBook(hasUnMounted, bookId, setBook, setSnackbar);

    return () => {
      hasUnMounted = true;
    };
  }, [bookId]);

  const closeSnackbar = () => setSnackbar({ ...snackbar, open: false, message: '' })

  const tabularData = (state: any, columns: string[], fields: string[]) => (
    Array.isArray(state) && state.length > 0 ? (
      <>
        <Box pb={1} display="flex" alignItems="center">
          {columns.map(item => <Box flex={1}><Typography className={classes.secondaryHeading} variant="body2">{item}</Typography></Box>)}
        </Box>
        {state.map((item: any, idx: number) => (
          <Box key={idx} display="flex" alignItems="center">
            {fields.map((field: string) => <Box key={item} flex={1}><Typography variant="body2">{item[field] ?? "NA"}</Typography></Box>)}
          </Box>
        ))}
      </>
    ) : (
      "NA"
    )
  )

  const bookDetails = [
    { icon: <Subject className={classes.icon} />, heading: "Subjects", data: (Array.isArray(book.subjects) && book.subjects.length) ? book.subjects.join(' , ') : "NA" },
    { icon: <Book className={classes.icon} />, heading: "Book Shelves", data: (Array.isArray(book.bookshelves) && book.bookshelves.length) ? book.bookshelves.join(' , ') : "NA" },
    { icon: <Person className={classes.icon} />, heading: "Authors", data: tabularData(book.authors, ["Name", "Birth Year", "Death Year"], ["name", "birth_year", "death_year"]) },
    { icon: <Translate className={classes.icon} />, heading: "Translators", data: tabularData(book.translators, ["Name", "Birth Year", "Death Year"], ["name", "birth_year", "death_year"]) },
  ]

  const body = () => (
    <>
      {book.title ?
        <Box m={3}>
          <Paper elevation={3}>
            <Box p={3}>
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box flex={3} display="flex" alignItems="center">
                  <Box mr={1}><IconButton onClick={() => history.goBack()}><ArrowBack className={classes.icon} /></IconButton></Box>
                  <Typography variant="h6">{book?.title}</Typography>
                </Box>
                <Box flex={1} textAlign="right">
                  <Typography variant="body2">Downloads : {book?.download_count ?? "NA"}</Typography>
                  <Typography variant="body2">Language : {Array.isArray(book?.languages) ? book?.languages.join(', ').toUpperCase() : "NA"}</Typography>
                  <Typography variant="body2">Copyright : {book?.copyright ? "True" : "False"}</Typography>
                </Box>
              </Box>
              <Box py={3}><Divider orientation="horizontal" /></Box>
              {bookDetails.map((item: any) => (
                <>
                  <Box pt={4} display="flex" alignItems="center">
                    {item.icon}
                    <Box pl={1}><Typography variant="h6">{item.heading}</Typography></Box>
                  </Box>
                  <Box pl={5}>{item.data}</Box>
                </>
              ))}
            </Box>
          </Paper>
        </Box>
        :
        <Box textAlign="center"><CircularProgress /></Box>
      }
      {snackbar.open && <NotificationSnackbar open={snackbar.open} close={closeSnackbar} message={snackbar.message} />}
    </>
  );

  return <Dashboard body={body()} />;
};

export default BookDetail;
