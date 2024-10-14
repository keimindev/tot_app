import { useGlobalContext } from '@/context/GlobalProvider';
import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const User = () => {
  const { user } = useGlobalContext();
  
  return (
    <SafeAreaView className="bg-primary h-full">
      <Text>User</Text>
    </SafeAreaView>
  )
}

export default User