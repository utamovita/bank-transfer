import React, { useRef, useState } from "react";
import cx from "classnames";
import * as XLSX from "xlsx";
import styles from "./file-uploader.module.scss";

import { Container } from "../shared/container/container.component";
import { useData } from "src/hooks/use-data.hook";
import { useDataState } from "src/context/data.context";

const FileUploader = () => {
  const state = useDataState();
  const { globalData } = state;

  const { handleData, validateData } = useData();
  const [error, setError] = useState<string | null>(null);
  const [isDragActive, setIsDragActive] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const dropContainerRef = useRef<HTMLLabelElement>(null);

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragActive(false);
    handleFileChange(null, e.dataTransfer.files[0]).then(() => {});
  };

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement> | null,
    file?: File | undefined
  ) => {
    if (!file && e?.target?.files) {
      file = e.target.files[0];
    }

    if (file) {
      const reader = new FileReader();
      const rABS = !!reader.readAsBinaryString;

      reader.onload = (event) => {
        if (event?.target?.result) {
          const binaryString = event.target.result;
          const workbook = XLSX.read(binaryString, { type: rABS ? "binary" : "array" });

          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

          const error = validateData(jsonData);

          if (error) {
            return setError(error);
          }

          handleData(jsonData);
        } else {
          console.error("Error reading file.");
        }
      };

      if (rABS) {
        reader.readAsBinaryString(file);
      } else {
        reader.readAsArrayBuffer(file);
      }
    }
  };

  if (globalData.length > 0) {
    return null;
  }

  return (
    <Container>
      <div className={styles.wrapper}>
        <>
          <label
            htmlFor="file"
            className={cx(styles.dropContainer, {
              [styles.dragActive]: isDragActive,
            })}
            ref={dropContainerRef}
            onDragOver={(e) => {
              e.preventDefault();
            }}
            onDragEnter={() => setIsDragActive(true)}
            onDragLeave={() => setIsDragActive(false)}
            onDrop={handleDrop}
          >
            <span className={styles.dropTitle}>Upuść plik tutaj</span>
            lub
            <input
              type="file"
              accept=".xlsx"
              className={styles.input}
              id="file"
              onChange={handleFileChange}
              ref={inputRef}
            />
          </label>
        </>
        {error ? <div className={styles.error}>{error}</div> : null}
      </div>
    </Container>
  );
};

export { FileUploader };
