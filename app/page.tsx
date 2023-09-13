import { Row, Col } from "antd";

export default function Home() {
  console.log("Home Page");
  return (
    <div>
      <Row>
        <Col xs={24} md={12} xl={8}>
          One of three columns
        </Col>
        <Col xs={24} md={12} xl={8}>
          One of three columns
        </Col>
        <Col xs={24} md={12} xl={8}>
          One of three columns
        </Col>
      </Row>
    </div>
  );
}
