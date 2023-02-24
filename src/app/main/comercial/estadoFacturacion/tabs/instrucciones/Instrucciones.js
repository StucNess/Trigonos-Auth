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
  function stateToken(state) {
    setEstadosPar(state);
  }
  function stateFecha(fecha) {
    setFecha(fecha);
  }
  function stateSelected(selected, disabled) {
    console.log(disabled);
    setSelectedParams(selected);
    console.log(disabled);
    if (charge === true && disabled === true) {
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
    if (params === true && disabled === true) {
      setCharge(false);
    } else if (params === false && disabled === true) {
      setCharge(false);
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
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-12 gap-24 w-full min-w-0 p-24 "
      variants={container}
      initial="hidden"
      animate="show">
      <motion.div variants={item} className=" col-span-12  ">
        <Estados
          idParticipante={props.id}
          getClearStates={getClearStates}
          cargando={charge}
          stateToken={stateToken}
          clearFilterRutAndName={ClearDebtorAndCreditor}
          chargeFilters={disabled}
        />
      </motion.div>
      
      <motion.div variants={item} className=" hdmas:col-span-12  hd:col-span-3 hd:max-w-[360px]"> 
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
        />
      </motion.div>
      <motion.div variants={item} className="  hdmas:col-span-12   hd:col-span-9 max-w-[100%] " >
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