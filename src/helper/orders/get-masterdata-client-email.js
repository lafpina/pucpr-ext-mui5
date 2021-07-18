// import getOption from "../vtex-apis/get-option";
// import getURL from "../vtex-apis/get-url";

import getOption from "../lib/api/getOption";
import getURL from "../lib/api/getURL";

const getMasterdataClientEmail = async (vtexOrder) => {
  let vtexEmail = [];
  let userProfileId = vtexOrder.clientProfileData.userProfileId;

  let url = getURL("masterdata", userProfileId);
  let options = getOption("masterdata");

  let res = await fetch(url, options);

  if (res.ok) {
    let data = await res.json();
    vtexEmail = JSON.parse(JSON.stringify(data));
    return vtexEmail;
  } else {
    return null;
  }
};

export default getMasterdataClientEmail;
