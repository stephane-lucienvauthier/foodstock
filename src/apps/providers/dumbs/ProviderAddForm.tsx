import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { ProviderAdd } from '../models'
import './ProviderAddForm.css';

interface props {
    onAdd(provider: ProviderAdd): void
}

interface state {
    provider: ProviderAdd
}

export default class ProviderAddForm extends React.Component<props, state> {
    constructor(props: any, state: any) {
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