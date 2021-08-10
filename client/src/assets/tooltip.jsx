import React from 'react';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles, makeStyles } from '@material-ui/core/styles';

export default function ControlledTooltips(props) {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const useStylesBootstrap = makeStyles((theme) => ({
    arrow: {
      color: theme.palette.common.black,
    },
    tooltip: {
      backgroundColor: theme.palette.common.black,
    },
  }));
  
  function BootstrapTooltip(props) {
    const classes = useStylesBootstrap();
  
    return <Tooltip arrow classes={classes} {...props} />;
  }

  return (
    <BootstrapTooltip arrow placement="top" open={open} onClose={handleClose} onOpen={handleOpen} title={`click to check ${props.userName}'s page`}>
      <Button variant="contained" color="primary" style = {{marginLeft:8}} onClick = {props.checkEachOther}>{props.userName}</Button>
    </BootstrapTooltip>
  );
}
