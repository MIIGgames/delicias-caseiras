let total = parseFloat(localStorage.getItem('carrinhoTotal')) || 0;
let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

function adicionarAoCarrinho(nome, valor) {
    // Verifica se o prato já está no carrinho
    let itemIndex = carrinho.findIndex(item => item.nome === nome);
    if (itemIndex !== -1) {
        // Se o prato já estiver no carrinho, apenas incrementa a quantidade
        carrinho[itemIndex].quantidade++;
    } else {
        // Caso contrário, adiciona o novo prato ao carrinho
        carrinho.push({ nome, valor, quantidade: 1 });
    }
    // Atualiza o valor total do carrinho
    total += valor;
    // Atualiza o carrinho na interface do usuário
    atualizarCarrinho();
    atualizarValorTotalCarrinho();
    // Exibe uma mensagem informando que o item foi adicionado ao carrinho
    alert("Item adicionado ao carrinho!");
}


function removerItemDoCarrinho(index) {
    total -= carrinho[index].valor;
    carrinho.splice(index, 1);
    localStorage.setItem('carrinhoTotal', total);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    atualizarValorCarrinho();
    atualizarCarrinho();
}

function atualizarValorTotalCarrinho() {
    let valorTotal = 0;
    carrinho.forEach(item => {
        valorTotal += item.valor * item.quantidade;
    });
    console.log("Valor total do carrinho:", valorTotal);
    document.getElementById('valor-carrinho').innerText = `Total: R$ ${valorTotal.toFixed(2)}`;
}

function atualizarValorCarrinho() {
    let valorTotal = 0;
    carrinho.forEach(item => {
        valorTotal += item.valor * item.quantidade;
    });
    document.getElementById('total-carrinho').innerText = `Total: R$ ${valorTotal.toFixed(2)}`;
}

function mostrarCarrinho() {
    atualizarCarrinho();
    document.getElementById('carrinho').style.display = 'flex';
}

function fecharCarrinho() {
    document.getElementById('carrinho').style.display = 'none';
}

function atualizarCarrinho() {
    let carrinhoDiv = document.getElementById('itens-carrinho');
    carrinhoDiv.innerHTML = '';
    let valorTotal = 0;
    carrinho.forEach((item, index) => {
        carrinhoDiv.innerHTML += `<p>Item: ${item.nome} - R$ ${item.valor.toFixed(2)} x ${item.quantidade} <i class="remove-item fas fa-trash-alt" onclick="removerItemDoCarrinho(${index})"></i></p>`;
        valorTotal += item.valor * item.quantidade;
    });
    document.getElementById('total-carrinho').innerText = `Total: R$ ${valorTotal.toFixed(2)}`;
}

// Função para fechar o pedido
function fecharPedido() {
    // Verificar se o carrinho está vazio
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio. Por favor, adicione itens ao carrinho antes de fechar o pedido.");
        return; // Abortar a função se o carrinho estiver vazio
    }

    // Montar o pedido com os detalhes
    let pedido = "Pedido:\n";
    carrinho.forEach(item => {
        pedido += `${item.quantidade}x ${item.nome} - R$ ${item.valor.toFixed(2)}\n`;
    });

    // Redirecionar para o WhatsApp com os detalhes do pedido
    let url = `https://wa.me/559291356625?text=${encodeURIComponent(pedido)}`;
    window.open(url, '_blank');
}


// Fechar carrinho ao clicar fora
window.addEventListener('click', function(event) {
    const carrinho = document.getElementById('carrinho');
    const carrinhoIcon = document.querySelector('.carrinho-icon');
    if (!carrinho.contains(event.target) && event.target !== carrinhoIcon) {
        carrinho.style.display = 'none';
    }
});

// Limpar carrinho após uma hora de inatividade
setTimeout(() => {
    localStorage.removeItem('carrinhoTotal');
    localStorage.removeItem('carrinho');
    total = 0;
    carrinho = [];
    atualizarValorCarrinho();
    atualizarCarrinho();
}, 3600000); // 1 hora em milissegundos

// Atualizar valor do carrinho ao carregar a página
window.addEventListener('DOMContentLoaded', function(event) {
    atualizarValorCarrinho();
});
