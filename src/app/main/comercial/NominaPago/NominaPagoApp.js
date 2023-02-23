import { styled } from "@mui/material/styles";
import withReducer from "app/store/withReducer";
import FusePageSimple from "@fuse/core/FusePageSimple";
import NominaPagoAppHeader from "./NominaPagoAppHeader";
import DemoContent from '@fuse/core/DemoContent';


const Root = styled(FusePageSimple)(({ theme }) => ({
  "& .FusePageSimple-header": {
    backgroundColor: theme.palette.background.paper,
    boxShadow: `inset 0 0 0 1px  ${theme.palette.divider}`,
  },
}));

const NominaPagoApp = () => {
  

  return (
    <Root
      header={<NominaPagoAppHeader />}
      content={
        <div className="p-24">
          <h1>Nominas de Pago</h1>
          <br />
          <h1>
            ACA VA UNA TABLA uwu
          </h1>
          <h1>Estoy trabajando en ello no me maltraten pls D:</h1>
        </div>
      }
      scroll="content"
    />
  );
};

export default NominaPagoApp;
