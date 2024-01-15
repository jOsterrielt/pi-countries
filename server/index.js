const server = require("./src/server");
const { conn } = require("./src/db.js");
const PORT = 3001;

/* async function startServer() {
  try {
    await conn.sync({ force: true });
    server.listen(PORT, () => {
      console.log(`server listen on port: ${PORT}`);
    });
  } catch (error) {
    console.log(error.message);
  }
}
startServer(); */

conn
  .sync({ force: true })
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => console.error(error));
