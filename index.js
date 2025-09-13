import inquirer from "inquirer";
import fs from "fs";
import listaTarefas from "./tarefas.json" with { type: "json" };

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
        "5. Limpar Lista",
        "6. Sair",
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
    case "5. Limpar Lista":
      confirmarLimpeza();
      break;
    case "6. Sair":
      sair();
      break;
    default:
      console.log("Algo deu errado");
  }
};

const adicionarTarefa = async () => {
  const nomeNovaTarefa = await inquirer.prompt([
    {
      type: "input",
      name: "nomeNovaTarefa",
      message: "Escreva um nome para sua nova tarefa",
    },
  ]);

  const descNovaTarefa = await inquirer.prompt([
    {
      type: "input",
      name: "descNovaTarefa",
      message: "Insira uma descrição para sua nova tarefa \n",
    },
  ]);

  listaTarefas.push({
    numero: listaTarefas.length + 1,
    nome: nomeNovaTarefa.nomeNovaTarefa,
    descricao: descNovaTarefa.descNovaTarefa,
    feita: false,
  });

  arrumarIndice();
  salvarTarefa();
  mostrarTarefas();
  await mostrarMenu();
};

const removerTarefa = async () => {
  const tarefaRemovida = await inquirer.prompt([
    {
      type: "list",
      name: "tarefaRemovida",
      message: "Selecione o número da tarefa a ser removida",
      choices: listaTarefas.map((e) => e.numero),
    },
  ]);

  if (listaTarefas.length <= 0) {
    console.log("Nenhuma tarefa a ser removida");
  }

  listaTarefas.splice(tarefaRemovida.tarefaRemovida - 1, 1);
  console.log("\n", `Tarefa ${tarefaRemovida.tarefaRemovida} removida!`, "\n");

  arrumarIndice();
  salvarTarefa();
  mostrarTarefas();
  await mostrarMenu();
};

const editarTarefa = async () => {
  const tarefaEditada = await inquirer.prompt([
    {
      type: "list",
      name: "tarefaEditada",
      message: "Selecione o número da tarefa a ser editada",
      choices: listaTarefas.map((e) => e.numero),
    },
  ]);

  if (listaTarefas.length <= 0) {
    console.log("Nenhuma tarefa a ser editada");
    return;
  }

  const nomeTarefaEditada = await inquirer.prompt([
    {
      type: "input",
      name: "nomeTarefaEditada",
      message: "Escreva um nome para sua nova tarefa",
    },
  ]);

  const descTarefaEditada = await inquirer.prompt([
    {
      type: "input",
      name: "descTarefaEditada",
      message: "Insira uma descrição para sua nova tarefa \n",
    },
  ]);

  listaTarefas[tarefaEditada.tarefaEditada - 1].nome =
    nomeTarefaEditada.nomeTarefaEditada;
  listaTarefas[tarefaEditada.tarefaEditada - 1].descricao =
    descTarefaEditada.descTarefaEditada;

  console.log(`Tarefa ${tarefaEditada.tarefaEditada - 1} editada: \n`);
  console.log(listaTarefas[tarefaEditada.tarefaEditada - 1], "\n");
  salvarTarefa();
  mostrarTarefas();
  mostrarMenu();
};

const mudarEstado = async () => {
  const tarefaNovoEstado = await inquirer.prompt([
    {
      type: "list",
      name: "tarefaNovoEstado",
      message: "Selecione o número da tarefa que vai mudar o estado",
      choices: listaTarefas.map((e) => e.numero),
    },
  ]);

  listaTarefas[tarefaNovoEstado.tarefaNovoEstado - 1].feita =
    !listaTarefas[tarefaNovoEstado.tarefaNovoEstado - 1].feita;

  salvarTarefa();
  console.log(
    `Tarefa ${tarefaNovoEstado.tarefaNovoEstado - 1} alterada para ${
      listaTarefas[tarefaNovoEstado.tarefaNovoEstado - 1].feita
        ? "concluída"
        : "pendente"
    } \n`
  );
  mostrarTarefas();
  await mostrarMenu();
};

const limparLista = () => {
  if (listaTarefas.length <= 0) {
    console.log("\n Nenhuma tarefa a ser removida \n");
  } else {
    listaTarefas.length = 0
    console.log("\n Todas as tarefas foram excluídas \n")
  }

  salvarTarefa();
  mostrarMenu();
};

const confirmarLimpeza = async () => {
  const confirmacao = await inquirer.prompt([
    {
      type: "list",
      name:"confirmacao",
      message: "Confirmar remoção de todas as tarefas?",
      choices: ["Sim", "Não"]
    }
  ])

  if (confirmacao.confirmacao === "Sim") {
    limparLista()
  } else {
    console.log("Ação cancelada \n")
    mostrarTarefas()
    mostrarMenu()
  }
}

const sair = () => {
  console.log("Você saiu da aplicação");
};

mostrarTarefas();
mostrarMenu()
