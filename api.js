const BASE_URL = "http://localhost:5000/api";

export const addProduct = async (data) => {
  return fetch(`${BASE_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
};
