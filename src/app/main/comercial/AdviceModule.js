import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ErrorOutlinedIcon from "@mui/icons-material/ErrorOutlined";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';


export default function AdviceModule({msg,textwidth=200,direction = "rtl",classnameprimer="relative h-32 w-32 ",classnamesegund = "absolute h-14 w-14 -right-[50px] -bottom-[15px]"}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div dir={direction} className="m-0 w-0 h-0 r-0" title="Ayuda"  >
        <IconButton   aria-describedby={id} variant="contained" onClick={handleClick} size="large" >
                    <HelpOutlineIcon color="secondary" />
                </IconButton>
                    <div  >
                        <Popover
                       
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        >
                        <Typography className='whitespace-pre-wrap' sx={{ p: 2, width: textwidth }}>{msg}</Typography>
                        </Popover>
                    </div>
        
    </div>




   
   
  );
}
{/* <div dir={direction} title="Ayuda"  >
<div className={classnameprimer}>
    <div className={classnamesegund} >
        
        <IconButton   aria-describedby={id} variant="contained" onClick={handleClick} size="large" >
            <HelpOutlineIcon color="secondary" />
        </IconButton>
            <div  >
                <Popover
               
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                >
                <Typography sx={{ p: 2, width: textwidth }}>{msg}</Typography>
                </Popover>
            </div>
           
    </div>
</div>
</div> */}