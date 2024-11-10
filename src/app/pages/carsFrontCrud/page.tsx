'use client'
import React, { useEffect, useState } from "react";
import { getCars, createCar, updateCar, deleteCar } from "@/app/services/crudCar";
import DataTable from "@/app/componenets/DataTable";

interface Car {
  _id: string;
  id: string;
  company: string;
  model: string;
  year: number;
}

const CarsPage: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [editObjectId, setEditObjectId] = useState<string | null>(null);

  const [objectDetails, setObjectDetails] = useState<Partial<Car>>({
    id: "",
    company: "",
    model: "",
    year: 0,
  });

  const fetchCars = async () => {
    try {
      const response = await getCars();
      setCars(response.data);
    } catch (error) {
      console.error("שגיאה בשליפת נתוני מכוניות:", error);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);


  const handleAddCar = async () => {
    try {
      const createdCar = await createCar("מספר רישוי", "חברה", "מודל", 2024);
      await fetchCars(); 
      setObjectDetails({ id: "", company: "", model: "", year: 0 });
    } catch (error) {
      console.error("שגיאה ביצירת מכונית חדשה:", error);
    }
  };

  const handleEditCar = (car: Car) => {
    setEditObjectId(car._id);
    setObjectDetails(car);
  };

  const handleSaveCar = async () => {
    if (editObjectId) {
      const updatedCar = { ...objectDetails, _id: editObjectId } as Car;

      try {
        await updateCar(updatedCar);
        await fetchCars();
        setEditObjectId(null);
        setObjectDetails({ id: "", company: "", model: "", year: 0 });
      } catch (error) {
        console.error("שגיאה בעדכון מכונית:", error);
      }
    }
  };

  const handleDeleteCar = async (_id: string) => {
    try {
      await deleteCar(_id);
      await fetchCars(); 
    } catch (error) {
      console.error("שגיאה במחיקת מכונית:", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">cars list</h1>
      <DataTable<Car>
        data={cars}
        columns={[
          { key: "id", header: "car id" },
          { key: "company", header: "company" },
          { key: "model", header: "model" },
          { key: "year", header: "year" },
        ]}
        onEdit={handleEditCar}
        onDelete={handleDeleteCar}
        onAdd={handleAddCar} 
        editObjectId={editObjectId}
        objectDetails={objectDetails}
        setObjectDetails={setObjectDetails}
        handleSaveNewObject={handleSaveCar}
      />
    </div>
  );
};

export default CarsPage;
