import { useState } from 'react'
import Container from '@mui/material/Container'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import AddItem from '../components/AddItem'

export default function Shopping() {
    const [items, setItems] = useState([])
    const addItem = (item) => setItems([item, ...items])

    return (
        <Container className="page" sx={{ alignItems: 'stretch' }}>
            <AppBar position="static" sx={{ mb: 2 }}>
                <Toolbar><Typography variant="h6">Shopping List</Typography></Toolbar>
            </AppBar>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <AddItem addItem={addItem} />
            </div>

            <List>
                {items.map((it, idx) => (
                    <ListItem key={idx} divider>
                        <ListItemText primary={it.product} secondary={it.amount} />
                    </ListItem>
                ))}
            </List>
        </Container>
    )
}
