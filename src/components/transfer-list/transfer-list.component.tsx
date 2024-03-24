import { useDataState } from "src/context/data.context";
import styles from "./transfer-list.module.scss";
const TransferList = () => {
  const state = useDataState();
  const { globalData } = state;

  console.log(globalData);
  if (globalData.length === 0) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Tytuł</th>
            <th>Nazwa kontrahenta</th>
            <th>NIP</th>
            <th>Konto płatnika</th>
            <th>SWIFT</th>
            <th>Kwota brutto</th>
            <th>Waluta</th>
          </tr>
        </thead>
        <tbody>
          {globalData.map((record, index) => (
            <tr key={index}>
              <td>{record.title}</td>
              <td>{record.contractorName}</td>
              <td>{record.nip}</td>
              <td>{record.paymentAccount}</td>
              <td>{record.paymentSwift}</td>
              <td>{record.grossAmount}</td>
              <td>{record.currency}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export { TransferList };
