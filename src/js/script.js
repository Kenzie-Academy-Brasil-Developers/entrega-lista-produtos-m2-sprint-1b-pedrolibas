const ul = document.querySelector(".containerListaProdutos ul")
const price = document.getElementById("precoTotal")
const h2 = document.querySelector(".containerListaProdutos h2")
const ulCarrinho = document.querySelector(".lista__carrinho")

function listarProdutos(arr) {
    for (let i = 0; i < arr.length; i++) {
        let produto = arr[i]
        criarCard(produto)
    }
}

listarProdutos(produtos)

function listarProdutosFiltrados(arr) {
    ul.innerHTML = ""
    for (let i = 0; i < arr.length; i++) {
        let produto = arr[i]
        criarCard(produto)
    }
}

function criarCard(produto) {
    const li = document.createElement("li")

    const img = criarCardImg(produto)
    const h3 = criarCardH3(produto)
    const p = criarCardP(produto)
    const span = criarCardSpan(produto)
    const ol = criarCardOl(produto)
    const button = criarCardButton(produto)

    li.append(img, h3, span, ol, p, button)

    ul.append(li)
}

function criarCardImg(produto) {
    const img = document.createElement("img")

    img.src = produto.img
    img.alt = `Imagem ${produto.nome}`

    return img
}

function criarCardH3(produto) {
    const h3 = document.createElement("h3")

    h3.innerText = produto.nome

    return h3
}

function criarCardP(produto) {
    const p = document.createElement("p")

    if (produto.promocao === true) {
        p.innerText = `R$ ${produto.precoPromocao}`
    } else {
        p.innerText = `R$ ${produto.preco}`
    }
    return p
}

function criarCardSpan(produto) {
    const span = document.createElement("span")

    span.innerText = produto.secao

    return span
}

function criarCardOl(produto) {
    const ol = document.createElement("ol")
    const li = produto.componentes.forEach((alimento, index) => {
        const liAlimento = document.createElement("li")
        liAlimento.innerText = `${index+1}.${alimento}`
        ol.append(liAlimento)
    })
    return ol
}

const produtosCarrinho = []

function criarCardButton(produto) {
    const btn = document.createElement("button")

    btn.innerText = "Comprar"

    btn.addEventListener("click", () => {
        produtosCarrinho.push(produto)
        listarProdutosCarrinho(produtosCarrinho)
        soma(produtosCarrinho)
        remover()
    })
    return btn
}
//////////////////////////////////////

function listarProdutosCarrinho(arr) {
    ulCarrinho.innerHTML = ""
    if (arr.length > 0) {
        document.querySelector(".produto__carrinho img").src = "";
        document.querySelector(".produto__carrinho img").alt = "";
        document.querySelector(".produto__carrinho p").innerText = "";
        document.querySelector(".produto__carrinho").classList.add("cheio")
    } else {
        document.querySelector(".produto__carrinho img").src = "src/img/shopping-bag.png";
        document.querySelector(".produto__carrinho img").alt = "icone de bolsa de shopping";
        document.querySelector(".produto__carrinho p").innerText = "Por enquanto não temos produtos no carrinho";
        document.querySelector(".produto__carrinho").classList.remove("cheio")
    }
    arr.forEach((produto) => {
        criarCardCarrinho(produto)
    })
}

listarProdutos(produtosCarrinho)

function criarCardCarrinho(produto) {
    const li = document.createElement("li")
    const div = document.createElement("div")

    const img = cardCarrinhoImg(produto)
    const h3 = cardCarrinhoH3(produto)
    const span = cardCarrinhoSpan(produto)
    const p = cardCarrinhoP(produto)
    const btn = cardCarrinhoBtn(produto)

    div.append(h3, span, p, btn)
    li.append(img, div)
    ulCarrinho.appendChild(li)
}

function cardCarrinhoImg(produto) {
    const img = document.createElement("img")

    img.src = produto.img
    img.alt = produto.nome

    return img
}

function cardCarrinhoH3(produto) {
    const h3 = document.createElement("h3")

    h3.innerText = produto.nome

    return h3
}

function cardCarrinhoSpan(produto) {
    const span = document.createElement("span")

    span.innerText = produto.secao

    return span
}

function cardCarrinhoP(produto) {
    const p = document.createElement("p")

    if (produto.promocao === true) {
        p.innerText = `R$ ${produto.precoPromocao}`
    } else {
        p.innerText = `R$ ${produto.preco}`
    }
    return p
}

function cardCarrinhoBtn(produto) {
    const btn = document.createElement("button")
    btn.innerText = "remover produto"

    btn.classList.add("btn")

    return btn
}

function remover() {
    const btn = document.getElementsByClassName("btn")
    for (let i = 0; i < btn.length; i++) {
        btn[i].addEventListener("click", () => {
            produtosCarrinho.splice(i, 1)
            listarProdutosCarrinho(produtosCarrinho)
            soma(produtosCarrinho)
            remover()
        })
    }
}
//////////////////////////////////////
const btnTodos = document.querySelector(".estiloGeralBotoes--mostrarTodos")
const btnHort = document.querySelector(".estiloGeralBotoes--filtrarHortifruti")
const btnPani = document.querySelector(".estiloGeralBotoes--filtrarPanificadora")
const btnLat = document.querySelector(".estiloGeralBotoes--filtrarLaticinios")

btnHort.addEventListener("click", () => {
    const produtoFiltrado = filtarProdutos(produtos, "Hortifruti")
    listarProdutosFiltrados(produtoFiltrado)
})

btnPani.addEventListener("click", () => {
    const produtoFiltrado = filtarProdutos(produtos, "Panificadora")
    listarProdutosFiltrados(produtoFiltrado)
})

btnLat.addEventListener("click", () => {
    const produtoFiltrado = filtarProdutos(produtos, "Laticinio")
    listarProdutosFiltrados(produtoFiltrado)
})

btnTodos.addEventListener("click", () => {
    ul.innerHTML = ""
    listarProdutos(produtos)
})

function filtarProdutos(listarProdutos, secao) {
    const produtosFiltrados = listarProdutos.filter((produto) => {
        return produto.secao === secao
    })
    return produtosFiltrados;
}

function filtarProdutosBusca(listarProdutos, nome) {
    const produtosFiltrados = listarProdutos.filter((produto) => {
        return produto.nome.toLowerCase() === nome.toLowerCase() || produto.secao.toLowerCase() === nome.toLowerCase() || produto.categoria.toLowerCase() === nome.toLowerCase()
    })
    return produtosFiltrados;
}

const btnPesquisar = document.querySelector(".estiloGeralBotoes--botaoBuscaPorNome")

const input = document.querySelector(".campoBuscaPorNome")

btnPesquisar.addEventListener("click", () => {
    h2.innerText = ""
    const produtoPesquisado = input.value
    const produtoFiltrado = filtarProdutosBusca(produtos, produtoPesquisado)
    if (produtoFiltrado.length <= 0) {
        h2.innerText = "Produto não encontrado"
    }
    listarProdutosFiltrados(produtoFiltrado)
})

/////////////////////////////////////////

function soma(arr) {
    const pValor = document.querySelector(".total__quantidade span")
    const spanValor = document.querySelector(".total__soma span")

    pValor.innerText = ""
    spanValor.innerText = ""

    let resultado = 0
    arr.forEach((elem) => {
        if (elem.promocao === true) {
            resultado += elem.precoPromocao
        } else {
            resultado += elem.preco
        }
    })

    pValor.innerText = arr.length
    spanValor.innerText = resultado
}