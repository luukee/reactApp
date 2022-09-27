import React from "react";
import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import logo from "./assets/logo.png";
import * as ImagePicker from "expo-image-picker";

export default function App() {
	const [selectedImage, setSelectedImage] = React.useState(null);

	let openImagePickerAsync = async () => {
		let pickerResult = await ImagePicker.launchImageLibraryAsync();
		if (pickerResult.cancelled === true) {
			return;
		}
		setSelectedImage({ localUri: pickerResult.uri });
	};

	if (selectedImage !== null) {
		return (
			<View style={styles.container}>
				<Image
					source={{ uri: selectedImage.localUri }}
					style={styles.thumbnail}
				/>
			</View>
		);
	}

	return (
		<View>
			<Image
				source={logo}
				style={styles.logo}
			/>
			<Text style={styles.instructions}>
				To share a photo from your phone with a friend, just press the
				button below.
			</Text>
			<TouchableOpacity
				onPress={openImagePickerAsync}
				style={styles.button}>
				<Text style={styles.buttonText}>Pick a photo</Text>
			</TouchableOpacity>
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	logo: {
		width: 305,
		height: 159,
	},
	instructions: {
		color: "#888",
		fontSize: 18,
		marginHorizontal: 15,
	},
	button: {
		backgroundColor: "blue",
		padding: 20,
		borderRadius: 5,
	},
	buttonText: {
		fontSize: 20,
		color: "#fff",
	},
	thumbnail: {
		width: 300,
		height: 300,
		resizeMode: "contain",
	},
});
