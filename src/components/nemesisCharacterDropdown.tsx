import { useFetchNemesisCharacters } from "@/utils/utils";
import { Picker } from "@react-native-picker/picker";
import React from "react";
import { StyleSheet, View } from "react-native";

type NemesisCharacter = {
	id: number;
	name: string;
};

interface NemesisCharacterDropdownProps {
	onSelect: (character: { id: number; name: string } | null) => void;
}

export default function NemesisCharacterDropdown({
	onSelect,
}: NemesisCharacterDropdownProps) {
	const [selectedCharacter, setSelectedCharacter] = React.useState<
		number | null
	>(null);
	const nemesisCharacters = useFetchNemesisCharacters();

	const handleValueChange = (value: number | null) => {
		setSelectedCharacter(value);
		const character =
			nemesisCharacters.find((c: NemesisCharacter) => c.id === value) || null;
		onSelect(character ? { id: character.id, name: character.name } : null);
	};

	return (
		<View style={styles.container}>
			<Picker
				selectedValue={selectedCharacter}
				onValueChange={handleValueChange}
				style={styles.pickerStyle}
			>
				<Picker.Item label="Select Character" value={null} />
				{nemesisCharacters.map((character: NemesisCharacter) => (
					<Picker.Item
						key={character.id}
						label={character.name}
						value={character.id}
					/>
				))}
			</Picker>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
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
