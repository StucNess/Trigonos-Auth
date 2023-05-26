import { styled, useTheme } from "@mui/material/styles";
import FusePageSimple from "@fuse/core/FusePageSimple";

import {
  createTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@mui/material/styles";
import { esES } from "@mui/material/locale";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
//ICONS
import Stack from "@mui/material/Stack";

import LinearProgress from "@mui/material/LinearProgress";

import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import AddIcon from "@mui/icons-material/Add";
import ErrorOutlinedIcon from "@mui/icons-material/ErrorOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import PeopleIcon from "@mui/icons-material/People";

import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";

import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { useCallback, useEffect, useState } from "react";
// import ModalEditUser from "./widgets/ModalEditUser";
import { forwardRef } from "react";

//SECCIÓN PARA REALIZAR REDIRECCION DE RUTA/LINK A OTRA VENTANA
import PropTypes from "prop-types";
import { Link as RouterLink, MemoryRouter } from "react-router-dom";
import { StaticRouter } from "react-router-dom/server";

import {
  useGetUsuariosPaginationQuery,
  useGetUsuariosRolesQuery,
} from "app/store/usuariosApi/usuariosApi";
// import { useGetEmpresasQuery } from "app/store/empresaApi/empresaApi";
import {
  useGetParticipantesByIdMutation,
  useGetParticipantesQuery,
} from "app/store/participantesApi/participantesApi";
import { useGetInstruccionesQuery } from "app/store/instrucciones/instruccionesApi";

let theme = createTheme(esES);

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
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

let rows = [];
let rowspermanent = [];

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
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

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

const DEFAULT_ORDER = "asc";
const DEFAULT_ORDER_BY = "nombre";
const DEFAULT_ROWS_PER_PAGE = 5;

function EnhancedTableHead(props) {
  const {
    // onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    erp,
  } = props;
  const createSortHandler = (newOrderBy) => (event) => {
    onRequestSort(event, newOrderBy);
  };
  let headCells;
  if (erp == 2) {
    headCells = [
      {
        id: "rut",
        numeric: false,
        disablePadding: false,
        label: "Rut",
      },
      {
        id: "razonSocial",
        numeric: false,
        disablePadding: false,
        label: "Razón Social",
      },
      {
        id: "giro",
        numeric: false,
        disablePadding: false,
        label: "Giro",
      },
      {
        id: "comuna",
        numeric: false,
        disablePadding: false,
        label: "Comuna",
      },
      {
        id: "direccion",
        numeric: false,
        disablePadding: false,
        label: "Dirección",
      },
      {
        id: "producto",
        numeric: false,
        disablePadding: false,
        label: "Producto",
      },
      {
        id: "precio",
        numeric: false,
        disablePadding: false,
        label: "Precio",
      },
    ];
  } else if (erp == 1) {
    headCells = [
      {
        id: "folioReferencia",
        numeric: false,
        disablePadding: false,
        label: "Folio Referencia",
      },
      {
        id: "razonReferencia",
        numeric: false,
        disablePadding: false,
        label: "Razón Referencia",
      },
      {
        id: "razonSocial",
        numeric: false,
        disablePadding: false,
        label: "Razón Social",
      },
      {
        id: "rut",
        numeric: false,
        disablePadding: false,
        label: "Rut",
      },
      {
        id: "folio",
        numeric: false,
        disablePadding: false,
        label: "Folio",
      },
      {
        id: "fechaCarta",
        numeric: false,
        disablePadding: false,
        label: "Fecha Carta",
      },
      {
        id: "concepto",
        numeric: false,
        disablePadding: false,
        label: "Concepto",
      },
      {
        id: "neto",
        numeric: false,
        disablePadding: false,
        label: "Neto",
      },
      {
        id: "iva",
        numeric: false,
        disablePadding: false,
        label: "Iva",
      },
      {
        id: "total",
        numeric: false,
        disablePadding: false,
        label: "Total",
      },
      {
        id: "giro",
        numeric: false,
        disablePadding: false,
        label: "Giro",
      },
      {
        id: "direccion",
        numeric: false,
        disablePadding: false,
        label: "Dirección",
      },
      {
        id: "comuna",
        numeric: false,
        disablePadding: false,
        label: "Comuna",
      },
    ];
  } else if (erp == 7) {
    headCells = [
      {
        id: "numeroCorrelativo",
        numeric: false,
        disablePadding: false,
        label: "Número (Correlativo)",
      },
      {
        id: "fecha",
        numeric: false,
        disablePadding: false,
        label: "Fecha",
      },
      {
        id: "fechaVencimiento",
        numeric: false,
        disablePadding: false,
        label: "Fecha de Vencimiento",
      },
      {
        id: "codigoCliente",
        numeric: false,
        disablePadding: false,
        label: "Código del Cliente",
      },
      {
        id: "afecto",
        numeric: false,
        disablePadding: false,
        label: "Afecto",
      },
      {
        id: "total",
        numeric: false,
        disablePadding: false,
        label: "Total",
      },
      {
        id: "nombre",
        numeric: false,
        disablePadding: false,
        label: "Nombre",
      },
      {
        id: "direccion",
        numeric: false,
        disablePadding: false,
        label: "Drección",
      },
      {
        id: "comentarioProducto",
        numeric: false,
        disablePadding: false,
        label: "Comentario Producto",
      },
    ];
  }

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            id={headCell.id}
            key={headCell.id}
            align="left"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              id={headCell.id}
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
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
  erp: PropTypes.number.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
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
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
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
function TabInstrucciones(props) {
  // const theme = useTheme();
  const [order, setOrder] = useState(DEFAULT_ORDER);
  const [orderBy, setOrderBy] = useState(DEFAULT_ORDER_BY);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [visibleRows, setVisibleRows] = useState(null);
  const [paddingHeight, setPaddingHeight] = useState(0);
  const [table, setTable] = useState(false);
  const [cargando, setCargando] = useState(true);
  const {
    data: dataInstructions = [],
    isLoading: isLoadinginstructions = true,isFetching: isfetchInstructions
  } = useGetInstruccionesQuery(props.id);
  
  function search(searchString) {
    if (searchString.length === 0) {
      return rowspermanent;
    }
  
    let searchLower = searchString.toString().toLowerCase();
    function isFloat(number) {
      return number % 1 !== 0;
    }
    const filtered = rowspermanent.filter((obj) => {
      return Object.values(obj).some((value) => {
    
        if (typeof value === 'string') {
          return value.toLowerCase().includes(searchString.toString().toLowerCase());
        } else if (typeof value === 'number' ) {
          if(isFloat(value)){
              console.log(searchString)
            console.log(value)
            return  value.toString().toLowerCase().includes(searchString.toString().toLowerCase());
          
          }else{
            return  value.toString().toLowerCase().includes(searchString.toString().toLowerCase());
          }
          
       
        }
       

        return false;
      });
    })
    
    return filtered;
   
  }

  function rowsOnMount() {
    let rowsOnMount = stableSort(
      rows,
      getComparator(DEFAULT_ORDER, DEFAULT_ORDER_BY)
    );

    rowsOnMount = rowsOnMount.slice(
      0 * DEFAULT_ROWS_PER_PAGE,
      0 * DEFAULT_ROWS_PER_PAGE + DEFAULT_ROWS_PER_PAGE
    );
    setVisibleRows(rowsOnMount);
  }
  // useEffect(() => {
  //   return () => {
  //     rows = [];
  //     dataInstructions = [];
  //     console.log("Me ejecute");
  //   };
  // }, []);
  useEffect(() => {
    if (!isLoadinginstructions) {
      if (props.erp == 2) {
        rows = dataInstructions.data.map((data) => {
          return {
            // id: data.id,
            rut: data.rutDeudor,
            razonSocial: data.nombreDeudor,
            giro: data.giroDeudor,
            comuna: "Las Condes",
            direccion: data.direccionDeudor,
            producto: data.glosa,
            precio: data.montoNeto,
          };
        });
      } else if (props.erp == 1) {
        rows = dataInstructions.data.map((data) => {
          return {
            // id: data.id,
            folioReferencia: data.codigoRef,
            razonReferencia: data.glosa,
            razonSocial: data.nombreDeudor,
            rut: data.rutDeudor,
            folio: data.folio,
            fechaCarta: data.fecha_carta,
            concepto: data.glosa,
            neto: data.montoNeto,
            iva: data.montoNeto * 0.19,
            total: data.montoBruto,
            giro: data.giroDeudor,
            direccion: data.direccionDeudor,
            comuna: "Las Condes",
          };
        });
      } else if (props.erp == 7) {
        rows = dataInstructions.data.map((data) => {
          return {
            // id: data.id,
            numeroCorrelativo: "00000",
            fecha: "0000",
            fechaVencimiento: "0000",
            codigoCliente: data.rutDeudor,
            afecto: data.montoNeto,
            total: data.montoNeto * 0.19,
            nombre: data.nombreDeudor,
            direccion: data.direccionDeudor,
            comentarioProducto: data.glosa,
          };
        });
      }

      rowspermanent = rows;
      rowsOnMount();
      setRowsPerPage(5);
      let newPage = 0;
      setPage(newPage);
      const sortedRows = stableSort(rows, getComparator(order, orderBy));
      const updatedRows = sortedRows.slice(
        newPage * rowsPerPage,
        newPage * rowsPerPage + rowsPerPage
      );
      setVisibleRows(updatedRows);
      const numEmptyRows =
        newPage > 0
          ? Math.max(0, (1 + newPage) * rowsPerPage - rows.length)
          : 0;
      const newPaddingHeight = (dense ? 33 : 53) * numEmptyRows;
      setPaddingHeight(newPaddingHeight);
      setTimeout(() => {
        setCargando(false);
      }, 1000);
    }
  }, [isLoadinginstructions]);

  const handleSetRow = (event) => {
    const {
      target: { value },
    } = event;
    rows = search(value.trim());
    rowsOnMount();
  };

  const handleRequestSort = useCallback(
    (event, newOrderBy) => {
      const isAsc = orderBy === newOrderBy && order === "asc";
      const toggledOrder = isAsc ? "desc" : "asc";
      setOrder(toggledOrder);
      setOrderBy(newOrderBy);

      const sortedRows = stableSort(
        rows,
        getComparator(toggledOrder, newOrderBy)
      );
      const updatedRows = sortedRows.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      );

      setVisibleRows(updatedRows);
    },
    [order, orderBy, page, rowsPerPage]
  );

  //   const handleSelectAllClick = (event) => {
  //     if (event.target.checked) {
  //       const newSelected = rows.map((n) => n.codreferencia);
  //       setSelected(newSelected);
  //       return;
  //     }
  //     setSelected([]);
  //   };

  //   const handleClick = (event, codreferencia) => {
  //     const selectedIndex = selected.indexOf(codreferencia);
  //     let newSelected = [];

  //     if (selectedIndex === -1) {
  //       newSelected = newSelected.concat(selected, codreferencia);
  //     } else if (selectedIndex === 0) {
  //       newSelected = newSelected.concat(selected.slice(1));
  //     } else if (selectedIndex === selected.length - 1) {
  //       newSelected = newSelected.concat(selected.slice(0, -1));
  //     } else if (selectedIndex > 0) {
  //       newSelected = newSelected.concat(
  //         selected.slice(0, selectedIndex),
  //         selected.slice(selectedIndex + 1)
  //       );
  //     }

  //     setSelected(newSelected);
  //   };

  const handleChangePage = useCallback(
    (event, newPage) => {
      setPage(newPage);
      const sortedRows = stableSort(rows, getComparator(order, orderBy));
      const updatedRows = sortedRows.slice(
        newPage * rowsPerPage,
        newPage * rowsPerPage + rowsPerPage
      );

      setVisibleRows(updatedRows);

      // Avoid a layout jump when reaching the last page with empty rows.
      const numEmptyRows =
        newPage > 0
          ? Math.max(0, (1 + newPage) * rowsPerPage - rows.length)
          : 0;

      const newPaddingHeight = (dense ? 33 : 53) * numEmptyRows;
      setPaddingHeight(newPaddingHeight);
    },
    [order, orderBy, dense, rowsPerPage]
  );

  const handleChangeRowsPerPage = useCallback(
    (event) => {
      const updatedRowsPerPage = parseInt(event.target.value, 10);
      setRowsPerPage(updatedRowsPerPage);

      setPage(0);

      const sortedRows = stableSort(rows, getComparator(order, orderBy));
      const updatedRows = sortedRows.slice(
        0 * updatedRowsPerPage,
        0 * updatedRowsPerPage + updatedRowsPerPage
      );

      setVisibleRows(updatedRows);

      // There is no layout jump to handle on the first page.
      setPaddingHeight(0);
    },
    [order, orderBy]
  );

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (codreferencia) => selected.indexOf(codreferencia) !== -1;
  const chile = new Intl.NumberFormat("es-CL", {
    currency: "CLP",
    style: "currency",
  });
  return (
    <Box className="m-[20px]">
      {isLoadinginstructions ? (
        <Stack sx={{ width: "100%", color: "grey.500" }} spacing={2}>
          {/* <p>Chupa Chupa .....</p> */}
          <LinearProgress color="primary" />
        </Stack>
      ) : (
        <>
          <Box>
          <TextField
                  id="outlined-basic"
                  label="Filtrar"
                  variant="filled"
                  onChange={(e) => {
                    handleSetRow(e);
                  }}
                />
            <TableContainer>
              {/* sx={{ maxHeight: 360 , overflow:"true" }} */}
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size={dense ? "small" : "medium"}
                stickyHeader
              >
                <EnhancedTableHead
                  erp={props.erp}
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  // onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length}
                />
                <TableBody>
                  {visibleRows
                    ? visibleRows.map((row, index) => {
                        const isItemSelected = isSelected(row.id);
                        const labelId = `enhanced-table-checkbox-${index}`;
                        {
                          if (props.erp == 2) {
                            return (
                              <StyledTableRow
                                aria-checked={isItemSelected}
                                tabIndex={-1}
                                key={row.id}
                              >
                                <StyledTableCell
                                  align="left"
                                  component="th"
                                  id={labelId}
                                  scope="row"
                                >
                                  {row.rut}
                                </StyledTableCell>
                                <StyledTableCell key={row.id} align="left">
                                  {row.razonSocial}
                                </StyledTableCell>
                                <StyledTableCell key={row.id} align="left">
                                  {row.giro}
                                </StyledTableCell>
                                <StyledTableCell key={row.id} align="left">
                                  {row.comuna}
                                </StyledTableCell>
                                <StyledTableCell key={row.id} align="left">
                                  {row.direccion}
                                </StyledTableCell>
                                <StyledTableCell key={row.id} align="left">
                                  {row.producto}
                                </StyledTableCell>
                                <StyledTableCell key={row.id} align="left">
                                  {chile.format(row.precio)}
                                </StyledTableCell>
                              </StyledTableRow>
                            );
                          } else if (props.erp == 1) {
                            return (
                              <StyledTableRow
                                aria-checked={isItemSelected}
                                tabIndex={-1}
                                key={row.id}
                              >
                                <StyledTableCell
                                  align="left"
                                  component="th"
                                  id={labelId}
                                  scope="row"
                                >
                                  {row.folioReferencia}
                                </StyledTableCell>
                                <StyledTableCell key={row.id} align="left">
                                  {row.razonReferencia}
                                </StyledTableCell>
                                <StyledTableCell key={row.id} align="left">
                                  {row.razonSocial}
                                </StyledTableCell>
                                <StyledTableCell key={row.id} align="left">
                                  {row.rut}
                                </StyledTableCell>
                                <StyledTableCell key={row.id} align="left">
                                  {row.folio}
                                </StyledTableCell>
                                <StyledTableCell key={row.id} align="left">
                                  {row.fechaCarta}
                                </StyledTableCell>
                                <StyledTableCell key={row.id} align="left">
                                  {row.concepto}
                                </StyledTableCell>
                                <StyledTableCell key={row.id} align="left">
                                  {row.neto}
                                </StyledTableCell>
                                <StyledTableCell key={row.id} align="left">
                                  {row.iva}
                                </StyledTableCell>
                                <StyledTableCell key={row.id} align="left">
                                  {row.total}
                                </StyledTableCell>
                                <StyledTableCell key={row.id} align="left">
                                  {row.giro}
                                </StyledTableCell>
                                <StyledTableCell key={row.id} align="left">
                                  {row.direccion}
                                </StyledTableCell>
                                <StyledTableCell key={row.id} align="left">
                                  {row.comuna}
                                </StyledTableCell>
                                <StyledTableCell key={row.id} align="left">
                                  {chile.format(row.precio)}
                                </StyledTableCell>
                              </StyledTableRow>
                            );
                          } else if (props.erp == 7) {
                            return (
                              <StyledTableRow
                                aria-checked={isItemSelected}
                                tabIndex={-1}
                                key={row.id}
                              >
                                <StyledTableCell
                                  align="left"
                                  component="th"
                                  id={labelId}
                                  scope="row"
                                >
                                  {row.numeroCorrelativo}
                                </StyledTableCell>
                                <StyledTableCell key={row.id} align="left">
                                  {row.fecha}
                                </StyledTableCell>
                                <StyledTableCell key={row.id} align="left">
                                  {row.fechaVencimiento}
                                </StyledTableCell>
                                <StyledTableCell key={row.id} align="left">
                                  {row.codigoCliente}
                                </StyledTableCell>
                                <StyledTableCell key={row.id} align="left">
                                  {chile.format(row.afecto)}
                                </StyledTableCell>
                                <StyledTableCell key={row.id} align="left">
                                  {chile.format(row.total)}
                                </StyledTableCell>
                                <StyledTableCell key={row.id} align="left">
                                  {row.nombre}
                                </StyledTableCell>
                                <StyledTableCell key={row.id} align="left">
                                  {row.direccion}
                                </StyledTableCell>
                                <StyledTableCell key={row.id} align="left">
                                  {row.comentarioProducto}
                                </StyledTableCell>
                              </StyledTableRow>
                            );
                          }
                        }
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
              rowsPerPageOptions={[5, 10, 25]}
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
        </>
      )}
    </Box>
  );
}
export default TabInstrucciones;
