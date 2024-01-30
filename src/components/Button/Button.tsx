import { CSSProperties, JSX, MouseEventHandler, ReactElement } from "react";
import "./buttonStyle.css";
import Icon from "../Icon/Icon";

export default function Button(props: ButtonPropsInterface) {
  const {
    text,
    style,
    children,
    prepIcon,
    postIcon,
    onClick,
    className,
    disabled,
  } = props;

  const buttonClasses = `mine-button${className ? " " + className : ""}${
    disabled ? " disabled" : ""
  }`;

  return (
    <div onClick={onClick} className={buttonClasses} style={style}>
      {children || (
        <>
          {prepIcon && (
            <Icon key="prepIcon" className="mine-button-prepIcon" icon={prepIcon} />
          )}
          {text && <span key="span" className="mine-button-text">{text.toUpperCase()}</span>}
          {postIcon && (
            <Icon key="postIcon" className="mine-button-postIcon" icon={postIcon} />
          )}
        </>
      )}
    </div>
  );
}

export interface ButtonPropsInterface {
  text?: string;
  style?: CSSProperties;
  children?: (string | JSX.Element | ReactElement)[] | string | JSX.Element | ReactElement;
  prepIcon?: string | JSX.Element;
  postIcon?: string | JSX.Element;
  onClick?: MouseEventHandler;
  className?: string;
  disabled?: boolean;
}
