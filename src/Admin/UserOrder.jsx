import {  Image, Table } from "antd";


const UserOrder = () => {
  sessionStorage.setItem("adminLocation", "order");

  const order = JSON.parse(localStorage.getItem("ordered"));
  // Transforming the cart array for the Table component
  const dataSource = order.map((order, index) => ({
    key: index,
    ProductName: order.name,
    price: <h1>$ {order.price}</h1>,
    qty: order.qty,
    image: order.image,
  }));

  const columns = [
    {
      title: <h1 className="font-freehand ">រូបភាព</h1>,
      dataIndex: "image",
      key: "image",
      render: (_, record) => (
        <Image
          width={80}
          style={{ objectFit: "contain" }}
          height={80}
          src={record.image}
          alt={record.name}
        />
      ),
      responsive: ["lg"],
    },
    {
      title: <h1 className="font-freehand ">ឈ្មោះទំនិញ</h1>,
      dataIndex: "ProductName",
      key: "ProductName",
    },
    {
      title: <h1 className="font-freehand ">តម្លៃ </h1>,
      dataIndex: "price",
      key: "price",
      responsive: ["md"],
      width: 100,
    },
    {
      title: <h1 className="font-freehand ">ចំនួន</h1>,
      dataIndex: "qty",
      key: "qty",
    },
  ];

  return (
    <>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{ pageSize: 5 }}
        style={{ textAlgin: "center" }}
      />
    </>
  );
};

export default UserOrder;
