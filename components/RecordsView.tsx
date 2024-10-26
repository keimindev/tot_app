import { formatTimeClock } from "@/context/formatTime";
import { View, Text } from "react-native";

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
      className="bg-secondary rounded-full h-[120px] w-[120px] flex flex-col justify-center items-center m-3"
    >
      <Text className="text-lg font-Rregular">{capitalize(record.category)}</Text>
      <Text className="text-lg font-Rsemibold">{formatTimeClock(Number(record.recordTime))}</Text>
    </View>
  );
};

export default RecordsView;
