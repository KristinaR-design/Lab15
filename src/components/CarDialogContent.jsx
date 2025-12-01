import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';


export default function CarDialogContent({ car, handleChange }) {
    return (
        <DialogContent>
            <Stack spacing={2} mt={1}>
                <TextField
                    label="Brand"
                    name="brand"
                    value={car.brand}
                    onChange={handleChange}
                />
                <TextField
                    label="Model"
                    name="model"
                    value={car.model}
                    onChange={handleChange}
                />
                <TextField
                    label="Color"
                    name="color"
                    value={car.color}
                    onChange={handleChange}
                />
                <TextField
                    label="Model year"
                    name="modelYear"
                    value={car.modelYear}
                    onChange={handleChange}
                />
                <TextField
                    label="Registration number"
                    name="registrationNumber"
                    value={car.registrationNumber}
                    onChange={handleChange}
                />
                <TextField
                    label="Price"
                    name="price"
                    value={car.price}
                    onChange={handleChange}
                />
            </Stack>
        </DialogContent>
    );
}
