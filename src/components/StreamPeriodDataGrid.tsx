import { FC, useMemo } from "react";
import { AppDataGrid } from "./AppDataGrid";
import { GridColDef } from "@mui/x-data-grid";
import {
  Ordering,
  PagedResult,
  SkipPaging,
  StreamPeriod,
  StreamPeriod_OrderBy,
} from "@superfluid-finance/sdk-core";
import FlowingBalance from "./FlowingBalance";
import FlowRate from "./FlowRate";

interface Props {
  queryResult: {
    isFetching: boolean;
    data?: PagedResult<StreamPeriod>;
  };
  setPaging: (paging: SkipPaging) => void;
  ordering: Ordering<StreamPeriod_OrderBy> | undefined;
  setOrdering: (ordering?: Ordering<StreamPeriod_OrderBy>) => void;
}

const StreamPeriodDataGrid: FC<Props> = ({
  queryResult,
  setPaging,
  ordering,
  setOrdering,
}) => {
  const columns: GridColDef[] = useMemo(
    () => [
      { field: "id", hide: true, sortable: false, flex: 1 },
      {
        field: "flowRate",
        headerName: "Flow Rate",
        sortable: true,
        flex: 1,
        renderCell: (params) => <FlowRate flowRate={params.value} />,
      },
      {
        field: "totalAmountStreamed",
        headerName: "Total Amount Streamed",
        sortable: true,
        flex: 1,
        renderCell: (params) => {
          const streamPeriod = params.row as StreamPeriod;
          return (
            <FlowingBalance
              {...{
                balance: streamPeriod.totalAmountStreamed ?? "0",
                balanceTimestamp: streamPeriod.startedAtTimestamp,
                flowRate: streamPeriod.stoppedAtTimestamp
                  ? "0"
                  : streamPeriod.flowRate,
              }}
            />
          );
        },
      },
      {
        field: "startedAtTimestamp",
        headerName: "From",
        sortable: true,
        flex: 1,
        renderCell: (params) => new Date(params.value * 1000).toLocaleString(),
      },
      {
        field: "stoppedAtTimestamp",
        headerName: "To",
        sortable: true,
        flex: 1,
        renderCell: (params) =>
          params.value ? new Date(params.value * 1000).toLocaleString() : "-",
      },
    ],
    []
  );

  const rows = queryResult.data ? queryResult.data.data : [];

  return (
    <AppDataGrid
      columns={columns}
      rows={rows}
      queryResult={queryResult}
      setPaging={setPaging}
      ordering={ordering}
      setOrdering={(x) => setOrdering(x as any)}
    />
  );
};

export default StreamPeriodDataGrid;
