import '../../assets/styles/iconStyle.css'
import {CSSProperties, JSX, MouseEventHandler} from "react";

export default function Icon(props: IconPropsInterface) {
	return (
		<i
			onClick={props.onClick}
			className={`mine-icon ${props.className||""}`}
			style={{...props.style, color: props.color}}>
			
			{props.icon}
		</i>
	)
}

export declare interface IconPropsInterface {
	style?: CSSProperties,
	color?: string,
	icon: JSX.Element|string,
	className?: string,
	onClick?: MouseEventHandler
}