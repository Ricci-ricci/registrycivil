"use client";
import React, { useEffect } from "react";
import DecesTable from "../../components/screen/decesTable";

const Deces = () => {
    const [data, setData] = React.useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/deces");
                console.log(response);
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const handleUpdate = (updatedItem) =>
        setData((prev) =>
            prev.map((item) =>
                item.id === updatedItem.id ? updatedItem : item,
            ),
        );

    return (
        <DecesTable
            data={data}
            onAdd={(item) => setData((prev) => [item, ...prev])}
            onUpdate={handleUpdate}
            onDelete={(id) =>
                setData((prev) => prev.filter((item) => item.id !== id))
            }
        />
    );
};
export default Deces;
