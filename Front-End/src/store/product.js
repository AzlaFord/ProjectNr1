import {create} from "zustand";


export const useProductStore = create((set) => ({
    products : [],
    setProducts : (products) => set({ products }), 
    createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.imageUrl) {
        return { success: false, message: "Please fill all fields" };
    }

    const response = await fetch("/api/products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: newProduct.name,
            price: newProduct.price,
            imagine: newProduct.imageUrl,  // corect
        }),
    });

    const data = await response.json();
    set(state => ({
        products: [...state.products, data.data]
    }));

    return { success: true, message: "Product created successfully" };
}

}))
