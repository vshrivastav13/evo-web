import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import EbayNumberInput from "../number-input";

describe("given a number input textbox", () => {
    let onChange: jest.Mock;
    let onIncrement: jest.Mock;
    let onDecrement: jest.Mock;

    beforeEach(() => {
        onChange = jest.fn();
        onIncrement = jest.fn();
        onDecrement = jest.fn();
    });

    describe("when increment is pressed", () => {
        beforeEach(async () => {
            render(<EbayNumberInput value={1} onChange={onChange} onIncrement={onIncrement} />);
            const buttons = screen.getAllByRole("button");
            const incrementButton = buttons.find((btn) => btn.className.includes("number-input__increment"));
            await fireEvent.click(incrementButton!);
        });

        it("should increment the value", () => {
            expect(onChange).toHaveBeenCalledWith(expect.anything(), { value: 2 });
        });

        it("should trigger increment event", () => {
            expect(onIncrement).toHaveBeenCalledWith(expect.anything(), { value: 2 });
        });
    });

    describe("when decrement is pressed", () => {
        beforeEach(async () => {
            render(<EbayNumberInput value={2} onChange={onChange} onDecrement={onDecrement} />);
            const buttons = screen.getAllByRole("button");
            const decrementButton = buttons.find((btn) => btn.className.includes("number-input__decrement"));
            await fireEvent.click(decrementButton!);
        });

        it("should decrement the value", () => {
            expect(onChange).toHaveBeenCalledWith(expect.anything(), { value: 1 });
        });

        it("should trigger decrement event", () => {
            expect(onDecrement).toHaveBeenCalledWith(expect.anything(), { value: 1 });
        });
    });
});

describe("given a number input textbox with delete", () => {
    let onChange: jest.Mock;
    let onIncrement: jest.Mock;
    let onDecrement: jest.Mock;

    beforeEach(() => {
        onChange = jest.fn();
        onIncrement = jest.fn();
        onDecrement = jest.fn();
    });

    describe("when increment is pressed", () => {
        beforeEach(async () => {
            render(
                <EbayNumberInput
                    value={1}
                    min={1}
                    a11yDeleteText="Delete item"
                    onChange={onChange}
                    onIncrement={onIncrement}
                />,
            );
            const buttons = screen.getAllByRole("button");
            const incrementButton = buttons.find((btn) => btn.className.includes("number-input__increment"));
            await fireEvent.click(incrementButton!);
        });

        it("should increment the value and hide delete button", async () => {
            expect(onChange).toHaveBeenCalledWith(expect.anything(), { value: 2 });
        });

        it("should trigger increment event", () => {
            expect(onIncrement).toHaveBeenCalledWith(expect.anything(), { value: 2 });
        });
    });

    describe("when decrement is pressed", () => {
        beforeEach(async () => {
            render(
                <EbayNumberInput
                    value={2}
                    min={1}
                    a11yDeleteText="Delete item"
                    onChange={onChange}
                    onDecrement={onDecrement}
                />,
            );
            const buttons = screen.getAllByRole("button");
            const decrementButton = buttons.find((btn) => btn.className.includes("number-input__decrement"));
            await fireEvent.click(decrementButton!);
        });

        it("should decrement the value", () => {
            expect(onChange).toHaveBeenCalledWith(expect.anything(), { value: 1 });
        });

        it("should trigger decrement event", () => {
            expect(onDecrement).toHaveBeenCalledWith(expect.anything(), { value: 1 });
        });
    });
});

describe("given a number input textbox with constraints", () => {
    let onChange: jest.Mock;
    let onIncrement: jest.Mock;
    let onDecrement: jest.Mock;

    beforeEach(() => {
        onChange = jest.fn();
        onIncrement = jest.fn();
        onDecrement = jest.fn();
    });

    describe("when increment is pressed at max value", () => {
        beforeEach(async () => {
            render(<EbayNumberInput max={10} min={1} value={10} onChange={onChange} onIncrement={onIncrement} />);
            const buttons = screen.getAllByRole("button");
            const incrementButton = buttons.find((btn) => btn.className.includes("number-input__increment"));
            await fireEvent.click(incrementButton!);
        });

        it("should not change the value", () => {
            expect(onChange).not.toHaveBeenCalled();
        });

        it("should not trigger increment event", () => {
            expect(onIncrement).not.toHaveBeenCalled();
        });
    });

    describe("when decrement is pressed", () => {
        beforeEach(async () => {
            render(<EbayNumberInput max={10} min={1} value={10} onChange={onChange} onDecrement={onDecrement} />);
            const buttons = screen.getAllByRole("button");
            const decrementButton = buttons.find((btn) => btn.className.includes("number-input__decrement"));
            await fireEvent.click(decrementButton!);
        });

        it("should decrement the value", () => {
            expect(onChange).toHaveBeenCalledWith(expect.anything(), { value: 9 });
        });

        it("should trigger decrement event", () => {
            expect(onDecrement).toHaveBeenCalledWith(expect.anything(), { value: 9 });
        });
    });
});
