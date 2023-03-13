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
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { Button } from '@mui/material';
import { SiMicrosoftexcel } from "react-icons/si";
import { HiDownload } from  "react-icons/hi";
import EditIcon from '@mui/icons-material/Edit';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
function createData(codigo, fechamod, usuario, campomod,antiguo, nuevo) {
  return {
    codigo,
    fechamod,
    usuario,
    campomod,
    antiguo,
    nuevo
 
  };
}

// usuario,
// nombre,
// apellido,
// email,
// contrasenia,
// clientes,
// rol

const rows = [
  createData('7944', '2022-08-22 19:01:02.580', 'hernan', 	'dte_reception_email','dte.cl@einvoicing.signature-cloud.com','dte@dte-colbun.cl'),
  createData('7945', '2022-11-09 11:01:18.930', 'hernan', 	'bank_account_id','0224238508','0224396164'),
  createData('7924', '2022-08-22 19:01:02.580', 'hernan', 	'dte_reception_email','dte.cl@einvoicing.signature-cloud.com','dte@dte-colbun.cl'),
  createData('7942', '2022-08-22 19:01:02.580', 'hernan', 	'dte_reception_email','dte.cl@einvoicing.signature-cloud.com','dte@dte-colbun.cl'),
  createData('7940', '2022-08-22 19:01:02.580', 'hernan', 	'dte_reception_email','dte.cl@einvoicing.signature-cloud.com','dte@dte-colbun.cl'),
  createData('7949', '2022-08-22 19:01:02.580', 'hernan', 	'dte_reception_email','dte.cl@einvoicing.signature-cloud.com','dte@dte-colbun.cl'),

  
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
    id: 'codigo',
    numeric: false,
    disablePadding: true,
    label: 'Código',
  },
  {
    id: 'fechamod',
    numeric: false,
    disablePadding: false,
    label: 'Fecha Modificación',
  },
  {
    id: 'usuario',
    numeric: false,
    disablePadding: false,
    label: 'Usuario Responsable',
  },
  {
    id: 'campomod',
    numeric: false,
    disablePadding: false,
    label: 'Campo Modificado',
  },
  {
    id: 'antiguo',
    numeric: false,
    disablePadding: false,
    label: 'Atributo antiguo',
  },
  {
    id: 'nuevo',
    numeric: false,
    disablePadding: false,
    label: 'Atributo nuevo',
  },
  
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead  >
      <TableRow >
        {/* <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell> */}
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
  const [roll, setroll] = React.useState('');

  const handleChange = (event) => {
    setroll(event.target.value);
  };
  return (
    <Toolbar
      className="w-full"
      sx={{
        
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    > 
      <Box className="flex flex-col w-full">
      <Box className="flex flex-row w-full"> 
          <Typography className=" text-4xl font-extrabold text-center  tracking-tight leading-tight w-full">
          Cambios realizados
          </Typography>  
      </Box>
     
      </Box>

        
      {/* {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          Seleccionados {numSelected} 
        </Typography>
      ) : (
        <Typography
          
        >
         
        </Typography>
      )} */}

      {/* {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )} */}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function TablaUltimosCambios() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('codigo');
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
      const newSelected = rows.map((n) => n.codigo);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, codigo) => {
    const selectedIndex = selected.indexOf(codigo);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, codigo);
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

  const isSelected = (codigo) => selected.indexOf(codigo) !== -1;


  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
   
      <Paper className="p-[30px]" >
        
       
        <TableContainer   >
          <Table
         
            sx={{ minWidth: 750,}}
            aria-labelledby="tableTitle"
            
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              
            />
            <TableBody   >
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.sort(getComparator(order, orderBy)).slice() */}
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.codigo);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  
                  
                  return (
                    <TableRow 
                    
                      hover
                      // onClick={(event) => handleClick(event, row.usuario)}
                      // role="checkbox"
                      // aria-checked={isItemSelected}
                      // tabIndex={-1}
                      // key={row.usuario}
                      // selected={isItemSelected}
                      align="left"
                      
                    >
                      {/* <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell> */}
                      
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        align="left"
                      >
                        {row.codigo}
                      </TableCell>
                      <TableCell align="left">{row.fechamod}</TableCell>
                      <TableCell align="left">{row.usuario}</TableCell>
                      <TableCell align="left">{row.campomod}</TableCell>
                      <TableCell align="left">{row.antiguo}</TableCell>
                      <TableCell align="left">{row.nuevo}</TableCell>
         
                      
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
          rowsPerPageOptions={[6, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
     
 
  );
}