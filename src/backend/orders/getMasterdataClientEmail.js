// import getOption from "../vtex-apis/get-option";
// import getURL from "../vtex-apis/get-url";

import getOption from "../api/getOption";
import getURL from "../api/getURL";

const getMasterdataClientEmail = async (vtexOrder) => {
  let vtexEmail = [];
  let userProfileId = vtexOrder.clientProfileData.userProfileId;

  let url = getURL("masterdata", userProfileId);
  let options = getOption("masterdata");

  let res = await fetch(url, options);

  if (res.ok) {
    let data = await res.json();
    vtexEmail = JSON.parse(JSON.stringify(data));
    if (vtexEmail[0] > '') {
      console.log('vtexEmail:', vtexEmail)
    } else {
      vtexEmail[0] = ''
    }

    return vtexEmail;
  } else {
    console.log(res)
    console.log("Problema ao acessar o Masterdata!")
    return null;
  }
};

export default getMasterdataClientEmail;
