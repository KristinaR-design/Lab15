

import { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
export default function AddItem({ addItem }) {
    const [open, setOpen] = useState(false)
    const [item, setItem] = useState({ product: '', amount: '' })

    const handleAdd = () => {
        if (!item.product.trim() || !item.amount.trim()) return
        addItem(item)
        setItem({ product: '', amount: '' })
        setOpen(false)
    }

    return (
        <>
            <Button variant="outlined" onClick={() => setOpen(true)} sx={{ mb: 2 }}>
                Add Item
            </Button>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>New Item</DialogTitle>
                <DialogContent sx={{ pt: 1 }}>
                    <TextField
                        label="Product" margin="dense" fullWidth
                        value={item.product}
                        onChange={e => setItem({ ...item, product: e.target.value })}
                    />
                    <TextField
                        label="Amount" margin="dense" fullWidth
                        value={item.amount}
                        onChange={e => setItem({ ...item, amount: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button onClick={handleAdd}>Add</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
