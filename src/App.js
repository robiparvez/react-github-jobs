import { useState } from 'react';
import { Container } from 'react-bootstrap';
import useFetchJobs from './hooks/useFetchJobs';
import Job from './components/Job';
import JobsPagination from './components/JobsPagination';
import SearchForm from './components/SearchForm';

function App() {
    const title = 'GITHUB JOBS';
    const [params, setParams] = useState({});
    const [page, setPage] = useState(1);
    const { jobs, loading, error, hasNextPage } = useFetchJobs(params, page);
    const handleParamsChange = (e) => {
        const param = e.target.name;
        const value = e.target.value;
        setPage(1);
        setParams((prevParams) => ({ ...prevParams, [param]: value }));
    };

    return (
        <Container className='my-4'>
            <h1 className='mb-4'>{title}</h1>

            {/* Search form */}
            <SearchForm params={params} onParamChange={handleParamsChange} />

            {/* Pagination - Top */}
            <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />

            {loading && <h1>Loading...</h1>}

            {error && <h1>Try refreshing...</h1>}
            {jobs.map((job) => {
                return <Job key={job.id} job={job} />;
            })}

            {/* Pagination - Bottom */}
            <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
        </Container>
    );
}

export default App;
