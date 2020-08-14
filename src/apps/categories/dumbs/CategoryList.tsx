import React from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Category } from '../models'
import './CategoryList.css';

interface props {
    categories: Category[]
}

interface state { }

export default class CategoryList extends React.Component<props, state> {
    constructor(props: any, state: any) {
        super(props)
        this.state = {}
    }

    render(): JSX.Element {
        return (
            <List component="nav" aria-label="secondary mailbox folders">
                {this.props.categories.map((category) => {
                    return <ListItem button>
                        <ListItemText primary={category.label} />
                    </ListItem>
                })}
            </List>
        )
    }
}