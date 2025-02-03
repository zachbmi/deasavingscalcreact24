import React, {useEffect, useState, useRef} from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { NumericFormat } from 'react-number-format';
import PropTypes from 'prop-types';
import CountUp from 'react-countup';





function CalculatorUpdate() {

    const materialUITextFieldProps = {
       
       sx:[{width: '32VW',input: {textAlign: "center",fontSize: '18pt', fontWeight: '600', fontFamily: 'Source Sans Pro'}}] ,
        variant:"outlined" 
      };

      const materialUITextFieldPropsMobile = {
       
        sx:[{width: '42VW',input: {textAlign: "center",fontSize: '18pt', fontWeight: '600', fontFamily: 'Source Sans Pro'}}] ,
         variant:"outlined" 
       };
 

    
    const NumericFormatCustom = React.forwardRef(
        function NumericFormatCustom(props, ref) {
          const { onChange, ...other } = props;
      
          return (
            <NumericFormat
              {...other}

              value={dependentCost} 
              getInputRef={ref}
              onValueChange={
                handleDependentCostUpdate
              }
              thousandSeparator
              valueIsNumericString
              prefix="$"
            />
          );
        },
      );
      
     

      const NumericFormatCustomRate = React.forwardRef(
        function NumericFormatCustom(props, ref) {
          const { onChange, ...other } = props;
      
          return (
            <NumericFormat
            customInput={TextField}
              {...other}
              {...materialUITextFieldProps}
              value={ineligibleRate } 
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
      
      

      
      const NumericFormatCustomDependents = React.forwardRef(
          function NumericFormatCustom(props, ref) {
            const { onChange, ...other } = props;
        
            return (
              <NumericFormat
                {...other}
                value={dependentCount} 
                getInputRef={ref}
                onValueChange={
                handleDependentCountUpdate
                }
               
                valueIsNumericString
                thousandSeparator
                
              />
            );
          },
        );
      
     
      

    {/* 
        
    const [currentCount, setCurrentCount] = useState(0);

    function handleIncrementCount(){
        let tempCount = currentCount;
        tempCount += 1;
        setCurrentCount(tempCount);
    }   
        */}

   const [ineligibleDependentsResult, setIneligibleDependentsResult] = useState(0);

   function handleUpdateIneligibileDependentsResult(updates){
    setIneligibleDependentsResult(updates);
   }

   const [annualSavingsResult, setAnnualSavingsResult] = useState(0)     
   
   function handleUpdateAnnualSavingsResult(updates){
    setAnnualSavingsResult(updates);
   }

   function calculateIneligibleDependents(countOfDependents, rateIneligible){
    let result = countOfDependents * (rateIneligible/100);

    let USNumber = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0,
       
    });

    let formattedResult = USNumber.format(result);

    if(result !== null){
        handleUpdateIneligibileDependentsResult(formattedResult)
        return formattedResult;
    }
   
   }

   function calculateAnnualSavings(countOfIneligibleDependents, costOfDependents){
    let result = countOfIneligibleDependents * costOfDependents;

    let USDollar = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
       
    });

    let formattedResult = USDollar.format(result);

    if(formattedResult !== null){
        handleUpdateAnnualSavingsResult(result);
        return result;
    }
   
   }


    
   const [dependentCount, setDependentCount] = useState(1000);

   function handleDependentCountUpdate(event){
    console.log("V-COUNT:", event)
    if(event.target.value !== null){
      setDependentCount(event.target.value)
    }
   }

   const [dependentCost, setDependentCost] = useState(7000);

   function handleDependentCostUpdate(event){
    console.log("V-COST:", event)
    if(event.target.value !== null){
        setDependentCost(event.target.value)
    }
  }

   const [ineligibleRate, setIneligibleRate] = useState(9.5);

   function handleIneligibleRateUpdate(event){
    console.log("V-RATE:", event)
    if(event.target.value !== null){
        setIneligibleRate(event.target.value)
    }
  
   }

   const [loading, setLoading] = useState(false)

   function handleUpdateLoading(update){
    setLoading(update)
   }

   useEffect(() => {

    handleUpdateLoading(true)

    console.log("Calc Call, DEP COUNT:", dependentCount, "DEP COST:", dependentCost, "INELIGIBLE RATE:", ineligibleRate)
    let currentIneligible = calculateIneligibleDependents(dependentCount, ineligibleRate);
    
    calculateAnnualSavings(currentIneligible, dependentCost);

    console.log("Calc Result, INELIGIBLE DEPS:", ineligibleDependentsResult, "AVG SAVINGS:", annualSavingsResult)

    handleUpdateLoading(false)

   }, [handleDependentCountUpdate, handleDependentCostUpdate, handleIneligibleRateUpdate, setDependentCount, setDependentCost, setIneligibleRate ])




  return (
      <>
      {/* <Container maxWidth="lg"> */}
       {/* DESKTOP LAYOUT */}
      <Box sx={{ display: {xs: "none", md: "block", lg: "block" , xl: "block"}}}>

      <div className='row-no-left-margin'>
                <Box sx={{width: '53VW'}}>
                    <Typography  fontSize="14pt" align="right" sx={{fontFamily: 'Roboto', mt: 2}}>How many dependents do you have?</Typography>
                </Box>
                <Box sx={{width: '2VW'}}/>
                <NumericFormat
                 customInput={TextField}
                 {...materialUITextFieldProps}
               
                value={dependentCount} 
              
                onValueChange={(values) => {
                  handleDependentCountUpdate({target: {value: values.value}})
                 }
                  
               }
               
                valueIsNumericString
                thousandSeparator
                
              />
               
           
        </div>
        <div className='row-no-left-margin'>
                <Box sx={{width: '53VW'}}>
                <Typography  fontFamily={'Roboto'} fontSize="14pt" align="right" sx={{fontFamily: 'Roboto',  mt: 2}}>What is your average annual cost per dependent?</Typography>
                </Box>
              
                <Box sx={{width: '2VW'}}/>
                <NumericFormat
               customInput={TextField}
               {...materialUITextFieldProps}
              onValueChange={(values) => {
                handleDependentCostUpdate({target: {value: values.value}})
               }
                
             }

              value={dependentCost} 
              
             
              thousandSeparator
              valueIsNumericString
              prefix="$"
            />
                
        </div>
        <div className='row-no-left-margin'>
                <Box sx={{width: '53VW'}}>
                    <Typography fontFamily={'Roboto'} fontSize="14pt" align="right" sx={{fontFamily: 'Roboto',  mt: 2}}>What is your estimated ineligible rate?</Typography>
                </Box>
                <Box sx={{width: '2VW'}}/>
                <>
                <NumericFormat
            customInput={TextField}
            {...materialUITextFieldProps}
                
              value={ineligibleRate } 
             
              onValueChange={(values) => {
               handleIneligibleRateUpdate({target: {value: values.value}})
              }
               
            }
               
              
             
              valueIsNumericString={true}
              suffix="%"
            />
  
                </>
               
           
        </div>

        <div className='row-no-left-margin'>
           
                <Box sx={{width: '47VW'}}>
                    {loading==true ? (<>
                    </>) : (<>
                        <Typography  fontSize="45pt"  align="center" sx={{fontFamily: 'Source Sans Pro', color: '#0059a8'  }}>{Math.floor(ineligibleDependentsResult)}</Typography>
                    </>)}
                    
                    <Typography fontFamily={'Roboto'} fontSize="14pt" align="center" sx={{fontFamily: 'Roboto',  }}>ineligible dependents</Typography>
                </Box>
           
            
            <Box sx={{width: '47VW'}}>
            {loading==true ? (<>
                    </>) : (<>
                        <Typography
                      fontSize="45pt"
                       align="center"
                       format={'Currency'}
                        sx={{fontFamily: 'Source Sans Pro', color: '#0059a8'  }}
                       
                        >
                          <CountUp
                           end={parseInt(annualSavingsResult)} 
                           duration={2}
                           prefix={'$'}
                           />
                        </Typography>

                    </>)}
                   
                    <Typography fontFamily={'Roboto'} fontSize="14pt" align="center" sx={{fontFamily: 'Roboto',  }}>first year annual savings</Typography>
                </Box>
           
        </div>
      </Box>
        {/* MOBILE LAYOUT */}
      <Box sx={{ display: {xs: "block", md: "none", lg: "none" , xl: "none"}}}>
      
      <div className='row-no-left-margin'>
                <Box sx={{width: '53VW'}}>
                    <Typography  fontSize="14pt" align="right" sx={{fontFamily: 'Roboto', mt: 2}}>How many dependents do you have?</Typography>
                </Box>
                <Box sx={{width: '2VW'}}/>
                <NumericFormat
                 customInput={TextField}
                 {...materialUITextFieldPropsMobile}
               
                value={dependentCount} 
              
                onValueChange={(values) => {
                  handleDependentCountUpdate({target: {value: values.value}})
                 }
                  
               }
               
                valueIsNumericString
                thousandSeparator
                
              />
               
           
        </div>
        <div className='row-no-left-margin'>
                <Box sx={{width: '53VW'}}>
                <Typography  fontFamily={'Roboto'} fontSize="14pt" align="right" sx={{fontFamily: 'Roboto',  mt: 2}}>What is your average annual cost per dependent?</Typography>
                </Box>
              
                <Box sx={{width: '2VW'}}/>
                <NumericFormat
               customInput={TextField}
               {...materialUITextFieldPropsMobile}
              onValueChange={(values) => {
                handleDependentCostUpdate({target: {value: values.value}})
               }
                
             }

              value={dependentCost} 
              
             
              thousandSeparator
              valueIsNumericString
              prefix="$"
            />
                
        </div>
        <div className='row-no-left-margin'>
                <Box sx={{width: '53VW'}}>
                    <Typography fontFamily={'Roboto'} fontSize="14pt" align="right" sx={{fontFamily: 'Roboto',  mt: 2}}>What is your estimated ineligible rate?</Typography>
                </Box>
                <Box sx={{width: '2VW'}}/>
                <>
                <NumericFormat
            customInput={TextField}
            {...materialUITextFieldPropsMobile}
                
              value={ineligibleRate } 
             
              onValueChange={(values) => {
               handleIneligibleRateUpdate({target: {value: values.value}})
              }
               
            }
               
              
             
              valueIsNumericString={true}
              suffix="%"
            />
  
                </>
               
           
        </div>

        <div className='row-no-left-margin'>
           
                <Box sx={{width: '47VW'}}>
                    {loading==true ? (<>
                    </>) : (<>
                        <Typography  fontSize="30pt"  align="center" sx={{fontFamily: 'Source Sans Pro', color: '#0059a8'  }}>{Math.floor(ineligibleDependentsResult)}</Typography>
                    </>)}
                    
                    <Typography fontFamily={'Roboto'} fontSize="12pt" align="center" sx={{fontFamily: 'Roboto',  }}>ineligible dependents</Typography>
                </Box>
           
            
            <Box sx={{width: '47VW'}}>
            {loading==true ? (<>
                    </>) : (<>
                        <Typography
                      fontSize="30pt"
                       align="center"
                       format={'Currency'}
                        sx={{fontFamily: 'Source Sans Pro', color: '#0059a8'  }}
                       
                        >
                          <CountUp
                           end={parseInt(annualSavingsResult)} 
                           duration={2}
                           prefix={'$'}
                           />
                        </Typography>

                    </>)}
                   
                    <Typography fontFamily={'Roboto'} fontSize="12pt" align="center" sx={{fontFamily: 'Roboto',  }}>first year annual savings</Typography>
                </Box>
           
        </div>

      </Box>
       
        
       
        

      {/* </Container> */}
      
      </>
     
    
  )
}

export default CalculatorUpdate