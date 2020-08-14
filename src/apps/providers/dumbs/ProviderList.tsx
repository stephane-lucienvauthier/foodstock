import React from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Provider } from '../models'
import './ProviderList.css';

interface props {
    providers: Provider[]
}

interface state { }

export default class ProviderList extends React.Component<props, state> {
    constructor(props: any, state: any) {
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