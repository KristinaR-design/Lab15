const API_BASE_URL = "https://lab15beck.onrender.com";
const CARS_URL = `${API_BASE_URL}/api/cars`;

export async function getCars(token) {
    const headers = {};

    // if (token) {
    //   headers.Authorization = `Bearer ${token}`;
    // }

    try {
        const response = await fetch(CARS_URL, { headers });

       
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

    
        return Array.isArray(result) ? result : [];
    } catch (error) {
        console.error("Error fetching cars:", error);
       
        throw error;
    }
}

export async function addCar(car, token) {
  const response = await fetch(CARS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(car),
  });

  if (!response.ok) {
    throw new Error("Failed to add car");
  }
}

export async function updateCar(id, car, token) {
  const response = await fetch(`${CARS_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(car),
  });

  if (!response.ok) {
    throw new Error("Failed to update car");
  }
}

export async function deleteCar(id, token) {
  const response = await fetch(`${CARS_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete car");
  }
}
