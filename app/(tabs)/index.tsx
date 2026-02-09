import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Client {
	name: string;
	document: string,
	email: string,
}

const ClientMock = {
	name: "",
	document: "",
	email: ""
}

export default function HomeScreen ()
{
	const [client, setClient] = useState<Client>(ClientMock);

	function onlyNumber (value: string)
	{
		return value.replace(/\D/g, '');
	}

	function isValidEmail (email: string): boolean
	{
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	}

	function formatedCNPJ (value: string)
	{
		const digits = value.replace(/\D/g, '');
  
		if (digits.length <= 2) { return digits; }
		if (digits.length <= 5) { return digits.replace(/(\d{2})(\d+)/, '$1.$2'); }
		if (digits.length <= 8) { return digits.replace(/(\d{2})(\d{3})(\d+)/, '$1.$2.$3'); }
		if (digits.length <= 12) { return digits.replace(/(\d{2})(\d{3})(\d{3})(\d+)/, '$1.$2.$3/$4'); }

		return digits.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
	}

	async function handleSave ()
	{
		const clientFinal = {
			...client,
			document: onlyNumber(client.document)
		};

		await fetch('https://jsonplaceholder.typicode.com/posts',
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(clientFinal)

			}
		)
		.then((response) => {
			const status = response.status;
			
			if (status >= 200 && status < 300)
			{
				setClient(ClientMock);
				alert("Obaaaaa, dados salvos com sucesso!");
				console.log("Client salved:", clientFinal);
			}

		})
		.catch((error) => {
			console.log("error: ", error);
		});

	}

	function handleChange (field: keyof Client, value: string)
	{
		if (field === "document") { value = formatedCNPJ(value)};
		if (field === "email") { value = value.trim().toLowerCase()};

		setClient({...client, [field]: value});
	}

	function onSave ()
	{
		// scenario 1.
		// let result = /\d{4}/.test("2024");

		// scenario 2.
		// let result = "Olá    mundo    da    programação".replace(/\s{2,}/g, " ");

		// scenario 3.
		// let result = /^\(\d{2}\)\s\d{5}-\d{4}$/.test("(11) 95998-8098");

		// scenario 4.
		// let result = "38762321803".replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");

		// scenario 5.
		// let result = /\.jpg$/.test("image.jpg");

		// scenario 6.
		// let result = /^P\d{3}$/.test("P234");

		// scenario 7.
		// let result = "Meu telefone é 1234 e meu código é 5678".replace(/\d/g, "").replace(/\s{2,}/g, " ");

		// scenario 8.
		// let result = /regex|regexp/.test("Estou aprendendo regexp hoje");

		// scenario 9.
		// let result = /^\w{6,10}$/.test("Ca4123");

		// scenario 10.
		// let result: string[] = [];
		
		// "Adorei o evento! #javascript #regex #programacao"
		// .split(" ")
		// .forEach((p) => {
		// 	let test = /^#\w/.test(p);
		// 	if (test) { result.push(p); }
		// });

		// scenario 11.
		// let result = "ABC1234".replace(/(^\w{3})(\d{4})$/, "$1-$2");

		// scenario 12.
		// let result = /^\d{2}:\d{2}$/.test("25:12");

		// scenario 13.
		// let result = /spam/i.test("SpAm");

		// scenario 14.
		// let result = "Alan Turing".replace(/(\w+) (\w+)/, "$2, $1");

		if (!client.name || !client.document || !client.email)
		{
			alert("Opsssss, preencha todos os campos!");
			return;
		}

		if (!isValidEmail(client.email))
		{
			alert("Opsssss, email inválido!");
			return;
		}

		handleSave();
	}

	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.title}>Cadastro de Clientes do ERP (teste 2)</Text>
			<Text style={styles.label}>Nome:</Text>
			<TextInput
				value={client.name}
				style={styles.input}
				onChangeText={(text) => handleChange("name", text)}
				maxLength={100}
				keyboardType="default"
				autoCapitalize="words"
				placeholder="Companhia LTDA"
			/>
			<Text style={styles.label}>Documento:</Text>
			<TextInput
				value={client.document}
				style={styles.input}
				onChangeText={(text) => handleChange("document", text)}
				maxLength={18}
				keyboardType="numeric"
				placeholder="00.000.000/0000-00"
			/>
			<Text style={styles.label}>Email:</Text>
			<TextInput
				value={client.email}
				style={styles.input}
				onChangeText={(text) => handleChange("email", text)}
				maxLength={100}
				keyboardType="email-address"
				placeholder="name@domain.com"
			/>
			<TouchableOpacity
				style={styles.button}
				onPress={onSave}
			>
				<Text>salvar</Text>
			</TouchableOpacity>
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
	},
	button: {
		borderColor: "#0f0",
		backgroundColor: "#0f0",
		borderWidth: 2,
		width: "90%",
		paddingVertical: 10,
		paddingHorizontal: 5,
		borderRadius: 10,
		display: "flex",
		justifyContent: "center",
		alignContent: "center",
		alignItems: "center",
	}
});