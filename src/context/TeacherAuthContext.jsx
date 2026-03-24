import React, { createContext, useContext, useState, useEffect } from "react";

const TeacherAuthContext = createContext();

export const TeacherAuthProvider = ({ children }) => {
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if teacher is logged in on app load
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/teachers/check`, {
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Not logged in");
      })
      .then((data) => setTeacher(data))
      .catch(() => setTeacher(null))
      .finally(() => setLoading(false));
  }, []);

  const login = (teacherData) => setTeacher(teacherData);

  const logout = async () => {
    await fetch(`${import.meta.env.VITE_API_URL}/api/teachers/logout`, {
      method: "POST",
      credentials: "include",
    });
    setTeacher(null);
  };

  return (
    <TeacherAuthContext.Provider value={{ teacher, loading, login, logout }}>
      {children}
    </TeacherAuthContext.Provider>
  );
};

export const useTeacherAuth = () => useContext(TeacherAuthContext);
