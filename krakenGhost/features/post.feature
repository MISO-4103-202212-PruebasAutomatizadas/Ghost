Feature: Creación, publicación, configuración y borrado de Posts
  Como usuario quiero crear y publicar un post para que esté disponible a los visitantes de Ghost

@user1 @web 
Scenario: Creación y publicación inmediata de Post exitosa
  Given I login on Ghost page with "<ADMIN1>" and "<PASSWORD1>" 
  When I create a Post with "<POSTTITLE>" and "<POSTDESC>"
  And I publish a Post 
  And I wait for 1 seconds
  Then I expect a published Post from settings with "<POSTTITLE>" and "<POSTDESC>"

@user2 @web 
Scenario: Creación y publicación programada de Post exitosa
  Given I login on Ghost page with "<ADMIN1>" and "<PASSWORD1>" 
  When I create a Post with "<POSTTITLE>" and "<POSTDESC>"
  And I schedule a Post to be published in "<MINUTESADDPUBLISHPOST>" minutes
  And I wait for 1 seconds
  Then I expect that Post created from settings is not published yet

@user3 @web 
Scenario: Despublicar un post de manera exitosa
  Given I login on Ghost page with "<ADMIN1>" and "<PASSWORD1>" 
  When I create a Post with "<POSTTITLE>" and "<POSTDESC>"
  And I publish a Post 
  And I wait for 1 seconds
  And I unpublished a Post 
  And I wait for 1 seconds
  Then I expect that Post created from settings is not published yet

@user4 @web 
Scenario: Asignar tag a Post y publicar actualización
  Given I login on Ghost page with "<ADMIN1>" and "<PASSWORD1>" 
  When I Create a tag "<TAGTEST1>"
  And I create a Post with "<POSTTITLE>" and "<POSTDESC>"
  And I add tag "<TAGTEST1>" to Post
  And I publish a Post 
  And I wait for 1 seconds
  Then I expect a published Post from settings with associated tag "<TAGTEST1>" 

@user5 @web 
Scenario: Eliminar Post satisfactoriamente
  Given I login on Ghost page with "<ADMIN1>" and "<PASSWORD1>" 
  When I find a Post with "<POSTTITLE>"
  And I delete a Post 
  Then I expect that Post deleted is not exists