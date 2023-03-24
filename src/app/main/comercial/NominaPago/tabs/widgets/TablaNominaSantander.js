import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { SiMicrosoftexcel } from "react-icons/si";
import { Button } from '@mui/material';
import { HiDownload } from  "react-icons/hi";

import { visuallyHidden } from '@mui/utils';

function createData(rut, nombre, cod_modalidad, cod_banco, n_factura_uno,monto_uno, monto_total) {
  return {
    rut,nombre, cod_modalidad, cod_banco, n_factura_uno,monto_uno, monto_total
  };
}

const rows = [
  createData('76000976K', 'Corporación Nacional del Cobre de Chile', 3, 	'16', 	'10148931',	'1044676','$232,11','$232,11'),
  createData('78004976K', 'Corporación Nacional del Cobre de Chile', 3, 	'16', 	'10148931',	'1044676','$232,11','$232,11'),
  createData('71004976K', 'Corporación Nacional del Cobre de Chile', 3 ,	'16', 	'10148931',	'1044676','$232,11','$232,11'),
  createData('76404976K', 'Corporación Nacional del Cobre de Chile', 3, 	'16', 	'10148931',	'1044676','$232,11','$232,11'),
  createData('76504976K', 'Corporación Nacional del Cobre de Chile', 3, 	'16', 	'10148931',	'1044676','$232,11','$232,11'),
  createData('76604976K', 'Corporación Nacional del Cobre de Chile', 3, 	'16', 	'10148931',	'1044676','$232,11','$232,11'),
  
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}
const headCells = [

  {
    id: 'rut',
    numeric: false,
    disablePadding: true,
    label: 'Rut Beneficiario',
  },
  {
    id: 'nombre',
    numeric: false,
    disablePadding: false,
    label: 'Nombre Beneficiario',
  },
  {
    id: 'cod_modalidad',
    numeric: true,
    disablePadding: false,
    label: 'Cod. Modalidad',
  },
  {
    id: 'cod_banco',
    numeric: false,
    disablePadding: false,
    label: 'Cod. Banco',
  },
  {
    id: 'n_factura_uno',
    numeric: false,
    disablePadding: false,
    label: 'N° Factura 1',
  },
  {
    id: 'monto_uno',
    numeric: false,
    disablePadding: false,
    label: 'Monto 1',
  },
  {
    id: 'monto_total',
    numeric: false,
    disablePadding: false,
    label: 'Monto Total',
  },
  
  
  
];
function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="left"
            // align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected } = props;

  return (
    <Toolbar
      className="w-full"
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      
      {numSelected > 1 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
         {numSelected} selecionados
        </Typography>
      ):numSelected ===1 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
         {numSelected} seleccionado
        </Typography>
      ) : (
      
          <Typography
           
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Listado de nominas
          </Typography>
      
        
      )}

      
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function TablaNominaSantander() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('nro_documento');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.rut);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, rut) => {
    const selectedIndex = selected.indexOf(rut);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, rut);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (rut) => selected.indexOf(rut) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
      <Box  className="w-full text-center  p-[20px]">
          <Typography
            className="bg-grey-50"
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Tabla de Nominas "Santander"
          </Typography>
          <h1 className="border border-b-pantoneazul"></h1>
        </Box>
        <Box className="flex  w-full items-center justify-evenly  ">
              <Button  className="sm:w-[200px] lg:w-[300px] max-w-[300px] mt-[10px] "
                      variant="contained"
                      color="secondary"
                  
                      >
                      <SiMicrosoftexcel className="mr-3 " />Nomina de pago <HiDownload />
              </Button>
          </Box>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.sort(getComparator(order, orderBy)).slice() */}
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.rut);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.rut)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.rut}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        align="left"
                      >
                        {row.rut}
                      </TableCell>
                      <TableCell align="left">{row.nombre}</TableCell>
                      <TableCell align="left">{row.cod_modalidad}</TableCell>
                      <TableCell align="left">{row.cod_banco}</TableCell>
                      <TableCell align="left">{row.n_factura_uno}</TableCell>
                      <TableCell align="left">{row.monto_uno}</TableCell>
                      <TableCell align="left">{row.monto_total}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          labelRowsPerPage="Filas por página"
          rowsPerPageOptions={[5, 10, 25 ]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
    </Box>
  );
}