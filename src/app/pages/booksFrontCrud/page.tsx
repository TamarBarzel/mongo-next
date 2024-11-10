'use client'
import React, { useEffect, useState } from "react";
import { getBooks, createBook, updateBook, deleteBook } from "@/app/services/crudBook";
import DataTable from "@/app/componenets/DataTable";

interface Book {
  _id: string;
  name: string;
  author: string;
  publishYear: number;
}

const BooksPage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [editObjectId, setEditObjectId] = useState<string | null>(null);

  const [objectDetails, setObjectDetails] = useState<Partial<Book>>({
    name: "",
    author: "",
    publishYear: 0,
  });

  const fetchBooks = async () => {
    try {
      const response = await getBooks();
      setBooks(response.data);
    } catch (error) {
      console.error("שגיאה בשליפת נתוני ספרים:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);


  const handleAddBook = async () => {
    try {
      const createdBook = await createBook("שם", "סופר/ת", 2024);
      await fetchBooks(); 
      setObjectDetails({ name: "", author: "", publishYear: 0 });
    } catch (error) {
      console.error("שגיאה ביצירת ספר חדש:", error);
    }
  };

  const handleEditBook = (book: Book) => {
    setEditObjectId(book._id);
    setObjectDetails(book);
  };

  const handleSaveBook = async () => {
    if (editObjectId) {
      const updatedBook = { ...objectDetails, _id: editObjectId } as Book;

      try {
        await updateBook(updatedBook);
        await fetchBooks();
        setEditObjectId(null);
        setObjectDetails({ name: "", author: "", publishYear: 0 });
      } catch (error) {
        console.error("שגיאה בעדכון ספר:", error);
      }
    }
  };

  const handleDeleteBook = async (_id: string) => {
    try {
      await deleteBook(_id);
      await fetchBooks(); 
    } catch (error) {
      console.error("שגיאה במחיקת ספר:", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">books list</h1>
      <DataTable<Book>
        data={books}
        columns={[
          { key: "name", header: "book name " },
          { key: "author", header: "author" },
          { key: "publishYear", header: "publish Year" },
        ]}
        onEdit={handleEditBook}
        onDelete={handleDeleteBook}
        onAdd={handleAddBook} 
        editObjectId={editObjectId}
        objectDetails={objectDetails}
        setObjectDetails={setObjectDetails}
        handleSaveNewObject={handleSaveBook}
      />
    </div>
  );
};

export default BooksPage;
