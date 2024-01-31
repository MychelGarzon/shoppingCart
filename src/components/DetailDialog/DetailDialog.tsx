import "../../assets/styles/detailDialogStyle.css"
import Icon from "../Icon/Icon";
import {
	xMark_classic_regular
} from "../../assets/icons/icons";
import {ProductInterface, ProductToShowInterface} from "../../App";
import ButtonToCart from "../ButtonToCart/ButtonToCart";

export default function DetailDialog(props: CartDialogPropsInterface) {
	return (
		<div
			className="mine-detail-dialog">
			
			<div className="mine-detail-dialog--container">
				
				<Icon
					icon={xMark_classic_regular}
					className="mine-detail-dialog-close"
					onClick={() => props.onCloseDialog()}/>
				
				<img className="mine-detail-dialog-img" src={`/src/assets/images/products/${props.productDetail?.src}`}/>
			
				
				<div className="mine-detail-dialog--container--right">
					<div className="mine-detail-dialog--container--right--up">
						<h1 className="mine-detail-dialog-title">{props.productDetail?.name}</h1>
						<p className="mine-detail-dialog-description">{props.productDetail?.description}</p>
						<span className="mine-detail-dialog-price">{props.productDetail?.price}</span>
					</div>
					
					<ButtonToCart
						productData={props.productDetail}
						onAddToCart={() => props.onAddProduct(props.productDetail)}
						onRemoveFromCart={() => props.onRemoveProduct(props.productDetail)} />
				</div>
			</div>
		</div>
	)
}

declare interface CartDialogPropsInterface {
	onCloseDialog: () => void,
	productDetail: ProductToShowInterface,
	onAddProduct: (product: ProductToShowInterface) => void,
	onRemoveProduct: (product: ProductInterface) => void
}