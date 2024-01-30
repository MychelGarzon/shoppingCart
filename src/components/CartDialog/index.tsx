import "./style.css"
import {useEffect, useState} from "react";
import Icon from "../Icon";
import {xMark_classic_regular} from "../../fragments/icons";
import {OnCartProductInterface, ProductInterface} from "../../App";
import CartCard from "../CartCard";
import Button from "../Button";

export default function CartDialog(
	{
		numOfProducts,
		cartProducts,
		onRemoveProduct,
		onCloseDialog,
		onAddProduct,
		onPay
	}:CartDialogPropsInterface) {
	const [userNameState, setUserNameState] = useState("Juan Laserna")
	const [distanceState, setDistanceState] = useState(0)
	const [datetimeState, setDatetimeState] = useState(():Date|undefined => {return ;})
	
	const [isHoraPuntaState, setIsHoraPuntaState] = useState(():boolean|undefined => {return })
	useEffect(() => {
		if (datetimeState === undefined) {setIsHoraPuntaState(undefined); return }
		
		const isItFriday = datetimeState.toLocaleDateString("es-es",{weekday: "long"}) === "viernes"
		const isOnTime = datetimeState.getHours() >= 15 && datetimeState.getHours() < 19
		
		setIsHoraPuntaState(isItFriday && isOnTime)
	}, [datetimeState]);
	
	const [totalProductsState, setTotalProductsState] = useState(0)
	useEffect(() => {
		let totalProductos = 0
		
		for (const item of cartProducts) {
			totalProductos += item.howMuch*item.price
		}
		
		setTotalProductsState(totalProductos)
	}, [numOfProducts]);
	
	const [recargoPorDistanciaState, setRecargoPorDistanciaState] = useState(0)
	useEffect(() => {
		let recargoDistancia = distanceState?2:0
		let distancia = distanceState - 1000
		
		while (distancia > 0) {
			distancia -= 500
			recargoDistancia += 1
		}
		
		setRecargoPorDistanciaState(recargoDistancia)
	}, [distanceState]);
	
	const [recargoPorNumeroDeProductos, setRecargoPorNumeroDeProductos] = useState(0)
	useEffect(() => {
		setRecargoPorNumeroDeProductos(((numOfProducts - 4) * 0.5 < 0) ? 0 : ((numOfProducts - 4) * 0.5) + ((numOfProducts > 12)? 1.2 : 0))
	}, [numOfProducts]);
	
	const [recargoPorHoraPunta, setRecargoPorHoraPunta] = useState(0)
	useEffect(() => {
		setRecargoPorHoraPunta((isHoraPuntaState?((recargoPorDistanciaState+recargoPorNumeroDeProductos)*0.2):0))
	}, [recargoPorDistanciaState, recargoPorNumeroDeProductos]);
	
	const [preSendingPriceState, setPreSendingPriceState] = useState(0)
	useEffect(() => {
		setPreSendingPriceState(recargoPorDistanciaState+recargoPorNumeroDeProductos+recargoPorHoraPunta)
	}, [recargoPorDistanciaState, recargoPorNumeroDeProductos, recargoPorHoraPunta]);
	
	const [isOverSendingPriceState, setIsOverSendingPriceState] = useState(false)
	useEffect(() => {
		setIsOverSendingPriceState(preSendingPriceState > 15)
	}, [preSendingPriceState]);
	
	const [overCostDiscountState, setOverCostDiscountState] = useState(0)
	useEffect(() => {
		setOverCostDiscountState((isOverSendingPriceState?((preSendingPriceState) - 15):(0)))
	}, [isOverSendingPriceState, preSendingPriceState]);
	
	const [sendingPriceState, setSendingPriceState] = useState(0)
	useEffect(() => {
		setSendingPriceState(preSendingPriceState-overCostDiscountState)
	}, [preSendingPriceState, overCostDiscountState]);
	
	const [totalPriceState, setTotalPriceState] = useState(0)
	useEffect(() => {
		setTotalPriceState(sendingPriceState + totalProductsState)
	}, [sendingPriceState, totalProductsState]);
	
	const [productsPriceDiscountState, setProductsPriceDiscountState] = useState(0)
	useEffect(() => {
		if (totalProductsState >= 200) {
			setProductsPriceDiscountState(sendingPriceState)
		} else {
			setProductsPriceDiscountState(0)
		}
		
	}, [totalProductsState, sendingPriceState]);
	
	const initialStringDate = ():string => {
		let date
		
		if (!datetimeState) {
			date = new Date()
		} else {
			date = datetimeState
		}
		
		const year = "" + date.getFullYear();
		const month = ('0' + (date.getMonth() + 1)).slice(-2);
		const day = ('0' + date.getDate()).slice(-2)
		const hours = ('0' + date.getHours()).slice(-2)
		const minute = ('0' + date.getMinutes()).slice(-2)
		
		return (year + '-' + month + '-' + day + 'T' + hours + ':' + minute)!
	}
	
	/*Event Handling*/
	function handleOnCloseDialog() {
		onCloseDialog(false)
	}
	
	return (
		<div
			className="mine-cart-dialog">
			
			<div className="mine-cart-dialog--container">
				<h1 className="mine-cart-dialog-title">CARRITO</h1>
				
				<Icon
					icon={xMark_classic_regular}
					className="mine-cart-dialog-close"
					onClick={handleOnCloseDialog}/>
				
				<div className="mine-cart-dialog-main">
					<div className="mine-cart-dialog-main--left">
						{
							cartProducts.map(value =>
								<CartCard
									key={value.id}
									cartProduct={value}
									onRemoveFromCart={onRemoveProduct}
									onAddToCart={onAddProduct}
								/>)
						}
					</div>
					
					<div className="mine-cart-dialog-main--right">
						<div className="mine-cart-dialog-sending-data section">
							<div className="mine-cart-dialog-sending-data-title--container">
								<h2>Datos de envío</h2>
								
								<div className="mine-cart-dialog-sending-data-title--buttons">
									{/*{
										isSendingDataState ?
											<Button text="EDITAR" style={{}} prepIcon={pencil_classic_regular}/>
											:
											<Button text="AGREGAR" style={{}} prepIcon={plus_classic_regular}/>
									}*/}
								</div>
							</div>
							
							<hr/>
							
							<div className="mine-cart-dialog-sending-data-body">
								<p className="mine-cart-dialog-sending-data-body--left">Nombre:</p>
								<input
									data-testid="userNameInput"
									type={"text"}
									onChange={e =>
										setUserNameState(e.target.value)}
									placeholder={userNameState}
								/>
								
								<p className="mine-cart-dialog-sending-data-body--left">Distancia (m):</p>
								<input
									data-testid="distanceInput"
									className="distance"
									type={"number"}
									onChange={e =>
										setDistanceState(e.target.valueAsNumber)}
									placeholder="0"
								/>
								
								<p className="mine-cart-dialog-sending-data-body--left">Fecha y hora:</p>
								<input
									data-testid="datetimeInput"
									type={"datetime-local"}
									onChange={e =>
										setDatetimeState(new Date(e.target.value))
									}
									value={initialStringDate()}
								/>
								
								<p
									className="mine-cart-dialog-sending-data-body--left">Número de productos:
								</p>
								<p
									data-testid="numOfProducts"
									className="mine-cart-dialog-sending-data-body--right"
								>{numOfProducts}</p>
							</div>
						
						</div>
						
						<div className="mine-cart-dialog-sending-calc section">
							<div className="mine-cart-dialog-sending-calc-title--container">
								<h2>Envío</h2>
							</div>
							
							<hr/>
							
							<div className="mine-cart-dialog-sending-calc-body">
								<p className="mine-cart-dialog-sending-calc-body--left">Recargo por distancia:</p>
								<p className="price mine-cart-dialog-sending-calc-body--right" data-testid="distanceSurcharge">{recargoPorDistanciaState}</p>
								
								<p className="mine-cart-dialog-sending-calc-body--left">Recargo por número de productos:</p>
								<p className="price mine-cart-dialog-sending-calc-body--right" data-testid="numOfItemsSurcharge">{recargoPorNumeroDeProductos}</p>
								
								<p className="mine-cart-dialog-sending-calc-body--left">Recargo por hora punta:</p>
								{
										isHoraPuntaState?
										<p className="price mine-cart-dialog-sending-calc-body--right">{recargoPorHoraPunta}</p>
											:
												<p className="price mine-cart-dialog-sending-calc-body--right">0</p>
								}
								
								{
									isOverSendingPriceState ?
										<>
											<p className="mine-cart-dialog-sending-calc-body--left">descuento por sobrecosto:</p>
											<p className="descuento price mine-cart-dialog-sending-calc-body--right">{overCostDiscountState}</p>
										</>
										:
										<></>
								}
								
								{
									productsPriceDiscountState?
										<><p className="mine-cart-dialog-sending-calc-body--left">Descuento por valor de la compra mayor a
											200 €:</p>
											<p className="descuento price mine-cart-dialog-sending-calc-body--right">{productsPriceDiscountState}</p></>
										:
										<></>
								}
							</div>
						</div>
						
						<div className="mine-cart-dialog-totals">
							<p>Valor de los productos: <span data-testid="cartPriceSpan">{totalProductsState}</span></p>
							
							<p>Valor del envío: <span data-testid="sendingPrice">{
								sendingPriceState-productsPriceDiscountState
							}</span></p>
							
							<p className="total">Total: <span data-testid="totalPrice">{totalPriceState}</span></p>
							
							<div  className="mine-cart-dialog-totals-buttons">
								<Button
									text="SEGUIR COMPRANDO"
									style={{border: "2px solid var(--primary)", color: "var(--primary)"}}
									onClick={() => onCloseDialog(false)}
								/>
								
								<Button
									className="pay"
									text="PAGAR"
									style={{backgroundColor: "var(--primary)", color: "white"}}
									onClick={() => onPay(userNameState)}
									disabled={numOfProducts<1}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

declare interface CartDialogPropsInterface {
	onCloseDialog: (b: boolean) => void,
	cartProducts: OnCartProductInterface[],
	onRemoveProduct: (product: ProductInterface) => void,
	onAddProduct: (product: ProductInterface) => void,
	numOfProducts: number,
	onPay: (name: string) => void
}