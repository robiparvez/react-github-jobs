import { Col, Form } from 'react-bootstrap';

const SearchForm = ({ params, onParamChange }) => {
    return (
        <Form className='mb-4'>
            <Form.Row className='align-items-end'>
                {/* Description */}
                <Form.Group as={Col}>
                    <Form.Label>Description</Form.Label>
                    <Form.Control type='text' name='description' onChange={onParamChange} value={params.description} />
                </Form.Group>
                {/* Location */}
                <Form.Group as={Col}>
                    <Form.Label>Location</Form.Label>
                    <Form.Control type='text' name='location' onChange={onParamChange} value={params.location} />
                </Form.Group>

                {/* Full-time */}
                <Form.Group as={Col} xs='auto'>
                    <Form.Check
                    onChange={onParamChange}
                    value={params.full_time}
                    name='full_time'
                    id='full-time'
                    label='Only Full Time'
                    type='switch'
                    className='mb-2'
                    />
                </Form.Group>
            </Form.Row>
        </Form>
    );
};

export default SearchForm;
