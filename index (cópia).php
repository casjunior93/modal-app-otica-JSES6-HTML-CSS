<?php
include_once "conexao.php";

    // Seleciona todos os registros da tabela:
    $resultado_produtos = mysqli_query($conn, "SELECT * FROM tb_produtos_variacao_opcoes_com");
    $resultado_opcoes = mysqli_query($conn, "SELECT * FROM tb_produtos_variacao_opcoes");

    // Retorna todos os registros:
    $dataComb = mysqli_fetch_all($resultado_produtos, MYSQLI_ASSOC);
    $dataOpc = mysqli_fetch_all($resultado_opcoes, MYSQLI_ASSOC);

    $dados = [
        $dataComb,
        $dataOpc
    ];

    // Escreve o resultado JSON em arquivo:
    // file_put_contents("json/combinacoes.json", json_encode($dataComb));
    // file_put_contents("json/opcoes.json", json_encode($dataOpc));
    file_put_contents("json/opcoes3.json", json_encode($dados));


    ?>

    <!DOCTYPE html>
    <html>

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width">
        <title>Ótica</title>

        <link rel="stylesheet" href="css/reset.css">
        <link rel="stylesheet" href="css/style.css">
        <link href="https://fonts.googleapis.com/css?family=Montserrat&display=swap" rel="stylesheet">
    </head>

    <body>

        <section id="caixa">
            <div class="opcoes" id = "tipo">
                <div class="caixaDetexto">
                    <p class="texto">Escolha o tipo</p>
                </div>
                <ul>
                    <!-- <li id="multifocal" class="li">
                        <p class="texto">Multifocal</p>
                        <p class = "descricao">Lente com três campos de visao.</p>
                    </li> -->
                </ul>
            </div><div class="opcoes" id = "espessura"><div class="caixaDetexto">
                    <p class="texto">Escolha a espessura</p>
                </div>
                <ul>
                    <!-- <li id="normal" class="li">
                        <p class="texto">Normal</p class="texto">
                        <p class = "descricao">Miopia de 0 a -2 graus <br>
                            Hipermetropia de 0 a +2 graus <br>
                            Astigmatismo de 0 a -2 graus</p>
                    </li> -->
                </ul>
            </div><div class="opcoes" id="tratamento"><div class="caixaDetexto">
                    <p class="texto">Escolha o tratamento</p>
                </div>
                <ul>
                    <!-- <li id="antirreflexo" class="li">
                            <p class="texto">Antirreflexo</p>
                            <p class = "descricao">Ofusca reflexo, fácil de limpar</p>
                    </li> -->
                </ul>
            </div><div class="opcoes" id="efeito"><div class="caixaDetexto">
                    <p class="texto">Escolha o efeito</p>
                </div>
                <ul>
                    <!-- <li id="transitions" class="li">
                            <p class="texto">Transitions</p>
                            <p class = "descricao">Efeito que escure a lente ao sol da marca Essilor</p>
                    </li> -->
                </ul>
            </div>
            <div id="respostaSemCombinacaoCaixaTexto">
                <p class="texto">Combinação não disponível</p>
            </div>

            <div id="rodape">
                <div id=botaoSomenteArmacao>
                    <button type="submit" class="armacaoSomente"> Somente <wbr> armação </button>
                </div><div id = "precoTotal">
                    <ul>
                        <li class = "mostraValores">
                            <p class="texto">Armação</p>
                            <p id="precoArmacao" class="precoP">R$0,00</p>
                        </li><li class = "mostraValores">
                            <p class="texto">Óculos</p>
                            <p id = "precoComb" class="precoP">R$ ---</p>
                        </li><li class = "mostraValores">
                            <p class="texto">Total</p>
                            <p id="precoFinal" class="precoP">R$ ---</p>
                        </li>
                </div><div id = "botaoAdicionarCarrinho">
                <form action="recebe.php" method="post">
                    <input type="hidden" id="id" name = "id"/>
                    <input type="hidden" id="valor" name = "valor"/>
                    <input type="submit" class="adicionarCarrinho" value="Comprar" />
                </div>
            </div>

        </section>

        <script src="js/imprimeOpcoes.js"></script>

    </body>

    </html>