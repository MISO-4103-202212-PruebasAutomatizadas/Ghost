Feature: Gestion de tags de ghost
  Como usuario quiero gestionar los tags en ghost para usarse en la creacion de post

  @user1 @web
  Scenario: Creación de un tag exitoso
    Given I login on Ghost page with "<ADMIN1>" and "<PASSWORD1>"
    When I wait for 5 seconds
    And I create a new tag with "test1" name and "test1" description
    Then I wait for 1 seconds

  @user2 @web
  Scenario: Encontrar de un tag creado
    Given I login on Ghost page with "<ADMIN1>" and "<PASSWORD1>"
    When I wait for 5 seconds
    And I create a new tag with "test2" name and "test2" description
    And I wait for 2 seconds
    And I find a tag with "test2" name
    Then I wait for 1 seconds

  @user3 @web
  Scenario: Actualizacion de un tag exitosa
    Given I login on Ghost page with "<ADMIN1>" and "<PASSWORD1>"
    When I wait for 5 seconds
    And I create a new tag with "test3" name and "test3" description
    And I wait for 2 seconds
    And I find a tag with "test3" name
    And I update a tag with "test3" slug and "update description" description
    Then I wait for 1 seconds

  @user4 @web
  Scenario: Eliminacion de un tag exitoso
    Given I login on Ghost page with "<ADMIN1>" and "<PASSWORD1>"
    When I wait for 5 seconds
    And I create a new tag with "test4" name and "test4" description
    And I wait for 2 seconds
    And I find a tag with "test4" name
    And I wait for 2 seconds
    And I deleted a tag with "test4" slug
    Then I wait for 1 seconds