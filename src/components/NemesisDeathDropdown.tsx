import { useFetchDeathTypes } from "@/utils/utils";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

type DeathType = {
	id: number;
	deathType: string;
};

interface NemesisDeathDropdownProps {
	onSelect: (death: { id: number; name: string } | null) => void;
}

export default function NemesisDeathDropdown({
	onSelect,
}: NemesisDeathDropdownProps) {
	const [playerDeathType, setPlayerDeathType] = useState<number | null>(null);

	//fetch death types from api in utils and map through them to create Picker.Item for each
	const deathTypes: DeathType[] = useFetchDeathTypes();

	// Set default value to the first death type if available
	useEffect(() => {
		if (deathTypes.length > 0 && playerDeathType === null) {
			setPlayerDeathType(deathTypes[0].id);
			onSelect({ id: deathTypes[0].id, name: deathTypes[0].deathType });
		}
	}, [deathTypes, onSelect, playerDeathType]);

	const handleValueChange = (value: number | null) => {
		setPlayerDeathType(value);
		const death = deathTypes.find((d) => d.id === value) || null;
		onSelect(death ? { id: death.id, name: death.deathType } : null);
	};

	return (
		<View style={styles.deathDropdownContainer}>
			<Picker
				selectedValue={playerDeathType}
				onValueChange={handleValueChange}
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
		width: 190,
		fontSize: 12,
		color: "#000",
		backgroundColor: "#f0f0f0",
	},
});
