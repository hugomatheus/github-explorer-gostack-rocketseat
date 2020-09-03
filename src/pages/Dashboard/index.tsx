import React, { useState, FormEvent, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import { Title, Form, Repositories, Error } from './styles';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

interface Repository {
  full_name: string;
  description: string;
  html_url: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}
const Dashboard: React.FC = () => {
  const [inputRepository, setInputRepository] = useState('');
  const [inputError, setInputError] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const localStorageRepositories = localStorage.getItem(
      '@GithubExplorer:repositores',
    );
    if (localStorageRepositories) {
      return JSON.parse(localStorageRepositories);
    }
    return [];
  });
  useEffect(() => {
    localStorage.setItem(
      '@GithubExplorer:repositores',
      JSON.stringify(repositories),
    );
  }, [repositories]);
  async function handleAddNewRepository(event: FormEvent): Promise<void> {
    event.preventDefault();
    try {
      if (!inputRepository) {
        setInputError('Digite autor/nome do repositório');
        return;
      }

      const response = await api.get<Repository>(`repos/${inputRepository}`);
      setRepositories([...repositories, response.data]);
      setInputRepository('');
      setInputError('');
    } catch (error) {
      setInputError('Nenhum repositório foi encontrado');
    }
  }

  return (
    <>
      <img src={logoImg} alt="" />
      <Title>Explore repositórios no Github.</Title>
      <Form
        hasError={Boolean(inputError)}
        className={inputError && 'input-error-placeholder'}
        onSubmit={handleAddNewRepository}
      >
        <input
          value={inputRepository}
          onChange={e => setInputRepository(e.target.value)}
          placeholder="Digite o nome do repositório"
        />
        <button type="submit">Pesquisar</button>
      </Form>
      {inputError && <Error>{inputError}</Error>}
      <Repositories>
        <Link to="/repository/test">
          <img
            src="https://avatars0.githubusercontent.com/u/46351795?s=460&u=89fb13927b709f238a50f96e7d81ded591672464&v=4"
            alt="Hugo Matheus"
          />
          <div>
            <strong>hugomatheus/larafood</strong>
            <p>Projeto realizado no curso larafood</p>
          </div>
          <FiChevronRight size={20} />
        </Link>
        {repositories.map(repository => (
          <Link
            key={repository.html_url}
            to={`/repository/${repository.full_name}`}
          >
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
            <FiChevronRight size={20} />
          </Link>
        ))}
      </Repositories>
    </>
  );
};

export default Dashboard;
