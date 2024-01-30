import "../../assets/styles/thanksDialogStyle.css"

import {xMark_classic_regular} from "../../fragments/icons";
import Icon from "../Icon/Icon";

import backImage from "../../assets/images/svg/groupOfPersons.svg"

export default function ThanksDialog({onCloseDialog, userName}:ThanksDialogPropsInterface) {
	return (
		<div
			className="mine-thanksDialog"
			>
			
			<div className="mine-thanksDialog--container">
				
				<img
					src={backImage}
					alt="Background"
				/>
				
				<span className="mine-thanksDialog-text">Thank you for your purchase<span className="mine-thanksDialog-text--name">{userName}</span></span>
				
				<Icon
					icon={xMark_classic_regular}
					className="mine-thanksDialog-close"
					onClick={() => onCloseDialog()}
				/>
			</div>
		</div>
	)
}

declare interface ThanksDialogPropsInterface {
	userName: string,
	onCloseDialog: Function
}