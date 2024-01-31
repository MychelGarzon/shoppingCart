import {MouseEventHandler} from 'react'
import '../../assets/styles/headerStyle.css'
import logo from './../../assets/icons/favicon-32x32.png'
import Icon from "../Icon/Icon";
import {cartShopping_classic_regular, magnifyingGlass_classic_regular} from "../../assets/icons/icons";

export default function Header(props: HeaderPropsInterface) {

	return (
		<header className='mdc-elevation--z4'>
			<div>
				<div className='logo'>
					<img
						src={logo}
						alt="Logo store"/>
					<span>eSHOP</span>
				</div>
				
				<div className='searchInput'>
					<div>
						<div className='icon'>
							<Icon icon={magnifyingGlass_classic_regular} style={{height: "60%"}}/>
						</div>
						<div className='input'><input type="text" placeholder='Search your favourite' onChange={event => props.onFilterProducts(event.target.value)}/></div>
					</div>
				</div>
				
				<div className='kartIcon'>
					<div
						onClick={() => props.onOpenCart(true)}>
						
						<Icon
							color={"var(--blueNavy)"}
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