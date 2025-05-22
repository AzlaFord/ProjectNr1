import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  
  setProducts: (products) => set({ products }), 
  
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
        imagine: newProduct.imageUrl,
      }),
    });

    const data = await response.json();
    set((state) => ({
      products: [...state.products, data.data],
    }));

    return { success: true, message: "Product created successfully" };
  },

  fetchProducts: async () => {
    const response = await fetch("/api/products");
    const data = await response.json();
    set({ products: data.data });
  },

    deleteProduct: async (id) => {
        const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
        });
        const data = await response.json();
        if (!data.success) {
        return { success: false, message: "Failed to delete product" };
        }
        set((state) => ({
        products: state.products.filter((product) => product._id !== id),
        }));
        return { success: true, message: "Product deleted successfully" };
    },

        updateProduct: async (id, data) => {
    try {
        const res = await fetch(`/api/products/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        });

        const result = await res.json();

        if (res.ok) {
        set((state) => ({
            products: state.products.map((product) =>
            product._id === id ? { ...product, ...data } : product
            ),
        }));
        }

        return {
        success: res.ok,
        message: result.message || "Updated",
        };
    } catch (err) {
        return { success: false, message: "Failed to update product." };
    }
    },

}));
