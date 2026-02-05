import { useState } from "react";
import { StyleSheet, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Client {
	name: string;
	document: string,
	email: string,
}

export default function HomeScreen ()
{
	const [client, setClient] = useState<Client>({name: "", document: "", email: ""});

	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.title}>Cadastro de Clientes do ERP (teste 2)</Text>
			<Text style={styles.label}>Nome:</Text>
			<TextInput
				style={styles.input}
				onChangeText={(text) => setClient({ ...client, name: text })}
			/>
			<Text style={styles.label}>Documento:</Text>
			<TextInput
				style={styles.input}
				onChangeText={(text) => setClient({ ...client, document: text })}
			/>
			<Text style={styles.label}>Email:</Text>
			<TextInput
				style={styles.input}
				onChangeText={(text) => setClient({ ...client, email: text })}
			/>
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
	label: {
		fontSize: 16,
		alignSelf: "flex-start",
		marginLeft: 20,
		marginBottom: 5
	},
	input: {
		borderWidth: 2,
		borderColor: "black",
		width: "90%",
		borderRadius: 10,
		height: 40,
		marginBottom: 10,
		padding: 5
	}
});