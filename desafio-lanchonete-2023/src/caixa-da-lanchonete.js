class CaixaDaLanchonete {

    calcularValorDaCompra(metodoDePagamento, itens) {
        const cardapio = {
            cafe: 3.00,
            chantily: 1.50,
            suco: 6.20,
            sanduiche: 6.50,
            queijo: 2.00,
            salgado: 7.25,
            combo1: 9.50,
            combo2: 7.50,
        };

        const formasDePagamento = ['dinheiro', 'debito', 'credito'];
      
        if (itens.length === 0) {
            return "Não há itens no carrinho de compra!";
        }

        if (!formasDePagamento.includes(metodoDePagamento)) {
            return "Forma de pagamento inválida!";
        }


        let valorTotal = 0;
        const itensPrincipais = { 
            cafe: true,
            chantily: false,
            suco: true,
            sanduiche: true
         
         };
        
        const itensAdicionais = {
            queijo: true,
            chantily: true
        };

        const itensDoCarrinho = new Set(); 

        for (const itemInfo of itens) {
            const [item, quantidade] = itemInfo.split(',');

            if (!cardapio.hasOwnProperty(item)) {
                return "Item inválido!";
            }

            if (quantidade <= 0) {
                return "Quantidade inválida!";
            }

            if (itensPrincipais[item]) {
                itensDoCarrinho.add(item);
                valorTotal += cardapio[item] * parseInt(quantidade);
            } else if(itensAdicionais[item]){
                const itemPrincipal = this.obterItemPrincipal(item);
                if (itemPrincipal && itensDoCarrinho.has(itemPrincipal)) {
                    valorTotal += cardapio[item] * parseInt(quantidade);
                } else {
                    return "Item extra não pode ser pedido sem o principal";
                }
            }
            else {
                return "Item extra não pode ser pedido sem o principal";
            }
        }

        if (metodoDePagamento === 'dinheiro') {
            valorTotal = valorTotal * (1 - 0.05);
        } else if (metodoDePagamento === 'credito') {
            valorTotal = valorTotal * 1.03;
        }

        return `R$ ${valorTotal.toFixed(2)}`;
    }

    obterItemPrincipal(item) {
        if (item === 'chantily') {
            return 'cafe';
        } else if (item === 'queijo') {
            return 'sanduiche';
        }
        return null;
    }

}

export { CaixaDaLanchonete };
