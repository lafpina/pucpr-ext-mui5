import getOption from "../../helper/vtex-apis/get-option";
import getURL from "../../helper/vtex-apis/get-url";

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
