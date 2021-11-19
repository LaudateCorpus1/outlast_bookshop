import { makeStyles } from "@material-ui/styles"
import { AppBar, Toolbar, Typography } from "@material-ui/core"
import pallet from "../../../common/colors"

const useStyles = makeStyles((theme) => ({
  topbar: { backgroundColor: pallet.primary, color: pallet.white },
  heading: { color: pallet.white }
}))

const Topbar = () => {
  const classes = useStyles()

  return (
    <AppBar className={classes.topbar}>
      <Toolbar>
        <Typography variant="h6" className={classes.heading}>Outlast Bookshop</Typography>
      </Toolbar>
    </AppBar >
  )
}

export default Topbar
