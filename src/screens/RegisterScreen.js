import React, { memo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Input,
} from "react-native";
import Background from "../components/Background";
import Logo from "../components/Logo";
import Header from "../components/Header";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import BackButton from "../components/BackButton";
import { theme } from "../core/theme";
import {
  emailValidator,
  passwordValidator,
  nameValidator,
} from "../core/utils";
import { signInUser } from "../api/auth-api";
import Toast from "../components/Toast";

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [passwordc, setPasswordc] = useState({
    value: "",
    error: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const _onSignUpPressed = async () => {
    if (password == passwordc) {
      alert("Contraseña no coincide.");
      return;
    }

    if (loading) return;

    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });

      return;
    }

    setLoading(true);

    const response = await signInUser({
      name: name.value,
      email: email.value,
      password: password.value,
    });

    if (response.error) {
      setError(response.error);
    }

    setLoading(false);
  };

  return (
    <ScrollView>
      <Background>
        <BackButton goBack={() => navigation.navigate("HomeScreen")} />

        <Logo />

        <Header>Registro</Header>

        <TextInput
          label="Nombre"
          returnKeyType="next"
          onChangeText={(text) => setName({ value: text, error: "" })}
          error={!!name.error}
          errorText={name.error}
        />
        <TextInput
          label="Primer Apellido"
          returnKeyType="next"
          onChangeText={(text) => ({})}
        />
        <TextInput
          label="Segundo Apellido"
          returnKeyType="next"
          onChangeText={(text) => ({})}
        />
        <TextInput
          label="Fecha Nacimiento DD/MM/YYYY"
          returnKeyType="next"
          onChangeText={(text) => ({})}
        />

        <TextInput
          label="Correo Electronico"
          returnKeyType="next"
          value={email.value}
          onChangeText={(text) => setEmail({ value: text, error: "" })}
          error={!!email.error}
          errorText={email.error}
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
        />
        <TextInput
          label="Telefono de Contacto"
          returnKeyType="next"
          onChangeText={(text) => ({})}
        />

        <TextInput
          label="Contraseña"
          returnKeyType="done"
          value={password.value}
          onChangeText={(text) => setPassword({ value: text, error: "" })}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry
          autoCapitalize="none"
        />
        <TextInput
          label="Confirmar Contraseña"
          returnKeyType="done"
          onChangeText={(text) => setPasswordc({ value: text, error: "" })}
          error={!!password.error}
          errorText={password.error}
          value={passwordc.value}
          secureTextEntry
        />

        <Button
          loading={loading}
          mode="contained"
          onPress={_onSignUpPressed}
          style={styles.button}
        >
          Registrate
        </Button>

        <View style={styles.row}>
          <Text style={styles.label}>Ya tienes cuenta? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
            <Text style={styles.link}>Ingresa</Text>
          </TouchableOpacity>
        </View>

        <Toast message={error} onDismiss={() => setError("")} />
      </Background>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  label: {
    color: theme.colors.secondary,
  },
  button: {
    marginTop: 24,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});

export default memo(RegisterScreen);
