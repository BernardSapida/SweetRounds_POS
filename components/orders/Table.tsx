import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import DataTable from "react-data-table-component";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

import { fetchOrderByKeyword, fetchOrderList } from "@/helpers/Orders/Methods";
import { getBadgeColor } from "@/utils/badge";
import { Order } from "@/Types/Order";

const ModalForm = dynamic(() => import("@/components/orders/ModalForm"), {
  ssr: false,
});

export default function Table(props: any) {
  const [loading, setLoading] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [formData, setFormData] = useState<Record<string, any>>({});
  let [record, setRecord] = useState<Order[]>([]);
  let [keyword, setKeyword] = useState("");
  const { userRole } = props;

  useEffect(() => {
    const fetchData = async () => {
      let response;

      if (keyword === "") response = await fetchOrderList();
      else response = await fetchOrderByKeyword(keyword);

      setRecord(response.data);
      setLoading(false);
    };

    fetchData();
  }, [keyword]);

  const handleSearchInput = (event: any) => {
    const keyword = event.target.value;
    setKeyword(keyword);
  };

  const table_columns = [
    {
      name: "ORDER #",
      selector: (row: Record<any, any>) => row.order_number,
      sortable: true,
    },
    {
      name: "CUSTOMER",
      selector: (row: Record<any, any>) => `${row.firstname} ${row.lastname}`,
      sortable: true,
    },
    {
      name: "QUANTITY",
      selector: (row: Record<any, any>) => row.total_quantity,
      sortable: true,
    },
    {
      name: "TAX",
      selector: (row: Record<any, any>) => row.tax,
      sortable: true,
    },
    {
      name: "SHIPPING FEE",
      selector: (row: Record<any, any>) => row.shipping_fee,
      sortable: true,
    },
    {
      name: "DISCOUNT",
      selector: (row: Record<any, any>) => row.discount,
      sortable: true,
    },
    {
      name: "TOTAL",
      selector: (row: Record<any, any>) => row.total,
      sortable: true,
    },
    {
      name: "ORDER STATUS",
      selector: (row: Record<any, any>) => row.order_status,
      sortable: true,
      cell: (row: Record<any, any>) => (
        <Badge as="span" bg={getBadgeColor(row.order_status)}>
          {row.order_status}
        </Badge>
      ),
    },
    {
      name: "PAYMENT STATUS",
      selector: (row: Record<any, any>) => row.payment_status,
      sortable: true,
      cell: (row: Record<any, any>) => (
        <Badge as="span" bg={getBadgeColor(row.payment_status)}>
          {row.payment_status}
        </Badge>
      ),
    },
    {
      button: true,
      cell: (row: Record<any, any>) => (
        <Button
          variant="outline-primary"
          size="sm"
          onClick={() => {
            setFormData(row);
            setModalShow(true);
          }}
          disabled={userRole === "Cashier"}
        >
          View Details
        </Button>
      ),
    },
  ];

  return (
    <>
      <ModalForm
        modalShow={modalShow}
        setModalShow={setModalShow}
        data={formData}
        records={record}
      />
      <Container className="bg-white p-4 rounded">
        <Row className="mb-3">
          <Col>
            <p className="fs-5 lh-1 my-1">
              <strong>Orders</strong>
            </p>
          </Col>
          <Col>
            <Form.Control
              type="text"
              placeholder="Search an order"
              onChange={handleSearchInput}
            />
          </Col>
        </Row>
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
          data={record}
          pagination
          persistTableHead
          responsive={true}
          striped={true}
          highlightOnHover={true}
          progressPending={loading}
          progressComponent={
            <span className="d-flex align-items-center">
              <Spinner animation="grow" className="my-3" size="sm" /> &nbsp;
              Loading...
            </span>
          }
        />
      </Container>
    </>
  );
}
