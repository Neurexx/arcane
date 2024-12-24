// components/ui/radio-group.tsx
"use-client"
import React, { ReactNode, ReactElement } from "react";

// RadioGroup component - this holds the radio items together
export const RadioGroup = ({
  children,
  value,
  onChange,
}: {
  children: ReactNode;
  value: string;
  onChange: (value: string) => void;
}) => (
  <div className="radio-group">
    {React.Children.map(children, (child) =>
      // Type checking: Ensure the child is a ReactElement of type RadioGroupItem
      React.isValidElement(child)
        ? React.cloneElement(child as ReactElement<any>, { selectedValue: value, onValueChange: onChange })
        : child
    )}
  </div>
);

// RadioGroupItem component - each radio button item
export const RadioGroupItem = ({
  value,
  children,
  selectedValue,
  onValueChange,
}: {
  value: string;
  children: ReactNode;
  selectedValue: string;
  onValueChange: (value: string) => void;
}) => (
  <label className={`radio-group-item ${selectedValue === value ? "selected" : ""}`}>
    <input
      type="radio"
      name="radio-group"
      value={value}
      checked={selectedValue === value}
      onChange={() => onValueChange(value)}
      className="radio-input"
    />
    <span className="radio-label">{children}</span>
  </label>
);
