import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCar } from '../api/carapi.js';
import CarDialogContent from './CarDialogContent.jsx';

import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';

function EditCar({ cardata, token }) {
    const [open, setOpen] = useState(false);
    const [car, setCar] = useState({  });

  
    const [isSaving, setIsSaving] = useState(false);
    const [saveError, setSaveError] = useState(null);

    const queryClient = useQueryClient();



    const handleClickOpen = () => {
        setCar({
            brand: cardata.brand,
            model: cardata.model,
            color: cardata.color,
            registrationNumber: cardata.registrationNumber,
            modelYear: cardata.modelYear,
            price: cardata.price
        });
        setSaveError(null); 
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    const handleChange = (event) => {
        setCar({ ...car, [event.target.name]: event.target.value });
    };

    const handleSave = async () => {
        
        setIsSaving(true);
        setSaveError(null);

        const id = cardata.id;
        const carData = {
            ...car,
            modelYear: Number(car.modelYear),
            price: Number(car.price)
        };

        try {
            
            await updateCar(id, carData, token);

        
            queryClient.invalidateQueries({ queryKey: ['cars'] });

           
            setCar({ });
            setOpen(false);
        } catch (error) {
           
            console.error("Save failed:", error);
            setSaveError(error.message || "Failed to save changes.");
        } finally {
           
            setIsSaving(false);
        }
    };

    return (
        <>
            {/* <button onClick={handleClickOpen}>Edit</button> */}

            <Tooltip title="Edit car">
                <IconButton aria-label="edit" size="small" onClick={handleClickOpen}>
                    <EditIcon fontSize="small" />
                </IconButton>
            </Tooltip>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit car</DialogTitle>
                <CarDialogContent car={car} handleChange={handleChange} />
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default EditCar;
