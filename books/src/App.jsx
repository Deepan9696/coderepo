import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// The API endpoint for the books
const API_ENDPOINT = 'https://api.example.com/books';

// Validation schema for the book form
const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  author: Yup.string().required('Author is required'),
  year: Yup.number().required('Year is required').positive('Year must be a positive number'),
});

// BookForm component for creating/updating books
const BookForm = ({ initialValues, onSubmit }) => (
  <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={onSubmit}
  >
    {({ errors, touched }) => (
      <Form>
        <div>
          <label htmlFor="title">Title</label>
          <Field type="text" id="title" name="title" />
          <ErrorMessage name="title" component="div" />
        </div>

        <div>
          <label htmlFor="author">Author</label>
          <Field type="text" id="author" name="author" />
          <ErrorMessage name="author" component="div" />
        </div>

        <div>
          <label htmlFor="year">Year</label>
          <Field type="number" id="year" name="year" />
          <ErrorMessage name="year" component="div" />
        </div>

        <button type="submit">Submit</button>
      </Form>
    )}
  </Formik>
);

// BookList component to display a list of books
const BookList = ({ books, onEdit, onDelete }) => (
  <div>
    <h2>Books</h2>
    <ul>
      {books.map((book) => (
        <li key={book.id}>
          <span>{book.title} by {book.author} ({book.year})</span>
          <button onClick={() => onEdit(book)}>Edit</button>
          <button onClick={() => onDelete(book)}>Delete</button>
        </li>
      ))}
    </ul>
  </div>
);

// AdminDashboard component
const AdminDashboard = () => {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch(API_ENDPOINT);
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const createBook = async (book) => {
    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(book),
      });
      const data = await response.json();
      setBooks([...books, data]);
      setEditingBook(null);
    } catch (error) {
      console.error('Error creating book:', error);
    }
  };

  const updateBook = async (book) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/${book.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(book),
      });
      const data = await response.json();
      setBooks(books.map((b) => (b.id === data.id ? data : b)));
      setEditingBook(null);
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  const deleteBook = async (book) => {
    try {
      await fetch(`${API_ENDPOINT}/${book.id}`, {
        method: 'DELETE',
      });
      setBooks(books.filter((b) => b.id !== book.id));
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const handleEdit = (book) => {
    setEditingBook(book);
  };

  const handleCancelEdit = () => {
    setEditingBook(null);
  };

  return (
    <div>
      <h1>Library Management</h1>

      {!editingBook ? (
        <>
          <BookList books={books} onEdit={handleEdit} onDelete={deleteBook} />
          <button onClick={() => setEditingBook({})}>Add Book</button>
        </>
      ) : (
        <>
          <BookForm initialValues={editingBook} onSubmit={editingBook.id ? updateBook : createBook} />
          <button onClick={handleCancelEdit}>Cancel</button>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
