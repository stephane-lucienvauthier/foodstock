import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import './Categories.css';

interface props {
  open: boolean
  onClose: any
}

interface state {}

export default class Categories extends React.Component<props, state> {
  constructor(props: any, state: any) {
    super(props)
    this.state = {}
    this.handleClose = this.handleClose.bind(this)
  }

  handleClose(): void {
    this.props.onClose()
  }

  render(): JSX.Element {
    return (
      <Dialog fullScreen open={this.props.open} onClose={this.handleClose}>
        <AppBar>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={this.handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6">
              Sound
            </Typography>
            <Button autoFocus color="inherit" onClick={this.handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
      </Dialog>
    )
  }
}