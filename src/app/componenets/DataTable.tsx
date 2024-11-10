import React, { FC, ChangeEvent } from "react";

interface DataTableProps<T> {
  data: T[];
  columns: { key: keyof T; header: string }[];
  onEdit: (item: T) => void;
  onDelete: (id: string) => void;
  onAdd: () => void;
  isAdding: boolean;
  editCarId: string | null;
  carDetails: Partial<T>;
  setCarDetails: (details: Partial<T>) => void;
  handleSaveNewCar: () => void;
}

const DataTable = <T extends { _id: string }>({
  data,
  columns,
  onEdit,
  onDelete,
  onAdd,
  isAdding,
  editCarId,
  carDetails,
  setCarDetails,
  handleSaveNewCar,
}: DataTableProps<T>) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, key: keyof T) => {
    setCarDetails({ ...carDetails, [key]: e.target.value });
  };

  return (
    <div className="container mx-auto my-8">
      <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4" onClick={onAdd}>
        Add New
      </button>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={String(column.key)}
                className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
              >
                {column.header}
              </th>
            ))}
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id} className="border-b">
              {columns.map((column) => (
                <td key={String(column.key)} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-left">
                  {editCarId === item._id ? (
                    <input
                      type="text"
                      value={String(carDetails[column.key] || item[column.key])}
                      onChange={(e) => handleInputChange(e, column.key)}
                      className="border p-1 rounded w-full text-gray-400"
                    />
                  ) : (
                    String(item[column.key])
                  )}
                </td>
              ))}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-left">
                {editCarId === item._id ? (
                  <button className="text-green-500 mr-2" onClick={handleSaveNewCar}>
                    Save
                  </button>
                ) : (
                  <button className="text-blue-500 mr-2" onClick={() => onEdit(item)}>
                    Edit
                  </button>
                )}
                <button className="text-red-500" onClick={() => onDelete(item._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {isAdding && (
            <tr className="border-b bg-gray-100">
              {columns.map((column) => (
                <td key={String(column.key)} className="px-6 py-4">
                  <input
                    type="text"
                    value={String(carDetails[column.key] || "")}
                    onChange={(e) => handleInputChange(e, column.key)}
                    className="border p-1 rounded w-full italic text-gray-400"
                    placeholder={`Enter ${column.header}`}
                  />
                </td>
              ))}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 text-left">
                <button className="text-green-500 mr-2" onClick={handleSaveNewCar}>
                  Save
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;