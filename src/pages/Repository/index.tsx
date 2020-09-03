import React, { useEffect, useState } from 'react';
import { useRouteMatch, useParams, Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Header, RepositoryInfo, Issues } from './styles';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

interface Params {
  repository: string;
}
interface Repository {
  full_name: string;
  description: string;
  html_url: string;
  forks_count: number;
  open_issues: number;
  stargazers_count: number;
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface Issue {
  id: number;
  title: string;
  html_url: string;
  user: {
    login: string;
  };
}

const Repository: React.FC = () => {
  // useRouteMatch é possivel pegar url, params ....
  // useParams já pega direto o parametro
  const { params } = useRouteMatch<Params>();
  const [issues, setIssues] = useState<Issue[]>([]);
  const [repository, setRepository] = useState<Repository | null>(null);
  useEffect(() => {
    api
      .get(`repos/${params.repository}`)
      .then(response => setRepository(response.data));
    api
      .get(`repos/${params.repository}/issues`)
      .then(response => setIssues(response.data));

    // Alternativa para utilizar async/await
    /*

    // Nesse modelo a chamada para obter o issues só será executada quando o processo da chamada para obter o repository finalizar
    // Utilizada quando necessário utilizar algum dado da primeira promise para chamar a segunda promise
    async function loadData() {
      const repositoryResponse = await api.get(`repos/${params.repository}`);
      const issuesResponse = await api.get(`repos/${params.repository}/issues`);
    }
    loadData();

    // Nesse modelo a chamada tanto para obter repository quanto para issues será ao mesmo tempo e retorna quando ambas finalizarem
    // Utilizada quando não os dados de cada promise não depende da outra, são sendo necessário esperar obter a promise 1 para chamar a promise 2
    async function loadData() {
      const [repositoryResponse, issuesResponse] = await Promise.all([
        api.get(`repos/${params.repository}`),
        api.get(`repos/${params.repository}/issues`),
      ]);
    }
    loadData();

    // Caso de uso: Chamada a várias api de CEP
    // A primeira api que retornar suas informações será utilizada
    async function loadData() {
      const response = await Promise.race([
        api.get(`site-busca-cep-1.com`),
        api.get(`site-busca-cep-2.com`),
        api.get(`site-busca-cep-3.com`),
      ]);

      return response;
    }
    loadData();

    */
  }, [params.repository]);
  return (
    <>
      <Header>
        <img src={logoImg} alt="" />
        <Link to="/">
          <FiChevronLeft size={16} />
          Voltar
        </Link>
      </Header>
      {repository && (
        <RepositoryInfo>
          <header>
            <img
              src={repository.owner.avatar_url}
              alt="Imagem do repositório"
            />
            <div>
              <h1>{repository.full_name}</h1>
              <p>{repository.description} </p>
            </div>
          </header>
          <ul>
            <li>
              <strong>{repository.stargazers_count}</strong>
              <span>Stars</span>
            </li>
            <li>
              <strong>{repository.forks_count}</strong>
              <span>Forks</span>
            </li>
            <li>
              <strong>{repository.open_issues}</strong>
              <span>Issues abertas</span>
            </li>
          </ul>
        </RepositoryInfo>
      )}
      <Issues>
        <a href="/re">
          <div>
            <strong>Modelo issue</strong>
            <span>Hugo Matheus</span>
          </div>
          <FiChevronRight size={20} />
        </a>
        {issues.map(issue => (
          <a
            key={issue.id}
            href={issue.html_url}
            target="_blank"
            rel="noreferrer"
          >
            <div>
              <strong>{issue.title}</strong>
              <span>{issue.user.login}</span>
            </div>
            <FiChevronRight size={20} />
          </a>
        ))}
      </Issues>
    </>
  );
};

export default Repository;
