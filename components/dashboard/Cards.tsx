import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Card from "@/components/dashboard/Card";

import { getLastDayOfMonth, getCurrentMonth } from "@/helpers/date";

function Cards({
  revenue,
  numberOfCustomer,
  productSold,
  numberOfTransaction,
  loading,
}: {
  revenue: string;
  numberOfCustomer: string;
  productSold: string;
  numberOfTransaction: string;
  loading: boolean;
}) {
  return (
    <Row className="justify-content-center align-items-center gap-2 flex-wrap mt-4">
      <Col>
        <Card
          title="Revenue Status"
          value={`Php ${revenue}`}
          date={`${getCurrentMonth()} 1 - ${getCurrentMonth()} ${getLastDayOfMonth()}`}
          color="#EB4985"
          loading={loading}
        />
      </Col>
      <Col>
        <Card
          title="New Customers"
          value={numberOfCustomer}
          date={`${getCurrentMonth()} 1 - ${getCurrentMonth()} ${getLastDayOfMonth()}`}
          color="#6E54BC"
          loading={loading}
        />
      </Col>
      <Col>
        <Card
          title="Product Sold"
          value={productSold}
          date={`${getCurrentMonth()} 1 - ${getCurrentMonth()} ${getLastDayOfMonth()}`}
          color="#58A7E5"
          loading={loading}
        />
      </Col>
      <Col>
        <Card
          title="Completed Transaction"
          value={numberOfTransaction}
          date={`${getCurrentMonth()} 1 - ${getCurrentMonth()} ${getLastDayOfMonth()}`}
          color="#F9B15D"
          loading={loading}
        />
      </Col>
    </Row>
  );
}

export default Cards;
