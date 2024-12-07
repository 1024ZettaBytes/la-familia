import { FC, ChangeEvent, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Tooltip,
  Divider,
  Box,
  Card,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  useTheme,
  CardHeader
} from '@mui/material';
import NextLink from 'next/link';

import { useSnackbar } from 'notistack';
import PlusOneIcon from '@mui/icons-material/PlusOne';

import ExtendRentModal from '../../src/components/ExtendRentModal';

import styles from '../tables.module.css';

interface TablaMantProps {
  className?: string;
  rentList: any[];
}

const applyPagination = (
  rentList: any[],
  page: number,
  limit: number
): any[] => {
  return rentList.slice(page * limit, page * limit + limit);
};

const TablaMant: FC<TablaMantProps> = ({
  rentList
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [extendModalIsOpen, setExtendModalIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<any>(null);
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(30);
  const handleCloseModal = (wasSuccess, successMessage = null) => {
    setExtendModalIsOpen(false);

    if (wasSuccess && successMessage) {
      enqueueSnackbar(successMessage, {
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center'
        },
        autoHideDuration: 1500
      });
    }
  };

  const handlePageChange = (_event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const handleOnExtendClick = (rentId: string) => {
    setSelectedId(rentId);
    setExtendModalIsOpen(true);
  };

  const paginatedRents = applyPagination(rentList, page, limit);

  const theme = useTheme();
  return (
    <>
      <Card>
        <CardHeader
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap'
          }}
          title="Pendientes"
        />

        <Divider />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Equipo</TableCell>
                <TableCell align="center">Marca</TableCell>
                <TableCell align="center">Estado</TableCell>
                <TableCell align="center">Fecha Inicio</TableCell>
                <TableCell align="center">Fecha Fin</TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedRents.map((rent) => {
                const canPickup = rent?.totalDays < 180
                return (
                  <TableRow
                    sx={
                      !canPickup
                        ? { backgroundColor: theme.colors.success.lighter }
                        : {}
                    }
                    key={rent?._id}
                  >
                    <TableCell align="center">
                      {rent?.machine?.machineNum}
                    </TableCell>
                    <TableCell align="center">
                      <NextLink href={`/clientes/${rent?.customer?._id}`}>
                        <a className={styles.title_text}>
                          {rent?.customer?.name}
                        </a>
                      </NextLink>
                    </TableCell>

                    <TableCell align="center">
                      <Tooltip title="Extender Renta" arrow>
                        <IconButton
                          onClick={() => handleOnExtendClick(rent?._id)}
                          sx={{
                            '&:hover': {
                              background: theme.colors.primary.lighter
                            },
                            color: theme.colors.success.light
                          }}
                          color="inherit"
                          size="small"
                        >
                          <PlusOneIcon fontSize="medium" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Box p={2}>
          <TablePagination
            component="div"
            count={rentList.length}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleLimitChange}
            page={page}
            rowsPerPage={limit}
            rowsPerPageOptions={
              rentList.length > 100 ? [30, 100, rentList.length] : [30, 100]
            }
          />
        </Box>
      </Card>
      {extendModalIsOpen && (
        <ExtendRentModal
          open={extendModalIsOpen}
          handleOnClose={handleCloseModal}
          rentId={selectedId}
        />
      )}
    </>
  );
};

TablaMant.propTypes = {
  rentList: PropTypes.array.isRequired
};

TablaMant.defaultProps = {
  rentList: []
};

export default TablaMant;
