import { formatTimeClock } from "@/context/formatTime";
import { View, Text } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export interface IRecord {
  id: number;
  recordTime: string;
  category: string;
}

interface RecordsViewProps {
    record: IRecord;
  }

const RecordsView: React.FC<RecordsViewProps> = ({record}) => {

  const capitalize= (ch: string) => {
    return ch.charAt(0).toUpperCase() + ch.slice(1);
  }

  return (
    <View
      key={`${record.id}-key`}
      className="bg-[#fff] rounded-lg h-[80px] w-[80px] flex flex-col justify-center items-center m-3"
    >
       <MaterialIcons name="library-books" size={35} color="black" />
      {/* <Text className="text-sm font-Rregular">{capitalize(record.category)}</Text> */}
      <Text className="text-sm font-Rsemibold">{formatTimeClock(Number(record.recordTime))}</Text>
    </View>
  );
};

export default RecordsView;
