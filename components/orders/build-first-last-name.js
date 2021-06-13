export function buildFirstLastName(vFirstName, vLastName) {
  let firstName =
    vFirstName[0].toUpperCase() + vFirstName.slice(1).toLowerCase();
  let lastName = vLastName[0].toUpperCase() + vLastName.slice(1).toLowerCase();

  return firstName.concat(" " + lastName);
}
