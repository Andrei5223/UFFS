import * as React from 'react';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

function ColetarData(props) {
  
  async function handleChange(newValue) {
    props.setValue(newValue);
    console.log(newValue.format('YYYY-MM-DD'));
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DatePicker']}>
        <DatePicker
          label="Definir data:"
          value={props.value}
          onChange={(newValue) => handleChange(newValue)}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}

export default ColetarData;
