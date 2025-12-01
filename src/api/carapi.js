const API_URL = "http://localhost:8080/api/cars";

export async function getCars(token) {
  const response = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch cars");
  }

  const data = await response.json();

  if (data._embedded && data._embedded.cars) {
    return data._embedded.cars;
  }

  return Array.isArray(data) ? data : [];
}


export async function addCar(car, token) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,   // ← то же самое
    },
    body: JSON.stringify(car),
  });

  if (!response.ok) {
    throw new Error("Failed to add car");
  }
}

export async function updateCar(link, car, token) {
  const response = await fetch(link, {
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

export async function deleteCar(link, token) {
  const response = await fetch(link, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete car");
  }
}
