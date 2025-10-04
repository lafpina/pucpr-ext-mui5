const showMessageError = (eMessage, eMessage2) => {
  {
    console.log("===================== ERROR MESSAGE ================");
    console.log("STATUS: ", eMessage.fetchStatus);

    console.log("====================================================");
    console.log("===================== ERROR MESSAGE 2 ==============");
    console.log("STATUS: ", eMessage2.fetchStatus);

    console.log("====================================================");
  }
};

export default showMessageError;
