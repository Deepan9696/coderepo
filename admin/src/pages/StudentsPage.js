import React from 'react';
import StudentList from '../components/StudentList';
import StudentForm from '../components/StudentForm';

const StudentsPage = () => {
  return (
    <div>
      <StudentForm />
      <StudentList />
    </div>
  );
};

export default StudentsPage;
