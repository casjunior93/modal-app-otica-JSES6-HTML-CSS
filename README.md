# Aplicação para escolher combinações de configurações de óculos em uma loja virtual.

- Grupos: Cada grupo contém as suas opções. São 4 grupos: tipo, espessura, tratamento e efeito.

# Funções

- clicandoOpcao(grupo)

Ativa o escutador de eventos nas opções.
Adiciona ou remove o estilo de clicado nas opções.
Guarda variáveis que mudam o estilo depois de o JS ter renderizado todas as opções.
Ativa a função atualizaVariavei().

- imprimindoOpcoesNoHtml(grupo, id do grupo)

Renderiza as opções no HTML.
Os valores default escondem as opções no início.

- atualizaVariaveis()

Atualiza todas as variáveis. Se as combinações forem possíveis, mostra o botão Comprar. Se não forem possíveis, esconde o botão Comprar e mostra o aviso de erro.

- imprimeHTMLPrecoFinal(valor da Armacao, valor da Combinação)

Imprime no HTML o valor total da combinação.

- imprimeHTMLPrecoCom(valor da combinação)

Imprime o preço da combinação.

- inputValue( id da combinação, valor total)

Imprime os valores nos input do botão Comprar.

# Combinação não disponível

Visão simples/Fina/Antirreflexo Duravision Silver/Incolor
