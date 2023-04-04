import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import FusePageSimple from "@fuse/core/FusePageSimple";
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import { useSelector } from 'react-redux';
import { selectUser } from 'app/store/userSlice';
// import React from 'react'
function capitalize(word) {
  const lower = word.toLowerCase();
  return word.charAt(0).toUpperCase() + lower.slice(1);
}
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
const ProfileApp = () => {
  const user = useSelector(selectUser);

  return (
    <Root
    header={
      
          <header>
              <Box className="flex flex-col">
                <img className="h-160 lg:h-320 object-cover w-full" src="assets\images\pages\profile\cover.jpg" alt="Profile Cover"/>
              <Box className="flex flex-col flex-0 lg:flex-row items-center max-w-5xl w-full mx-auto px-32 lg:h-72">
              <Box className="-mt-96 lg:-mt-88 rounded-full">
                <Box  style={{
                  transform: "none"
                }}>
                  <Avatar
                  className="w-128 h-128 border-4"
                    alt="Photo" 
                    src=""
                  />
                </Box>
              </Box>
              <Box className="flex flex-col items-center lg:items-start mt-16 lg:mt-0 lg:ml-32">
                  <p className="text-lg font-bold leading-none">
                  {user.data.nombre} {user.data.apellido}
                  </p>
                  <p className="">
                  {capitalize(user.role.toString())}
                  </p>
              </Box>
                  
              <Box className="hidden lg:flex h-32 mx-32 border-l-2"></Box>
              Pequeña descripcion aqui
              </Box>
              </Box>
          </header  >
     
    }
      content={
        <div >
            <Container>
              container
            </Container>
        </div>
      }
      scroll="content"
    />
  )
}
export default ProfileApp;
