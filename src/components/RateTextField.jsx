import React, {useEffect, useState, useRef} from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { NumericFormat } from 'react-number-format';

function RateTextField(handleUpdate, stateValue) {

    const NumericFormatCustomRate = React.forwardRef(
        function NumericFormatCustom(props, ref) {
          const { onChange, ...other } = props;
      
          return (
            <NumericFormat
              {...other}
               
              value={stateValue} 
              getInputRef={ref}
              onValueChange={(values) => {
                onChange({
                    target: {value: values.value}
                })
              }
               
            }
               
              
             
              valueIsNumericString={true}
              suffix="%"
            />
          );
        },
      );
      


   return (
    <>
      <TextField 
            onChange={handleUpdate}
              id="outlined-basic"  
              variant="outlined" 
              sx={{width: '20VW', input: {textAlign: "center",fontSize: '18pt', fontWeight: '600', fontFamily: 'Source Sans Pro'}}} 
              slotProps={{
                  input: {
                    inputComponent: NumericFormatCustomRate,
                  },
                }}
              />
    </>
   )
 }

export default RateTextField