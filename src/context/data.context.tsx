import React, { useContext, useReducer } from "react";
import { RecordType } from "src/types/data";

type State = {
  globalData: RecordType[];
};

type Action =
  | {
    type: "ADD_GLOBAL_DATA";
    data: RecordType[];
  }

type Dispatch = (action: Action) => void;

export const DataStateContext = React.createContext<State | undefined>(
  undefined
);

export const DataDispatchContext = React.createContext<Dispatch | undefined>(
  undefined
);

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_GLOBAL_DATA": {
      return {
        ...state,
        globalData: action.data,
      };
    }

    default:
      throw new Error();
  }
}

type DataProviderProps = {
  children: React.ReactNode;
};

const DataProvider = ({ children }: DataProviderProps) => {
  const defaultState: State = {
    globalData: [],
  };

  const [state, dispatch] = useReducer(reducer, defaultState);

  return (
    <DataStateContext.Provider value={state}>
      <DataDispatchContext.Provider value={dispatch}>
        {children}
      </DataDispatchContext.Provider>
    </DataStateContext.Provider>
  );
};

function useDataState() {
  const context = useContext(DataStateContext);
  if (context === undefined) {
    throw new Error("useDataState must be used within a DataProvider");
  }
  return context;
}

function useDataDispatch() {
  const context = useContext(DataDispatchContext);
  if (context === undefined) {
    throw new Error("useDataDispatch must be used within a DataProvider");
  }
  return context;
}

export { DataProvider, useDataState, useDataDispatch };
