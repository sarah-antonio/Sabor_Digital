// Importa a biblioteca Multer, responsável pelo upload de arquivos
const multer = require('multer');

// Importa o módulo Path do Node.js para manipulação de caminhos de arquivos e pastas
const path = require('path');

// Configura a forma como os arquivos serão armazenados
const storage = multer.diskStorage({

    // Define a pasta onde os arquivos enviados serão salvos
    destination: (req, file, cb) => {

        // Define o diretório uploads localizado um nível acima da pasta atual
        cb(null, path.resolve(__dirname, '..', 'uploads'));

    },

    // Define o nome que será atribuído ao arquivo salvo
    filename: (req, file, cb) => {

        // Cria um nome único utilizando a data/hora atual + nome original do arquivo
        const nomeArquivo = Date.now() + '-' + file.originalname;

        // Retorna o nome gerado para o Multer salvar o arquivo
        cb(null, nomeArquivo);

    }

});

// Exporta a configuração do Multer para ser utilizada em outras partes do sistema
module.exports = multer({
    storage
});