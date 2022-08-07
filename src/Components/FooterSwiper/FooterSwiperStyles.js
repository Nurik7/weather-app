//footer
import styled from "styled-components";

export const Footer = styled.footer`
  flex: 0 1 auto;
  border-top: 1px solid rgba(255, 255, 255, 0.66);

  z-index: ${props => props.isModalOpen ? -1 : "unset"};

  div {

  }
`;

export const FooterContent = styled.div`
  position: relative;
  max-width: 1075px;
  margin: 37px auto 93px;
`;

export const FooterItemDivider = styled.div`
  position: absolute;
  border-left: 1px solid rgba(255, 255, 255, 0.66);
  height: 100%;
`;

export const FooterItem = styled.div`
  text-align: center;
  color: #FFFFFF;
`;

export const FooterItemTime = styled.div`
  font-weight: 400;
  font-size: 18px;
  color: #FFFFFF;
  padding-bottom: 17px;
  padding-top: 7px;
`;

export const FooterItemTemp = styled.div`
  font-weight: 400;
  font-size: 18px;
  color: #FFFFFF;
  padding-top: 15px;
  padding-bottom: 8px;
`;
//footer end