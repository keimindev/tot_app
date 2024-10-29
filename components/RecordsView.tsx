import { formatTimeClock } from "@/context/formatTime";
import { View, Text } from "react-native";
import Icon from "@/assets/icon";
import { categoryList } from "@/context/category";
import { useEffect } from "react";


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
      key={`${record.id}-key`}
      className="bg-[#fff] rounded-lg h-[80px] w-[80px] flex flex-col justify-center items-center m-3"
    >
      <Icon name={`${record.category}Icon` as any} width={40} height={40} />
      <Text className="text-sm font-Rsemibold">
        {formatTimeClock(Number(record.recordTime))}
      </Text>
    </View>
  );
};

export default RecordsView;
