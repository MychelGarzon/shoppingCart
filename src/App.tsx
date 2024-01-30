import { useEffect, useState } from 'react';
import headerImage from './assets/images/img/background.jpg';
import mainProducts from './assets/json/productsInfo.json';
import Header from "./components/Header/Header";
import ProductCard from "./components/ProductCard/ProductCard";
import CartDialog from "./components/CartDialog/cartDialog";
import DetailDialog from "./components/DetailDialog/DetailDialog";
import ThanksDialog from "./components/ThanksDialog/ThanksDialog";
import './App.css';

export default function App() {
  const getProductFromCart = (product: ProductInterface): ProductToShowInterface | undefined => {
    return getProductFrom(product, cartProductsState) as ProductToShowInterface | undefined;
  };

  const getProductFrom = (product: ProductToShowInterface | ProductInterface, from: (ProductToShowInterface | OnCartProductInterface)[]): undefined | ProductToShowInterface | ProductInterface => {
    for (let i = 0; i < from.length; i++) {
      if (product.id === from[i].id) {
        return from[i];
      }
    }
  };

  const [cartProductsState, setCartProductsState] = useState<OnCartProductInterface[]>([]);

  const [productsToShow, setProductsToShow] = useState<ProductToShowInterface[]>([]);

  useEffect(() => {
    const updatedProductsToShow: ProductToShowInterface[] = mainProducts.map(product => {
      const productFromCart = getProductFromCart(product);
      return productFromCart ? productFromCart : product;
    });

    setProductsToShow(updatedProductsToShow);
  }, [cartProductsState]);

  const [filterWord, setFilterWord] = useState<string>("");

  const [filteredProductsState, setFilteredProductsState] = useState<ProductToShowInterface[]>(productsToShow);

  useEffect(() => {
    const filteredProducts: ProductToShowInterface[] = [];

    if (!filterWord) setFilteredProductsState(productsToShow);

    for (const product of productsToShow) {
      const reg = new RegExp(filterWord, "i").test(product.name);

      if (reg) {
        filteredProducts.push(product);
      }
    }

    setFilteredProductsState(filteredProducts);
  }, [productsToShow, filterWord]);

  const [isCartOpenState, setIsCartOpenState] = useState<boolean>(false);

  const [numOfItemsInTheCart, setNumOfItemsInTheCart] = useState<number>(0);

  useEffect(() => {
    let totalProductsInTheCart = 0;

    for (let i = 0; i < cartProductsState.length; i++) {
      totalProductsInTheCart += cartProductsState[i].howManyProducts;
    }

    setNumOfItemsInTheCart(totalProductsInTheCart);
  }, [cartProductsState]);

  const [productDetailState, setProductDetailState] = useState<ProductToShowInterface | undefined>(undefined);

  useEffect(() => {
    if (!productDetailState) setProductDetailState(productDetailState);
    else {
      const temporalVariable = getProductFromCart(productDetailState);

      if (temporalVariable)
        setProductDetailState(temporalVariable);
      else
        setProductDetailState(getProductFrom(productDetailState, productsToShow));
    }
  }, [cartProductsState, productsToShow]);

  const [isThanksDialogOpenState, setIsThanksDialogOpenState] = useState<string>("");

  function handleOnAddProduct(product: ProductToShowInterface) {
    const productFromCart = getProductFromCart(product) as OnCartProductInterface;

    const cartProductAuxiliarVariable = [...cartProductsState];

    if (productFromCart) {
      ++productFromCart.howManyProducts;
    } else {
      cartProductAuxiliarVariable.push({ ...product, howManyProducts: 1 });
    }

    setCartProductsState(cartProductAuxiliarVariable);
  }

  function handleOnRemoveProduct(product: ProductToShowInterface) {
    const productFromCart = getProductFromCart(product);

    const cartProductAuxiliarVariable = [...cartProductsState];

    if (productFromCart) {
      if (productFromCart.howManyProducts! > 1) {
        --productFromCart.howManyProducts!;
      } else {
        cartProductAuxiliarVariable.splice(cartProductAuxiliarVariable.indexOf(productFromCart as OnCartProductInterface), 1);
      }
    }

    setCartProductsState(cartProductAuxiliarVariable);
  }

  function handleGiveThanks(name: string) {
    setIsCartOpenState(false);
    setIsThanksDialogOpenState(name);
    setCartProductsState([]);
    setFilteredProductsState([...filteredProductsState]);
  }

  return (
    <div className="App">
      <Header
        onOpenCart={() => setIsCartOpenState(true)}
        cartProducts={numOfItemsInTheCart}
        onFilterProducts={setFilterWord}
      />

      <div>
        <main>
          <div className='imageHeader'><img alt="imageLogo" src={headerImage}></img></div>

          <div>
            <div className={"productsGrid"}>
              {filteredProductsState.map((product) =>
                <ProductCard
                  onAddProduct={handleOnAddProduct}
                  onRemoveProduct={handleOnRemoveProduct}
                  onDetailClick={(p) => setProductDetailState(p)}
                  productData={product} key={product.id}
                />)}
            </div>
          </div>
        </main>
      </div>

      {isCartOpenState && (
        <CartDialog
          cartProducts={cartProductsState}
          onCloseDialog={() => setIsCartOpenState(false)}
          onRemoveProduct={handleOnRemoveProduct}
          onAddProduct={handleOnAddProduct}
          numOfProducts={numOfItemsInTheCart}
          onPay={handleGiveThanks}
        />
      )}

      {productDetailState && (
        <DetailDialog
          onCloseDialog={() => setProductDetailState(undefined)}
          productDetail={productDetailState}
          onAddProduct={handleOnAddProduct}
          onRemoveProduct={handleOnRemoveProduct}
        />
      )}

      {isThanksDialogOpenState && (
        <ThanksDialog
          userName={isThanksDialogOpenState}
          onCloseDialog={() => setIsThanksDialogOpenState("")}
        />
      )}
    </div>
  );
}

export declare interface ProductInterface {
  id: number;
  name: string;
  src: string;
  price: number;
  description: string;
}

export declare interface ProductToShowInterface {
  id: number;
  name: string;
  src: string;
  price: number;
  description: string;
  howManyProducts?: number;
}

export declare interface OnCartProductInterface {
  id: number;
  name: string;
  src: string;
  price: number;
  description: string;
  howManyProducts: number;
}
