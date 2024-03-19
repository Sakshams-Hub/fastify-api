const fastify = require("fastify")();
const mysql = require("mysql2");

// Create MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "car_bike_rental",
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL: " + err.stack);
    return;
  }
  console.log("Connected to MySQL as id " + db.threadId);
});

function convertAvailableToYesNo(results) {
  return results.map((items) => ({
    ...items,
    available: items.available ? "yes" : "no",
  }));
}

//CARS

// Add a new car to the database
fastify.post("/addcar", function (request, reply) {
  const { brand, model, color, year } = request.body;
  db.query(
    "INSERT INTO cars (brand, model, color, year, available) VALUES (?, ?, ?, ?, true)",
    [brand, model, color, year],
    (error, results) => {
      if (error) {
        reply.code(500).send({ error: error.message });
        return;
      }
      reply.send({
        message: "Car added successfully",
        car_id: results.insertId,
      });
    }
  );
});

//Fastify route to fetch all cars
fastify.get("/allcars", function (request, reply) {
  db.query("SELECT id, brand, model FROM cars", (error, results) => {
    if (error) {
      reply.code(500).send({ error: error.message });
      return;
    }
    reply.send(results);
  });
});

//Fastify route to get details of a specific car by ID
fastify.post("/car/:id", function (request, reply) {
  const { id } = request.params;
  db.query("Select * From cars WHERE id = ?", id, (error, results) => {
    if (error) {
      reply.code(500).send({ error: error.message });
      return;
    }
    const carResult = convertAvailableToYesNo(results);
    reply.send(carResult);
  });
});

// Fastify route to fetch available cars
fastify.get("/cars/available", function (request, reply) {
  db.query(
    "SELECT id, brand, model FROM cars WHERE available = true",
    (error, results) => {
      if (error) {
        reply.code(500).send({ error: error.message });
        return;
      }
      reply.send(results);
    }
  );
});

// Fastify route to fetch rented cars
fastify.get("/cars/rented", function (request, reply) {
  db.query(
    "SELECT brand, model FROM cars WHERE available = false",
    (error, results) => {
      if (error) {
        reply.code(500).send({ error: error.message });
        return;
      }
      reply.send(results);
    }
  );
});

// Fastify route to rent a car
fastify.post("/car/rent/:id", function (request, reply) {
  const { id } = request.params;
  db.query(
    "UPDATE cars SET available = false WHERE id = ?",
    id,
    (error, results) => {
      if (error) {
        reply.code(500).send({ error: error.message });
        return;
      }
      reply.send({ message: "Car rented successfully" });
    }
  );
});

// Fastify route to return a car
fastify.post("/car/return/:id", function (request, reply) {
  const { id } = request.params;
  db.query(
    "UPDATE cars SET available = true WHERE id = ?",
    id,
    (error, results) => {
      if (error) {
        reply.code(500).send({ error: error.message });
        return;
      }
      reply.send({ message: "Car returned successfully" });
    }
  );
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//BIKES

// Add a new bike to the database
fastify.post("/addbike", function (request, reply) {
  const { brand, model, color, year } = request.body;
  db.query(
    "INSERT INTO bikes (brand, model, color, year, available) VALUES (?, ?, ?, ?, true)",
    [brand, model, color, year],
    (error, results) => {
      if (error) {
        reply.code(500).send({ error: error.message });
        return;
      }
      reply.send({
        message: "Bike added successfully",
        bike_id: results.insertId,
      });
    }
  );
});

//Fastify route to fetch all bikes
fastify.get("/allbikes", function (request, reply) {
  db.query("SELECT id, brand, model FROM bikes", (error, results) => {
    if (error) {
      reply.code(500).send({ error: error.message });
      return;
    }
    reply.send(results);
  });
});

//Fastify route to get details of a specific bike by ID
fastify.post("/bike/:id", function (request, reply) {
  const { id } = request.params;
  db.query("Select * From bikes WHERE id = ?", id, (error, results) => {
    if (error) {
      reply.code(500).send({ error: error.message });
      return;
    }
    const bikeResult = convertAvailableToYesNo(results);
    reply.send(bikeResult);
  });
});

// Fastify route to fetch available bikes
fastify.get("/bikes/available", function (request, reply) {
  db.query(
    "SELECT  id, brand, model FROM bikes WHERE available = true",
    (error, results) => {
      if (error) {
        reply.code(500).send({ error: error.message });
        return;
      }
      reply.send(results);
    }
  );
});

// Fastify route to fetch rented bikes
fastify.get("/bikes/rented", function (request, reply) {
  db.query(
    "SELECT id, brand, model FROM bikes WHERE available = false",
    (error, results) => {
      if (error) {
        reply.code(500).send({ error: error.message });
        return;
      }
      reply.send(results);
    }
  );
});

// Fastify route to rent a bike
fastify.post("/bike/rent/:id", function (request, reply) {
  const { id } = request.params;
  db.query(
    "UPDATE bikes SET available = false WHERE id = ?",
    id,
    (error, results) => {
      if (error) {
        reply.code(500).send({ error: error.message });
        return;
      }
      reply.send({ message: "Bike rented successfully" });
    }
  );
});

// Fastify route to return a bike
fastify.post("/bike/return/:id", function (request, reply) {
  const { id } = request.params;
  db.query(
    "UPDATE bikes SET available = true WHERE id = ?",
    id,
    (error, results) => {
      if (error) {
        reply.code(500).send({ error: error.message });
        return;
      }
      reply.send({ message: "Bike returned successfully" });
    }
  );
});

// Run the server
fastify.listen({ port: 3000 }, (err) => {
  if (err) throw err;
  console.log(`Server running on ${fastify.server.address().port}`);
});
