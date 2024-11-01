import "../../assets/styles/productCardStyle.css"
import type {ProductToShowInterface} from "../../App";
import ButtonToCart from "../ButtonToCart/ButtonToCart";


export default function ProductCard(props: ProductCardPropsInterface) {
	
	const handleOnButtonClick = () => {
		props.onAddProduct(props.productData)
	}
	
	const handleOnRemoveProduct = () => {
		props.onRemoveProduct(props.productData)
	}
	
	return (
		<div className="mine-card">
			<div className="mine-card-img--container">
			<img src={props.productData.src} alt={props.productData.name} />
			</div>
			
			<div className={"mine-card-main"}>
				<div>
					<h2 className={"mine-card-title"}>
						{props.productData.name}
					</h2>
					
					
					<p
						onClick={() => props.onDetailClick(props.productData)}
						className={"mine-card-description"}>
						Info...
					</p>
				</div>
				
				<div>
					<p className={"mine-card-price"}>
						{props.productData.price}
					</p>
					<p>Price/Kg </p>
					
					<ButtonToCart
						onAddToCart={handleOnButtonClick}
						onRemoveFromCart={handleOnRemoveProduct}
						productData={props.productData}
					/>
				
				</div>
			
			</div>
		</div>
	);
}

declare interface ProductCardPropsInterface {
	productData: ProductToShowInterface,
	onAddProduct: (product: ProductToShowInterface) => void,
	onRemoveProduct: (product: ProductToShowInterface) => void,
	onDetailClick: (p: ProductToShowInterface) => void,
	// numProducts: number
}