import { HTMLAttributes, ReactNode } from "react";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: ReactNode;
}

const Box = ({ children, className }: IProps) => {
  return <div className={className}>{children}</div>;
};

export default Box;
