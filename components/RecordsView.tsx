import { formatTimeClock } from "@/context/formatTime";
import { View, Text } from "react-native";
import Icon from "@/assets/icon";


export interface IRecord {
  id: number;
  recordTime: string;
  category: string;
}

interface RecordsViewProps {
  record: IRecord;
}

const RecordsView: React.FC<RecordsViewProps> = ({ record }) => {
  return (
    <View
      key={`key--${record.id}`}
      className="bg-[#fff] rounded-lg h-[70px] w-[70px] flex flex-col justify-center items-center m-2"
    >
      <Icon name={`${record.category}Icon` as any} width={40} height={40} />
      <Text className="text-sm font-Rsemibold">
        {formatTimeClock(Number(record.recordTime))}
      </Text>
    </View>
  );
};

export default RecordsView;
