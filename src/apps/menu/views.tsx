import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Icon from '@material-ui/core/Icon';
import { MenuProps, MenuState } from './interfaces'
import './style.css';

export default class Menu extends React.Component<MenuProps, MenuState> {
    constructor(props: MenuProps, state: MenuState) {
        super(props)
        this.state = {}
        this.navigationChange = this.navigationChange.bind(this)
    }

    navigationChange(event: React.ChangeEvent<{}>, newValue: string): void {
        this.props.onRouter(newValue)
    }

    render(): JSX.Element {
        return (
            <BottomNavigation onChange={this.navigationChange} showLabels>
                <BottomNavigationAction label="Products" value="products" icon={<Icon>fastfood</Icon>} />
                <BottomNavigationAction label="Log out" value="logout" icon={<Icon>exit_to_app</Icon>} />
            </BottomNavigation>
        )
    }
}