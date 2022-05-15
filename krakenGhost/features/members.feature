Feature: Gestion miembros de ghost
  Como usuario quiero gestionar los miembros en ghost para usarse en la creacion de de un miembro

@user1 @web
Scenario: Creación de un miembro exitoso
    Given I login on Ghost member with "<ADMIN1>" and "<PASSWORD1>"
    And I wait for 5 seconds
    When I create a new member with "test1" name and "test1@gmail.com" email and "test dev" note
    Then I wait for 2 seconds

@user2 @web 
Scenario: Encontrar el miembro creado
    Given I login on Ghost member with "<ADMIN1>" and "<PASSWORD1>" 
    When I wait for 10 seconds
    Then I find a member with "test1@gmail.com" email

@user3 @web
Scenario: Actualizacion de un miembro exitosamente
  Given I login on Ghost page with "<ADMIN1>" and "<PASSWORD1>"
  And I wait for 10 seconds
  When I create a new member with "test3" name and "test3@gmail.com" email and "test dev3" note
  Then I wait for 5 seconds
  And I find a member with "test3@gmail.com" email
  And I wait for 5 seconds
  And I update a member with "update information dev 3" note

@user4 @web
Scenario: Eliminacion de un member exitoso
  Given I login on Ghost page with "<ADMIN1>" and "<PASSWORD1>"
  And I wait for 15 seconds
  When I create a new member with "test4" name and "test4@gmail.com" email and "test dev4" note
  Then I wait for 4 seconds
  And I find a member with "test4@gmail.com" email
  Then I wait for 4 seconds
  And I deleted a member with "test4@gmail.com" email

@user5 @web
Scenario: Buscar un miembro creado
    Given I login on Ghost member with "<ADMIN1>" and "<PASSWORD1>" 
    When I wait for 20 seconds
    Then I search a member with "test1@gmail.com" email