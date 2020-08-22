import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
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
  addButton: {
    float: 'right'
  }
}));

export default function CategoryList(props) {
  const { categories, onEditDialog } = props
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const onChange = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <div className={classes.root}>
      <List component="nav" subheader={<ListSubheader component="div" id="nested-list-subheader">Categories<IconButton className={classes.addButton} color="primary" onClick={onEditDialog}><Icon>add</Icon></IconButton></ListSubheader>}>
        <ListItem button selected={selectedIndex === 0} key="0" onClick={(event) => onChange(event, 0)}><ListItemText primary="All" /></ListItem>
        {categories !== undefined && categories.map(category => (
          <ListItem button selected={selectedIndex === category.id} key={category.id} onClick={(event) => onChange(event, category.id)}><ListItemText primary={category.label} /></ListItem>
        ))}
      </List>
    </div>
  )
}