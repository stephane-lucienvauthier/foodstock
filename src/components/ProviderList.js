import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  addButton: {
    float: 'right'
  }
}));

export default function ProviderList(props) {
  const { providers, onEditDialogOpen, onDeleteDialogOpen } = props
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const onChange = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <div className={classes.root}>
      <List component="nav" subheader={<ListSubheader component="div" id="nested-list-subheader">Providers<IconButton className={classes.addButton} color="primary" onClick={onEditDialogOpen}><Icon>add</Icon></IconButton></ListSubheader>}>

        <ListItem button selected={selectedIndex === 0} key="0" onClick={(event) => onChange(event, 0)}><ListItemText primary="All" /></ListItem>
        {providers !== undefined && providers.map(provider => (
          <ListItem button selected={selectedIndex === provider.id} key={provider.id} onClick={(event) => onChange(event, provider.id)}><ListItemText primary={`${provider.label} (${provider.city})`} />
            <ListItemSecondaryAction>
              <IconButton size="small" onClick={() => onDeleteDialogOpen(provider.id)} color="secondary"><Icon>delete</Icon></IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  )
}