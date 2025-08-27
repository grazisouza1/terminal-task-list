<div align="center" >
  <img width="500" height="200" alt="console-task-list" align="center" src="https://github.com/user-attachments/assets/1cd735cf-a848-4324-919d-eec9ce6a73c1" />
</div>

<div align="center">
  <h2>With:</h2>
  <a href="https://developer.mozilla.org/docs/Web/JavaScript" target="_blank">
    <img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=for-the-badge&logo=JavaScript&logoColor=black">
  </a>
</div>

## What does it do? ❓
  The app is a <strong>Task List</strong> which can only be used on terminal. When you start the application, it gives you some options (a menu), which includes create, remove, or edit a task. It uses an interactive menu, where you can select the option you want to execute.

## Installing Dependencies ⚙️
  To install the dependencies, use: <br>
  ```
  npm i 
  ```
  or

  ```
  npm install 
  ```

## How To Use 🚀
### Runing the app
  First, in your terminal, move into the project directory: <br>
  ```
  cd place-you-downloaded-the-project/terminal-task-list
  ```
    
  then type: <br>
  ```
  node index.js
  ```

### Using The Application
  When you first run the app, you shoud see something like this:
  ```
  ============= LISTA DE TAREFAS =============
(Para sair a qualquer momento, 'pressione Ctrl + C') 

Sem tarefas para mostrar 

? O que deseja fazer? (Use arrow keys)
❯ 1. Criar Tarefa
  2. Remover Tarefa
  3. Editar Tarefa
  4. Marcar/desmarcar Tarefa como concluída
  5. Sair
  ```

<p>  This is the interactive menu. Use the arrow keys to choose one of the options. After any option you choose, another menu will ask you more details about your choice. Every task has a number (Try to add one and see), so the action details will uses these numbers to run your choices. Here's an example - After adding a task, your task list will look like this:</p>

  ```
  1 Task 1 
 Do task 1 today!!!!!! 
 Ｏ Pendente 
  ```
  If, in the menu, you choose to remove a task, the system will ask you the number of the task you want to remove, so you only will have the option "1", just like this:
  ```
  ? Selecione o número da tarefa a ser removida (Use arrow keys)
❯ 1
  ```
