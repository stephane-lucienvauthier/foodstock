import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function CategoryList(props) {
  const classes = useStyles();
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const onChange = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <div className={classes.root}>
      <List component="nav">
        <ListItem button selected={selectedIndex === 0} key="0" onClick={(event) => onChange(event, 2)}><ListItemText primary="All" /></ListItem>
        { props.categories !== undefined && props.categories.map(category => (
          <ListItem button selected={selectedIndex === category.id} key={category.id} onClick={(event) => onChange(event, category.id)}><ListItemText primary={category.label} /></ListItem>
        ))}
      </List>
    </div>
  )
}