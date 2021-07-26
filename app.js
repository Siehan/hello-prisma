// import
const { PrismaClient } = require("@prisma/client");

// instanciation d'un nouveau prisma client
const prisma = new PrismaClient();

// Equivalent en SQL:
// SELECT login, "lastName", "firstName" FROM users;

/*
// Nous avons aussi la possibilité de filtrer les résultats en fonction de certaines conditions avec la clef where:
// Equivalent en SQL:
// SELECT login, "lastName", "firstName" FROM users WHERE id > 1;

const main = async () => {
  const users = await prisma.users.findMany({
  where: {
    id: {
      gt: 1, // greater than
    },
  },
  select: {
    login: true,
    lastName: true,
    firstName: true,
  },
})
console.log(users)
};

OUPUT =
hello-prisma node app.js
[ { login: 'charlie', lastName: 'Turing', firstName: 'Charlie' } ]

*/

// L'équivalent de ORDER BY et LIMIT est également disponible:
// Equivalent en SQL:
// SELECT login, "lastName", "firstName" FROM users WHERE id > 1 ORDER BY id DESC LIMIT 1;
const main = async () => {
  const users = await prisma.users.findMany({
    take: 1,
    orderBy: {
      id: "desc",
    },
    where: {
      id: {
        gt: 1, // greater than
      },
    },
    select: {
      login: true,
      lastName: true,
      firstName: true,
    },
  });
  console.log(users);
};

// Execution de la fonction main
main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    // Fermeture de la connection à la fin de l'exécution du script
    await prisma.$disconnect();
  });

/* OUTPUT AVEC
    where: {
      id: 1,
    },
hello-prisma node app.js
[ { login: 'alice', lastName: 'Euler', firstName: 'Alice' } ]

* OUTPUT SANS
    where: {
      id: 1,
    },
hello-prisma node app.js
➜  hello-prisma node app.js
[
  { login: 'alice', lastName: 'Euler', firstName: 'Alice' },
  { login: 'bob', lastName: 'Durac', firstName: 'Bob' },
  { login: 'charlie', lastName: 'Turing', firstName: 'Charlie' }
*/

/*
const main = async () => {
  const users = await prisma.users.findUnique({
    select: {
      login: true,
      lastName: true,
      firstName: true,
    },
    where: {
      id: 1,
    },
  });
  console.log(users);
};

/* OUTPUT
    where: {
      id: 1,
    },
hello-prisma node app.js
{ login: 'alice', lastName: 'Euler', firstName: 'Alice' }

/*
const main = async () => {
  const nbInserted = await prisma.users.createMany({
    data: [
      {
        login: "bob",
        firstName: "Bob",
        lastName: "Durac",
        email: "bob@mail.com",
      },
      {
        login: "charlie",
        firstName: "Charlie",
        lastName: "Turing",
        email: "charlie@mail.com",
      },
    ],
    // ignore les duplications
    skipDuplicates: true,
  });
  console.log(nbInserted);
};
*/

/*
hello-prisma node app.js
{ count: 2 }
*/

/*
const main = async () => {
  // Equivalent d'un SELECT * FROM users;
  const allUsers = await prisma.users.findMany({
    where: {
      id: 1,
    },
  });
  // Affichage du résultat
  console.log(`The user with id 1 name is: ${allUsers[0].firstName}`);
};

/* OUTPUT
   hello-prisma node app.js
The user with id 1 name is: Alice
*/

/*
const main = async () => {
  const users = await prisma.users.findMany();
  console.log(users);
};

// Execution de la fonction main
main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    // Fermeture de la connection à la fin de l'exécution du script
    await prisma.$disconnect();
  });

output: [
  {
    id: 1,
    login: "alice",
    firstName: "Alice",
    lastName: "Euler",
    email: "alice@gmail.com",
  },
  {
    id: 4,
    login: "bob",
    firstName: "Bob",
    lastName: "Durac",
    email: "bob@mail.com",
  },
  {
    id: 5,
    login: "charlie",
    firstName: "Charlie",
    lastName: "Turing",
    email: "charlie@mail.com",
  },
];
*/

/*

// Nous pouvons choisir de ne retenir que les colonnes qui nous intéressent avec la clef
// select et les colonnes qui nous intéressent set à true comme ci dessous:

// Equivalent en SQL:
// SELECT login, "lastName", "firstName" FROM users;
const users = await prisma.users.findMany({
  select: {
    login: true,
    lastName: true,
    firstName: true,
  },
})
console.log(users)

*/
