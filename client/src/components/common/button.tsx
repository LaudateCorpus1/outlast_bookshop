import { Button } from '@material-ui/core'
import { makeStyles } from "@material-ui/styles"
import { MouseEventHandler } from 'react'
import pallete from "../common/colors"

const useStyles = makeStyles((theme: any) => ({
  primaryBtn: { background: pallete.primary, color: pallete.white, textTransform: "capitalize", '&:hover': { background: pallete.primary, color: pallete.white } },
  primaryOutlinedBtn: { borderColor: pallete.primary, textTransform: "capitalize", '&:hover': { background: pallete.primary, color: pallete.white } },
  alertBtn: { background: pallete.red, color: pallete.white, textTransform: "capitalize", '&:hover': { background: pallete.red, color: pallete.white } },
  successBtn: { background: pallete.green, color: pallete.white, textTransform: "capitalize", '&:hover': { background: pallete.green, color: pallete.white } },
  alertOutlinedBtn: { borderColor: pallete.red, textTransform: "capitalize", '&:hover': { background: pallete.red, color: pallete.white } },
  successOutlinedBtn: { borderColor: pallete.green, textTransform: "capitalize", '&:hover': { background: pallete.green, color: pallete.white } },
  otherBtn: { textTransform: "capitalize" },
}))

interface iButtonComponentProps {
  className: "primaryBtn" | "alertBtn" | "successBtn" | 'alertOutlinedBtn' | "primaryOutlinedBtn" | "successOutlinedBtn" | "otherBtn"
  variant?: 'contained' | 'outlined' | 'text'
  size?: "small" | "medium" | "large" | undefined
  fullWidth?: boolean | undefined
  type?: "submit" | undefined
  startIcon?: any
  endIcon?: any
  label: string
  onClick?: MouseEventHandler
}

const MuiButton = (props: iButtonComponentProps) => {
  const classes = useStyles()
  return (
    <Button
      className={`${classes[props?.className]}`}
      variant={props?.variant}
      fullWidth={props?.fullWidth}
      size={props?.size}
      startIcon={props?.startIcon}
      endIcon={props?.endIcon}
      type={props?.type}
      onClick={props?.onClick}
    >
      {props.label}
    </Button>
  )
}

export default MuiButton