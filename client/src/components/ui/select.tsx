// components/ui/select.tsx
"use-client"
import React, { ReactNode } from "react";

// Define the Select component
export const Select = ({ children }: { children: ReactNode }) => (
  <div className="select-container">{children}</div>
);

// Define the SelectTrigger component
export const SelectTrigger = ({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) => (
  <button className="select-trigger" onClick={onClick}>
    {children}
  </button>
);

// Define the SelectContent component
export const SelectContent = ({ children }: { children: ReactNode }) => (
  <div className="select-content">{children}</div>
);

// Define the SelectItem component
export const SelectItem = ({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) => (
  <div className="select-item" onClick={onClick}>
    {children}
  </div>
);

// Define the SelectValue component
export const SelectValue = ({ value }: { value: string }) => (
  <div className="select-value">{value}</div>
);
