import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  min-height: 100vh;
`;

export const LoaderWrapper = styled.div`
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
`;

export const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  width: 100%;
`;

export const Header = styled.header`
  padding: 45px 60px 0 45px;
  flex: 0 1 auto;
`;

//header top begins here
export const HeaderTop = styled.div`
  margin-bottom: 30px;
  display: ${props => props.isSelectedCity ? "inherit" : "flex"};
  align-items: flex-end;
`;

export const CityName = styled.span`
  font-weight: 400;
  font-size: 50px;
  color: #FFFFFF;
  margin-right: 80px;
`;

export const CurrentTime = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 24px;
  color: #FFFFFF;
`;

export const SelectCityButton = styled.button`
  background: #FFFFFF;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  padding: 14px 50px;
  border: none;
  cursor: pointer;
  outline: inherit;
  margin-right: 27px;

  font-weight: 400;
  font-size: 22px;
  color: #000000;
`;
//header top ends here


//header bottom begins here
export const HeaderBottom = styled.div`

`;

export const ChangeCityButton = styled.span`
  font-family: 'Lato', sans-serif;
  font-weight: 400;
  font-size: 18px;
  color: #FFFFFF;
  mix-blend-mode: normal;
  opacity: 0.6;
  margin-right: 30px;
  cursor: pointer;
`;

export const MyLocationButton = styled.span`
  font-family: 'Lato', sans-serif;
  font-weight: 400;
  font-size: 18px;
  color: #FFFFFF;
  mix-blend-mode: normal;
  opacity: 0.6;
  position: relative;
  padding-left: 28px;
  cursor: pointer;

  img {
    position: absolute;
    left: 0;
    bottom: 0;
  }
`;
//header bottom ends here


//content part begins here
export const Content = styled.div`
  flex: 1 1 auto;
  display: flex;
  align-content: center;
  align-items: center;
`;

export const ContentTemp = styled.div`
  text-align: center;
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    margin-right: 44px;
    width: 140px;
    height: 140px;
  }

  span {
    font-family: 'Lato', sans-serif;
    font-style: normal;
    font-weight: 700;
    font-size: 90px;
    line-height: 108px;
    color: #FFFFFF;
  }
`;

export const ContentDesc = styled.div`
  text-align: center;
  font-weight: 400;
  font-size: 30px;
  color: #FFFFFF;
`;

export const ContentAdditional = styled.div`
  text-align: center;
  padding-top: 66px;
  display: flex;
  justify-content: center;

  div:last-child {
    padding-right: 0;
  }

  div {
    display: flex;
    align-items: center;
    align-content: center;
    flex-wrap: wrap;
    padding-right: 47px;

    font-weight: 400;
    font-size: 18px;
    color: #FFFFFF;

    img {
    }

    span {
      padding-left: 15px;
    }
  }
`;
//content part ends here

