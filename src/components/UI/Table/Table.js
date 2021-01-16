import * as React from "react";
import { DataGrid } from "@material-ui/data-grid";
import { Button } from "@material-ui/core";

const columns = [
  { field: "id", headerName: "ID", width: 220 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  {
    field: "email",
    headerName: "email",

    width: 300,
  },
  {
    field: "tel",
    headerName: "telphone",
    description: "This column has a value getter and is not sortable.",
    width: 160,
  },
];

export default function DataTable(props) {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={props.rows}
        columns={columns}
        pageSize={5}
        checkboxSelection
      />
    </div>
  );
}
