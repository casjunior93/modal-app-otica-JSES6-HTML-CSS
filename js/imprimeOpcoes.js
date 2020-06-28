// fazendo requisições via Ajax ao arquivo opcoes3.json
var xmlhttp = new XMLHttpRequest();

xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var opcTabela = JSON.parse(this.responseText);

        //declara variaveis
        var ultimoLiClicadoTipo;
        var ultimoLiClicadoEspessura;
        var ultimoLiClicadoTratamento;
        var ultimoLiClicadoEfeito;
        var clicado = false;
        var idVariacaoUltimoLiTipo;
        var idVariacaoUltimoLiEspessura;
        var idVariacaoUltimoLiTratamento;
        var idVariacaoUltimoLiEfeito;
        var tipo;
        var tipoClicado = false;
        var espessura;
        var espessuraClicado = false;
        var tratamento;
        var tratamentoClicado = false;
        var efeito;
        var efeitoClicado = false;      
        var valorArmacao = 80;
        var precoArmacao = document.querySelector("#precoArmacao");
        precoArmacao.textContent = "R$" + parseInt(valorArmacao).toFixed(2);
        var precoComb = document.querySelector("#precoComb");
        var precoFinal = document.querySelector("#precoFinal");
        var produtoId = document.querySelector('#id');
        var precoTotal = document.querySelector('#valor');
        var botaoComprarAutorizado = document.querySelector(".adicionarCarrinho");
        var respostaSemCombinacao = document.querySelector("#respostaSemCombinacaoCaixaTexto");
        var grupoEspessura = document.querySelector("#espessura");
        grupoEspessura.style.display = "none";
        var grupoTratamento = document.querySelector("#tratamento");
        grupoTratamento.style.display = "none";
        var grupoEfeito = document.querySelector("#efeito");
        grupoEfeito.style.display = "none";

        function buscandoGrupo(grupo) {
            return opcTabela[1].filter( obj => obj.id_variacao === grupo);
        }
        function idCombinacao() {
            return tipo+":"+espessura+":"+tratamento+":"+efeito;
        }
        function buscaCombinacoes() {
            return opcTabela[0].find( obj => obj.idcomb.substr(0,11) === idCombinacao() );
            }
        function buscaIdPeloNomeDaVariacao(nomeDavariacao) {
            return opcTabela[1].find( obj => obj.opcao === nomeDavariacao);
        }

        function imprimindoOpcoesNoHtml(grupoNomeDaClase, idDoGrupo ) {
            let td = grupoNomeDaClase;
            let opcGrupo = document.querySelector("#"+td+" ul");
            let opcoes = buscandoGrupo(idDoGrupo);

            for(i=0; i < opcoes.length; i++) {

                opcGrupoLi = document.createElement("li");
                opcGrupoLi.classList.add("li");
                opcGrupoLi.setAttribute("id", "id_"+opcoes[i].id);
                opcGrupo.appendChild(opcGrupoLi);

                opcGrupoLiP = document.createElement("p");
                opcGrupoLiP.classList.add("texto");        
                opcGrupoLiP.textContent = opcoes[i].opcao;
                opcGrupoLi.appendChild(opcGrupoLiP);
                opcGrupoLiP = document.createElement("p");
                opcGrupoLiP.classList.add("descricao");
                opcGrupoLiP.textContent = opcoes[i].descricao;
                opcGrupoLi.appendChild(opcGrupoLiP);
            }
        }

        function inputValue(obtemDados, valorSoma) {
            produtoId.value = obtemDados.id;
            precoTotal.value = valorSoma;
            
        }

        function imprimeHTMLPrecoCom(valor) {
            precoComb.textContent = "R$" + parseInt(valor).toFixed(2);
        }

        function imprimeHTMLPrecoFinal(valorArmacao, valorComb) {
    
            let Soma = parseInt(valorArmacao) + parseInt(valorComb);
            precoArmacao.textContent = "R$" + parseInt(valorArmacao).toFixed(2);
            precoFinal.textContent = "R$" + parseInt(Soma).toFixed(2);
    
            valorSoma = Soma;
        }        
        function atualizaVariaveis() {

            let obtemDados = buscaCombinacoes();
    
            if(typeof obtemDados !== "undefined") {
                imprimeHTMLPrecoCom(obtemDados.valor);
                imprimeHTMLPrecoFinal(valorArmacao, obtemDados.valor);
                inputValue(obtemDados, valorSoma);           
                botaoComprarAutorizado.style.visibility = 'visible';
                respostaSemCombinacao.style.display = 'none';
                
                console.log(idCombinacao());
            } else {
                botaoComprarAutorizado.style.visibility = 'hidden';
                precoComb.textContent = "R$ ---";
                precoFinal.textContent = "R$ ---";
                respostaSemCombinacao.style.display = 'block';
            }
        }

        function clicandoOpcao(grupo) {
            var grupoClicado = document.querySelector("#"+grupo+" ul");

            //lendo evento de clique no grupo
            grupoClicado.addEventListener("click", function(event){
                liClicado = event.target.parentNode;
                let buscaOpcaoClicada = liClicado.querySelector(".texto");
                let opcaoClicadaArray = buscaIdPeloNomeDaVariacao(buscaOpcaoClicada.textContent);

                //se houver opcao clicada, retira estilo de clicado desta opcao
                if(clicado == true) {
                    //isso acontece somente se for do mesmo grupo
                    if(idVariacaoUltimoLi == opcaoClicadaArray.id_variacao) {
                        ultimoLiClicado.classList.remove("liClicado");
                    }
                    if(idVariacaoUltimoLi != opcaoClicadaArray.id_variacao) {
                        if(opcaoClicadaArray.id_variacao == idVariacaoUltimoLiTipo) {
                            ultimoLiClicadoTipo.classList.remove("liClicado");
                        }
                        if(opcaoClicadaArray.id_variacao == idVariacaoUltimoLiEspessura) {
                            ultimoLiClicadoEspessura.classList.remove("liClicado");
                        }
                        if(opcaoClicadaArray.id_variacao == idVariacaoUltimoLiTratamento) {
                            ultimoLiClicadoTratamento.classList.remove("liClicado");
                        }
                        if(opcaoClicadaArray.id_variacao == idVariacaoUltimoLiEfeito) {
                            ultimoLiClicadoEfeito.classList.remove("liClicado");
                        }
                    }
                }

                //adiciona cor ao li clicado
                let selecionaLiQueMudaDeCor = document.querySelector("#id_"+opcaoClicadaArray.id);
                selecionaLiQueMudaDeCor.classList.add("liClicado");
 
                //guardando variaveis
                ultimoLiClicado = selecionaLiQueMudaDeCor;
                idVariacaoUltimoLi = opcaoClicadaArray.id_variacao;
                clicado = true;

                if(opcaoClicadaArray.id_variacao == "24") {
                    tipo = parseInt(opcaoClicadaArray.id);
                    ultimoLiClicadoTipo = selecionaLiQueMudaDeCor;
                    idVariacaoUltimoLiTipo = opcaoClicadaArray.id_variacao;
                    grupoEspessura.style.display = "inline-block";
                    tipoClicado = true;
                }
                if(opcaoClicadaArray.id_variacao == "25") {
                    espessura = parseInt(opcaoClicadaArray.id);
                    ultimoLiClicadoEspessura = selecionaLiQueMudaDeCor;
                    idVariacaoUltimoLiEspessura = opcaoClicadaArray.id_variacao;                    
                    grupoTratamento.style.display = "inline-block";
                    espessuraClicado = true;
                }
                if(opcaoClicadaArray.id_variacao == "30") {
                    tratamento = parseInt(opcaoClicadaArray.id);
                    ultimoLiClicadoTratamento = selecionaLiQueMudaDeCor;
                    idVariacaoUltimoLiTratamento = opcaoClicadaArray.id_variacao;                    
                    grupoEfeito.style.display = "inline-block";
                    tratamentoClicado = true;
                }
                if(opcaoClicadaArray.id_variacao == "32") {
                    efeito = parseInt(opcaoClicadaArray.id);
                    ultimoLiClicadoEfeito = selecionaLiQueMudaDeCor;
                    idVariacaoUltimoLiEfeito = opcaoClicadaArray.id_variacao;
                    efeitoClicado = true;
                }

                if(tipoClicado == true && espessuraClicado == true && tratamentoClicado == true && efeitoClicado == true) {
                    atualizaVariaveis();
                }
                
        });

        }

        //imprimindo HTML
        imprimindoOpcoesNoHtml("tipo", "24");
        imprimindoOpcoesNoHtml("espessura", "25");
        imprimindoOpcoesNoHtml("tratamento", "30");
        imprimindoOpcoesNoHtml("efeito", "32");

        //ativando o escutador de eventos nas opcoes
        clicandoOpcao("tipo");
        clicandoOpcao("espessura");
        clicandoOpcao("tratamento");
        clicandoOpcao("efeito");
    }
};
xmlhttp.open("GET", "json/opcoes3.json", true);
xmlhttp.send();