import React, { FC, useRef, useState } from "react";
import classNames from "classnames";
import { EbayTextbox, EbayTextboxPrefixIcon, EbayTextboxPostfixIcon } from "../ebay-textbox";
import { EbayNumberInputProps } from "./types";
import { EbayIconButton } from "../ebay-icon-button";

const EbayNumberInput: FC<EbayNumberInputProps> = (props) => {
    const {
        className = '',
        value = 1,
        min = 1,
        max = Infinity,
        label = '',
        a11yDeleteText = '',
        onChange = () => {},
        onInputChange = () => {},
        onFocus = () => {},
        onBlur = () => {},
        onKeyDown = () => {},
        onKeyPress = () => {},
        onKeyUp = () => {},
        onDeleteClick = () => {},
        onIncrement = () => {},
        onDecrement = () => {},
        ...rest
    } = props;
    const defaultMin = a11yDeleteText ? 1 : 0;
    const [inputValue, setInputValue] = useState<number>(value ?? defaultMin);
    const containerRef = useRef<HTMLSpanElement>(null);

    const checkBoundary = (val, inc: number = 0): number => {
        const currentDefaultMin = a11yDeleteText ? 1 : 0;
        let newValue = parseInt(val, 10) + inc;
        if (isNaN(newValue)) {
            newValue = currentDefaultMin;
        } else if (newValue > max) {
            newValue = max;
        } else if (newValue < min) {
            newValue = min;
        }
        return newValue;
    };

    const handleAnimation = (action: string) => {
        if (!containerRef.current) return;
        
        const el = containerRef.current;
        el.classList.remove(`number-input--increment`);
        el.classList.remove(`number-input--decrement`);
        el.classList.remove(`number-input--increment-disabled`);
        el.classList.remove(`number-input--decrement-disabled`);
        
        // Trigger a reflow to ensure the animation starts
        void el.offsetWidth;
        
        // Add the class for the animation
        el.classList.add(`number-input--${action}`);
    };

    const handleIncrement = (e) => {
        const newValue = checkBoundary(inputValue, 1);
        handleAnimation(newValue >= max ? "increment-disabled" : "increment");
        
        setInputValue(newValue);
        onIncrement(e, { value: newValue });
        onChange(e, { value: newValue });
    };

    const handleDecrement = (e) => {
        const newValue = checkBoundary(inputValue, -1);
        handleAnimation(newValue <= min ? "decrement-disabled" : "decrement");
        
        setInputValue(newValue);
        onDecrement(e, { value: newValue });
        onChange(e, { value: newValue });
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = checkBoundary(e.target.value, 0);
        
        setInputValue(newValue);
        onInputChange(e, { value: newValue });
    };

    // Create wrapper functions for the event handlers
    const handleFocus = (e: React.FocusEvent<HTMLInputElement>, eventProps: { value: string }) => {
        onFocus(e, { value: Number(eventProps.value) });
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>, eventProps: { value: string }) => {
        onBlur(e, { value: Number(eventProps.value) });
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, eventProps: { value: string }) => {
        onKeyDown(e, { value: Number(eventProps.value) });
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, eventProps: { value: string }) => {
        onKeyPress(e, { value: Number(eventProps.value) });
    };

    const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>, eventProps: { value: string }) => {
        onKeyUp(e, { value: Number(eventProps.value) });
    };

    const handleDeleteClick = (e) => {
        onDeleteClick(e, { value: inputValue });
    }

    return (
        <span 
            ref={containerRef}
            className={classNames(`number-input`, className)}
        >
            <EbayTextbox
                type="number"
                min={min}
                max={max}
                value={inputValue}
                onChange={handleInputChange}
                onInputChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                onKeyPress={handleKeyPress}
                onKeyUp={handleKeyUp}
                {...rest}
            >
                <EbayTextboxPrefixIcon>
                    {label && (
                        <label htmlFor={rest.id || "number-input"}>
                            {label}
                        </label>
                    )}

                    {/* Show remove button when greater than min or when a11yDeleteText was not passsed */}
                    { (!a11yDeleteText || (inputValue > min)) && <EbayIconButton
                        disabled={inputValue <= min}
                        size="small"
                        className="number-input__decrement"
                        icon="remove24"
                        onClick={handleDecrement}
                    /> }
            
                    {/* Show delete button when equal to min or when a11yDeleteText is passsed */}
                    { a11yDeleteText && (inputValue === min) && <EbayIconButton
                        size="small"
                        className="number-input__decrement"
                        icon="delete24"
                        onClick={handleDeleteClick}
                    />}
                </EbayTextboxPrefixIcon>
                <EbayTextboxPostfixIcon>
                    <EbayIconButton
                        disabled={inputValue >= max}
                        size="small"
                        className="number-input__increment"
                        icon="add24"
                        onClick={handleIncrement}
                    />
                </EbayTextboxPostfixIcon>
                
            </EbayTextbox>
        </span>
    );
};

export default EbayNumberInput;
