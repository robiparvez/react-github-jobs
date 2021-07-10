import { Col, Form } from 'react-bootstrap';

const SearchForm = ({ params, onParamChange }) => {
    return (
        <Form className='mb-4'>
            <Form.Row className='align-items-end'>

                {/* Title/Description */}
                <Form.Group as={Col}>
                    <Form.Label>Title/Description</Form.Label>
                    <Form.Control type='text' name='search' onChange={onParamChange} value={params.search} />
                </Form.Group>

                {/* Category */}
                <Form.Group as={Col}>
                    <Form.Label>Category</Form.Label>
                    <Form.Control type='text' name='category' onChange={onParamChange} value={params.category} />
                </Form.Group>

                {/* Company */}
                <Form.Group as={Col}>
                    <Form.Label>Company</Form.Label>
                    <Form.Control type='text' name='company_name' onChange={onParamChange} value={params.company_name} />
                </Form.Group>

                {/* Full-time */}
                {/* <Form.Group as={Col} xs='auto'>
                    <Form.Check
                    onChange={onParamChange}
                    value={params.full_time}
                    name='full_time'
                    id='full-time'
                    label='Only Full Time'
                    type='switch'
                    className='mb-2'
                    />
                </Form.Group> */}
            </Form.Row>
        </Form>
    );
};

export default SearchForm;
