import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Icon from '@material-ui/core/Icon';
import './Menu.css';

interface props {
    onRouter(route: string): void
}

interface state { }

export default class Menu extends React.Component<props, state> {
    constructor(props: any, state: any) {
        super(props)
        this.state = {}
        this.navigationChange = this.navigationChange.bind(this)
    }

    navigationChange(event: React.ChangeEvent<{}>, newValue: string): void {
        this.props.onRouter(newValue)
    }

    render(): JSX.Element {
        return (
            <BottomNavigation className="bottomNavigation" onChange={this.navigationChange} showLabels>
                <BottomNavigationAction label="Products" value="products" icon={<Icon>fastfood</Icon>} />
                <BottomNavigationAction label="Categories" value="categories" icon={<Icon>category</Icon>} />
                <BottomNavigationAction label="Providers" value="providers" icon={<Icon>business</Icon>} />
                <BottomNavigationAction label="Log out" value="logout" icon={<Icon>exit_to_app</Icon>} />
            </BottomNavigation>
        )
    }
}