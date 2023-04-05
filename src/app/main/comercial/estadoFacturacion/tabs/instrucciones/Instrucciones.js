import { motion } from "framer-motion";
import { func } from "prop-types";
import React, { useEffect, useState } from "react";
import Estados from "./widgets/Estados";
import Filtros from "./widgets/Filtros";
import Button from "@mui/material/Button";
import TablaInstrucciones from "./widgets/TablaInstrucciones";

let search = () => {};
let ClearDebtorAndCreditor;
let clearStates;
// let cargandoFiltross;
const Instrucciones = (props) => {
  const container = {
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };
  const [estadosPar, setEstadosPar] = useState([]);
  const [fecha, setFecha] = useState({});
  const [selectedParams, setSelectedParams] = useState({});
  const [charge, setCharge] = useState(false);
  const [render, setRender] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [cargandoFiltross, setCargandoFiltross] = useState(false);
  // console.log(charge);
  function stateToken(state) {
    setEstadosPar(state);
  }
  function stateFecha(fecha) {
    setFecha(fecha);
  }
  function stateSelected(selected, disabled) {
    setSelectedParams(selected);
    if (charge === true) {
      setCharge(false);
    } else {
      setCharge(true);
    }

    if (render === true) {
      setRender(false);
    } else {
      setRender(true);
    }
  }
  function stateCharge(params) {
    // setCharge(params);
    if (params === false) {
      setCharge(false);
      // } else if (params === false && disabled === true) {
      //   setCharge(false);
      // } else {
    } else {
      setCharge(true);
    }
  }
  function getClearStates(param) {
    props.getClearStates(param);
    clearStates = param;
  }
  function getClearFilters(param) {
    props.getClearFilters(param);
  }
  function getClearDebtorAndCreditor(param) {
    ClearDebtorAndCreditor = param;
  }
  function cargandoFiltros(param) {
    setCargandoFiltross(param);
  }
  console.log(`FILTRO -->${cargandoFiltross}`);
  return (
    <motion.div
      className="grid auto-cols-auto smmax:grid-cols-1 sm:grid-cols-12 gap-24 w-full min-w-0 p-24 "
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={item} className=" col-span-12  ">
        <Estados
          idParticipante={props.id}
          getClearStates={getClearStates}
          cargando={charge}
          cargarFiltros={cargandoFiltross}
          stateToken={stateToken}
          clearFilterRutAndName={ClearDebtorAndCreditor}
          // chargeFilters={disabled}
        />
      </motion.div>

      <motion.div
        variants={item}
        className=" hdmas:col-span-12  hd:col-span-3 "
      >
        {/*
        Cargar la diversificacion de las tablas aca
        */}
        <Filtros
          idParticipante={props.id}
          fecha={stateFecha}
          selected={stateSelected}
          stateTokenFiltros={estadosPar}
          getClearFilters={getClearFilters}
          getClearStates={clearStates}
          stateTokenSetFiltros={setEstadosPar}
          getClearDebtorAndCreditor={getClearDebtorAndCreditor}
          cargando={charge}
          getCargandoFiltros={cargandoFiltros}
        />
      </motion.div>
      <motion.div
        variants={item}
        className="  hdmas:col-span-12   hd:col-span-9  "
      >
        <TablaInstrucciones
          idParticipante={props.id}
          estadoPar={estadosPar}
          fechas={fecha}
          cargando={charge}
          selected={selectedParams}
          tokenCharge={stateCharge}
          
        />
      </motion.div>
    </motion.div>
  );
};

export default Instrucciones;
