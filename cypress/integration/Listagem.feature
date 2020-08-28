Feature: Listagem

    Como utilizador, desejo aceder a listagem para que possa visualizar meus dados de cadastro

Scenario: Listagem sem registros
    Given que o site não possui registros
    When acessar a listagem
    Then devo visualizar a listagem vazia

Scenario: Listagem com apenas um registro
    Given que o site possui apenas um registo
    When acessar a listagem
    Then devo visualizar apenas um registo