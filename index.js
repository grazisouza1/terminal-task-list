import inquirer from "inquirer";
import fs from "fs";
import listaTarefas from "./tarefas.json" assert { type: "json" };

const salvarTarefa = () => {
  fs.writeFileSync("tarefas.json", JSON.stringify(listaTarefas, null, 2));
};

const arrumarIndice = () => {
  if (listaTarefas.length > 0) {
    listaTarefas.forEach((tarefa, i) => {
      tarefa.numero = i + 1;
    });
  } else {
    console.log("Nenhuma tarefa encontrada");
  }
};
