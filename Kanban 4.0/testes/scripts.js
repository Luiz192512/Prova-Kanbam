// Importa a biblioteca axios (certifique-se de incluir no seu projeto)
const axios = require('axios');
const readline = require('readline');

// Configura o readline para capturar entrada do usuário
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Chaves de API do Trello
const apiKey = '96f24f62e0436e0dceeb17149f0431d6';
const apiToken = 'ATTAad65ccae671d3f7dbfb75ffa9b141f1c3597df1e5cb0b5eaa8d59fcb1fc9f70cF1169CC0';

// Função para criar um quadro (kanban) no Trello
async function criarQuadro(nomeDoQuadro) {
    try {
        const response = await axios.post(`https://api.trello.com/1/boards/?key=${apiKey}&token=${apiToken}`, {
            name: nomeDoQuadro
        });
        console.log('Quadro criado com sucesso!');
        console.log('ID do Quadro:', response.data.id);
        console.log('Link do Quadro:', response.data.shortUrl);
    } catch (error) {
        console.error('Erro ao criar o quadro:', error.response.data);
    }
}

// Função para solicitar o nome do quadro ao usuário
function solicitarNomeDoQuadro() {
    rl.question('Digite o nome do quadro: ', (nomeDoQuadro) => {
        criarQuadro(nomeDoQuadro);
        rl.close();
    });
}

// Chama a função para solicitar o nome do quadro
solicitarNomeDoQuadro();
