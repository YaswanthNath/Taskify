import styled from 'styled-components'
import { Backdrop } from '@mui/material';
import background from "../../Assets/background-prc.jpg"


export const LogoPart = styled.div`
    display:flex;
    flex-wrap:wrap;
`;
export const LogoImg = styled.img`
    width:60px;
    height:50px;
    margin-top:40px;
    margin-left:20px;
    margin-right:0px;
    @media (max-width: 600px) {
        margin-left:15px;
      }
  
    
`;
export const ContainerTasks = styled.div`
margin:0;
overflow:hidden;
min-height:100vh;
height:100%;
    background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(130,147,172,1) 58%);
`;
export const Logo = styled.div`
    font-size:30px;
    font-weight:400;
    margin-top:40px;
    margin-left:10px;
    color:white;
    @media (max-width: 600px) {
        font-size:30px;
        margin-top:40px;
        margin-left:5px;
      }
`;

export const Head = styled.div`
    display:flex;
    justify-content: space-between;  
`;
export const ThreeDotsParent = styled.div`
    position:relative; 
`;
export const ThreeDotsChild = styled.div`
    position:absolute;
    top:10px;
    right:5%;   
`;
export const NavBar = styled.div`

    display: flex;
    justify-content: space-between;
`;
export const NavBarItem2 = styled.div`
    display: flex;
    flex-wrap:wrap;
    margin-right:20px;
    margin-left:20px;
`;
export const AddNew = styled.button`
    text-align:center;
    margin:25px;
    margin-top:40px;
    
    boder:1px solid black;
    padding:5px 20px;
    border-radius:5px;
    &:hover {
        background-color: #708090;
        color: white;
        cursor: pointer;
      }
      border:none;
      @media (max-width: 660px) {
        margin-top:40px;
        width:105px;
        padding:5px 0px;
    }
`;
export const ComButton = styled.button`
    width:100px;
    height:30px;    
    background:#808080;
    color:white;
    border:none;
    border-radius:7px;
    font-size:15px;
`;
export const CardDiv = styled.div`
    display:flex;
    flex-wrap:wrap;
    width:100%;
    margin-top:10px;
    margin-left:11px;
    @media (max-width: 660px) {
        width:97%;
        margin-left:10px;
    }
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
    width:130px;
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
    @media (max-width: 660px) {
        width:60px;
        height:50px;
        margin:10px;
    }
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
      @media (max-width: 660px) {
        width:60px;
        height:50px;
        margin:10px;
    }
`;
export const ErrorText = styled.p`
    font-size:15px;
    color:red;
    margin:3px auto 15px 0px;
`;
export const CompletedTick = styled.img`
    height:40px;
    width:40px;
`;
export const EmptyDataText = styled.span`
    font-size:30px;
    margin-left:15px;
    width:100%;
    color:white;
    text-align:center;
    @media (max-width: 660px) {
        width:100%;
        font-size:20px;
        text-align:center;
        color:#FFF0F5
    }
`;