const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

// List all repositories
app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

// Create a new repository
app.post("/repositories", (request, response) => {
  const { title, url, techs, likes} = request.body;

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes
   };

  repositories.push(repository);

  return response.status(200).json(repository);
});

// Update the the title, url and techs of a repository
app.put("/repositories/:id", (request, response) => {
  const { id }  = request.params;
  const { title, url, techs } = request.body;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(404).json({ error: 'Repository not found.'});
  }

  const repository = {
    id,
    url,
    techs,
    likes: repositories[repositoryIndex].likes
  };

  repositories[repositoryIndex] = repository;

  return response.json(repository);
});

// Delete a repository
app.delete("/repositories/:id", (request, response) => {
  const { id }  = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(404).json({ error: 'Repository not found.'});
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).json();
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
});

module.exports = app;
