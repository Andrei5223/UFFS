import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Table from './Table';

function AcordeaoCelula(prop) {
    const PanelContent = `panel${prop.num}-content`;
    const PanelId = `panel${prop.num}-header`;

    return (
        <Accordion style={{backgroundColor: 'lightseagreen'}}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={PanelContent}
                id={PanelId}
            >
                <Typography>Semestre {prop.num}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    <Table horarios={prop.horarios} />
                </Typography>
            </AccordionDetails>
        </Accordion>
    );
}

export default AcordeaoCelula;