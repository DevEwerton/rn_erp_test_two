import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ExploreScreen ()
{
	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.title}>Todos Clientes do ERP (teste 2)</Text>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 40,
		alignItems: "center",
		backgroundColor: "#fff",
		borderColor: "black",
		borderWidth: 2,
		borderRadius: 10,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		marginBottom: 20
	},
});