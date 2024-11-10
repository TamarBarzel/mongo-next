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

  // ערכי ברירת מחדל לפרטי מכונית
  const [carDetails, setCarDetails] = useState<Partial<Car>>({
    id: "",
    company: "",
    model: "",
    year: 0,
  });

  // פונקציה לרענון רשימת המכוניות
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

  // פונקציה להוספת מכונית חדשה
  const handleAddCar = async () => {
    try {
      const createdCar = await createCar(carDetails.id || "", carDetails.company || "", carDetails.model || "", carDetails.year || 0);
      await fetchCars(); // רענון הרשימה לאחר ההוספה
      setCarDetails({ id: "", company: "", model: "", year: 0 });
      setIsAdding(false);
    } catch (error) {
      console.error("שגיאה ביצירת מכונית חדשה:", error);
    }
  };

  // התחלת עריכת מכונית קיימת
  const handleEditCar = (car: Car) => {
    setEditCarId(car._id);
    setCarDetails(car);
  };

  // שמירת שינויים במכונית
  const handleSaveCar = async () => {
    if (editCarId) {
      const updatedCar = { ...carDetails, _id: editCarId } as Car;

      try {
        await updateCar(updatedCar);
        await fetchCars(); // רענון הרשימה לאחר העדכון
        setEditCarId(null);
        setCarDetails({ id: "", company: "", model: "", year: 0 });
      } catch (error) {
        console.error("שגיאה בעדכון מכונית:", error);
      }
    }
  };

  // מחיקת מכונית
  const handleDeleteCar = async (id: string) => {
    try {
      await deleteCar(id);
      await fetchCars(); // רענון הרשימה לאחר המחיקה
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
          { key: "id", header: "מזהה" },
          { key: "company", header: "חברה" },
          { key: "model", header: "מודל" },
          { key: "year", header: "שנה" },
        ]}
        onEdit={handleEditCar}
        onDelete={handleDeleteCar}
        onAdd={() => setIsAdding(true)}
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
