// set endpoint and your access key

async function isClientEmailValid(email) {
  var access_key = "03c615420d86b408c5ee0e801d467829";

  let url = `http://apilayer.net/api/check?access_key=${access_key}&email=${email}`;

  let res = await fetch(url);

  if (res.ok) {
    const data = await res.json();
    const result = JSON.parse(JSON.stringify(data));


    console.log("----------------------");
    console.log("email:", email);
    console.log(result.format_valid);
    console.log(result.smtp_check);
    console.log(result.score);
    console.log("----------------------");

    if (!result.format_valid || !result.smtp_check) {
      return false;
    } else {
      return true;
    }
  } else {
    return true;
  }
}

export default isClientEmailValid;
