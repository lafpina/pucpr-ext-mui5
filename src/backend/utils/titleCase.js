const titleCase = (nameToConvert) => {

  if (nameToConvert != null) {
    let name = removerAcentos(nameToConvert);
    let text = name.trim();
    if (text != " ") {
      return text
        .toLowerCase()
        .split(" ")
        .map((word) => {
          if (word[0]) {
            return word[0].toUpperCase() + word.slice(1);
          }
        })
        .join(" ");
    }
    return "-";
  } else {
    console.log('******* Foi enviado um nome null !!!!', nameToConvert)
    return nameToConvert
  }
};

export default titleCase;

function removerAcentos(newStringComAcento) {
  var string = newStringComAcento;
  var mapaAcentosHex = {
    a: /[\xE0-\xE6]/g,
    e: /[\xE8-\xEB]/g,
    i: /[\xEC-\xEF]/g,
    o: /[\xF2-\xF6]/g,
    u: /[\xF9-\xFC]/g,
    c: /\xE7/g,
    n: /\xF1/g,
  };

  for (let letra in mapaAcentosHex) {
    var expressaoRegular = mapaAcentosHex[letra];
    string = string.replace(expressaoRegular, letra);
  }

  return string;
}
