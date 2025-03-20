import styled from "styled-components";

export const InputContainer = styled.div`
  display: flex;
  justify-content: start;
  margin: 10px 0;
`;

export const Input = styled.input`
  flex: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const AddButton = styled.button`
  background-color: #28a745;
  color: white;
  padding: 8px 12px;
  margin-left: 5px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  
  &:hover {
    background-color: #218838;
  }
`;

export const ItemContainer = styled.div`
  display: flex;
  background-color: white;
  margin: 5px 0;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

export const ItemText = styled.span`
  text-align: left;
  flex: 1;
`;

export const CompleteButton = styled.button`
  background-color: #28a745;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`;

export const DeleteButton = styled.button`
  background-color: #dc3545;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #c82333;
  }
`;

export const ListContainer = styled.div`
  margin: 5px 0;
  width: 240px;
  min-height: fit-content; 
  transition: height 0.3s ease-in-out;
`;

export const Title = styled.h2`
  font-size: 20px;
  margin-bottom: 15px;
`;

export const CompletedContainer = styled.div`
  margin: 5px 0;
  width: 240px;
`;

export const CompleteTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 10px;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center; 
  align-items: center; 
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 15px;
  width: fit-content; 
  max-width: 360px;
  min-height: 200px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 10px #ccc;
  text-align: center;
  transition: height 0.3s ease-in-out;
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
  transition: height 0.3s ease-in-out;
`;


