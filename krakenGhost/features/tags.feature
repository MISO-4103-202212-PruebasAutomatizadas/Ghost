Feature: Creación de un nuevo tag
  Como usuario quiero crear un tag

@user1 @web 
Scenario: Creación de un tag exitoso
  Given I login on Ghost page with "moralejov@gmail.com" and "abcd1234*$" 
  When I Create a new tag with "test3" and "test3" and "test3"
  And I wait for 2 seconds
  And I find a tag with "test3" name
  Then I wait for 5 seconds