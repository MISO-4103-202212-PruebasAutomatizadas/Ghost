Feature: Gestion miembros de ghost
  Como usuario quiero gestionar los miembros en ghost para usarse en la creacion de de un miembro

@user1 @web
Scenario: Creación de un miembro exitoso
    Given I login on Ghost member with "<ADMIN1>" and "<PASSWORD1>"
    And I wait for 5 seconds
    When I create a new member with "test1" name and "test1@gmail.com" email and "test dev" note
    Then I wait for 2 seconds