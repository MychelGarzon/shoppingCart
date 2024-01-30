import {MouseEventHandler} from 'react'
import './style.css'
import logo from './../../assets/img/svg/logo tienda virtual.svg'
import Icon from "../Icon";
import {cartShopping_classic_regular, magnifyingGlass_classic_regular} from "../../fragments/icons";

export default function Header(props: HeaderPropsInterface) {
	// const {onFilterProducts} = props
	/*const [filterInputState, setFilterInputState] = useState("")
	useEffect(() => {
		onFilterProducts(filterInputState)
	}, [filterInputState]);*/
	
	return (
		<header className='mdc-elevation--z4'>
			<div>
				<div className='logo'>
					<img
						src={logo}
						alt="Logo de la tienda virtual"/>
					<span>eSHOP</span>
				</div>
				
				<div className='searchInput'>
					<div>
						<div className='icon'>
							<Icon icon={magnifyingGlass_classic_regular} style={{height: "60%"}}/>
						</div>
						<div className='input'><input type="text" placeholder='Filtrar' onChange={event => props.onFilterProducts(event.target.value)}/></div>
					</div>
				</div>
				
				<div className='kartIcon'>
					<div
						onClick={() => props.onOpenCart(true)}>
						
						<Icon
							color={"var(--azulito)"}
							icon={cartShopping_classic_regular}
							className={""}
							style={{height: "24px"}}/>
						
						<div className='notchInvisibleContainer'>
							{
								props.cartProducts ?
									<div>
										<span>{props.cartProducts}</span>
									</div>
									:
									<></>
							}
						
						</div>
					</div>
				</div>
			</div>
		</header>
	)
}

export declare interface HeaderPropsInterface {
	onClick?: MouseEventHandler,
	onOpenCart: (open: boolean) => void,
	cartProducts: number,
	onFilterProducts: (filterWord: string) => void
}