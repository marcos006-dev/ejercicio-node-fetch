const fetch = require("node-fetch");
const fs = require("fs");

console.log("Cuantos registros quiere obtener:");
const stdin = process.openStdin();

stdin.addListener("data", (d) => {
  callFetch(d.toString().trim());
});

const callFetch = async (paramCantRegis) => {
  const resultUsers = await fetch("https://jsonplaceholder.typicode.com/users");
  const resultUsersParse = await resultUsers.json();

  const resultUserFilted = resultUsersParse.filter(
    (user) => user.id <= paramCantRegis && user
  );
  // SE INVOCA A LA FUNCION PARA GUARDAR LOS DATOS EN TXT
  saveDataTxt(resultUserFilted);
};

const saveDataTxt = (paramUserFilted) => {
  fs.writeFile("./archivo.txt", JSON.stringify(paramUserFilted), (err) => {
    if (err) throw err;
    console.log("Texto Guardado!");
    // SE INVOCA A LA FUNCION PARA LEER EL ARCHIVO
    readArchiveTxt();
  });
};

const readArchiveTxt = () => {
  fs.readFile("archivo.txt", "utf-8", (err, data) => {
    if (err) {
      console.log("error: ", err);
      return;
    }
    console.log(JSON.parse(data));
  });
};
