import React, { Component } from "react";
import {
  Alert,
  Button,
  StyleSheet,
  TextInput,
  ScrollView,
  ActivityIndicator,
  View,
} from "react-native";
import firebase from "firebase";

class UserDetailScreen extends Component {
  constructor() {
    super();
    this.state = {
      codigo: "",
      nombre: "",
      isLoading: true,
    };
  }

  componentDidMount() {
    const dbRef = firebase
      .firestore()
      .collection("users")
      .doc(this.props.route.params.userkey);
    dbRef.get().then((res) => {
      if (res.exists) {
        const user = res.data();
        this.setState({
          key: res.id,
          codigo: user.codigo,
          nombre: user.nombre,

          isLoading: false,
        });
      } else {
        console.log("Document does not exist!");
      }
    });
  }

  inputValueUpdate = (val, prop) => {
    const state = this.state;
    state[prop] = val;
    this.setState(state);
  };

  updateUser() {
    this.setState({
      isLoading: true,
    });
    const updateDBRef = firebase
      .firestore()
      .collection("cursos")
      .doc(this.state.key);
    updateDBRef
      .set({
        codigo: this.state.codigo,
        nombre: this.state.nombre,
      })
      .then((docRef) => {
        this.setState({
          key: "",
          codigo: "",
          nombre: "",

          isLoading: false,
        });
        this.props.navigation.navigate("UserScreen");
      })
      .catch((error) => {
        console.error("Error: ", error);
        this.setState({
          isLoading: false,
        });
      });
  }

  deleteUser() {
    const dbRef = firebase
      .firestore()
      .collection("cursos")
      .doc(this.props.route.params.userkey);
    dbRef.delete().then((res) => {
      console.log("Item removed from database");
      this.props.navigation.navigate("UserScreen");
    });
  }

  openTwoButtonAlert = () => {
    Alert.alert(
      "Delete User",
      "Are you sure?",
      [
        { text: "Yes", onPress: () => this.deleteUser() },
        {
          text: "No",
          onPress: () => console.log("No item was removed"),
          style: "cancel",
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.preloader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      );
    }
    return (
      <ScrollView style={styles.container}>
        <View style={styles.inputGroup}>
          <TextInput
            placeholder={"Curso"}
            value={this.state.curso}
            onChangeText={(val) => this.inputValueUpdate(val, "curso")}
          />
        </View>
        <View style={styles.inputGroup}>
          <TextInput
            multiline={true}
            numberOfLines={4}
            placeholder={"nombre"}
            value={this.state.nombre}
            onChangeText={(val) => this.inputValueUpdate(val, "nombre")}
          />
        </View>

        <View style={styles.button}>
          <Button
            title="Update"
            onPress={() => this.updateUser()}
            color="#19AC52"
          />
        </View>
        <View>
          <Button
            title="Delete"
            onPress={this.openTwoButtonAlert}
            color="#E37399"
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
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
  button: {
    marginBottom: 7,
  },
});

export default UserDetailScreen;
