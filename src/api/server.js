const PORT = 8080;
const { getDataFromFile, saveDataToFile } = require('./commons/files')

const jsonServer = require('json-server');
const { Guid } = require('guid-typescript');
const server = jsonServer.create();
const middlewares = jsonServer.defaults({
  bodyParser: true,
  noCors: false
});
server.use(middlewares);

server.use((req, rest, next) => {
  rest.header('Access-Control-Allow-Origin', '*');
  rest.header('Access-Control-Allow-Headers', '*');
  next();
});

server.get('/v1/games', async (req, res, next) => {
  const data = await getDataFromFile();
  setTimeout(() => res.jsonp(data), 2000);
})

server.post('/v1/games', async (req, res, next) => {
  const { name, downloads } = req.body;
  const response = await saveDataToFile({ id: Guid.create().toString(), name, downloads })
  res.status(204);
})

server.listen(8080, () => console.log(`Server is running on port ${PORT}`))
