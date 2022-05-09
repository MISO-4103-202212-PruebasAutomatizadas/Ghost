Feature: Creación, publicación, configuración y borrado de Pages

@user1 @web 
Scenario: Creación y publicación inmediata de Post exitosa
  Given I login on Ghost page with "<ADMIN1>" and "<PASSWORD1>" 
  When I create a Page with "<PAGETITLE>" and "<PAGEDESC>"
  And I publish a Page

@user2 @web 
Scenario: Despublicar un page de manera exitosa
  Given I login on Ghost page with "<ADMIN1>" and "<PASSWORD1>" 
  When I create a Page with "<PAGETITLE>" and "<PAGEDESC>"
  And I publish a Page
  And I wait for 2 seconds
  And I unpublished a Page

@user3 @web 
Scenario: Asignar tag a Page y publicar actualización
  Given I login on Ghost page with "<ADMIN1>" and "<PASSWORD1>" 
  When I Create a pagetag "<TAGTEST1>"
  When I create a Page with "<PAGETITLE>" and "<PAGEDESC>"
  And I add tag "<TAGTEST1>" to Page
  And I publish a Page 

@user4 @web 
Scenario: Eliminar Page satisfactoriamente
  Given I login on Ghost page with "<ADMIN1>" and "<PASSWORD1>" 
  When I find a Page with "<PAGETITLE>"
  And I delete a Page

@user5 @web 
Scenario: Creación y publicación programada de Page exitosa
  Given I login on Ghost page with "<ADMIN1>" and "<PASSWORD1>" 
  When I create a Page with "<PAGETITLE>" and "<PAGEDESC>"
  And I schedule a Page to be published in "<MINUTESADDPUBLISHPOST>" minutes



 