import React, { memo } from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import Paragraph from "../components/Paragraph";

const HomeScreen = ({ navigation }) => (
  <Background>
    <Logo />
    <Header>Matricula</Header>

    <Paragraph>Esta aplicaciòn le da la opciòn de matricular</Paragraph>
    <Button mode="contained" onPress={() => navigation.navigate("LoginScreen")}>
      Ingresar
    </Button>
    <Button
      mode="outlined"
      onPress={() => navigation.navigate("RegisterScreen")}
    >
      Registrarse
    </Button>
  </Background>
);

export default memo(HomeScreen);
