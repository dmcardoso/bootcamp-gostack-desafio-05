import React, { useState, useEffect } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import { Form, SubmitButton, List } from './styles';
import Container from '../../components/Container';

export default function Main() {
    const [newRepo, setNewRepo] = useState('');
    const [repositories, setRepositories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const newRepositories = localStorage.getItem('repositories');

        if (newRepositories) {
            setRepositories(JSON.parse(newRepositories));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('repositories', JSON.stringify(repositories));
    }, [repositories]);

    function handleInputChange(e) {
        const { value } = e.target;

        setNewRepo(value);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError(false);
        setLoading(true);

        try {
            const repoExists = repositories.find(
                (repo) => repo.name === newRepo
            );

            if (repoExists) {
                throw new Error('Repositório duplicado');
            }
            const response = await api.get(`/repos/${newRepo}`);

            const data = { name: response.data.full_name };

            setLoading(false);
            setRepositories([...repositories, data]);
            setNewRepo('');
        } catch (err) {
            console.error(err);
            setError(true);
            setLoading(false);
        }
    }

    return (
        <Container>
            <h1>
                <FaGithubAlt />
                Repositórios
            </h1>

            <Form onSubmit={handleSubmit} error={error}>
                <input
                    type="text"
                    placeholder="Adicionar repositório"
                    value={newRepo}
                    onChange={handleInputChange}
                />
                <SubmitButton loading={loading}>
                    {loading ? (
                        <FaSpinner color="#FFF" size={14} />
                    ) : (
                        <FaPlus color="#FFF" size={14} />
                    )}
                </SubmitButton>
            </Form>

            <List>
                {repositories.map((repository) => (
                    <li key={repository.name}>
                        <span>{repository.name}</span>
                        <Link
                            to={`/repository/${encodeURIComponent(
                                repository.name
                            )}`}
                        >
                            Detalhes
                        </Link>
                    </li>
                ))}
            </List>
        </Container>
    );
}
