import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

interface ICustomButton {
    title : string,
    handlePress : () => void,
    containerStyles? : string,
    textStyles? : string,
    isLoading? : boolean,
}

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
} :  ICustomButton ) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-secondary rounded-xl min-h-[60px] flex flex-row justify-center items-center ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      }`}
      disabled={isLoading}
    >
      <Text className={`text-primary font-Rsemibold text-lg ${textStyles}`}>
        {title}
      </Text>

      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color="#fff"
          size="small"
          className="ml-2"
        />
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;