import { ReactNode } from "react";

interface IProps {
  className?: string;
  children?: ReactNode;
}

const Box = ({ children, className }: IProps) => {
  return <div className={className}>{children}</div>;
};

export default Box;
