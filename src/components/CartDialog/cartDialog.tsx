import "../../assets/styles/cartDialogStyle.css";
import { useEffect, useState } from "react";
import Icon from "../Icon/Icon";
import { xMark_classic_regular } from "../../assets/icons/icons";
import { OnCartProductInterface, ProductInterface } from "../../App";
import CartCard from "../CartCard/CartCard";
import Button from "../Button/Button";

// Interface for CartDialogProps
interface CartDialogPropsInterface {
  onCloseDialog: (b: boolean) => void;
  cartProducts: OnCartProductInterface[];
  onRemoveProduct: (product: ProductInterface) => void;
  onAddProduct: (product: ProductInterface) => void;
  numOfProducts: number;
  onPay: (name: string) => void;
}

// CartDialog component
export default function CartDialog({
  numOfProducts: numberOfProducts,
  cartProducts,
  onRemoveProduct,
  onCloseDialog,
  onAddProduct,
  onPay
}: CartDialogPropsInterface): JSX.Element {


  const [userNameState, setUserNameState] = useState<string>("Type your name");
  const [distanceState, setDistanceState] = useState<number>(0);
  const [datetimeState, setDatetimeState] = useState<Date | undefined>(undefined);
  const [orderingTime, setOrderingTime] = useState<boolean | undefined>(undefined);

  // Determine ordering time
  useEffect(() => {
    if (datetimeState === undefined) {
      setOrderingTime(undefined);
      return;
    }

    const isItFriday =
      datetimeState.toLocaleDateString("en-US", { weekday: "long" }) === "Friday";
    const isOnTime = datetimeState.getHours() >= 15 && datetimeState.getHours() < 19;

    setOrderingTime(isItFriday && isOnTime);
  }, [datetimeState]);

  // Calculate total products
  const [totalProductsState, setTotalProductsState] = useState<number>(0);
  useEffect(() => {
    let totalProducts = 0;

    for (const item of cartProducts) {
      totalProducts += item.howManyProducts * item.price;
    }

    setTotalProductsState(totalProducts);
  }, [numberOfProducts, cartProducts]);

  // Calculate delivery distance
  const [deliveryDistanceState, setDeliveryDistanceState] = useState<number>(0);
  useEffect(() => {
    let extraChargeDistance = distanceState ? 2 : 0;
    let distance = distanceState - 1000;

    while (distance > 0) {
      distance -= 500;
      extraChargeDistance += 1;
    }

    setDeliveryDistanceState(extraChargeDistance);
  }, [distanceState]);

  // Calculate extra charge based on number of items
  const [extraChargeNumberOfItems, setExtraChargeNumberOfItems] = useState<number>(0);
  useEffect(() => {
    setExtraChargeNumberOfItems(
      (numberOfProducts - 4) * 0.5 < 0
        ? 0
        : (numberOfProducts - 4) * 0.5 + (numberOfProducts > 12 ? 1.2 : 0)
    );
  }, [numberOfProducts]);

  // Calculate extra charge for Friday delivery
  const [extraChargeTimeDelivery, setChargeBecauseIsFriday] = useState<number>(0);
  useEffect(() => {
    setChargeBecauseIsFriday(orderingTime ? (deliveryDistanceState + extraChargeNumberOfItems) * 0.2 : 0);
  }, [deliveryDistanceState, extraChargeNumberOfItems, orderingTime]);

  // Calculate pre-sending price
  const [preSendingPriceState, setPreSendingPriceState] = useState<number>(0);
  useEffect(() => {
    setPreSendingPriceState(deliveryDistanceState + extraChargeNumberOfItems + extraChargeTimeDelivery);
  }, [deliveryDistanceState, extraChargeNumberOfItems, extraChargeTimeDelivery]);

  // Ddetermine if over sending price
  const [isOverSendingPriceState, setIsOverSendingPriceState] = useState<boolean>(false);
  useEffect(() => {
    setIsOverSendingPriceState(preSendingPriceState > 15);
  }, [preSendingPriceState]);

  // Calculate over cost discount
  const [overCostDiscountState, setOverCostDiscountState] = useState<number>(0);
  useEffect(() => {
    setOverCostDiscountState(isOverSendingPriceState ? preSendingPriceState - 15 : 0);
  }, [isOverSendingPriceState, preSendingPriceState]);

  // Calculate small order surcharge
  const [smallOrderSurcharge, setSmallOrderSurcharge] = useState<number>(0);
  useEffect(() => {
    const surcharge = totalProductsState < 10 ? 10 - totalProductsState : 0;
    setSmallOrderSurcharge(surcharge);
  }, [totalProductsState]);

  // Calculate sending price
  const [sendingPriceState, setSendingPriceState] = useState<number>(0);
  useEffect(() => {
    const calculatedSendingPrice = preSendingPriceState - overCostDiscountState + smallOrderSurcharge;

    setSendingPriceState(Math.min(calculatedSendingPrice, 15));
  }, [preSendingPriceState, overCostDiscountState, smallOrderSurcharge]);

  // Calculate total price
  const [totalPriceState, setTotalPriceState] = useState<number>(0);
  useEffect(() => {
    setTotalPriceState(sendingPriceState + totalProductsState);
  }, [sendingPriceState, totalProductsState]);

  // Calculate products price discount
  const [productsPriceDiscountState, setProductsPriceDiscountState] = useState<number>(0);
  useEffect(() => {
    if (totalProductsState >= 200) {
      setProductsPriceDiscountState(sendingPriceState);
    } else {
      setProductsPriceDiscountState(0);
    }
  }, [totalProductsState, sendingPriceState]);

  // Function to get initial date string
  const initialStringDate = (): string => {
    const date = datetimeState ?? new Date();
    return (
      date.getFullYear() +
      "-" +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + date.getDate()).slice(-2) +
      "T" +
      ("0" + date.getHours()).slice(-2) +
      ":" +
      ("0" + date.getMinutes()).slice(-2)
    );
  };

  // Function to handle closing the dialog
  function handleOnCloseDialog() {
    onCloseDialog(false);
  }

  // Render the CartDialog component
  return (
    <div className="mine-cart-dialog">
      <div className="mine-cart-dialog--container">
        <h1 className="mine-cart-dialog-title">Shopping Cart</h1>

        <Icon icon={xMark_classic_regular} className="mine-cart-dialog-close" onClick={handleOnCloseDialog} />

        <div className="mine-cart-dialog-main">
          <div className="mine-cart-dialog-main--left">
            {cartProducts.map((value) => (
              <CartCard
                key={value.id}
                cartProduct={value}
                onRemoveFromCart={onRemoveProduct}
                onAddToCart={onAddProduct}
              />
            ))}
          </div>

          <div className="mine-cart-dialog-main--right">
            <div className="mine-cart-dialog-sending-data section">
              <div className="mine-cart-dialog-sending-data-title--container">
                <h2>Ordering details</h2>

                <div className="mine-cart-dialog-sending-data-title--buttons"></div>
              </div>

              <hr />

              <div className="mine-cart-dialog-sending-data-body">
                <p className="mine-cart-dialog-sending-data-body--left">Name: </p>
                <input
                  data-testid="userNameInput"
                  type={"text"}
                  onChange={(e) => setUserNameState(e.target.value)}
                  placeholder={userNameState}
                />

                <p className="mine-cart-dialog-sending-data-body--left">Distance (m):</p>
                <input
                  data-testid="distanceInput"
                  className="distance"
                  type={"number"}
                  onChange={(e) => setDistanceState(e.target.valueAsNumber)}
                  placeholder="0"
                />

                <p className="mine-cart-dialog-sending-data-body--left">Date and Hour of Delivery: </p>
                <input
                  data-testid="datetimeInput"
                  type={"datetime-local"}
                  onChange={(e) => setDatetimeState(new Date(e.target.value))}
                  value={initialStringDate()}
                />

                <p className="mine-cart-dialog-sending-data-body--left">Number of Products:</p>
                <p data-testid="numOfProducts" className="mine-cart-dialog-sending-data-body--right">
                  {numberOfProducts}
                </p>
              </div>
            </div>

            <div className="mine-cart-dialog-sending-calc section">
              <div className="mine-cart-dialog-sending-calc-title--container">
                <h2>Delivery</h2>
              </div>

              <hr />

              <div className="mine-cart-dialog-sending-calc-body">
                <p className="mine-cart-dialog-sending-calc-body--left">Extra-cost distance:</p>
                <p className="price mine-cart-dialog-sending-calc-body--right" data-testid="distanceSurcharge">
                  {deliveryDistanceState.toFixed(2)}
                </p>

                <p className="mine-cart-dialog-sending-calc-body--left">Extra-cost number of items:</p>
                <p className="price mine-cart-dialog-sending-calc-body--right" data-testid="numOfItemsSurcharge">
                  {extraChargeNumberOfItems.toFixed(2)}
                </p>

                <p className="mine-cart-dialog-sending-calc-body--left">Extra-cost time of delivery:</p>
                {orderingTime ? (
                  <p className="price mine-cart-dialog-sending-calc-body--right">
                    {extraChargeTimeDelivery.toFixed(2)}
                  </p>
                ) : (
                  <p className="price mine-cart-dialog-sending-calc-body--right">0</p>
                )}

                {productsPriceDiscountState ? (
                  <>
                    <p className="mine-cart-dialog-sending-calc-body--left">
                      Discount if the cost is over 200 €:
                    </p>
                    <p className="discount price mine-cart-dialog-sending-calc-body--right">
                      {productsPriceDiscountState}
                    </p>
                  </>
                ) : (
                  <></>
                )}

                <p className="mine-cart-dialog-sending-calc-body--left">Small order Extra-cost:</p>
                <p className="price mine-cart-dialog-sending-calc-body--right" data-testid="smallOrderSurcharge">
                  {smallOrderSurcharge.toFixed(2)}
                </p>
              </div>
            </div>

            <div className="mine-cart-dialog-totals">
              <p>
                Cost of the products: <span data-testid="cartPriceSpan">{totalProductsState.toFixed(2) + " €"}</span>
              </p>

              <p>
                Delivery costs:{" "}
                <span data-testid="sendingPrice">{(sendingPriceState - productsPriceDiscountState).toFixed(2) + " €"}</span>
              </p>

              <p className="total">
                Total: <span data-testid="totalPrice">{totalPriceState.toFixed(2) + " €"} </span>
              </p>

              <div className="mine-cart-dialog-totals-buttons">
                <Button
                  text="Continue Shopping"
                  style={{ border: "2px solid var(--primary)", color: "var(--primary)" }}
                  onClick={() => onCloseDialog(false)}
                />

                <Button
                  className="pay"
                  text="Pay"
                  style={{ backgroundColor: "var(--primary)", color: "white" }}
                  onClick={() => onPay(userNameState)}
                  disabled={numberOfProducts < 1}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
