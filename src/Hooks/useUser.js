import { useState, useEffect } from "react";

export const useUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userId = sessionStorage.getItem("id");
      if (!userId) return;

      try {
        const response = await fetch(
          `http://localhost:5001/usuarios/${userId}`
        );
        if (response.ok) {
          const data = await response.json();
          console.log("Datos del usuario:", data);
          setUser(data);
        } else {
          console.error("Error al obtener el usuario");
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    };

    fetchUser();
  }, []);

  return user;
};
