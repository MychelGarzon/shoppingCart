import { fireEvent, render, waitFor} from "@testing-library/react";
import CartDialog from "../components/CartDialog/cartDialog";
import {OnCartProductInterface} from "../App";
import {expect, test} from "vitest";



describe("<CartDialog />", () => {
	const products:OnCartProductInterface[] = [
		{
			name: "apple",
			price: 5,
			src: "",
			howManyProducts: 4,
			description: "",
			id: 1
		}
	]


	test("check uraper to be truhthy", () => {
		const rootElement = render(
			<CartDialog
				onCloseDialog={() => {}}
				cartProducts={products}
				onRemoveProduct={() => { }}
				onAddProduct={() => { }}
				numOfProducts={4}
				onPay={() => { }} />
		)
		
		expect(rootElement).toBeTruthy()
	})

	test("Check the userName input", () => {
		const rootElement = render(
			<CartDialog
				onCloseDialog={() => {}}
				cartProducts={products}
				onRemoveProduct={() => { }}
				onAddProduct={() => { }}
				numOfProducts={4}
				onPay={() => { }} />
		)
		
		
		const element_userNameInput = rootElement.getByTestId("userNameInput")
		fireEvent.change(element_userNameInput, {target: {value: "Mychel Garzon"}})
		expect((element_userNameInput as HTMLInputElement).value).toBe("Mychel Garzon");
	})

	test("Check the distance input", async () => {
		const rootElement = render(
			<CartDialog
				onCloseDialog={() => {}}
				cartProducts={products}
				onRemoveProduct={() => { }}
				onAddProduct={() => { }}
				numOfProducts={4}
				onPay={() => { }} />
		)
		
		const element_distanceInput = rootElement.getByTestId(
			"distanceInput"
		) as HTMLInputElement; 
		fireEvent.change(element_distanceInput, { target: { value: "2235" } });
		expect(parseInt(element_distanceInput.value)).toBe(2235);
		});

	test("Check the dateTime input", () => {
		const rootElement = render(
			<CartDialog
				onCloseDialog={() => {}}
				cartProducts={products}
				onRemoveProduct={() => { }}
				onAddProduct={() => { }}
				numOfProducts={4}
				onPay={() => { }} />
		)
		
		const element_datetimeInput = rootElement.getByTestId("datetimeInput")
		
		fireEvent.change(element_datetimeInput, {target: {value: "2024-01-23T06:50"}})
		expect((element_datetimeInput as HTMLInputElement).value).toEqual("2024-01-23T06:50");
	})

	test("Check the num of products", () => {
		const rootElement = render(
			<CartDialog
				onCloseDialog={() => {}}
				cartProducts={products}
				onRemoveProduct={() => { }}
				onAddProduct={() => { }}
				numOfProducts={4}
				onPay={() => { }} />
		)
		
		const element_numOfProducts = rootElement.getByTestId("numOfProducts")
		expect(parseInt(element_numOfProducts.textContent!)).toEqual(4)
	})

	test("Check the cart value", () => {
		const rootElement = render(
			<CartDialog
				onCloseDialog={() => {}}
				cartProducts={products}
				onRemoveProduct={() => { }}
				onAddProduct={() => { }}
				numOfProducts={4}
				onPay={() => { }} />
		)
		
		const element_cartPriceSpan = rootElement.getByTestId("cartPriceSpan")
		expect(parseInt(element_cartPriceSpan.textContent!)).toEqual(20)
	})

	test("Check distance Extra-Cost", async () => {
		const rootElement = render(
			<CartDialog
				onCloseDialog={() => {}}
				cartProducts={products}
				onRemoveProduct={() => {}}
				onAddProduct={() => {}}
				numOfProducts={4}
				onPay={() => {}}
			/>
		);
	
		const element_distanceInput = rootElement.getByTestId("distanceInput");
		const element_distanceExtra_Cost = rootElement.getByTestId("distanceExtra-Cost");
	
		fireEvent.change(element_distanceInput, { target: { value: "2235" } });
	
		await waitFor(() => {
			expect(parseInt(element_distanceExtra_Cost.textContent!)).toBe(5);
		});
	});
	
	test("Check number of items Extra-Cost", () => {
		const rootElement = render(
			<CartDialog
				onCloseDialog={() => {}}
				cartProducts={products}
				onRemoveProduct={() => {}}
				onAddProduct={() => {}}
				numOfProducts={4}
				onPay={() => {}}
			/>
		);
		const element_numOfItemsExtra_Cost = rootElement.getByTestId("numOfItemsExtra-Cost");
		expect(parseInt(element_numOfItemsExtra_Cost.textContent!)).toEqual(0);
	});
	
	test("Check the sending price", async () => {
		const rootElement = render(
			<CartDialog
				onCloseDialog={() => {}}
				cartProducts={products}
				onRemoveProduct={() => { }}
				onAddProduct={() => { }}
				numOfProducts={4}
				onPay={() => { }} />
		)
		
		const element_sendingPrice = rootElement.getByTestId("sendingPrice")
		const element_distanceInput = rootElement.getByTestId("distanceInput")
		
		fireEvent.change(element_distanceInput, {target: {value: "2235"}})
		
		await waitFor(() => {
			expect(parseInt(element_sendingPrice.textContent!)).toEqual(5)
		})
		
	})

	test("Check the total price", async () => {
		const rootElement = render(
			<CartDialog
				onCloseDialog={() => {}}
				cartProducts={products}
				onRemoveProduct={() => { }}
				onAddProduct={() => { }}
				numOfProducts={4}
				onPay={() => { }} />
		)
		
		const element_totalPrice = rootElement.getByTestId("totalPrice")
		const element_distanceInput = rootElement.getByTestId("distanceInput")
		
		fireEvent.change(element_distanceInput, {target: {value: "2235"}})
		
		await waitFor(() => {
			expect(parseInt(element_totalPrice.textContent!)).toEqual(25)
		})
		
	})
})
