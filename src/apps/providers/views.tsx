import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { ProviderListProps, ProviderListState, ProviderAddFormProps, ProviderAddFormState, ProvidersProps, ProvidersState } from './interfaces'
import { ProviderAdd } from './models'
import './style.css'

class ProviderList extends React.Component<ProviderListProps, ProviderListState> {
    constructor(props: ProviderListProps, state: ProviderListState) {
        super(props)
        this.state = {}
    }

    render(): JSX.Element {
        return (
            <List component="nav">
                {this.props.providers.map((provider) => {
                    return <ListItem button>
                        <ListItemText primary={provider.label} />
                    </ListItem>
                })}
            </List>
        )
    }
}

class ProviderAddForm extends React.Component<ProviderAddFormProps, ProviderAddFormState> {
    constructor(props: ProviderAddFormProps, state: ProviderAddFormState) {
        super(props)
        this.state = {
            provider: { label: "", address: "", city: "", zipcode: "", phone: "" }
        }
        this.change = this.change.bind(this)
        this.add = this.add.bind(this)
    }

    change(event: any): void {
        switch (event.target.name) {
            case 'label':
                this.setState({
                    provider: {
                        label: event.target.value,
                        address: this.state.provider.address,
                        city: this.state.provider.city,
                        zipcode: this.state.provider.zipcode,
                        phone: this.state.provider.phone
                    }
                })
                break
            case 'address':
                this.setState({
                    provider: {
                        label: this.state.provider.label,
                        address: event.target.value,
                        city: this.state.provider.city,
                        zipcode: this.state.provider.zipcode,
                        phone: this.state.provider.phone
                    }
                })
                break
            case 'city':
                this.setState({
                    provider: {
                        label: this.state.provider.label,
                        address: this.state.provider.address,
                        city: event.target.value,
                        zipcode: this.state.provider.zipcode,
                        phone: this.state.provider.phone
                    }
                })
                break
            case 'zipcode':
                this.setState({
                    provider: {
                        label: this.state.provider.label,
                        address: this.state.provider.address,
                        city: this.state.provider.city,
                        zipcode: event.target.value,
                        phone: this.state.provider.phone
                    }
                })
                break
                case 'phone':
                    this.setState({
                        provider: {
                            label: this.state.provider.label,
                            address: this.state.provider.address,
                            city: this.state.provider.city,
                            zipcode: this.state.provider.zipcode,
                            phone: event.target.value
                        }
                    })
                    break
            default:
        }
    }

    add(): void {
        this.props.onAdd(this.state.provider)
    }

    render(): JSX.Element {
        return (
            <form>
                <Grid container spacing={1}>
                    <Grid item xs={6}>
                        <TextField className="textfield" label="label" name="label" onChange={this.change} />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField className="textfield" label="phone" name="phone" onChange={this.change} />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField className="textfield" label="address" name="address" onChange={this.change} />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField className="textfield" label="zipcode" name="zipcode" onChange={this.change} />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField className="textfield" label="city" name="city" onChange={this.change} />
                    </Grid>
                    <Grid item xs={1}>
                        <Button type="button" variant="contained" color="primary" onClick={this.add}>Add</Button>
                    </Grid>
                </Grid>
            </form>
        )
    }
}

export default class Providers extends React.Component<ProvidersProps, ProvidersState> {
    constructor(props: ProvidersProps, state: ProvidersState) {
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