import React, { useState, useEffect } from 'react';
import { Box, Button, CircularProgress, ToggleButton, ToggleButtonGroup } from "@mui/material";
import AccommodationsGrid from "../../components/accommodations/AccommodationsGrid/AccommodationsGrid.jsx";
import useAccommodations from "../../../hooks/useAccommodations.js";
import "./AccommodationsPage.css";
import AddAccommodationDialog from "../../components/accommodations/AddAccommodationDialog/AddAccommodationDialog.jsx";

const AccommodationsPage = () => {
    const { accommodations, loading, onAdd, onEdit, onDelete } = useAccommodations();
    const [addAccommodationDialog, setAddAccommodationDialogOpen] = useState(false);

    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        fetch("http://localhost:9091/api/accommodations/categories")
            .then(res => res.json())
            .then(data => setCategories(data))
            .catch(err => console.error("Failed to fetch categories:", err));
    }, []);

    const handleCategoryChange = (event, newCategory) => {
        setSelectedCategory(newCategory);
    };

    const filteredAccommodations = selectedCategory
        ? accommodations.filter(a => a.category === selectedCategory)
        : accommodations;

    return (
        <>
            <Box className="accommodations-box">
                {loading && (
                    <Box className="progress-box">
                        <CircularProgress />
                    </Box>
                )}
                {!loading && (
                    <>
                        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2, flexWrap: "wrap", gap: 2 }}>
                            <ToggleButtonGroup
                                color="primary"
                                value={selectedCategory}
                                exclusive
                                onChange={handleCategoryChange}
                                aria-label="Category"
                            >
                                <ToggleButton value={null}>All</ToggleButton>
                                {categories.map((category) => (
                                    <ToggleButton key={category} value={category}>
                                        {category}
                                    </ToggleButton>
                                ))}
                            </ToggleButtonGroup>
                            <Button variant="contained" color="primary" onClick={() => setAddAccommodationDialogOpen(true)}>
                                Add Accommodation
                            </Button>
                        </Box>
                        <AccommodationsGrid
                            accommodations={filteredAccommodations}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    </>
                )}
            </Box>
            <AddAccommodationDialog
                open={addAccommodationDialog}
                onClose={() => setAddAccommodationDialogOpen(false)}
                onAdd={onAdd}
            />
        </>
    );
};

export default AccommodationsPage;