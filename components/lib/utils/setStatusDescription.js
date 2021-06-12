const setStatusDescription = (status) => {
  switch (status) {
    case 400:
      return "Bad Request";
      break;
    case 401:
      return "Unauthorized";
    case 403:
      return "Forbidden";
      break;
    case 404:
      return "Not Found";
      break;
    default:
      return "-";
  }
};

export default setStatusDescription;
