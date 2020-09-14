import React, { memo } from "react";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Paragraph from "../components/Paragraph";
import Button from "../components/Button";
import { logoutUser } from "../api/auth-api";

const Dashboard = ({ navigation }) => (
  <Background>
    <Logo />
    <Header>Registra tus cursos</Header>
    <Button
      mode="contained"
      onPress={() => navigation.navigate("AddUserScreen")}
    >
      Registrar cursos
    </Button>
    <Button mode="outlined" onPress={() => logoutUser()}>
      Salir
    </Button>
  </Background>
);

export default memo(Dashboard);
