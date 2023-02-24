import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import FusePageSimple from "@fuse/core/FusePageSimple";
import Box from "@mui/material/Box";
import React from "react";

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

// eslint-disable-next-line import/prefer-default-export
// export const CreateUserApp = () => {
function CreateUserApp(props) {
  return (
    <Root
      header={
        <div className="p-24">
          <Box sx={{ minWidth: 120 }}>asdasdasd</Box>
        </div>
      }
      content={
        <div className="p-24">
          <h1>dsdfsdfsdf</h1>
          <br />
        </div>
      }
      scroll="content"
    />
  );
}

export default CreateUserApp;
