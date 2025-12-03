import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Snackbar from "@mui/material/Snackbar";

import { getCars, deleteCar } from "../api/carapi.js";
import AddCar from "./AddCar.jsx";
import EditCar from "./EditCar.jsx";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";

function Carlist({ token }) {
    const queryClient = useQueryClient();
    const [open, setOpen] = useState(false);

    // если вдруг токена нет – можно показать сообщение
    if (!token) {
        return <span>Please login to see cars</span>;
    }

    const {
        data: cars,
        error,
        isSuccess,
        isLoading,
    } = useQuery({
        queryKey: ["cars"],
        queryFn: () => getCars(token),
    });

    const { mutate } = useMutation({
        mutationFn: (link) => deleteCar(link, token),
        onSuccess: () => {
            setOpen(true);
            queryClient.invalidateQueries({ queryKey: ["cars"] });
        },
        onError: (err) => {
            console.error(err);
        },
    });

    const columns = [
        { field: "brand", headerName: "Brand", width: 200 },
        { field: "model", headerName: "Model", width: 200 },
        { field: "color", headerName: "Color", width: 200 },
        { field: "registrationNumber", headerName: "Reg.nr.", width: 150 },
        { field: "modelYear", headerName: "Model Year", width: 150 },
        { field: "price", headerName: "Price", width: 150 },
        {
            field: "edit",
            headerName: "",
            width: 100,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params) => <EditCar cardata={params.row} />,
        },
        {
            field: "delete",
            headerName: "",
            width: 100,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params) => (
                <Tooltip title="Delete car">
                    <IconButton
                        aria-label="delete"
                        size="small"
                        onClick={() => {
                            if (
                                window.confirm(
                                    `Are you sure you want to delete ${params.row.brand} ${params.row.model}?`
                                )
                            ) {
                                mutate(params.row.id);
                            }
                        }}
                    >
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
            ),
        },
    ];

    if (error) {
        return <span>Error when fetching cars...</span>;
    }

    if (isLoading || !isSuccess) {
        return <span>Loading...</span>;
    }

    return (
        <>
            <AddCar token={token} />
            <div style={{ height: 600, width: "100%" }}>
                <DataGrid
                    rows={cars}
                    columns={columns}
                    disableRowSelectionOnClick
                    getRowId={(row) => row.id}
                    slots={{ toolbar: GridToolbar }}
                />
            </div>
            <Snackbar
                open={open}
                autoHideDuration={2000}
                onClose={() => setOpen(false)}
                message="Car deleted"
            />
        </>
    );
}

export default Carlist;
