import "../../assets/styles/cartCardStyle.css";
import { OnCartProductInterface } from "../../App";
import Icon from "../Icon/Icon";
import {
  circleMinus_classic_regular,
  circlePlus_classic_regular,
} from "../../assets/icons/icons";
import { useState } from "react";

export default function CartCard(props: CartCardPropsInterface) {
  const [, setNumProductsState] = useState(0);

  
  const handleRemoveFromCart = () => {
    setNumProductsState(props.onRemoveFromCart(props.cartProduct));
  };

  const handleAddToCart = () => {
    setNumProductsState(props.onAddToCart(props.cartProduct));
  };

  return (
    <>
      <div className="mine-cart-card">
        <div className="mine-cart-card-img--container">
          <img
            className="mine-cart-card-img"
            src={`/src/assets/images/products/${props.cartProduct.src}`}
            alt={props.cartProduct.name}
          />
        </div>

        <div className="mine-cart-card-main">
          <div className="mine-cart-card-main--left">
            <div className="mine-cart-card-main--up">
              <h1 className="mine-cart-card-title">{props.cartProduct.name}</h1>

              <span className="mine-cart-card-description">Description</span>
            </div>

            <span className="mine-cart-card-price">{props.cartProduct.price}</span>
          </div>

          <div className="mine-cart-card-main--right">
            <div className="mine-cart-card-howManyProducts">
              <span className="mine-cart-card-howManyProducts--title">Quantity</span>

              <div className="mine-cart-card-howManyProducts--counter">
                <Icon icon={circleMinus_classic_regular} onClick={handleRemoveFromCart} />

                <span className="mine-cart-card-howManyProducts--count">
                  {props.cartProduct.howManyProducts}
                </span>

                <Icon icon={circlePlus_classic_regular} onClick={handleAddToCart} />
              </div>
            </div>

            <div className="mine-cart-card-total">
              <span className="mine-cart-card-total--title">Total:</span>

              <span className="mine-cart-card-total--price">
                {(props.cartProduct.howManyProducts * props.cartProduct.price).toFixed(2) + ""}
              </span>
            </div>
          </div>
        </div>
      </div>

      <hr className="mine-cart-card-separator" />
    </>
  );
}

export declare interface CartCardPropsInterface {
  cartProduct: OnCartProductInterface;
  onAddToCart: Function;
  onRemoveFromCart: Function;
}
