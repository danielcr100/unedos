import React, { Component } from "react";

import Background from "../components/Background";
import Logo from "../components/Logo";
import Button from "../components/Button";
import {
  StyleSheet,
  TextInput,
  ScrollView,
  ActivityIndicator,
  View,
} from "react-native";
import firebase from "firebase";
import { logoutUser } from "../api/auth-api";

class AddUserScreen extends Component {
  constructor() {
    super();
    this.dbRef = firebase.firestore().collection("cursos");

    this.state = {
      codigo: "",
      nombre: "",

      isLoading: false,
    };
  }

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  storeUser() {
    if (this.state.codigo === "" && this.state.nombre === "") {
      alert("Complete los campos solicitados");
    } else {
      this.setState({
        isLoading: true,
      });
      this.dbRef
        .add({
          codigo: this.state.codigo,
          nombre: this.state.nombre,
        })
        .then((res) => {
          this.setState({
            codigo: "",
            nombre: "",

            isLoading: false,
          });
          this.props.navigation.navigate("UserScreen");
        })
        .catch((err) => {
          console.error("Error found: ", err);
          this.setState({
            isLoading: false,
          });
        });
    }
  }
  Courses() {
    if (this.state.nombre != "") {
      alert("");
    } else {
      this.setState({
        isLoading: true,
      });
      this.dbRef
        .add({
          codigo: this.state.codigo,
          nombre: this.state.nombre,
        })
        .then((res) => {
          this.setState({
            codigo: "",
            nombre: "",

            isLoading: false,
          });
          this.props.navigation.navigate("UserScreen");
        })
        .catch((err) => {
          console.error("Error found: ", err);
          this.setState({
            isLoading: false,
          });
        });
    }
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      );
    }

    return (
      <Background>
        <Logo style={styles.inputGroup} />
        <ScrollView style={styles.container}>
          <View style={styles.inputGroup}>
            <TextInput
              placeholder={"Codigo de Curso"}
              value={this.state.codigo}
              onChangeText={(val) => this.inputValueUpdate(val, "codigo")}
            />
          </View>
          <View style={styles.inputGroup}>
            <TextInput
              multiline={true}
              numberOfLines={4}
              placeholder={"Nombre de Curso"}
              value={this.state.nombre}
              onChangeText={(val) => this.inputValueUpdate(val, "nombre")}
            />
          </View>

          <View>
            <Button mode="outlined" onPress={() => this.storeUser()}>
              Registrar Cursos
            </Button>
          </View>
          <Button mode="contained" onPress={() => this.Courses()}>
            Cursos Registrados
          </Button>
          <Button mode="outlined" onPress={() => logoutUser()}>
            Salir
          </Button>
        </ScrollView>
      </Background>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  preloader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AddUserScreen;
