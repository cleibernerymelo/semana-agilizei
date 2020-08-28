Feature: Cadastro

    Como utilizador, desejo realizar um cadastro. Para que eu possa aceder à aplicação

Scenario: Cadastro de usuário no site
    Given que acesso o site
    When informar meus dados
    And salvar
    Then devo ser cadastrado com sucesso


# Given -> Contexto
# When  -> Ação
# And   -> Continuidade da ação
# Then  -> Resultado esperado