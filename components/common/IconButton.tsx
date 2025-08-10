import {Ionicons} from "@expo/vector-icons";
import {Pressable, StyleSheet, View} from "react-native";

function  IconButton({icon, onPress, size, color}: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => pressed && styles.pressed}>
      <View style={styles.buttonContainer}>
        <Ionicons name={icon} size={size} color={color} />
      </View>
    </Pressable>
  )
}

export default IconButton

interface Props {
  icon: keyof typeof Ionicons.glyphMap
  onPress: () => void
  size: number
  color?: string
}

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 24,
    padding: 6,
    marginHorizontal: 8,
    marginVertical: 2
  },
  pressed: {
    opacity: 0.75
  }
})