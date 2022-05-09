Feature: Anadir miembro, modificar miembro, modificar perfil, invitar personas staff, reenviar invitacion
  Como usuario quiero administrar los miembros de ghost

@user1 @web 
Scenario: Anadir miembro y verificacion del mismo
  Given I login on Ghost page with "<ADMIN1>" and "<PASSWORD1>" 
  Then I send a signal to user 2 containing "login1 complete"
  When I click members
  And I click on the button new member
  And I enter nombre "<MEMBER_NAME_1>"
  And I enter apellido "<MEMBER_EMAIL_1>"
  And I enter label "<MEMBER_LABEL_1>"
  And I enter note "<MEMBER_NAME_1>"
  And I click Save
  And I send a signal to user 1 containing "member create !"

@user2 @web 
Scenario: Verificacion de usuario creado
  Given I login on Ghost page with "<ADMIN1>" and "<PASSWORD1>"
  Then I send a signal to user 1 containing "login2 complete"
  And I wait for 7 seconds
  And I click members