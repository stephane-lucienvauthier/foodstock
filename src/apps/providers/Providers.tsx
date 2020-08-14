import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { Provider, ProviderAdd } from './models'
import './Providers.css';
import ProviderAddForm from './dumbs/ProviderAddForm';

interface props {
  open: boolean
  onClose: any
  providers: Provider[]
  onAdd(provider: ProviderAdd): void
}

interface state {}

export default class Providers extends React.Component<props, state> {
  constructor(props: any, state: any) {
    super(props)
    this.state = {}
    this.close = this.close.bind(this)
    this.onAdd = this.onAdd.bind(this)
  }

  close(): void {
    this.props.onClose()
  }

  onAdd(provider: ProviderAdd): void {
    this.props.onAdd(provider)
  }

  render(): JSX.Element {
    return (
      <Dialog fullScreen open={this.props.open} onClose={this.close}>
        <AppBar className="appBar">
          <Toolbar>
            <Typography variant="h6" className="title">
              Providers
            </Typography>
            <IconButton edge="start" color="inherit" onClick={this.close} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div className="dialogBody">
          <ProviderAddForm onAdd={this.onAdd} />
        </div>
      </Dialog>
    )
  }
}