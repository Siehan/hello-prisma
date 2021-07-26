/* respecter la version JS en inscrivant les fichiers en camelCase, alors que sql (normalement avec un underscore)
par défaut inscrit tout en minuscule, donc forcer en mettant les guillemets */

CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  login VARCHAR(30) NOT NULL UNIQUE,
  "firstName" VARCHAR(255),
  "lastName" VARCHAR(255),
  email VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
  content TEXT,
  published BOOLEAN NOT NULL DEFAULT false,
  "authorId"  INTEGER NOT NULL REFERENCES users(id)
);

CREATE TABLE profiles (
  id SERIAL PRIMARY KEY NOT NULL,
  bio TEXT,
  "userId" INTEGER UNIQUE NOT NULL REFERENCES users(id)
);