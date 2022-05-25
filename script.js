// EXERCICIO TO DO LIST - MATHEUS COSTA

function getBanco() {
  return JSON.parse(localStorage.getItem("todoListApp")) ?? [];
}

function setBanco(banco) {
  localStorage.setItem("todoListApp", JSON.stringify(banco));
}

function criarItem(tarefa, indice) {
  const item = document.createElement("li");
  item.innerHTML = `
    ${tarefa} <input class='botaodeletar' type='button' value='X' data-indice=${indice}>
    `;

  document.getElementById("todoLista").appendChild(item);
}

function limparTarefas() {
  const todoLista = document.getElementById("todoLista");
  while (todoLista.firstChild) {
    todoLista.removeChild(todoLista.lastChild);
  }
}

function atualizarTela() {
  limparTarefas();
  const banco = getBanco();
  banco.forEach((acao, indice) => criarItem(acao.tarefa, indice));
}

function inserirTarefa() {
  const novatarefa = document.getElementById("novatarefa");

  if (novatarefa.value.length != 0) {
    const banco = getBanco();
    banco.push({ tarefa: novatarefa.value });
    setBanco(banco);
    atualizarTela();
    novatarefa.value = "";
  }
}

function deletarItem(evento) {
  const elemento = evento.target;

  if (elemento.type === "button") {
    const indice = elemento.dataset.indice;
    const banco = getBanco();
    banco.splice(indice, 1);
    setBanco(banco);
    atualizarTela();
  }
}

function apagarTudo() {
  const banco = getBanco();
  banco.splice(0, banco.length);
  setBanco(banco);
  atualizarTela();
}

document.getElementById("b1").addEventListener("click", inserirTarefa);
document.getElementById("b2").addEventListener("click", apagarTudo);
document.getElementById("todoLista").addEventListener("click", deletarItem);

atualizarTela();
