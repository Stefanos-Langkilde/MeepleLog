import { useFetchDeathTypes } from "@/utils/utils";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

type DeathType = {
	id: number;
	deathType: string;
};

export default function NemesisDeathDropdown() {
	const [playerDeathType, setPlayerDeathType] = useState<number | null>(null);

	//fetch death types from api in utils and map through them to create Picker.Item for each
	const deathTypes: DeathType[] = useFetchDeathTypes();

	// Set default value to the first death type if available
	useEffect(() => {
		if (deathTypes.length > 0 && playerDeathType === null) {
			setPlayerDeathType(deathTypes[0].id);
		}
	}, [deathTypes, playerDeathType]);

	return (
		<View style={styles.deathDropdownContainer}>
			<Text>Death:</Text>
			<Picker
				selectedValue={playerDeathType}
				onValueChange={(value) => setPlayerDeathType(value)}
				style={styles.pickerStyle}
				dropdownIconColor="#000"
			>
				{/* Map through death types and create Picker.Item for each */}
				{deathTypes.map((deathType) => (
					<Picker.Item
						key={deathType.id}
						label={deathType.deathType}
						value={deathType.id}
					/>
				))}
			</Picker>
		</View>
	);
}

const styles = StyleSheet.create({
	deathDropdownContainer: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		color: "#000",
	},
	pickerStyle: {
		width: 200,
		fontSize: 12,
		color: "#000",
		backgroundColor: "#f0f0f0",
	},
});
