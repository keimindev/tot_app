import { View, Text } from "react-native";

export interface IRecord {
  id: number;
  title: string;
  time: string;
  category: string;
}

interface RecordsViewProps {
    record: IRecord;
  }

const RecordsView: React.FC<RecordsViewProps> = ({record}) => {
    console.log(record, 'record')
  return (
    <View
      key={`${record.id}-key`}
      className="bg-secondary rounded-full h-[100px] w-[100px] flex flex-col justify-center items-center"
    >
      <Text>{record.category}</Text>
      <Text>{record.time}</Text>
    </View>
  );
};

export default RecordsView;
