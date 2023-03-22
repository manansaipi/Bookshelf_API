const Hapi = require('@hapi/hapi');
const routes = require('./routes.js'); 

const init = async () => {
  const server = Hapi.server({
    port: 9000,
    host: 'localhost'
  });

  server.route(routes);

  await server.start();
  console.log(`Server running on port ${server.info.port}`);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();