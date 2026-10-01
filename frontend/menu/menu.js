const URL_API = 'http://localhost:3001';

// Verifica a conexão com o servidor backend ao carregar a página
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const resposta = await fetch(`${URL_API}/produto/listar`);
        if (resposta.ok) {
            console.log('Servidor do Pet Shop conectado com sucesso!');
        }
    } catch (erro) {
        console.warn('Aviso: Não foi possível conectar ao servidor backend do Pet Shop em ' + URL_API);
    }
});