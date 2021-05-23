import { useState } from 'react';
import { Badge, Button, Card, Collapse } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';

const Job = ({ job }) => {
    const DEFAULT_COMPANY_LOGO = 'https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940';

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen((state) => !state);
    };

    return (
        <Card className='mb-3'>
            <Card.Body>
                <div className='d-flex justify-content-between'>
                    <div>
                        <Card.Title>
                            {job.title} - <span className='text-muted'>{job.company}</span>
                        </Card.Title>
                        <Card.Subtitle className='text-muted mb-2'>{new Date(job.created_at).toLocaleDateString()}</Card.Subtitle>
                        <Badge variant='secondary mr-2'>{job.type}</Badge>
                        <Badge variant='secondary'>{job.location}</Badge>
                        <div style={{ wordBreak: 'break-all' }}>
                            <ReactMarkdown children={job.how_to_apply} />
                        </div>
                    </div>

                    <img className='d-none d-md-block' height='50' alt='company-logo' src={job.company_logo ?? DEFAULT_COMPANY_LOGO} />
                </div>

                <Card.Text>
                    <Button onClick={handleOpen} variant='primary'>
                        {!open ? 'View Details' : 'Hide Details'}
                    </Button>
                </Card.Text>

                <Collapse in={open}>
                    <div className='mt-4'>
                        <ReactMarkdown children={job.description} />
                    </div>
                </Collapse>
            </Card.Body>
        </Card>
    );
};

export default Job;
