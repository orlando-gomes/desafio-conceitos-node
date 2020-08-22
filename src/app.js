const express = require("express");
const cors = require("cors");

<<<<<<< HEAD
// const { v4: uuid } = require('uuid');
=======
const { v4: uuidv4 } = require('uuid');
const { isUuid } = require("uuidv4");
>>>>>>> Primeiro commit

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

<<<<<<< HEAD
app.get("/repositories", (request, response) => {
  // TODO
});

app.post("/repositories", (request, response) => {
  // TODO
});

app.put("/repositories/:id", (request, response) => {
  // TODO
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
=======
function validateId(request, response, next) {
  const {id} = request.params;
  
  if(!isUuid(id)) {
    return response.status(400).json({error: 'Invalid id'})  ;
  }
  return next();
}

app.use('/repositories/:id', validateId);

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const {
    title, 
    url, 
    techs,
  } = request.body;

  const repository = {
    id: uuidv4(),
    title,
    url,
    techs,
    likes: 0,
  }

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const {title, url, techs} = request.body;
  const {id} = request.params;

  const index = repositories.findIndex((repository) => repository.id === id);

  if(index < 0 ) {
    return response.status(400).json({error: 'Repository not found'});
  }

  repositories[index] = {
    id,
    title: title || repositories[index].title, 
    url: url || repositories[index].url, 
    techs: techs || repositories[index].techs,
    likes: repositories[index].likes,
  };

  return response.json(repositories[index]);
});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;

  const index = repositories.findIndex((repository) => repository.id === id);

  if(index < 0 ) {
    return response.status(400).json({error: 'Repository not found'});
  }

  repositories.splice(index, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;

  const index = repositories.findIndex((repository) => repository.id === id);

  if(index < 0 ) {
    return response.status(400).json({error: 'Repository not found'});
  }

  repositories[index].likes+=1;

  return response.json({likes: repositories[index].likes});
>>>>>>> Primeiro commit
});

module.exports = app;
