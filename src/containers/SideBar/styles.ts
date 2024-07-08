import styled from 'styled-components'
import variables from '../../styles/variables'

export const S = {
  Aside: styled.aside`
    padding: 16px;
    background-color: ${variables.white3};
    height: 100vh;

    @media screen and (max-width: 765px) {
      width: 100%;
      height: auto;
    }
  `,
  Filters: styled.select`
    display: flex;
    flex-direction: column;
    padding: 5px;
    margin-top: 16px;
  `,
  SearchBar: styled.input`
    display: flex;
    background-color: #333;
    padding: 10px 20px;
    border-radius: 15px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
  `
}
