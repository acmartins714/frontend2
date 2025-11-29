window.onload = function(){
    let mensagens = obterMensagens();
    console.log(mensagens);
    let usuarioLogado = this.localStorage.getItem("usuarioLogado")

    if(!usuarioLogado) {
        alert("Você precisa fazer o login para acessar essa página.")
        window.location.href = "admin.html";
    }

    if (!mensagens) mensagens = [];

    localStorage.setItem("mensagens", JSON.stringify(mensagens));
  
    mostrarMensagens(mensagens);
};


function mostrarMensagens(lista){
    let tabela = document.querySelector("#tabelaMensagens tbody")
    tabela.innerHTML = "";

    let excluidas = JSON.parse(localStorage.getItem("excluidas")) || [];
    let visualizadas = JSON.parse(localStorage.getItem("visualizadas")) || [];
    
    lista.forEach(function(listagem, i){

        if (!excluidas.includes(listagem.id)) {

            let linha = document.createElement("tr");

            let lida = visualizadas.includes(listagem.id);

            if (!lida) {

                linha.innerHTML = `
                    <td style="width: 25%; font-weight: bold;">${listagem.nome}</td>
                    <td style="width: 30%; font-weight: bold;">${listagem.email}</td>
                    <td style="width: 25%; font-weight: bold;">${listagem.mensagem}</td>
                    <td style="width: 18%; white-space: nowrap;  text-align: center">
                        <button class="table-button" id="btnVisualizar">Visualizar</button>
                        <button class="table-button" id="btnExcluir">Excluir</button>
                    </td>
                `;
            } else {
                linha.innerHTML = `
                    <td style="width : 25%">${listagem.nome}</td>
                    <td style="width : 30%">${listagem.email}</td>
                    <td style="width : 25%">${listagem.mensagem}</td>
                    <td style="width : 18%; white-space: nowrap;  text-align: center">
                        <button class="table-button" id="btnVisualizar">Visualizar</button>
                        <button class="table-button" id="btnExcluir">Excluir</button>
                    </td>
                  `;
            }

            linha.querySelector("#btnVisualizar").addEventListener("click", function(){
                if(confirm("Marcar esta mensagem como visualizada?")){
                    salvarComoLida(listagem);
                }
            });

            linha.querySelector("#btnExcluir").addEventListener("click", function(){
                if(confirm("Tem certeza que deseja excluir esta mensagem?")){
                    console.log("Identificador do item a ser excluído: " + listagem.id)
                    excluirMensagem(listagem);
                }
            });

            tabela.appendChild(linha);
        }
    });
};


//excluir mensagens
function excluirMensagem(msg) {

  let excluidas = JSON.parse(localStorage.getItem("excluidas")) || [];
  
  let idMensagem = msg.id;

  if (!excluidas.includes(idMensagem)) {

    // Adicionar elemento ao final do array de controle das mensagens excluídas
    excluidas.push(idMensagem);

    // Gravar as mensagens excluídas no localStorage
    localStorage.setItem("excluidas", JSON.stringify(excluidas));

  } 

  // Atualizar a exibição dos dados na tabela de mensagens
  atualizarMensagens();

}


// Marcar as mesnagens visualizadas
function salvarComoLida(msg) {
  
  // obtem os id´s das mensagens visualizadas
  let visualizadas = JSON.parse(localStorage.getItem("visualizadas")) || [];

  // Obtem o valor do id da mensagem visualizada
  let idMensagem = msg.id;

  if (!visualizadas.includes(idMensagem)) {

    // Adiciona identificador da mensagem no final do array de controle de visualizados
    visualizadas.push(idMensagem);

    // Grava no localStorage o array de controle de visualizados
    localStorage.setItem("visualizadas", JSON.stringify(visualizadas));

  }

  // Atualizar a exibição dos dados na tabela de mensagens
  atualizarMensagens();

}   

function enviarMensagens() {
    window.location.href = "contato.html";
}    

function atualizarMensagens() {
    let mensagens = obterMensagens();
    localStorage.setItem("mensagens", JSON.stringify(mensagens));

    mostrarMensagens(mensagens);
}

function logout() {
    localStorage.removeItem("usuarioLogado");
    window.location.href = "admin.html";
}