import { styled, useTheme } from "@mui/material/styles";
import FusePageSimple from "@fuse/core/FusePageSimple";


import { createTheme, ThemeProvider,responsiveFontSizes  } from '@mui/material/styles';
import { esES } from '@mui/material/locale';
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
//ICONS
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import AddIcon from '@mui/icons-material/Add';
import ErrorOutlinedIcon from '@mui/icons-material/ErrorOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import FormatListNumberedRtlIcon from '@mui/icons-material/FormatListNumberedRtl';

import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';

import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';

import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { useCallback, useEffect, useState } from "react";
import ModalAddProfile from "./Widgets/ModalAddProfile";


let theme = createTheme(
    esES,
  );

theme = responsiveFontSizes(theme);
const Root = styled(FusePageSimple)(({ theme }) => ({
    "& .FusePageSimple-header": {
      backgroundColor: theme.palette.background.paper,
      borderBottomWidth: 1,
      borderStyle: "solid",
      borderColor: theme.palette.divider,
    },
    "& .FusePageSimple-toolbar": {},
    "& .FusePageSimple-content": {},
    "& .FusePageSimple-sidebarHeader": {},
    "& .FusePageSimple-sidebarContent": {},
  }));
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
      
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  function createData(estado,codreferencia,nombre,descripcion) {
    return {
        estado,codreferencia,nombre,descripcion
    };
  }
  
  const rows = [
    createData('Activo', 1069, 'Administrador', 'Perfil de administrador todas las paginas seleccionadas'),
    createData('Activo', 1111, 'Estado Facturación', 'Solo puede visualizar el modulo de estado de facturación'),
    createData('Activo', 1313, 'Clientes', 'Perfil para clientes'),
    createData('Activo', 4849, 'Trabajadores Prisma', 'Perfil para trabajadores de Prisma'),
    
   
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
  
  // Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
  // stableSort() brings sort stability to non-modern browsers (notably IE11). If you
  // only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
  // with exampleArray.slice().sort(exampleComparator)
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
      id: 'estado', 
      numeric: false,
      disablePadding: true,
      label: 'Estado',
    },
    {
      id: 'codreferencia',
      numeric: true,
      disablePadding: false,
      label: 'Código Referencia',
    },
    {
      id: 'nombre',
      numeric: false,
      disablePadding: false,
      label: 'Nombre',
    },
    {
      id: 'descripcion',
      numeric: false,
      disablePadding: false,
      label: 'Descripción',
    },
    {
    id: 'action',
    numeric: false,
    disablePadding: false,
    label: 'Accciones',
    },
      
    
  ];
  
  const DEFAULT_ORDER = 'asc';
  const DEFAULT_ORDER_BY = 'codreferencia';
  const DEFAULT_ROWS_PER_PAGE = 5;
  
  function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
      props;
    const createSortHandler = (newOrderBy) => (event) => {
      onRequestSort(event, newOrderBy);
    };
  
    return (
      <TableHead>
        <TableRow>
          
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align="left"
              padding="20px"
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
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: '1 1 100%' }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : (
          <Typography
            sx={{ flex: '1 1 100%' }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Listado de Roles
          </Typography>
        )}
  
        {numSelected > 0 ? (
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
        )}
      </Toolbar>
    );
  }
  
  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };
function CreateProfileApp(props){
    // const theme = useTheme();
    const [order, setOrder] = useState(DEFAULT_ORDER);
    const [orderBy, setOrderBy] = useState(DEFAULT_ORDER_BY);
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [visibleRows, setVisibleRows] = useState(null);
    const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);
    const [paddingHeight, setPaddingHeight] = useState(0);
    const [table, setTable] = useState(true);
    useEffect(() => {
      let rowsOnMount = stableSort(
        rows,
        getComparator(DEFAULT_ORDER, DEFAULT_ORDER_BY),
      );
  
      rowsOnMount = rowsOnMount.slice(
        0 * DEFAULT_ROWS_PER_PAGE,
        0 * DEFAULT_ROWS_PER_PAGE + DEFAULT_ROWS_PER_PAGE,
      );
  
      setVisibleRows(rowsOnMount);
    }, []);
  
    const handleRequestSort = useCallback(
      (event, newOrderBy) => {
        const isAsc = orderBy === newOrderBy && order === 'asc';
        const toggledOrder = isAsc ? 'desc' : 'asc';
        setOrder(toggledOrder);
        setOrderBy(newOrderBy);
  
        const sortedRows = stableSort(rows, getComparator(toggledOrder, newOrderBy));
        const updatedRows = sortedRows.slice(
          page * rowsPerPage,
          page * rowsPerPage + rowsPerPage,
        );
  
        setVisibleRows(updatedRows);
      },
      [order, orderBy, page, rowsPerPage],
    );
  
    const handleSelectAllClick = (event) => {
      if (event.target.checked) {
        const newSelected = rows.map((n) => n.codreferencia);
        setSelected(newSelected);
        return;
      }
      setSelected([]);
    };
  
    const handleClick = (event, codreferencia) => {
      const selectedIndex = selected.indexOf(codreferencia);
      let newSelected = [];
  
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, codreferencia);
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
  
    const handleChangePage = useCallback(
      (event, newPage) => {
        setPage(newPage);
  
        const sortedRows = stableSort(rows, getComparator(order, orderBy));
        const updatedRows = sortedRows.slice(
          newPage * rowsPerPage,
          newPage * rowsPerPage + rowsPerPage,
        );
  
        setVisibleRows(updatedRows);
  
        // Avoid a layout jump when reaching the last page with empty rows.
        const numEmptyRows =
          newPage > 0 ? Math.max(0, (1 + newPage) * rowsPerPage - rows.length) : 0;
  
        const newPaddingHeight = (dense ? 33 : 53) * numEmptyRows;
        setPaddingHeight(newPaddingHeight);
      },
      [order, orderBy, dense, rowsPerPage],
    );
  
    const handleChangeRowsPerPage = useCallback(
      (event) => {
        const updatedRowsPerPage = parseInt(event.target.value, 10);
        setRowsPerPage(updatedRowsPerPage);
  
        setPage(0);
  
        const sortedRows = stableSort(rows, getComparator(order, orderBy));
        const updatedRows = sortedRows.slice(
          0 * updatedRowsPerPage,
          0 * updatedRowsPerPage + updatedRowsPerPage,
        );
  
        setVisibleRows(updatedRows);
  
        // There is no layout jump to handle on the first page.
        setPaddingHeight(0);
      },
      [order, orderBy],
    );
  
    const handleChangeDense = (event) => {
      setDense(event.target.checked);
    };
  
    const isSelected = (codreferencia) => selected.indexOf(codreferencia) !== -1;
  
  return (
    <Root
    // header={<div>
    //     Header
    // </div>}
    content={
            <div className="p-12 pt-16 sm:pt-24 lg:pt-24 md:pt-24 lg:ltr:pr-0 lg:rtl:pl-0 w-full ">
            <div className="grid auto-cols-auto smmax:grid-cols-2 sm:grid-cols-12 gap-2 w-full min-w-0 p-24   ">
            <div className="  col-span-12 mb-[20px]" >
                {/* Box de titulo y guía */}
                <Box className="  bg-white rounded-sm p-[10px] ">
                <h1 className="ml-[5px]">Gestión de Perfiles</h1>
                <h1 className="border border-b-pantoneazul"></h1>
                <Box   className="flex flex-auto bg-white rounded-sm bg-grey-300 m-[10px] p-[10px]"  >
                    <div>
                    <ErrorOutlinedIcon className="text-pantonerojo mr-[20px]" />
                    </div>
                    <div>
                    <span className="text-grey-700">En el apartado de <b>Perfil Nuevo Usuario</b> podrá asignar el <b>Rol</b> y los <b>Clientes</b> al usuario y desde el apartado de <b>Información de Nuevo Usuario</b> podrá completar la información personal del usuario y posteriormente debe guardar y confirmar.</span>
                    </div>
                    
                </Box>
                </Box>
            </div>
            
            <div className=" col-span-12   bg-white"> 
            {/*  lg:col-span-3 tvxxl:col-span-2 */}
            
            <div className="flex justify-between w-full" >
                <div className="flex flex-row  m-[20px]">
                <Typography className="text-2xl font-medium tracking-tight text-pantoneazul leading-6 truncate">
                Agregar Perfil
                </Typography>
                    
                <AssignmentIndIcon className="ml-[10px] text-pantoneazul"/>
                </div>
             
               
                <div className=" m-[20px] ">
                <Button
                    variant="contained"
                    color="secondary"
                    className=" h-[28px]  w-[130px] mr-[20px]"
                    aria-label="Register"
                    type="submit"
                    size="small"
                    onClick={
                        table
                          ? () => setTable(false)
                          : () => setTable(true)
                      }>
                    <AddIcon/>Nuevo Perfil
                </Button>
                </div>
        
             

            </div>
            
            </div>

            <div className=" col-span-12  bg-white mt-[20px]">
            <div className="flex flex-row  m-[20px]">
                <Typography className="text-2xl font-medium tracking-tight text-pantoneazul leading-6 truncate">
                Listado de Roles
                </Typography>
                    
                <FormatListNumberedRtlIcon className="ml-[10px] text-pantoneazul"/>
            </div>
            <h1 className="border border-b-pantoneazul w-full"></h1>
            <div className="flex flex-row m-[20px]">
            
            <TextField id="outlined-basic" label="Filtrar" variant="filled" />
            

            </div>
            
            <Box className="m-[20px]" >
                <Box >
                    
                    <TableContainer sx={{ maxHeight: 360 }} overflow-y-auto>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                        stickyHeader
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
                        {visibleRows
                            ? visibleRows.map((row, index) => {
                                const isItemSelected = isSelected(row.codreferencia);
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                <StyledTableRow 
                                    
                                    
                                    aria-checked={isItemSelected}
                                    tabIndex={-1}
                                >
                                    
                                    <StyledTableCell
                                    
                                    align="left"
                                    component="th"
                                    id={labelId}
                                    scope="row"
                                    padding="20px"
                                    >
                                    {row.estado}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">{row.codreferencia}</StyledTableCell>
                                    <StyledTableCell align="left">{row.nombre}</StyledTableCell>
                                    <StyledTableCell align="left">{row.descripcion}</StyledTableCell>
                                    <StyledTableCell align="left">
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        className=" h-[28px]  w-[100px] mr-[20px]"
                                     
                                        type="submit"
                                        size="small">
                                        <SettingsIcon/>Editar
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        className=" h-[28px]  w-[100px] mr-[20px]"
                                        
                                        type="submit"
                                        size="small">
                                        <DeleteForeverIcon/>Desactivar
                                    </Button>
                                    </StyledTableCell>
                                    
                                </StyledTableRow >
                                );
                            })
                            : null}
                        {paddingHeight > 0 && (
                            <TableRow
                            style={{
                                height: paddingHeight,
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
                    variant="h5"
                    rowsPerPageOptions={[5, 10, 25,{ value: -1, label: 'All' }]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    />       
           </Box>
                <FormControlLabel
                    control={<Switch checked={dense} onChange={handleChangeDense} />}
                    label="Disminuir espacio"
                />
                </Box> 
            </div>
            </div>
            {!table && (
                <ModalAddProfile
               
                setTable={() => setTable(true)}
                />
            )}
            </div>

    }
    scroll="content"
    />
  );
}
export default CreateProfileApp;