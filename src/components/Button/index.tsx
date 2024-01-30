import "./style.css"

import {CSSProperties, JSX, MouseEventHandler, ReactElement} from "react";
import Icon from "../Icon";

export default function Button(props: ButtonPropsInterface) {
	return (
		<div
			onClick={props.onClick}
			className={`mine-button${(props.className?(" "+props.className):"")}${props.disabled?" disabled":""}`}
			style={props.style}>
			
			
			{
				props.children ?
					props.children
					
					:
					(
						<>
							{
								props.prepIcon ?
									<Icon
										key={"prepIcon"}
										className="mine-button-prepIcon"
										icon={props.prepIcon}/>
									:
									<></>
							}
							
							{
								props.text ?
									<span
										key={"span"}
										className="mine-button-text"
									>{props.text.toUpperCase()}</span>
									:
									<></>
							}
							
							{
								props.postIcon ?
									<Icon
										key={"postIcon"}
										className="mine-button-postIcon"
										icon={props.postIcon}/>
									:
									<></>
							}
							
						</>
					)
			}
		
		</div>
	)
}

export declare interface ButtonPropsInterface {
	text?: string,
	style?: CSSProperties,
	children?: (string | JSX.Element | ReactElement)[] | string | JSX.Element | ReactElement,
	prepIcon?: string | JSX.Element,
	postIcon?: string | JSX.Element,
	onClick?: MouseEventHandler,
	className?: string
	disabled?: boolean
}