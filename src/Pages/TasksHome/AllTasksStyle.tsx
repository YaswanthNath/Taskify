import styled from 'styled-components'
import { Backdrop } from '@mui/material';

export const Head = styled.div`
    background-color:#C0C0C0;
    display:flex;
    justify-content: space-between;  
`;
export const ThreeDotsParent = styled.div`
    position:relative; 
`;
export const ThreeDotsChild = styled.div`
    width:20px;
    height:20px;
    position:absolute;
    top:0px;
    right:20%;   
`;
export const NavBar = styled.div`
    display: flex;
    justify-content: space-between;
`;
export const NavBarItem2 = styled.div`
    display: flex;
    flex-wrap:wrap;
    margin-right:20px;
`;
export const AddNew = styled.button`
    margin:25px;
    width:130px;
    height:40px;
    boder:1px solid black;
    padding:5px 10px;
    border-radius:5px;
    &:hover {
        background-color: #708090;
        color: white;
        cursor: pointer;
      }
      border:none;
`;
export const CardDiv = styled.div`
    display:flex;
    flex-wrap:wrap;
    width:100%;
    margin:10px;
`;
export const BlurredBackdrop = styled(Backdrop)`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  backdrop-filter: blur(8px); /* Adjust the blur amount as needed */
`;
export const ButtonProgress = styled.button`
    width:120px;
    height:50px;
    margin:5px; 
    margin-top:10px;
    background-color: #FFA500;
    color: white;
    border-radius:20px;
      &:hover {
        cursor: pointer;
      }
      border:none;
`;
export const ButtonComplete = styled.button`
    width:130px;
    height:50px;
    margin:5px;
    margin-top:10px;
    background-color:#9ACD32;
    color: white;
    border-radius:20px;
      &:hover {
        cursor: pointer;
      }
      border:none;
`;
export const ErrorText = styled.p`
    font-size:15px;
    color:red;
    margin:3px auto 15px 0px;
`;
export const CompletedTick=styled.img`
    height:40px;
    width:40px;
`;