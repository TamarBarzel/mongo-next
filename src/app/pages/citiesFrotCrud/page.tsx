'use client'
import React, { useEffect, useState } from "react";
import { getCities, createCity, updateCity, deleteCity } from "@/app/services/crudCity";
import DataTable from "@/app/componenets/DataTable";

interface City {
  _id: string;
  name: string;
  country: string;
}

const CitiesPage: React.FC = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [editObjectId, setEditObjectId] = useState<string | null>(null);

  const [objectDetails, setObjectDetails] = useState<Partial<City>>({
    name: "",
    country: "",
  });

  const fetchCities = async () => {
    try {
      const response = await getCities();
      setCities(response.data);
    } catch (error) {
      console.error("שגיאה בשליפת נתוני ערים:", error);
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);


  const handleAddCity= async () => {
    try {
      const createdCity = await createCity( "שם העיר", "מדינה");
      await fetchCities(); 
      setObjectDetails({ name: "", country: "" });
    } catch (error:any) {
      console.error("שגיאה ביצירת עיר חדשה:", error);
      alert(error.message);
    }
  };

  const handleEditCity = (city: City) => {
    setEditObjectId(city._id);
    setObjectDetails(city);
  };

  const handleSaveCity = async () => {
    if (editObjectId) {
      const updatedCity = { ...objectDetails, _id: editObjectId } as City;

      try {
        await updateCity(updatedCity);
        await fetchCities();
        setEditObjectId(null);
        setObjectDetails({ name: "", country: "" });
      } catch (error:any) {
        console.error("שגיאה בעדכון עיר:", error);
        alert(error.message)
      }
    }
  };

  const handleDeleteCity = async (_id: string) => {
    try {
      await deleteCity(_id);
      await fetchCities(); 
    } catch (error) {
      console.error("שגיאה במחיקת עיר:", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">cities list</h1>
      <DataTable<City>
        data={cities}
        columns={[
          { key: "name", header: "city name" },
          { key: "country", header: "country" },
        ]}
        onEdit={handleEditCity}
        onDelete={handleDeleteCity}
        onAdd={handleAddCity} 
        editObjectId={editObjectId}
        objectDetails={objectDetails}
        setObjectDetails={setObjectDetails}
        handleSaveNewObject={handleSaveCity}
      />
    </div>
  );
};

export default CitiesPage;
