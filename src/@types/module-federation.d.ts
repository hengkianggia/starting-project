// Type declarations for Module Federation
declare module "shared_components/Button" {
  import React from "react";
  
  interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
  }
  
  const Button: React.FC<ButtonProps>;
  export default Button;
}