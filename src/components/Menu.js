import React from 'react'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import Icon from '@material-ui/core/Icon'

export default function Menu(props) {
    const { onRoute } = props
    return (
        <BottomNavigation onChange={onRoute} showLabels>
            <BottomNavigationAction label="Log out" value="logout" icon={<Icon>exit_to_app</Icon>} />
        </BottomNavigation>
    )
}