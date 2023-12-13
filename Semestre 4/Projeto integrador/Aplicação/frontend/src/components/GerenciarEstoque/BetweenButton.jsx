import React from 'react';
import Button from '@mui/material/Button';

const BetweenButton = ({ handleBetween }) => {
    return (
        <Button
            variant="contained"
            style={{
                maxWidth: '180px',
                minWidth: '100px',
            }}
            onClick={handleBetween}
            type="submit"
            color="primary"
        >
            Definir quantidade
        </Button>
    );
};

export default BetweenButton;
