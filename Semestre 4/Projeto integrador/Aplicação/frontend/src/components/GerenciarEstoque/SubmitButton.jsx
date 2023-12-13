import React from 'react';
import Button from '@mui/material/Button';

const SubmitButton = ({ handleSubmit }) => {
    return (
        <Button
            variant="contained"
            style={{
                maxWidth: '100px',
                minWidth: '100px',
            }}
            onClick={handleSubmit}
            type="submit"
            color="primary"
        >
            Enviar
        </Button>
    );
};

export default SubmitButton;
