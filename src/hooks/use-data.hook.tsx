import { useDataDispatch } from "../context/data.context";

const dataIndexes = {
  skypeName: 0,
  fullName: 1,
  email: 2,
  group: 3,
  date: 4,
  phone: 5,
  country: 6,
  type: 7,
  pricePerMinute: 8,
  callLength: 9,
  total: 10,
};

function useData() {
  const dispatchData = useDataDispatch();

  const handleData = (data: string[][]) => {
    const transformedData: any[] = [];

    data.slice(1).map((row) => {
      if (!row[dataIndexes.fullName]) return null;

      const record = {
        date: new Date(row[dataIndexes.date]),
        phone: row[dataIndexes.phone],
        country: row[dataIndexes.country],
        pricePerMinute: row[dataIndexes.pricePerMinute],
        callLength: row[dataIndexes.callLength],
        total: row[dataIndexes.total],
      };

      if (
        transformedData.some((item) => item.name === row[dataIndexes.fullName])
      ) {
        const index = transformedData.findIndex(
          (item) => item.name === row[dataIndexes.fullName]
        );
        transformedData[index].data.push(record);
      } else {
        transformedData.push({
          name: row[dataIndexes.fullName],
          data: [record],
        });
      }
    });

    dispatchData({ type: "ADD_GLOBAL_DATA", data: transformedData });
  };

  const validateData = (data: string[][]): null | string => {
    const error = null;

    return error;
  };

  return { handleData, validateData };
}

export { useData };
