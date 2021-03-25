import React, { useEffect, useState } from "react";

// styles
import clsx from "clsx";
import { makeStyles, Theme } from "@material-ui/core/styles";

// components
import SvgIcon from "@material-ui/core/SvgIcon";
import Snackbar from "@material-ui/core/Snackbar";
import Typography from "@material-ui/core/Typography";

// icons
import CloseIcon from "@material-ui/icons/Close";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined";

// styles
const useStyles = makeStyles((theme: Theme) => ({
  snackbarRoot: {
    color: "#fff",
    zIndex: 9999999999
  },
  snackbarRootPosition: {
    [theme.breakpoints.up(600)]: {
      top: "12px"
    }
  },
  errorBg: {
    backgroundColor: "#f44336"
  },
  infoBg: {
    color: "rgb(102, 93, 0)",
    backgroundColor: "rgb(255, 252, 229)"
  },
  snackbarMessage: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  iconsLabel: {
    color: "inherit",
    marginRight: "12px"
  },
  message: {
    color: "inherit",
    fontSize: "14px"
  },
  closeIcon: {
    cursor: "pointer"
  },
  snackbarAction: {
    top: '6px',
    right: '14px',
    position: 'absolute',
  }
}));

// TS
export interface CustomSnackBarProps {
  className?: string;
  message: string;
  type: string;
  duration?: number;
  reset: () => void;
  autoClose?: boolean;
}

const CustomSnackBar = ({ className, message, type, duration, reset, autoClose }: CustomSnackBarProps) => {
  const classes = useStyles();
  const [openCustomSnackBar, setOpenCustomSnackBar] = React.useState(false);

  const handleClose = (e: React.SyntheticEvent<any>, reason: string) => {
    if (reason === 'clickaway' && !autoClose) {
      return false;
    }
    setOpenCustomSnackBar(false);
    setTimeout(() => {
      reset();
    }, 50);
  };

  useEffect(() => {
    if (message) {
      setOpenCustomSnackBar(true);
    }
  }, [message]);

  return (
    <Snackbar
      classes={{
        root: clsx(classes.snackbarRoot, className),

        anchorOriginTopCenter: classes.snackbarRootPosition
      }}
      anchorOrigin={{
        vertical: "top",
        horizontal: "center"
      }}
      open={openCustomSnackBar}
      autoHideDuration={duration}
      onClose={handleClose}
      message={
        <React.Fragment>
          <SvgIcon
            component={
              type === "error" ? ErrorOutlineOutlinedIcon : InfoOutlinedIcon
            }
            className={classes.iconsLabel}
            onClick={handleClose}
            color="disabled"
          />
          <Typography className={clsx(classes.message, "message-list")}>{message}</Typography>
        </React.Fragment>
      }
      action={
        <React.Fragment>
          <CloseIcon
            className={classes.closeIcon}
            onClick={handleClose}
            fontSize="small"
          />
        </React.Fragment>
      }
      ContentProps={{
        classes: {
          root: clsx(type === "error" ? classes.errorBg : classes.infoBg),
          message: classes.snackbarMessage,
          action: classes.snackbarAction
        }
      }}
    />
  );
};

CustomSnackBar.defaultProps = {
  message: null,
  type: "info",
  duration: 2000,
  autoClose: true,
};

export default CustomSnackBar;
