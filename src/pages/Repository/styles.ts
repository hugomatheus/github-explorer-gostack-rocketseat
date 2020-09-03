import styled from 'styled-components';

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  a {
    display: flex;
    align-items: center;
    font-weight: bold;
    font-size: 16px;
    line-height: 19px;
    color: #a8a8b3;
    text-decoration: none;
    transition: 0.2s;

    &:hover {
      color: #666;
    }

    svg {
      margin-right: 4px;
    }
  }
`;

export const RepositoryInfo = styled.section`
  header {
    margin-top: 80px;
    display: flex;
    align-items: center;
    img {
      width: 152px;
      height: 152px;
      border-radius: 50%;
    }

    div {
      margin-left: 26px;
      h1 {
        font-weight: bold;
        font-size: 36px;
        line-height: 42px;
        color: #3d3d4d;
      }
      p {
        margin-top: 12px;
        font-size: 20px;
        line-height: 23px;
        color: #737380;
      }
    }
  }

  ul {
    margin-top: 60px;
    list-style: none;
    display: flex;

    li {
      & + li {
        margin-left: 80px;
      }
      strong {
        display: block;
        font-size: 36px;
        line-height: 42px;
        color: #3d3d4d;
      }

      span {
        display: block;
        font-size: 20px;
        line-height: 23px;
        color: #6c6c80;
      }
    }
  }
`;

export const Issues = styled.section`
  margin-top: 80px;
  a {
    padding: 24px;
    background: #ffffff;
    border-radius: 5px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    text-decoration: none;

    & + a {
      margin-top: 16px;
    }

    div {
      strong {
        display: block;
        font-size: 24px;
        line-height: 28px;
        color: #3d3d4d;
      }

      span {
        display: block;
        font-size: 18px;
        line-height: 21px;
        color: #a8a8b3;
      }
    }
  }
`;
