import axios from 'axios';
import { useReducer, useEffect } from 'react';

// const BASE_URL = 'https://remotive.io/api/remote-jobs';
const BASE_URL = 'https://remotive.io/api/remote-jobs?limit=200';

const ACTIONS = {
    MAKE_REQUEST: 'make-request',
    GET_DATA: 'get-data',
    ERROR: 'error',
    UPDATE_HAS_NEXT_PAGE: 'update-has-next-page'
};

const reducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.MAKE_REQUEST:
            return { loading: true, jobs: [] };

        case ACTIONS.GET_DATA:
            return { ...state, loading: false, jobs: action.payload.jobs };

        case ACTIONS.ERROR:
            return { ...state, loading: false, error: action.payload.error, jobs: [] };

        case ACTIONS.UPDATE_HAS_NEXT_PAGE:
            return { ...state, hasNextPage: action.payload.hasNextPage };

        default:
            return state;
    }
};

const useFetchJobs = (params, page) => {
    const [state, dispatch] = useReducer(reducer, { jobs: [], loading: true });

    useEffect(() => {
        dispatch({ type: ACTIONS.MAKE_REQUEST });

        // Fetch jobs
        const cancelToken1 = axios.CancelToken.source();
        axios
            .get(BASE_URL, {
                cancelToken: cancelToken1.token,
                // params: { markdown: true, page: page, ...params }
                params: { ...params }
            })
            .then((res) => {
                console.log(res.data.jobs);
                // dispatch({ type: ACTIONS.GET_DATA, payload: { jobs: res.data } });
                dispatch({ type: ACTIONS.GET_DATA, payload: { jobs: res.data.jobs } });
            })
            .catch((err) => {
                // console.log(err);
                if (axios.isCancel(err)) return;
                dispatch({ type: ACTIONS.ERROR, payload: { error: err } });
            });

        // Fetch jobs pages length
        const cancelToken2 = axios.CancelToken.source();
        axios
            .get(BASE_URL, {
                cancelToken: cancelToken2.token,
                // params: { markdown: true, page: page, ...params }
                params: { ...params }
            })
            .then((res) => {
                // dispatch({ type: ACTIONS.UPDATE_HAS_NEXT_PAGE, payload: { hasNextPage: res.data.length !== 0 } });
                dispatch({ type: ACTIONS.UPDATE_HAS_NEXT_PAGE, payload: { hasNextPage: res.data.jobs.length !== 0 } });
            })
            .catch((err) => {
                if (axios.isCancel(err)) return;
                dispatch({ type: ACTIONS.ERROR, payload: { error: err } });
            });

        return () => {
            cancelToken1.cancel();
            cancelToken2.cancel();
        };
    }, [params, page]);

    return state;
};

export default useFetchJobs;
