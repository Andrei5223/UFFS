import React from 'react';
import Button from '@mui/material/Button';

const UpdateButton = ({ handleUpdate }) => {
    return (
        <Button
            variant="contained"
            style={{
                maxWidth: '100px',
                minWidth: '100px',
            }}
            onClick={handleUpdate}
            type="submit"
            color="primary"
        >
            Editar
        </Button>
    );
};

export default UpdateButton;
