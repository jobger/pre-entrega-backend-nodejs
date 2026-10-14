const [, , method, route, ...args] = process.argv;

if (!method || !route) {
  console.log("Comando inválido. Debes ingresar un método y una ruta.");
  process.exit(1);
}

const [resource, id] = route.split("/");

const BASE_URL = "https://fakestoreapi.com";

const request = async (url, options = {}) => {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return await response.json();
};

try {
  if (method === "GET") {
    if (id) {
      const data = await request(`${BASE_URL}/${resource}/${id}`);
      console.log(data);
    } else {
      const data = await request(`${BASE_URL}/${resource}`);
      console.log(data);
    }
  } else if (method === "POST") {
    const [title, price, category] = args;

    if (!title || !price || !category) {
      throw new Error(
        `Title, price y category son requeridos para crear en ${resource}`,
      );
    }

    const data = await request(`${BASE_URL}/${resource}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        price: Number(price),
        category,
      }),
    });
    console.log(data);
  } else if (method === "DELETE") {
    if (!id) {
      throw new Error(`ID es requerido para DELETE en ${resource}`);
    }

    const data = await request(`${BASE_URL}/${resource}/${id}`, {
      method: "DELETE",
    });
    console.log(data);
  } else {
    throw new Error(`Método no soportado: ${method}`);
  }
} catch (error) {
  console.log(error.message);
}
