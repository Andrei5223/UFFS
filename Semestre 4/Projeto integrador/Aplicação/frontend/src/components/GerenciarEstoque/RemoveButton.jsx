import React from 'react';
import Button from '@mui/material/Button';

const RemoveButton = ({ handleRemove }) => {
    return (
        <Button
            variant="contained"
            style={{
                maxWidth: '100px',
                minWidth: '100px',
            }}
            onClick={handleRemove}
            type="submit"
            color="primary"
        >
            Retirar
        </Button>
    );
};

export default RemoveButton;
