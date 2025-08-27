import inquirer from "inquirer";
import fs from "fs";
import listaTarefas from "./tarefas.json" assert { type: "json" };

const salvarTarefa = () => {
  fs.writeFileSync("tarefas.json", JSON.stringify(listaTarefas, null, 2));
};
