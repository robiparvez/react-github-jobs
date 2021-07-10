import { useState } from 'react';
import { Badge, Button, Card, Collapse } from 'react-bootstrap';
import parse from 'html-react-parser';

const Job = ({ job: { title, company_name, publication_date, job_type, candidate_required_location, description } }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen((state) => !state);
    };

    const removeUnderScoreAndConvertToCamelCase = (str) => {
        var i,
            frags = str.split('_');
        for (i = 0; i < frags.length; i++) {
            frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
        }
        return frags.join(' ');
    };

    return (
        <Card className='mb-3'>
            <Card.Body>
                <div className='d-flex justify-content-between mb-3'>
                    <div>
                        <Card.Title>
                            {title} - <span className='text-muted'>{company_name}</span>
                        </Card.Title>

                        <Card.Subtitle className='text-muted mb-2'>
                            {new Date(publication_date).toLocaleDateString()} {new Date(publication_date).toLocaleTimeString()}
                        </Card.Subtitle>

                        <Badge variant='secondary mr-2'>{removeUnderScoreAndConvertToCamelCase(job_type)}</Badge>

                        <Badge variant='secondary'>{candidate_required_location}</Badge>
                    </div>
                </div>

                <Card.Text>
                    <Button onClick={handleOpen} variant='primary'>
                        {!open ? 'View Details' : 'Hide Details'}
                    </Button>
                </Card.Text>

                <Collapse in={open}>
                    <div>{parse(description)}</div>
                </Collapse>
            </Card.Body>
        </Card>
    );
};

export default Job;
