import { create } from "zustand";

export interface CartProduct {
    id: number;
    name: string;
    price: number;
    quantity?: number;
}

interface CartState {
    prevCart: CartProduct[];
    cart: CartProduct[];
    toChange?: CartProduct
    addToCart: (product: CartProduct) => void;
    removeFromCart: (productId: number) => void;
    clearCart: () => void;
    decreaseItemQuantity: (productId: number) => void;
    revert: () => void;
}

const useCartStore = create<CartState>((set) => ({
    cart: [],
    prevCart: [],
    addToCart: (product) => set((state) => {
        const existingProduct = state.cart.find(item => item.id === product.id);
        if (existingProduct) {
            let change: CartProduct = existingProduct;
            change.quantity = (existingProduct.quantity ?? 0) + 1;
            return {
                prevCart: state.cart,
                cart: state.cart.map(item =>
                    item.id === product.id
                        ? change
                        : item
                ),
                toChange: change
            };
        }
        return { 
            prevCart: state.cart,
            cart: [...state.cart, {...product, quantity: 1}], 
            toChange: { ...product, quantity: 1 } 
        };
    }),
    removeFromCart: (productId) => set((state) => {
        let toRemove = state.cart.find(item => item.id === productId);
        return {
            prevCart: state.cart,
            cart: state.cart.filter((item) => item.id !== productId),
            toChange: toRemove && {...toRemove, quantity: 0}
        }
    }),
    decreaseItemQuantity: (productId: number) => set(state => {
        let p = state.cart.find(c => c.id === productId);
        if (!p) return { cart: state.cart, toChange: undefined, prevCart: [] };

        p.quantity = p.quantity ? p.quantity - 1: 0;
        if(p.quantity){
            return { 
                prevCart: state.cart,
                cart: state.cart.map(c => c.id === productId ? p : c),
                toChange: p
            };
        } else {
            return { 
                prevCart: state.cart,
                cart: state.cart.filter((item) => item.id !== productId),
                toChange: p
            };
        }
    }),
    clearCart: () => set({ cart: [] }),
    revert: () => set(state => ({
        prevCart: [],
        cart: state.prevCart,
        toChange: undefined
    }))
}));

export default useCartStore;