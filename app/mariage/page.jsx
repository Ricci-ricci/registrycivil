"use client";
import React, { useEffect } from "react";
import MariageTable from "../../components/screen/mariagesTable";

const Mariages = () => {
    const [data, setData] = React.useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/mariage");
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const handleAdd = (newItem) => setData((prev) => [newItem, ...prev]);
    const handleUpdate = (updatedItem) =>
        setData((prev) =>
            prev.map((item) =>
                item.id === updatedItem.id ? updatedItem : item,
            ),
        );
    const handleDelete = (id) =>
        setData((prev) => prev.filter((item) => item.id !== id));
    return (
        <MariageTable
            data={data}
            onAdd={handleAdd}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
        />
    );
};
export default Mariages;
