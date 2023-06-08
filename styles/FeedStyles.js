import styled from 'styled-components';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  backgroundColor:'transparent';
  padding: 20px;
  height: 100%;
`;

export const Card = styled.View`
    background-color: #DCB375;
    width: 98%;
    height:175px;
    margin-bottom: 25px;
    border-radius: 20px;
`;

export const UserInfo = styled.View`
    flex-direction: row;
    justify-content: flex-start;
    padding: 15px;
`;

export const UserImg = styled.Image`
    width: 40px;
    height: 40px;
    border-radius: 25px;
`;

export const UserInfoText = styled.View`
    color: #fff;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    margin-left: 10px;
`;

export const UserName = styled.Text`
    color: #fff;
    font-size: 18px;
    font-weight: bold;
    font-family: 'ArialMT';
`;

export const PostTime = styled.Text`
    font-size: 12px;
    font-family: 'ArialMT';
    color: #fff;
`;

export const PostText = styled.Text`
    color: #fff;
    font-size: 14px;
    font-family: 'ArialMT';
    padding-left: 15px;
    padding-right: 15px;
`;

export const PostImg = styled.Image`
    width: 100%;
    height: 250px;
    /* margin-top: 15px; */
`;

export const Divider = styled.View`
    border-bottom-color: #dddddd;
    border-bottom-width: 1px;
    width: 92%;
    align-self: center;
    margin-top: 15px;
`;

export const InteractionWrapper = styled.View`
    background-color: '#000';
    flex-direction: row;
    justify-content: space-around;
    padding: 15px;
`;

export const Interaction = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;
    border-radius: 5px;
    padding: 2px 10px;
    margin-top: 5px;
    background-color: '#fff';
    // background-color: ${props => props.active ? '#2e64e515' : 'transparent'}
`;

export const InteractionText = styled.Text`
    font-size: 12px;
    font-family: 'Lato-Regular';
    font-weight: bold;
    color: ${props => props.active ? '#2e64e5' : '#333'};
    margin-top: 5px;
    margin-left: 5px;
`;