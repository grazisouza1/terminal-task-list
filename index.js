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

const mostrarTarefas = () => {
  console.log("============= LISTA DE TAREFAS =============");
  console.log("(Para sair a qualquer momento, 'pressione Ctrl + C') \n");

  if (listaTarefas.length > 0) {
    for (let i = 0; i < listaTarefas.length; i++) {
      console.log(
        listaTarefas[i].numero,
        listaTarefas[i].nome,
        "\n",
        listaTarefas[i].descricao,
        "\n",
        listaTarefas[i].feita ? "𒊹 Concluída " : "Ｏ Pendente",
        "\n"
      );
    }
  } else {
    console.log("Sem tarefas para mostrar \n");
  }
};

const mostrarMenu = async () => {
  const respostas = await inquirer.prompt([
    {
      type: "list",
      name: "resposta",
      message: "O que deseja fazer?",
      choices: [
        "1. Criar Tarefa",
        "2. Remover Tarefa",
        "3. Editar Tarefa",
        "4. Marcar/desmarcar Tarefa como concluída",
        "5. Sair",
      ],
    },
  ]);

  switch (respostas.resposta) {
    case "1. Criar Tarefa":
      adicionarTarefa();
      break;
    case "2. Remover Tarefa":
      removerTarefa();
      break;
    case "3. Editar Tarefa":
      editarTarefa();
      break;
    case "4. Marcar/desmarcar Tarefa como concluída":
      mudarEstado();
      break;
    case "5. Sair":
      sair();
      break;
    default:
      console.log("Algo deu errado");
  }
};
