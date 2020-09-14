export default class ListItem extends Component {
  state = {
    items: [],
  };

  componentWillMount() {
    var firebaseConfig = {
      apiKey: "***",
      authDomain: "***",
      databaseURL: "***",
      projectId: "***",
      storageBucket: "***",
      messagingSenderId: "***",
      appId: "***",
      measurementId: "***",
    };

    firebase.initializeApp(firebaseConfig);

    var ref = firebase.database().ref("cursos");

    ref.on("value", function(snapshot) {
      const userItem = snapshot.val();
      let items = Object.values(userItem);
    });
  }

  render() {
    return (
      <View style={{ justifyContent: "center" }}>
        <Text>{this.state.items}</Text>
      </View>
    );
  }
}
