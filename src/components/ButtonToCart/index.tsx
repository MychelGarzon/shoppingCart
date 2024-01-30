import "./style.css"

import Icon from "../Icon";
import {
	cartShopping_classic_regular,
	circleMinus_classic_regular,
	circlePlus_classic_regular
} from "../../fragments/icons";
import Button from "../Button";
import {ProductToShowInterface} from "../../App";

export default function ButtonToCart(props: ButtonToCartPropsInterface) {
	
	const addToCart = () => {
		props.onAddToCart()
	}
	
	const removeFromCart = () => {
		props.onRemoveFromCart()
	}
	
	return (
		<>
			{
				props.productData?.howManyProducts ?
					<Button
						className="mine-buttonToCart"
						style={{
							border: "2px solid var(--blueNavy)"
						}}
					>
						<Icon
							icon={circleMinus_classic_regular}
							onClick={removeFromCart}
						/>
						
						<span> {props.productData.howManyProducts} </span>
						
						<Icon
							icon={circlePlus_classic_regular}
							onClick={addToCart}
						/>
					</Button>
					:
					<Button
						postIcon={cartShopping_classic_regular}
						text={"ADD"}
						style={{backgroundColor: "var(--blueNavy)", color: "white"}}
						onClick={addToCart}
					/>
			}
		</>
	)
}

export declare interface ButtonToCartPropsInterface {
	onAddToCart: () => void,
	onRemoveFromCart: () => void,
	productData: ProductToShowInterface
}