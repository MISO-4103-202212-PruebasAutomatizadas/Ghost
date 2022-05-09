Feature: Creación de un nuevo tag
  Como usuario quiero crear un tag

@user1 @web 
Scenario: Creación de un tag exitoso
  Given I login on Ghost page with "moralejov@gmail.com" and "abcd1234*$" 
  When I create a new tag with "test6" name and "test6" description  
  And I find a tag with "test6" name
  And I update a tag with "test6" slug and "update description" description
  And I deleted a tag with "test6" slug
  Then I wait for 20 seconds