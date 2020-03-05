import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import api from '../../services/api';

import {
    Loading,
    Owner,
    IssueList,
    Types,
    TypeIssue,
    Pagination,
} from './styles';
import Container from '../../components/Container';

export default function Repository({ match }) {
    const [repository, setRepository] = useState({});
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [typeSelected, setTypeSelected] = useState('all');

    useEffect(() => {
        async function getData() {
            const repoName = decodeURIComponent(match.params.repository);

            const [reqRepository, reqIssues] = await Promise.all([
                api.get(`/repos/${repoName}`),
                api.get(`/repos/${repoName}/issues`, {
                    params: {
                        state: 'all',
                        per_page: 5,
                        page,
                    },
                }),
            ]);

            setRepository(reqRepository.data);
            setIssues(reqIssues.data);
            setLoading(false);
        }

        getData();
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        async function getIssues() {
            const repoName = decodeURIComponent(match.params.repository);

            const reqIssues = await api.get(`/repos/${repoName}/issues`, {
                params: {
                    state: typeSelected,
                    per_page: 5,
                    page,
                },
            });

            setIssues(reqIssues.data);
        }
        getIssues();
        // eslint-disable-next-line
    }, [page, typeSelected]);

    if (loading) {
        return <Loading>Carregando</Loading>;
    }

    return (
        <Container>
            <Owner>
                <Link to="/">Voltar aos repositórios</Link>
                <img
                    src={repository.owner.avatar_url}
                    alt={repository.owner.login}
                />
                <h1>{repository.name}</h1>
                <p>{repository.description}</p>
            </Owner>
            <Types>
                <TypeIssue
                    selected={typeSelected === 'all'}
                    type="button"
                    onClick={() => {
                        setPage(1);
                        setTypeSelected('all');
                    }}
                >
                    ALL
                </TypeIssue>
                <TypeIssue
                    selected={typeSelected === 'open'}
                    type="button"
                    onClick={() => {
                        setPage(1);
                        setTypeSelected('open');
                    }}
                >
                    OPEN
                </TypeIssue>
                <TypeIssue
                    selected={typeSelected === 'closed'}
                    type="button"
                    onClick={() => {
                        setPage(1);
                        setTypeSelected('closed');
                    }}
                >
                    CLOSED
                </TypeIssue>
            </Types>

            <IssueList>
                {issues.map((issue) => (
                    <li key={String(issue.id)}>
                        <img
                            src={issue.user.avatar_url}
                            alt={issue.user.login}
                        />
                        <div>
                            <strong>
                                <a href={issue.html_url}>{issue.title}</a>
                                {issue.labels.map((label) => (
                                    <span key={String(label.id)}>
                                        {label.name}
                                    </span>
                                ))}
                            </strong>
                            <p>{issue.user.login}</p>
                        </div>
                    </li>
                ))}
            </IssueList>
            <Pagination>
                {page > 1 && (
                    <FaArrowLeft
                        title="Anterior"
                        onClick={() => setPage(page - 1)}
                        color="#7159c1"
                        size={22}
                    />
                )}
                <FaArrowRight
                    title="Próxima"
                    onClick={() => setPage(page + 1)}
                    color="#7159c1"
                    size={22}
                />
            </Pagination>
        </Container>
    );
}

Repository.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            repository: PropTypes.string,
        }),
    }).isRequired,
};
