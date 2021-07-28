// import de express
const express = require("express");
// definition de notre app
const app = express();

// import
const { PrismaClient } = require("@prisma/client");

// instanciation d'un nouveau prisma client
const prisma = new PrismaClient();

const IP_LOOPBACK = "localhost";
const IP_LOCAL = "192.168.0.22"; // my local ip on my network
const PORT = 3333; //3000 le port d'écoute de notre serveur

app.use(express.json());

app.get("/", async (req, res) => {
  const allUsers = await prisma.users.findMany();
  res.json(allUsers);
});

app.get("/", async (req, res) => {
  const users = await prisma.users.findMany({
    where: { id: true },
    select: {
      login: true,
      lastName: true,
      firstName: true,
    },
  });
  res.json(users);
});

app.get("/users/:id", async (req, res) => {
  const uniqueuser = await prisma.users.findUnique({
    where: { id: true },
    select: {
      login: true,
      lastName: true,
      firstName: true,
    },
  });
  res.json(uniqueuser);
});

app.post("/post", async (req, res) => {
  const { id, login, firstName, lastName, email } = req.body;
  const result = await prisma.users.create({
    data: {
      id,
      login,
      firstName,
      lastName,
      email,
    },
  });
  res.json(result);
});

app.put("/publish/:id", async (req, res) => {
  const { id } = req.params;
  const post = await prisma.post.update({
    where: { id },
    data: { published: true },
  });
  res.json(post);
});

app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  const user = await prisma.users.delete({
    where: {
      id,
    },
  });
  res.json(user);
});

// start the server
app.listen(PORT, IP_LOCAL, () => {
  console.log(`Example app listening at http://${IP_LOCAL}:${PORT}`);
});
