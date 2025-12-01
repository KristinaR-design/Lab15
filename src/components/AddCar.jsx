import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addCar } from '../api/carapi.js';
import CarDialogContent from './CarDialogContent.jsx';

import Button from '@mui/material/Button';

function AddCar() {
    const [open, setOpen] = useState(false);
    const [car, setCar] = useState({
        brand: '',
        model: '',
        color: '',
        registrationNumber: '',
        modelYear: '',
        price: ''
    });

    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: addCar,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cars'] });
        },
        onError: (err) => {
            console.error(err);
        }
    });

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (event) => {
        setCar({ ...car, [event.target.name]: event.target.value });
    };

    const handleSave = () => {
        mutate({
            ...car,
            modelYear: Number(car.modelYear),
            price: Number(car.price)
        });
        setCar({
            brand: '',
            model: '',
            color: '',
            registrationNumber: '',
            modelYear: '',
            price: ''
        });
        handleClose();
    };

    return (
        <>
            <Button onClick={handleClickOpen}>New Car</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New car</DialogTitle>
                <CarDialogContent car={car} handleChange={handleChange} />
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default AddCar;
