import React from 'react';
import { Provider, ProviderAdd } from './models'
import './Providers.css';
import ProviderAddForm from './dumbs/ProviderAddForm';
import ProviderList from './dumbs/ProviderList';

interface props {
  providers: Provider[]
  onAdd(provider: ProviderAdd): void
}

interface state {}

export default class Providers extends React.Component<props, state> {
  constructor(props: any, state: any) {
    super(props)
    this.state = {}
    this.onAdd = this.onAdd.bind(this)
  }

  onAdd(provider: ProviderAdd): void {
    this.props.onAdd(provider)
  }

  render(): JSX.Element {
    return (
        <div className="providerView">
          <ProviderAddForm onAdd={this.onAdd} />
          <ProviderList providers={this.props.providers} />
        </div>
    )
  }
}