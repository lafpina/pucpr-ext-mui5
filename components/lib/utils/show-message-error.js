const showMessageError = (eMessage, eMessage2) => {
  {
    console.log("===================== ERROR MESSAGE ================");
    console.log("STATUS: ", eMessage.fetchStatus);
    // console.log("URL: ", eMessage.fetchUrl);
    // console.log("QS: ", eMessage.fetchQs);
    // console.log("HEADER: ", eMessage.fetchHeader);
    console.log("====================================================");
    console.log("===================== ERROR MESSAGE 2 ==============");
    console.log("STATUS: ", eMessage2.fetchStatus);
    // console.log("URL: ", eMessage2.fetchUrl);
    // console.log("HEADER: ", eMessage2.fetchHeader);
    console.log("====================================================");
  }
};

export default showMessageError;
