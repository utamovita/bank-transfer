import "./styles/global.scss";

import { Modal } from "./components/shared/modal/modal.component";
import { Suspense } from "react";
import { ModalProvider } from "./context/modal.context";
import { Layout } from "./components/layout/layout.component";
import React from "react";
import { FileUploader } from "./components/file-uploader/file-uploader.component";
import { DataProvider } from "./context/data.context";
import { TransferList } from "./components/transfer-list/transfer-list.component";

function App() {
  return (
    <DataProvider>
      <ModalProvider>
        <Layout>
          <Suspense fallback={null}>
            <Modal />
          </Suspense>
          <FileUploader />
          <TransferList />
        </Layout>
      </ModalProvider>
    </DataProvider>
  );
}

export default App;
