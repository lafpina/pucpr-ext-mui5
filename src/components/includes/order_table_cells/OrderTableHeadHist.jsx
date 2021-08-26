import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

export const OrderTableHeadHist = () => {
  return (
    <TableHead>
      <TableRow>
        <TableCell align="left">CPF</TableCell>
        <TableCell align="left">Email</TableCell>
        <TableCell align="left">TEL</TableCell>
        <TableCell align="left">CEP</TableCell>
        <TableCell align="center">Estado</TableCell>
        <TableCell align="center">País</TableCell>
        <TableCell align="center">Parc</TableCell>
        <TableCell align="left">Titular</TableCell>
      </TableRow>
    </TableHead>
  );
};
