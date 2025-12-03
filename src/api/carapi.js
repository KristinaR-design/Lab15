const API_BASE_URL = "https://lab15beck.onrender.com";
const CARS_URL = `${API_BASE_URL}/api/cars`;

export async function getCars(token) {
  const headers = {};

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(CARS_URL, { headers });

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
