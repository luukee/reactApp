import React from "react";
import { StatusBar } from "expo-status-bar";
import {
	Image,
	Platform,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import logo from "./assets/logo.png";
import * as ImagePicker from "expo-image-picker";
import * as Sharing from "expo-sharing";
import * as ImageManipulator from "expo-image-manipulator";

export default function App() {
	const [selectedImage, setSelectedImage] = React.useState(null);

	let openImagePickerAsync = async () => {
		let pickerResult = await ImagePicker.launchImageLibraryAsync();
		if (pickerResult.cancelled === true) {
			return;
		}
		setSelectedImage({ localUri: pickerResult.uri });
	};

	let openShareDialogAsync = async () => {
		if (Platform.OS === "web") {
			alert(`Uh oh, sharing isin't available on your platform`);
			return;
		}
		const ImageTmp = await ImageManipulator.manipulateAsync(
			selectedImage.localUri
		);
		await Sharing.shareAsync(ImageTmp.uri);
	};
	if (selectedImage !== null) {
		return (
			<View style={styles.container}>
				<Image
					source={{ uri: selectedImage.localUri }}
					style={styles.thumbnail}
				/>
				<TouchableOpacity
					onPress={openShareDialogAsync}
					style={styles.button}>
					<Text style={styles.buttonText}>Share this photo</Text>
				</TouchableOpacity>
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
