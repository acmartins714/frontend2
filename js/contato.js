// 0. Verificar se o usuário está logado

window.onload = function(){

    let usuarioLogado = this.localStorage.getItem("usuarioLogado")

    if(!usuarioLogado) {
        alert("Você precisa fazer o login para acessar essa página.")
        window.location.href = "admin.html";
    }

    // 1. Selecionar o formulário e o botão
    const formulario = document.getElementById('formulario-contato');
    const botaoEnviar = document.getElementById('botao-enviar');
    const dadosObjetoDiv = document.getElementById('dados-objeto');

    // 2. Adicionar um "ouvinte de evento" (event listener) ao formulário para o evento de submissão
    formulario.addEventListener('submit', function(evento) {
        // A função de callback será executada quando o botão Enviar for clicado
        
        // 3. O evento.preventDefault() é importante! Ele impede o comportamento padrão do navegador 
        //    de tentar enviar o formulário e recarregar a página.
        evento.preventDefault(); 
        
        // 4. Capturar os valores dos campos usando seus IDs
        const nomeCampo = document.getElementById('nome').value;
        const emailCampo = document.getElementById('email').value;
        const mensagemCampo = document.getElementById('msg').value;

        // 5. Gerar o objeto no formato solicitado
        let mensagem = {
            nome: nomeCampo, // Corrigido a sintaxe do objeto
            email: emailCampo,
            mensagem: mensagemCampo
        };

        // 6. O objeto 'mensagem' agora contém os dados! Você pode usá-lo para:
        // a) Exibir no console (útil para debug)
        console.log("Objeto Mensagem Gerado:", mensagem);

        // b) Exibir o objeto gerado na tela para o usuário (como prova)
        // alert("Objeto Mensagem Gerado:" + JSON.stringify(mensagem));
        localStorage.setItem("mensagem", JSON.stringify(mensagem));
        
        // c) Enviar para um servidor usando fetch() ou XMLHttpRequest, etc.
        inserirMensagem(mensagem);
        window.location.href = "mensagens.html";
        
        // Opcional: Limpar o formulário após a submissão
        formulario.reset(); 

    });
};
 
