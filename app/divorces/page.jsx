"use client";
import React, { useEffect } from "react";
import DivorceTable from "../../components/screen/divorcesTable";

const Divorces = () => {
    const [data, setData] = React.useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/divorces");
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
        <DivorceTable
            data={data}
            onAdd={(item) => setData((prev) => [item, ...prev])}
            onUpdate={handleUpdate}
            onDelete={(id) =>
                setData((prev) => prev.filter((item) => item.id !== id))
            }
        />
    );
};
export default Divorces;
