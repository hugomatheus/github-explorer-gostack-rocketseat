import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface FormProps {
  hasError: boolean;
}

export const Title = styled.h1`
  max-width: 433px;
  margin-top: 80px;
  font-weight: bold;
  font-size: 48px;
  line-height: 56px;
  color: #3a3a3a;
`;

export const Form = styled.form<FormProps>`
  max-width: 714px;
  margin-top: 40px;
  display: flex;

  &.input-error-placeholder input::placeholder {
    color: red;
  }

  input {
    flex: 1;
    height: 70.8px;
    padding: 0 24px;
    background: #ffffff;
    border: 0;
    border-radius: 5px 0 0 5px;
    border: 1px solid #ffffff;
    border-right: 0;
    color: #3a3a3a;

    &::placeholder {
      color: #a8a8b3;
    }

    ${props =>
      props.hasError &&
      css`
        border-color: red;
      `}
  }

  button {
    width: 210px;
    height: 70.8px;
    background: #04d361;
    border: 0;
    border-radius: 0 5px 5px 0;
    font-weight: bold;
    font-size: 18px;
    line-height: 21px;
    color: #ffffff;
    transition: background-color 0.2s;

    &:hover {
      background: ${shade(0.2, '#04d361')};
    }
  }
`;

export const Repositories = styled.section`
  max-width: 714px;
  margin-top: 80px;

  a {
    display: flex;
    align-items: center;
    padding: 24px;
    background: #ffffff;
    border-radius: 5px;
    text-decoration: none;
    transition: transform 0.2s;

    &:hover {
      transform: translateX(18px);
    }

    & + a {
      margin-top: 16px;
    }

    img {
      width: 64px;
      height: 64px;
      border-radius: 50%;
    }

    div {
      flex: 1;
      margin: 0 16px;
      strong {
        font-size: 20px;
        line-height: 28px;
        color: #3d3d4d;
      }

      p {
        margin-top: 4px;
        font-size: 18px;
        line-height: 21px;
        color: #a8a8b3;
      }
    }

    svg {
      margin-left: auto;
      color: #c9c9d4;
    }
  }
`;

export const Error = styled.span`
  display: block;
  margin-top: 8px;
  color: red;
  font-size: 18px;
`;
