import { notification, Button, Image, Drawer, Badge, Space } from "antd";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import RelatedProduct from "./RelatedProduct";
import AddCart from "./AddCart";
import { ShoppingCartOutlined } from "@ant-design/icons";

const ProductDetails = () => {
  const products = JSON.parse(localStorage.getItem("product"));
  const { id } = useParams();
  const [cart, setCart] = useState(
    doesLocalStorageItemExist("cart")
      ? [...JSON.parse(localStorage.getItem("cart"))]
      : []
  );
  const [qty, setQty] = useState(0);
  const [storeQty, setStoreQty] = useState(0);
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState();
  const showLargeDrawer = () => {
    setSize("large");
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(savedCart);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const APro = products.find((p) => p.id === parseInt(id));

  const relatedProduct = products.filter(
    (product) =>
      product.category.includes(APro.category) &&
      product.id !== parseInt(APro.id)
  );

  const addToCart = () => {
    const existProId = cart.findIndex((item) => item.id === APro.id);
    let updatedCart;
    let newProduct = false;

    if (existProId > -1) {
      updatedCart = [...cart];
      updatedCart[existProId].qty += 1;
    } else {
      updatedCart = [...cart, { ...APro, qty: 1 }];
      newProduct = true;
    }
    setStoreQty(qty);
    setQty((pre) => pre + 1);
    console.log(qty);

    setCart(updatedCart);
    if (newProduct) {
      notification.success({
        message: (
          <span className="font-freehand">
            ទំនិញត្រូវបានដាក់ចូលក្នុងកន្រ្តក
          </span>
        ),
        description: `${APro.name} has been added to the cart.`,
        duration: 2,
      });
    }
  };

  const increaseQty = (index) => {
    setCart((prevCart) => {
      const newCart = [...prevCart];
      newCart[index].qty += 1;
      return newCart;
    });
  };

  const decreaseQty = (index) => {
    setQty(storeQty);
    console.log(qty);

    setCart((prevCart) => {
      const newCart = [...prevCart];
      if (newCart[index].qty > 0) {
        newCart[index].qty -= 1;
        if (newCart[index].qty === 0) {
          newCart.splice(index, 1);
          notification.error({
            message: (
              <h1 className="font-freehand">ទំនិញត្រូវបានដាក់ដកចេញពីកន្រ្តក</h1>
            ),
            description: `${APro.name} has been removed from the cart.`,
            duration: 2,
          });
        }
      }
      return newCart;
    });
  };

  function doesLocalStorageItemExist(id) {
    return localStorage.getItem(id) !== null;
  }

  return (
    <>
      <h1 className="text-center font-freehand text-2xl m-10 underline">
        ព័ត៌មានបន្ថែមនៃទំនិញ
      </h1>
      <div className="product-details p-4 rounded-lg shadow-lg flex flex-col lg:flex-row justify-center gap-20 mb-10">
        <div className="flex justify-center lg:w-1/3">
          <Image
            src={APro.image}
            alt={APro.name}
            title={APro.name}
            className="w-full h-auto max-w-sm lg:max-w-full"
          />
        </div>
        <div className="flex flex-col gap-6">
          <h6 className="font-Poppins text-3xl text-center">{APro.brand}</h6>
          <h1 className="font-freehand">
            ម៉ូដែលនៃទំនិញ <span className="font-Poppins">: {APro.name}</span>
          </h1>
          <h1 className="font-bold font-freehand">
            ប្រភេទទំនិញ <span className="font-Poppins">: {APro.category}</span>
          </h1>
          <h6 className="font-freehand">
            តម្លៃដើម: <s className="font-Poppins">$ {APro.cost}</s>
          </h6>
          <h6 className="font-freehand">
            បញ្ចុះនៅសល់: <span className="font-Poppins">$ {APro.price}</span>
          </h6>
          <Button
            type="primary"
            className="font-freehand w-32"
            onClick={addToCart}
          >
            ដាក់ចូលកន្រ្តក
          </Button>
          <details className="cursor-pointer w-96">
            <summary className="font-freehand">អំពីទំនិញ</summary>
            <blockquote>{APro.desc}</blockquote>
          </details>
        </div>
      </div>
      <RelatedProduct products={relatedProduct} />

      <div className="fixed top-0 right-10 z-10 ">
        <Badge className="mt-5" count={qty}>
          <ShoppingCartOutlined
            onClick={showLargeDrawer}
            style={{ fontSize: 40, color: "white" }}
          />
        </Badge>
      </div>
      <Drawer
        title="ការបញ្ជារទិញ"
        placement="right"
        fontfamily="freehand"
        size={size}
        onClose={onClose}
        open={open}
      >
        <AddCart
          cart={cart}
          setCart={setCart}
          increaseQty={increaseQty}
          decreaseQty={decreaseQty}
          setQty={setQty}
        />
      </Drawer>
    </>
  );
};

export default ProductDetails;
