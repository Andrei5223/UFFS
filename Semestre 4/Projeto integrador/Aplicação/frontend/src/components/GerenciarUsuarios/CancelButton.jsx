import React from 'react';
import Button from '@mui/material/Button';

const CancelButton = ({ handleCancelClick }) => {
    return (
        <Button
            variant="outlined"
            style={{
                maxWidth: '100px',
                minWidth: '100px',
            }}
            onClick={handleCancelClick}
            color="error"
        >
            Cancelar
        </Button>
    );
};

export default CancelButton;
