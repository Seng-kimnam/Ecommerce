import { Button, Image, Popconfirm, notification, Space, Table } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

const AddCart = ({ cart, setCart, increaseQty, decreaseQty, setQty }) => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (placement, duration) => {
    api.success({
      message: <h1 className="font-freehand text-xl mb-10">ការផ្ញើរសារ</h1>,
      description: (
        <h1 className="font-freehand">
          ការកម្មង់ទំនិញរបស់លោកអ្នកត្រូវបានទទួលជោគជ័យ
        </h1>
      ),
      placement,
      duration,
    });
  };
  function handleDeleteAll() {
    setCart([]);
    setQty(0);
  }

  const handlePurchase = () => {
    if (cart.some((pro) => pro.qty > 0)) {
      openNotification("topRight", 5);
      handleDeleteAll();
      const order = [...JSON.parse(localStorage.getItem("ordered")), ...cart];
      localStorage.setItem("ordered", JSON.stringify([...order]));
    } else {
      api.error({
        message: <p className="font-freehand mb-10">ការផ្ញើរសារ</p>,
        description: (
          <p className="font-freehand">គ្មានទំនិញនៅក្នុងកន្ត្រកទេ</p>
        ),
        duration: 5,
      });
    }
  };

  // Transforming the cart array for the Table component
  const dataSource = cart.map((product, index) => ({
    key: product.id,
    ProductName: product.name,
    price: <h1>$ {product.price}</h1>,
    qty: product.qty,
    image: product.image,
    addCart: () => increaseQty(index),
    subCart: () => decreaseQty(index),
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
    {
      title: <h1 className="font-freehand ">បន្ថែម</h1>,
      key: "add",
      render: (_, record) => (
        <Button onClick={record.addCart} type="primary">
          +
        </Button>
      ),
    },
    {
      title: <h1 className="font-freehand ">ដកចេញ</h1>,
      key: "sub",
      render: (_, record) => (
        <button
          className="bg-red-600 w-10 rounded-md text-white h-8 hover:bg-red-500"
          onClick={record.subCart}
        >
          -
        </button>
      ),
    },
  ];

  return (
    <>
      <Popconfirm
        onConfirm={handleDeleteAll}
        okText={<h1 className="font-freehand">យល់ព្រម</h1>}
        cancelText={<h1 className="font-freehand">អត់ទេ</h1>}
        className="w-full lg:w-40"
        title={<h1 className="font-freehand">ការបញ្ជាក់</h1>}
        icon={<QuestionCircleOutlined style={{ color: "red" }} />}
      >
        <Button className="font-freehand w-full lg:w-auto" danger>
          លុបទាំងអស់
        </Button>
      </Popconfirm>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={{ pageSize: 5 }}
        style={{ textAlgin: "center" }}
      />
      <div className="text-xl flex flex-col gap-5 items-center mt-20 font-freehand">
        <h1>
          ទឹកប្រាក់សរុប​ : ${" "}
          {cart.reduce((acc, product) => acc + product.qty * product.price, 0)}
        </h1>
        <h1>
          ចំនួនទំនិញ : {cart.reduce((acc, product) => acc + product.qty, 0)}{" "}
          គ្រឿង
        </h1>
      </div>
      <footer>
        <div className="absolute bottom-0 w-[100%] right-0 bg-green-600 flex justify-center items-center">
          <h5 className="hover:opacity-80 text-center p-5 text-lg text-white font-freehand w-full lg:w-auto">
            <Space>
              <Button
                type="primary"
                onClick={handlePurchase}
                style={{
                  backgroundColor: "transparent",
                  fontFamily: "freehand",
                }}
                className="w-full lg:w-auto"
              >
                សូមធ្វើការបញ្ជារទិញ
              </Button>
            </Space>
            {contextHolder}
          </h5>
        </div>
      </footer>
    </>
  );
};

export default AddCart;
