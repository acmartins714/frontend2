window.onload = function(){
    let mensagens = obterMensagens();
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

    lista = lista.filter(msg => !excluidas.includes(msg.email +  msg.mensagem));

    lista.forEach(function(msg, i){
        let linha = document.createElement("tr");

        let visualizadas = JSON.parse(localStorage.getItem("visualizadas")) || [];

        let lida = visualizadas.includes(msg.email + msg.mensagem);

        if (!lida) {
            linha.classList.add("naoLida");
        }

        linha.innerHTML = `
            <td>${msg.nome}</td>
            <td>${msg.email}</td>
            <td>${msg.mensagem}</td>
            <td style="white-space: nowrap">
                <button class="btnVisualizar">Visualizar</button>
                <button class="btnExcluir">Excluir</button>
            </td>
        `;
        

        linha.querySelector(".btnVisualizar").addEventListener("click", function(){
            if(confirm("Marcar esta mensagem como visualizada?")){
                linha.classList.remove("naoLida");
                salvarComoLida(msg);
            }
        });

        linha.querySelector(".btnExcluir").addEventListener("click", function(){
            if(confirm("Tem certeza que deseja excluir esta mensagem?")){
                excluirMensagem(i);
                linha.remove();
            }
        });
        tabela.appendChild(linha);

        // linha.addEventListener("click", function(){
        //     linha.classList.remove("naoLida");
        //     salvarComoLida(msg);
        // });

        tabela.appendChild(linha);

    });
};


//excluir mensagens
function excluirMensagem(index) {
  let mensagens = JSON.parse(localStorage.getItem("mensagens")) || [];
  let mensagemRemovida = mensagens[index];
  let idMensagem = mensagemRemovida.email + mensagemRemovida.mensagem;

  let excluidas = JSON.parse(localStorage.getItem("excluidas")) || [];
  excluidas.push(idMensagem);
  localStorage.setItem("excluidas", JSON.stringify(excluidas));

  mensagens.splice(index, 1);
  localStorage.setItem("mensagens", JSON.stringify(mensagens));
}

function salvarComoLida(msg) {
  let visualizadas = JSON.parse(localStorage.getItem("visualizadas")) || [];
  let idMensagem = msg.email + msg.mensagem;

  if (!visualizadas.includes(idMensagem)) {
    visualizadas.push(idMensagem);
    localStorage.setItem("visualizadas", JSON.stringify(visualizadas));
  }
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
