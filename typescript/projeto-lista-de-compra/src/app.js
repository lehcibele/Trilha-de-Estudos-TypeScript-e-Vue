// Selecionando elementos do DOM
var formularioItem = document.getElementById('formularioItem');
var listaItens = document.getElementById('listaItens');
var inputItem = document.getElementById('item');
// Carregando itens do localStorage
var carregarItens = function () {
    var itens = localStorage.getItem('itens');
    return itens ? JSON.parse(itens) : [];
};
// Salvando itens no localStorage
var salvarItens = function (itens) {
    localStorage.setItem('itens', JSON.stringify(itens));
};
// Adicionando um novo item
var adicionarItem = function (nome) {
    var itens = carregarItens();
    var novoItem = {
        id: new Date().toISOString(),
        nome: nome
    };
    itens.push(novoItem);
    salvarItens(itens);
};
// Removendo um item pelo ID
var removerItem = function (id) {
    var itens = carregarItens();
    var itensAtualizados = itens.filter(function (item) { return item.id !== id; });
    salvarItens(itensAtualizados);
};
// Editando um item pelo ID
var editarItem = function (id, novoNome) {
    var itens = carregarItens();
    var item = itens.find(function (item) { return item.id === id; });
    if (item) {
        item.nome = novoNome;
        salvarItens(itens);
    }
};
// Renderizando a lista de itens
var renderizarItens = function () {
    var itens = carregarItens();
    listaItens.innerHTML = '';
    itens.forEach(function (item) {
        var listItem = document.createElement('li');
        listItem.className = 'list-group-item';
        listItem.textContent = item.nome;
        listaItens.appendChild(listItem);
        // Adicionando eventos para editar e remover o item
        listItem.addEventListener('dblclick', function () {
            var novoNome = prompt('Editar item:', item.nome);
            if (novoNome !== null)
                editarItem(item.id, novoNome);
            renderizarItens();
        });
    });
};
// Inicializando a aplicação
formularioItem.addEventListener('submit', function (e) {
    e.preventDefault();
    var nome = inputItem.value.trim();
    if (nome) {
        adicionarItem(nome);
        inputItem.value = '';
        renderizarItens();
    }
});
// Renderizando itens ao carregar a página
renderizarItens();
