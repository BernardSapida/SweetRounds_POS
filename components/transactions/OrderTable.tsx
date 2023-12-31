import DataTable from "react-data-table-component";
import Spinner from "react-bootstrap/Spinner";

import { useState, useEffect } from "react";
import Image from "next/image";

import { Transaction } from "@/types/Transaction";

export default function Table({ data }: { data: Transaction[] }) {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const table_columns = [
    {
      name: "DONUT NAME",
      selector: (row: Record<any, any>) => row.name,
      sortable: true,
    },
    {
      name: "IMAGE",
      selector: (row: Record<any, any>) => row.image,
      sortable: true,
      cell: (row: Record<any, any>) => (
        <Image
          src={`/donuts/${row["image"]}`}
          height={80}
          width={80}
          alt="Donut Image"
          className="my-2"
        ></Image>
      ),
    },
    {
      name: "QUANTITY",
      selector: (row: Record<any, any>) => row.quantity,
      sortable: true,
    },
    {
      name: "PRICE",
      selector: (row: Record<any, any>) => row.price,
      sortable: true,
    },
    {
      name: "TOTAL",
      selector: (row: Record<any, any>) => row.quantity * row.price,
      sortable: true,
    },
  ];

  return (
    <>
      <p className="fs-5">
        <strong>Customer Orders</strong>
      </p>
      <DataTable
        customStyles={{
          headCells: {
            style: {
              backgroundColor: "#212529",
              color: "white",
              fontSize: "16px",
              fontFamily: "system-ui, -apple-system",
            },
          },
          rows: {
            style: {
              fontSize: "16px",
              fontFamily: "system-ui, -apple-system",
            },
          },
        }}
        columns={table_columns}
        data={data}
        pagination
        persistTableHead
        responsive={true}
        striped={true}
        highlightOnHover={true}
        progressPending={loading}
        paginationRowsPerPageOptions={[10]}
        progressComponent={
          <span className="d-flex align-items-center">
            <Spinner animation="grow" className="my-3" size="sm" /> &nbsp;
            Loading...
          </span>
        }
      />
    </>
  );
}
