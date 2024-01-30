import {cleanup, fireEvent, render, screen, waitFor} from "@testing-library/react";
import CartDialog from "./index";
import {OnCartProductInterface, ProductInterface} from "../../App";
// import test from "node:test";
import {expect, test} from "vitest";

// const products: OnCartProductInterface[] = [
// 	{
// 		name: "apple",
// 		price: 5,
// 		src: "",
// 		howMuch: 4,
// 		description: "",
// 		id: 1
// 	}
// ]

// render(
// 	<CartDialog
// 		onCloseDialog={() => {}}
// 		cartProducts={products}
// 		onRemoveProduct={() => {}}
// 		onAddProduct={() => {}}
// 		numOfProducts={4}
// 		onPay={() => {}}/>
// )

	// const element_userNameInput = screen.getByTestId("userNameInput")
	// const element_distanceInput = screen.getByTestId("distanceInput")
	// const element_datetimeInput = screen.getByTestId("datetimeInput")
	// const element_numOfProducts = screen.getByTestId("numOfProducts")
	// const element_cartPriceSpan = screen.getByTestId("cartPriceSpan")
	// const element_distanceSurcharge = screen.getByTestId("distanceSurcharge")
	// const element_numOfItemsSurcharge = screen.getByTestId("numOfItemsSurcharge")
	// const element_sendingPrice = screen.getByTestId("sendingPrice")

// test("Check the userName input", () => {
// 	fireEvent.change(element_userNameInput, {target: {value: "Javier Vergara"}})
// 	expect(element_userNameInput.value).toBe("Javier Vergara")
// })

describe("<CartDialog />", () => {
	const products:OnCartProductInterface[] = [
		{
			name: "apple",
			price: 5,
			src: "",
			howMuch: 4,
			description: "",
			id: 1
		}
	]

	

	// const element_userNameInput = screen.getByTestId("userNameInput")
	// const element_distanceInput = screen.getByTestId("distanceInput")
	// const element_datetimeInput = screen.getByTestId("datetimeInput")
	// const element_numOfProducts = screen.getByTestId("numOfProducts")
	// const element_cartPriceSpan = screen.getByTestId("cartPriceSpan")
	// const element_distanceSurcharge = screen.getByTestId("distanceSurcharge")
	// const element_numOfItemsSurcharge = screen.getByTestId("numOfItemsSurcharge")
	// const element_sendingPrice = screen.getByTestId("sendingPrice")
	
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
		fireEvent.change(element_userNameInput, {target: {value: "Javier Vergara"}})
		expect(element_userNameInput.value).toBe("Javier Vergara")
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
		
		const element_distanceInput = rootElement.getByTestId("distanceInput")
		fireEvent.change(element_distanceInput, {target: {value: "2235"}})
		expect(parseInt(element_distanceInput.value!)).toBe(2235)
	})

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
		expect(element_datetimeInput.value).toEqual("2024-01-23T06:50")
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

	test("Check distance surcharge", async () => {
		const rootElement = render(
			<CartDialog
				onCloseDialog={() => {}}
				cartProducts={products}
				onRemoveProduct={() => { }}
				onAddProduct={() => { }}
				numOfProducts={4}
				onPay={() => { }} />
		)
		
		const element_distanceInput = rootElement.getByTestId("distanceInput")
		const element_distanceSurcharge = rootElement.getByTestId("distanceSurcharge")
		
		fireEvent.change(element_distanceInput, {target: {value: "2235"}})
		
		await waitFor(() => {
			expect(parseInt(element_distanceSurcharge.textContent!)).toBe(5)
		})
	})

	test("Check number of items surcharge", () => {
		const rootElement = render(
			<CartDialog
				onCloseDialog={() => {}}
				cartProducts={products}
				onRemoveProduct={() => { }}
				onAddProduct={() => { }}
				numOfProducts={4}
				onPay={() => { }} />
		)
		const element_numOfItemsSurcharge = rootElement.getByTestId("numOfItemsSurcharge")
		expect(parseInt(element_numOfItemsSurcharge.textContent!)).toEqual(0)
	})

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
