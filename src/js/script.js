const ul = document.querySelector(".containerListaProdutos ul")
const price = document.getElementById("precoTotal")
const h2 = document.querySelector(".containerListaProdutos h2")

function listarProdutos(arr) {
    for (let i = 0; i < arr.length; i++) {
        let produto = arr[i]
        criarCard(produto)
    }
    let priceTotal = 0
    produtos.forEach((produto) => {
        priceTotal += produto.preco
    })
    price.innerText = `R$ ${priceTotal},00`
}

listarProdutos(produtos)

function listarProdutosFiltrados(arr) {
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

    li.append(img, h3, span, p)

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

    p.innerText = `R$ ${produto.preco},00`

    return p
}

function criarCardSpan(produto) {
    const span = document.createElement("span")

    span.innerText = `Seção - ${produto.secao}`

    return span
}

const btn = document.querySelector(".estiloGeralBotoes--mostrarTodos")
const btnHort = document.querySelector(".estiloGeralBotoes--filtrarHortifruti")
const btnPani = document.querySelector(".estiloGeralBotoes--filtrarPanificadora")
const btnLat = document.querySelector(".estiloGeralBotoes--filtrarLaticinios")

btnHort.addEventListener("click", () => {
    ul.innerHTML = ""
    h2.innerText = ""
    const produtoFiltrado = filtarProdutos(produtos, "Hortifruti")
    listarProdutosFiltrados(produtoFiltrado)
    let priceTotal = 0
    produtoFiltrado.forEach((produto) => {
        priceTotal += produto.preco
    })
    price.innerText = `R$ ${priceTotal},00`
})

btnPani.addEventListener("click", () => {
    ul.innerHTML = ""
    h2.innerText = ""
    const produtoFiltrado = filtarProdutos(produtos, "Panificadora")
    listarProdutosFiltrados(produtoFiltrado)
    let priceTotal = 0
    produtoFiltrado.forEach((produto) => {
        priceTotal += produto.preco
    })
    price.innerText = `R$ ${priceTotal},00`
})

btnLat.addEventListener("click", () => {
    ul.innerHTML = ""
    h2.innerText = ""
    const produtoFiltrado = filtarProdutos(produtos, "Laticínio")
    listarProdutosFiltrados(produtoFiltrado)
    let priceTotal = 0
    produtoFiltrado.forEach((produto) => {
        priceTotal += produto.preco
    })
    price.innerText = `R$ ${priceTotal},00`
})

btn.addEventListener("click", () => {
    ul.innerHTML = ""
    h2.innerText = ""
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
        return produto.nome === nome
    })
    return produtosFiltrados;
}

const btnPesquisar = document.querySelector(".estiloGeralBotoes--botaoBuscaPorNome")

const input = document.querySelector(".campoBuscaPorNome")

btnPesquisar.addEventListener("click", () => {
    ul.innerHTML = ""
    h2.innerText = ""
    const produtoPesquisado = input.value

    const produtoFiltrado = filtarProdutosBusca(produtos, produtoPesquisado)
    if (produtoFiltrado.length <= 0) {
        h2.innerText = "Produto não encontrado"
    }

    listarProdutosFiltrados(produtoFiltrado)

    let priceTotal = 0
    produtoFiltrado.forEach((produto) => {
        priceTotal += produto.preco
    })
    price.innerText = `R$ ${priceTotal},00`
})