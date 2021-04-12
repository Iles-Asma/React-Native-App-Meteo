import React, { useState, useEffect, useRef } from "react";
import WeatherPreview from "./WeatherPreview";
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, SafeAreaView, Platform, StatusBar } from "react-native";

export default function Home(props) {
	let currents = new Date();
	let date = `${currents.getDate()}/${currents.getMonth() + 1}/${currents.getFullYear()}`;
	let time = `${currents.getHours() + 2}h${currents.getMinutes()}`;
	const apiKey = "418d8f884d4320d97e0168b433684e57";
	const city = "paris";

	// const city = input

	useEffect(() => {
		fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=fr`)
			.then((reponse) => reponse.json())
			.then((jsonData) => {
				console.log("Les données JSON sont :", jsonData);
				setWeather(jsonData);
				setIcon(jsonData.weather[0].icon);
			});
	}, []);

	const [weather, setWeather] = useState(null);
	const [icon, setIcon] = useState("");
	const [input, setInput] = useState("");
	const textInput = useRef(null);

	if (weather === null) {
		return <Text>Chargement...</Text>;
	}

	const onSubmit = () => {
		setWeather({ ...weather, name: input });

		textInput.current.clear();
	};

	return (
		<SafeAreaView style={styles.container}>
			<StatusBar style="auto" />

			<View style={styles.searchContainer}>
				<TextInput placeholder="e.g Paris, FR" ref={props.textInput} style={styles.searchInput} onChangeText={(text) => setInput(text)} value={props.input} />

				<TouchableOpacity style={styles.button} onPress={onSubmit}>
					<Text style={{ color: "white", fontWeight: "bold" }}>Rechercher</Text>
				</TouchableOpacity>
			</View>

			<View style={styles.headerData}>
				<Text style={styles.date}>{date}</Text>
				<Text style={styles.heure}>{time}</Text>
				<Text style={styles.city}>{weather.name}</Text>
			</View>

			<View style={styles.weatherData}>
				<Text style={styles.description}>{weather.weather[0].description}</Text>
				<Image
					source={{
						uri: `http://openweathermap.org/img/wn/${icon}@2x.png`,
					}}
					style={styles.icon}
				/>
				<Text style={styles.temp}>{weather.main.temp}°C</Text>
			</View>

			<WeatherPreview />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: Platform.OS === "ios" ? StatusBar.currentHeight : 10,
		justifyContent: "flex-start",
		alignItems: "center",

		width: "100%",

		backgroundColor: "white",
	},

	headerData: {
		alignItems: "center",
		backgroundColor: "#2A9D8F",
		width: 350,
		borderRadius: 10,
		padding: 15,
	},

	searchContainer: {
		flex: 0,
		flexDirection: "row",
		justifyContent: "space-between",
		width: 350,
		height: 35,

		marginBottom: 20,
	},
	searchInput: {
		backgroundColor: "#e9ecef",
		paddingHorizontal: 10,
		borderRadius: 10,
		width: "65%",
		height: "auto",
	},
	button: {
		flex: 0,
		justifyContent: "center",

		padding: 5,
		borderRadius: 10,
		backgroundColor: "#e76f51",
		alignItems: "center",
		width: "30%",

		height: "auto",
	},

	weatherData: {
		flex: 0,
		height: "auto",
		alignItems: "center",
		width: 350,
		backgroundColor: "#E9C46A",
		borderRadius: 10,
		padding: 15,
		marginTop: 20,
	},

	date: {
		color: "white",
		textTransform: "uppercase",
		fontSize: 22,
		marginBottom: 10,
	},

	heure: {
		color: "white",
		fontSize: 18,
	},

	city: {
		textTransform: "uppercase",
		fontSize: 64,
		fontWeight: "bold",
		color: "white",
	},

	description: {
		color: "white",
		textTransform: "uppercase",
		fontSize: 20,
		fontWeight: "bold",
	},

	icon: {
		width: 150,
		height: 150,
	},

	temp: {
		fontSize: 45,
		fontWeight: "bold",
		color: "white",
	},
});
