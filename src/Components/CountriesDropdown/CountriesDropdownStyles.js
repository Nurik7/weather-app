import styled from "styled-components";
import {CityName, CurrentTime, SelectCityButton} from "../../Pages/MainStyles";

export const ModalTitle = styled(CityName)`
  text-align: center;
  opacity: 1;
  display: block;
  margin-bottom: 30px;
  margin-right: 0;
`;

export const ModalSubtitle = styled(CurrentTime)`
  display: block;
  margin-bottom: 15px;
`;

export const ModalInput = styled.input`
  font-size: 18px;
  padding: 10px;
  margin-bottom: 20px;
  width: 100%;
  border: none;
  border-radius: 3px;
`;

export const ModalButton = styled(SelectCityButton)`
  padding: 7px 25px;
  margin-right: 0;
  font-size: 18px;
  float: right;
`;