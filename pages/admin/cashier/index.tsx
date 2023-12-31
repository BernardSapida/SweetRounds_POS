import Placeholder from "react-bootstrap/Placeholder";

import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useState, useEffect, useRef } from "react";
import { getSession } from "next-auth/react";

import BillRecord from "@/components/cashier/BillRecord";
import Receipt from "@/components/cashier/Receipt";
import Container from "react-bootstrap/Container";
import Table from "@/components/cashier/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import {
  fetchSetting,
  processOrder,
  updateOrder,
  reduceOrder,
} from "@/helpers/Cashier/Methods";
import { Setting } from "@/types/Setting";
import { Product } from "@/types/Product";
import { User } from "@/types/User";

import styles from "./index.module.css";

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const { req } = context;
    const session = await getSession({ req: req });

    if (!session) {
      return {
        props: {},
        redirect: {
          destination: "/",
        },
      };
    }

    return {
      props: { user: session.user },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
};

export default function Dashboard({ user }: { user: User }) {
  const [loading, setLoading] = useState<boolean>(true);
  const [order, setOrder] = useState<Record<string, any>>({});
  const [setting, setSetting] = useState<Setting>({
    tax: 0,
    discount: 0,
    shipping_fee: 0,
    accepting_order: 0,
  });
  const [data, setData] = useState<Product[]>([]);
  let donutQuantity = useRef<number>(0);
  let invoiceId = useRef<string>("");
  let subTotal = useRef<number>(0);

  useEffect(() => {
    processOrder(order, subTotal, donutQuantity, invoiceId);
    fetchSetting(setSetting);
    setLoading(false);
  }, [order]);

  const reduce = (id: string | number) => {
    reduceOrder(id, order, setOrder);
  };

  const update = (item: Record<string, any>) => {
    updateOrder(item, order, setOrder);
  };

  return (
    <>
      <div className={styles.container_transaction}>
        <Container className="bg-white p-4 rounded">
          <p className="fs-5 lh-1 my-1 mb-3 ms-4">
            {loading && (
              <Placeholder animation="glow">
                <Placeholder xs={3} style={{ borderRadius: 5 }} bg="dark" />
              </Placeholder>
            )}
            {!loading && <strong>Cashier Transaction</strong>}
          </p>
          <Row>
            <Col md={8} sm={12}>
              <Table
                data={data}
                setData={setData}
                updateOrder={update}
                reduceOrder={reduce}
                order={order}
                pageLoading={loading}
              />
            </Col>
            <Col md={4} sm={12}>
              <BillRecord
                order={order}
                data={data}
                setData={setData}
                setOrder={setOrder}
                setting={setting}
                subTotal={subTotal}
                donutQuantity={donutQuantity}
                invoiceId={invoiceId.current}
                cashierName={`${user.employee_firstname}  ${user.employee_lastname}`}
                userRole={user.role}
                cashierId={user.id}
                pageLoading={loading}
              />
            </Col>
          </Row>
        </Container>
      </div>
      <div className={styles.receipt_invoice}>
        <Receipt
          order={order}
          setting={setting}
          subTotal={subTotal.current}
          invoiceId={invoiceId.current}
          cashierName={`${user.employee_firstname}  ${user.employee_lastname}`}
        />
      </div>
    </>
  );
}
