import { makeStyles } from "@material-ui/styles"
import { Box } from "@material-ui/core"
import Topbar from "./template/topbar"

const useStyles = makeStyles((theme) => ({
  content: { paddingTop: 90, paddingBottom: 40 },
}))

const Dashboard = (props: any) => {
  const classes = useStyles()

  return (
    <>
      <Topbar />
      <Box className={classes.content}>
        {props.body}
      </Box>
    </>
  )
}

export default Dashboard
