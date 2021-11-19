import { useEffect, useState } from "react";
import { Box } from "@material-ui/core";
import { iBooks } from "./interface";
import { tableColumns } from "./column";
import { getBooks, markFavorite, getFavorite } from "./api";
import { Details, Favorite, FavoriteBorder } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import MuiButton from "../../common/button";
import Dashboard from "..";
import pallete from "../../common/colors";
import MuiTable from "../../common/Table";
import NotificationSnackbar from "../../common/snackbar";

const BookListing = () => {
  const history = useHistory();
  const [books, setBooks] = useState<iBooks[]>([]);
  const [page, setPage] = useState<number>(1)
  const [favorites, setFavorites] = useState<number[]>([])
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });

  useEffect(() => {
    let hasUnMounted = false;
    getBooks(hasUnMounted, page, setBooks, setSnackbar);
    getFavorite(hasUnMounted, setFavorites, setSnackbar);

    return () => {
      hasUnMounted = true;
    };
  }, [page]);

  const closeSnackbar = () => setSnackbar({ ...snackbar, open: false, message: '' })
  const showSnackbar = (message: string) => setSnackbar({ ...snackbar, open: true, message: message })

  const handleLoadMoreBooks = () => setPage(page + 1)

  const handleMarkFavorite = (id: number, isFavorite: boolean) => {
    markFavorite(id, setFavorites, showSnackbar, isFavorite ? "Marked unfavorite" : "Marked Favorite")
  }

  const body = () => (
    <Box m={3}>
      <MuiTable
        title="Books"
        columns={tableColumns}
        data={books}
        actions={[
          { icon: () => <Details />, tooltip: "Book Detail", onClick: (e: any, rowData: iBooks) => history.push(`book/${rowData.id}`) },
          (rowData: any) => ({
            icon: () => favorites.includes(rowData.id) ? <Favorite /> : <FavoriteBorder />,
            tooltip: favorites.includes(rowData.id) ? "Remove Favorite" : "Add Favorite",
            onClick: (e: any, rowData: iBooks) => handleMarkFavorite(rowData.id, favorites.includes(rowData.id))
          }),
        ]}
        options={{
          headerStyle: {
            backgroundColor: pallete.primary,
            color: pallete.white,
          },
          actionsColumnIndex: -1,
          exportButton: true,
          filtering: true,
          paging: false,
        }}
      />
      <Box mt={2} display="flex" alignItems="center" justifyContent="flex-end">
        <MuiButton className="primaryBtn" label="Load more books" variant="contained" onClick={handleLoadMoreBooks} />
      </Box>
      {snackbar.open && <NotificationSnackbar open={snackbar.open} close={closeSnackbar} message={snackbar.message} />}
    </Box>
  );

  return <Dashboard body={body()} />;
};

export default BookListing;
