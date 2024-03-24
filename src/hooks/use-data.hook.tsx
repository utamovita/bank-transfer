import { RecordType } from "src/types/data";
import { useDataDispatch } from "../context/data.context";

type DataIndexes = {
  [key: string]: number;
};

const dataIndexes: DataIndexes = {
  "zgodny": 0,
  "zatwierdzony": 1,
  "skonto": 2,
  "skonto_kto": 3,
  "skonto_kiedy": 4,
  "dokument": 5,
  "tytul": 6,
  "kontrahent_kod": 7,
  "kontrahent_nazwa": 8,
  "nip": 9,
  "platnosc_konto": 10,
  "platnosc_bank": 11,
  "platnosc_swift": 12,
  "kwota_netto": 13,
  "kwota_brutto": 14,
  "waluta": 15,
  "kwota PLN": 16,
  "termin": 17,
  "data wystawienia": 18,
  "data otrzymania": 19,
  "data sprzedazy": 20,
  "platnosc": 21,
  "komentarz": 22,
  "platnosc_komentarz": 23
};



function useData() {
  const dispatchData = useDataDispatch();

  const handleData = (data: unknown[]) => {
    const transformedData: RecordType[] = [];


    data.slice(1).map((row) => {
      const rowArray = row as string[]
      if (!row) return null;

      const record: RecordType = {
        title: rowArray[dataIndexes["tytul"]] as string,
        contractorName: rowArray[dataIndexes["kontrahent_nazwa"]] as string,
        nip: rowArray[dataIndexes["nip"]] as string,
        paymentAccount: rowArray[dataIndexes["platnosc_konto"]] as string,
        paymentSwift: rowArray[dataIndexes["platnosc_swift"]] as string,
        grossAmount: rowArray[dataIndexes["kwota_brutto"]] as string,
        currency: rowArray[dataIndexes["waluta"]] as string,
        invoiceDateCreated: rowArray[dataIndexes["data wystawienia"]] as string,
        invoiceDateReceived: rowArray[dataIndexes["data otrzymania"]] as string,
        invoiceDateSold: rowArray[dataIndexes["data sprzedazy"]] as string,
        payment: rowArray[dataIndexes["platnosc"]] as string,
        commentPayment: rowArray[dataIndexes["platnosc_komentarz"]] as string,
      }

      transformedData.push(record);
    });

    dispatchData({ type: "ADD_GLOBAL_DATA", data: transformedData });
  };

  const validateData = (data: unknown[]): null | string => {
    const error = null;
    const dataHeader = data[0] as string[];

    if (!dataHeader) {
      return "Nieprawidłowy plik. Brak nagłówka.";
    }

    //check if every column is in the right place in loop
    for (const key in dataIndexes) {
      if (dataHeader[dataIndexes[key]] !== key) {
        return `Zły układ kolumny: ${key}`;
      }
    }

    return error;
  };

  return { handleData, validateData };
}

export { useData };
