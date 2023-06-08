// src/
// ├── components/
// │   ├── StudentList.js
// │   ├── StudentForm.js
// │   ├── TeacherList.js
// │   ├── TeacherForm.js
// │   └── ...
// ├── pages/
// │   ├── StudentsPage.js
// │   ├── TeachersPage.js
// │   └── ...
// ├── services/
// │   ├── studentService.js
// │   ├── teacherService.js
// │   └── ...
// └── App.js
import React, { useEffect, useState } from 'react';
import { getStudents } from '../services/studentService';

const StudentList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const studentsData = await getStudents();
    setStudents(studentsData);
  };

  return (
    <div>
      <h2>Student List</h2>
      {students.map((student) => (
        <div key={student.id}>
          <span>{student.name}</span>
          {/* Display other student details */}
        </div>
      ))}
    </div>
  );
};

export default StudentList;
