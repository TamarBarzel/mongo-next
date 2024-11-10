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
  const [isAdding, setIsAdding] = useState(false);
  const [editCarId, setEditCarId] = useState<string | null>(null);

  const [carDetails, setCarDetails] = useState<Partial<Car>>({
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
      setCarDetails({ id: "", company: "", model: "", year: 0 });
      setIsAdding(false);
    } catch (error) {
      console.error("שגיאה ביצירת מכונית חדשה:", error);
    }
  };

  const handleEditCar = (car: Car) => {
    setEditCarId(car._id);
    setCarDetails(car);
  };

  const handleSaveCar = async () => {
    if (editCarId) {
      const updatedCar = { ...carDetails, _id: editCarId } as Car;

      try {
        await updateCar(updatedCar);
        await fetchCars();
        setEditCarId(null);
        setCarDetails({ id: "", company: "", model: "", year: 0 });
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
      <h1 className="text-2xl font-bold mb-4">רשימת מכוניות</h1>
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
        isAdding={isAdding}
        editCarId={editCarId}
        carDetails={carDetails}
        setCarDetails={setCarDetails}
        handleSaveNewCar={handleSaveCar}
      />
    </div>
  );
};

export default CarsPage;
