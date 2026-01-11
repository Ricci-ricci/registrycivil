"use client";
import React, { useEffect } from "react";
import DecesTable from "../../components/screen/decesTable";

const Deces = () => {
    const [data, setData] = React.useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/deces");
                const result = await response.json();
                console.log(result);
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

    return <>{data}</>;
};

const Dashboard = () => {
    return (
        <div className="items-center justify-center flex w-full">
            <span className="text-8xl font-bold">
                Welcome to You spiderman{" "}
            </span>
            <Deces></Deces>
        </div>
    );
};
export default Dashboard;
