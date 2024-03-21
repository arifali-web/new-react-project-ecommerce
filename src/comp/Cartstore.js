import { create } from 'zustand'

const useCartStore = create((set) => ({
    cart: [],

    total: 0,

    calculateTotal: (cart) => cart.reduce((total, item) => total + item.price * item.quantity, 0),


    addToCart: (product, quantity = 1) => set((state) => {
        const existingProduct = state.cart.find((item) => item.id === product.id);

        if (existingProduct) {
            const updatedCart = state.cart.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
            );
            const updatedTotal = useCartStore.getState().calculateTotal(updatedCart);
            return { cart: updatedCart, total: updatedTotal };
        }
        else {
            const updatedCart = [...state.cart, { ...product, quantity }];
            const updatedTotal = state.total + product.price * quantity;
            return { cart: updatedCart, total: updatedTotal };
        }
    }),

    increaseQuantity: (productId, quantity = 1) =>
        set((state) => {
            const updatedCart = state.cart.map((item) =>
                item.id === productId ? { ...item, quantity: item.quantity + quantity } : item
            );
            const updatedTotal = useCartStore.getState().calculateTotal(updatedCart);

            return { cart: updatedCart, total: updatedTotal };
        }),

    decreaseQuantity: (productId, quantity = 1) =>
        set((state) => {
            const updatedCart = state.cart.map((item) =>
                item.id === productId ? { ...item, quantity: Math.max(0, item.quantity - quantity) } : item
            );

            const ZeroQuantity = updatedCart.filter(
                (item) => item.quantity > 0
            );

            const updatedTotal = useCartStore.getState().calculateTotal(
                ZeroQuantity
            );

            // const updatedTotal = useCartStore.getState().calculateTotal(updatedCart);

            return { cart: ZeroQuantity, total: updatedTotal };
        }),

    removeFromCart: (productId) =>
        set((state) => {
            const removedProduct = state.cart.find((item) => item.id === productId);
            const updatedTotal = state.total - removedProduct.price * removedProduct.quantity;

            return {
                cart: state.cart.filter((item) => item.id !== productId),
                total: updatedTotal,
            };
        }),

    removeallprodcut: () => set({ cart: [], total: 0 })


}));

export default useCartStore;
