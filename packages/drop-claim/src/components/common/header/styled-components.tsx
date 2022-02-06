import styled, { css } from 'styled-components';

type TProps = {
  withAddress: boolean
}

export const Header = styled.header<TProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
  height: 68px;
  font-weight: 700;
  text-align: center;
  max-width: 340px;
  font-size: 24px;
  width: 100%;
  line-height: 36px;

  ${props => props.withAddress && css`
    justify-content: space-between;
  `}
`;

export const Logo = styled.div`
  font-size: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;

  svg {
    margin-right: 6px;
  }
`

export const Address = styled.div`
  border: 1px solid #E4E4E4;
  box-sizing: border-box;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 700;
  max-width: 145px;
  width: 100%;
  display: flex;
  align-items: center;
  min-height: 36px;
  padding: 0 10px;
`

export const AddressIndicator = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  border-radius: 16px;
  background-color: ${props => props.theme.tagSuccessColor};
  margin-right: 4px;
`