import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, KeyboardTypeOptions } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

interface IFormField {
  title: string,
  value?: string,
  placeholder?: string,
  handleChangeText: (text: string) => void; 
  otherStyles?: string,
  keyboardType?: KeyboardTypeOptions
}

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  keyboardType,
} : IFormField) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="font-Rmedium">{title}</Text>

      <View className="w-full h-14 px-4 bg-[#fff] rounded-2xl border-2 border-white focus:border-secondary flex flex-row items-center">
        <TextInput
          className="flex-1 bg-[#fff] font-Rsemibold text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          keyboardType={keyboardType}
        />

        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            {!showPassword ? 
            <Ionicons name="eye-off" size={18} color="white" /> :
            <Ionicons name="eye" size={18} color="white" />}
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
