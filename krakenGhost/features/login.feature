Feature: Creación, autenticación, y cerrar sesion de un usuario.
  Como usuario quiero crear un usuario, iniciar sesion como administrador y cerrar session.

@user1 @web 
Scenario: Creación de cuenta exitosa
  Given I signup on Ghost page with "<ADMIN1>" and "<PASSWORD1>" 
  When I create a Post with "<POSTTITLE>" and "<POSTDESC>"
  And I publish a Post 
  And I wait for 1 seconds
  Then I expect a published Post from settings with "<POSTTITLE>" and "<POSTDESC>"