import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";

export default function Previsions(props) {
		// vous devez crée un compte sur https://home.openweathermap.org/users/sign_in pour obtenir votre clé d'API
	const apiKey = "votre clé d'API";
	const city = "tokyo";

	const [nextDayTemp, setNextDayTemp] = useState("");
	const [iconNextDay, setIconNextDay] = useState("");
	const [nextday, setNextDay] = useState("");

	useEffect(() => {
		fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=fr`)
			.then((reponse) => reponse.json())
			.then((jsonData) => {
				console.log("Les données JSON sont :", jsonData);

				setNextDayTemp(jsonData.list[0].main.temp);
				setIconNextDay(jsonData.list[0].weather[0].icon);
				setNextDay(jsonData.list[0].dt_txt);
			});
	}, []);

	return (
		<ScrollView style={styles.container} horizontal={true} showsHorizontalScrollIndicator={false}>
			<View style={styles.subContainer}>
				<View style={styles.item}>
					<Text style={styles.date}>{nextday}</Text>
					<Image source={{ uri: `http://openweathermap.org/img/wn/${iconNextDay}@2x.png` }} style={styles.icon} />
					<Text style={styles.temperature}>{nextDayTemp}°C</Text>
				</View>

				<View style={styles.item}>
					<Text style={styles.date}>{nextday}</Text>
					<Image source={{ uri: `http://openweathermap.org/img/wn/${iconNextDay}@2x.png` }} style={styles.icon} />
					<Text style={styles.temperature}>{nextDayTemp}°C</Text>
				</View>

				<View style={styles.item}>
					<Text style={styles.date}>{nextday}</Text>
					<Image source={{ uri: `http://openweathermap.org/img/wn/${iconNextDay}@2x.png` }} style={styles.icon} />
					<Text style={styles.temperature}>{nextDayTemp}°C</Text>
				</View>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 0,
		marginTop: 20,
		backgroundColor: "#f1faee",
		borderRadius: 15,
		width: 350,
		height: 100,
	},

	subContainer: {
		flex: 0,

		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",

		paddingHorizontal: 20,
	},

	item: {
		width: 200,
		height: 100,
		alignItems: "center",
		borderWidth: 1,
	},
	city: {
		textTransform: "uppercase",
		fontSize: 13,
		fontWeight: "bold",
	},

	date: {
		textTransform: "uppercase",
		fontSize: 16,
	},

	icon: {
		width: 40,
		height: 40,
	},

	temperature: {
		fontSize: 16,
		fontWeight: "bold",
	},
});
