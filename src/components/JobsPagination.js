import { Pagination } from 'react-bootstrap';

const JobsPagination = ({ page, setPage, hasNextPage }) => {
    const adjustPage = (amount) => {
        setPage((previousPage) => previousPage + amount);
    };

    return (
        <Pagination>
            {page !== 1 && <Pagination.Prev onClick={() => adjustPage(-1)} />}

            {/* Go to page 1 all the time */}
            {page !== 1 && <Pagination.Item onClick={() => setPage(1)}>1</Pagination.Item>}

            {/* Show pagination ellipsis if page is greater than 2 */}
            {page > 2 && <Pagination.Ellipsis />}

            {page > 2 && <Pagination.Item onClick={() => adjustPage(-1)}>{page - 1}</Pagination.Item>}

            <Pagination.Item active>{page}</Pagination.Item>

            {hasNextPage && <Pagination.Item onClick={() => adjustPage(1)}>{page + 1}</Pagination.Item>}

            {hasNextPage && <Pagination.Next onClick={() => adjustPage(1)} />}
        </Pagination>
    );
};

export default JobsPagination;
