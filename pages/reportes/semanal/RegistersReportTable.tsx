import * as React from "react";
import PropTypes from "prop-types";
import {
  Divider,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Box,
} from "@mui/material";
import { format } from "date-fns";
import es from "date-fns/locale/es";
import { capitalizeFirstLetter } from "lib/client/utils";

interface RegistersReportTableProps {
  header: string;
  colorStyle: object;
  list: any[];
  secondList?: any[];
  totalSecondList?: any;
  totalData: any;
}
const cellStyle = { border: "2px solid #374246" };
const RegistersReportTable: React.FC<RegistersReportTableProps> = ({
  header,
  colorStyle,
  list,
  secondList = null,
  totalSecondList = 0,
  totalData,
}) => {
  return (
    <div>
      <Divider />
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell
                align="center"
                style={colorStyle}
                colSpan={secondList ? 4 : 3}
              >
                {header}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="center" style={colorStyle}>
                Fecha
              </TableCell>
              <TableCell align="center" style={colorStyle}>
                Día
              </TableCell>
              <TableCell align="center" style={colorStyle}>
                Registro
              </TableCell>
              {secondList && (
                <TableCell align="center" style={colorStyle}>
                  EFECTIVO
                </TableCell>
              )}
            </TableRow>
            {list?.map((day, index) => (
              <TableRow key={`${header}-${day?.weekDay}`}>
                <TableCell align="center" style={cellStyle}>
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    color="text.primary"
                    gutterBottom
                    noWrap
                  >
                    {format(new Date(day?.date), "dd/MM/yyyy", { locale: es })}
                  </Typography>
                </TableCell>
                <TableCell align="center" style={cellStyle}>
                  <Typography
                    variant="body1"
                    color="text.primary"
                    gutterBottom
                    noWrap
                  >
                    {capitalizeFirstLetter(day?.weekDay)}
                  </Typography>
                </TableCell>
                <TableCell align="center" style={cellStyle}>
                  <Typography
                    variant="body1"
                    color="text.primary"
                    gutterBottom
                    noWrap
                  >
                    {day?.done}
                  </Typography>
                </TableCell>
                {secondList && (
                  <TableCell align="center" style={cellStyle}>
                    <Typography
                      variant="body1"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {secondList[index]?.done}
                    </Typography>
                  </TableCell>
                )}
              </TableRow>
            ))}

            <TableRow>
              <TableCell align="center" style={{ border: "none" }}></TableCell>
              <TableCell align="center" style={colorStyle}>
                <Typography variant="h5" gutterBottom noWrap>
                  TOTAL
                </Typography>
              </TableCell>
              <TableCell align="center" style={colorStyle}>
                <Typography variant="h5" gutterBottom noWrap>
                  {totalData?.done}
                </Typography>
              </TableCell>
              {secondList && (
                <TableCell align="center" style={colorStyle}>
                  <Typography variant="h5" gutterBottom noWrap>
                    {totalSecondList?.done}
                  </Typography>
                </TableCell>
              )}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}></Box>
    </div>
  );
};
RegistersReportTable.propTypes = {
  header: PropTypes.string.isRequired,
  colorStyle: PropTypes.object.isRequired,
  list: PropTypes.array.isRequired,
  totalData: PropTypes.any.isRequired,
};
export default RegistersReportTable;
