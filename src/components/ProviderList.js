import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ProviderList(props) {
  const { providers } = props
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const onChange = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <div className={classes.root}>
      <List component="nav" subheader={<ListSubheader component="div" id="nested-list-subheader">Providers</ListSubheader>}>

        <ListItem button selected={selectedIndex === 0} key="0" onClick={(event) => onChange(event, 0)}><ListItemText primary="All" /></ListItem>
        {providers !== undefined && providers.map(provider => (
          <ListItem button selected={selectedIndex === provider.id} key={provider.id} onClick={(event) => onChange(event, provider.id)}><ListItemText primary={`${provider.label} (${provider.city})`} /></ListItem>
        ))}
      </List>
    </div>
  )
}