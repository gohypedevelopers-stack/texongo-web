import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  gsm: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  isCartOpen: boolean;
  addItem: (product: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: (open?: boolean) => void;
  getTotalPrice: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isCartOpen: false,
      
      addItem: (product, quantity = 1) => {
        const currentItems = get().items;
        const existingItem = currentItems.find((item) => item.id === product.id);

        if (existingItem) {
          set({
            items: currentItems.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
            isCartOpen: true,
          });
        } else {
          set({
            items: [...currentItems, { ...product, quantity }],
            isCartOpen: true,
          });
        }
      },

      toggleCart: (open) => set({ isCartOpen: open ?? !get().isCartOpen }),

      removeItem: (id) => {
        set({
          items: get().items.filter((item) => item.id !== id),
        });
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set({
          items: get().items.map((item) =>
            item.id === id ? { ...item, quantity } : item
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },

      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: 'texongo-cart-storage',
    }
  )
);

export interface Order {
  id: string;
  date: string;
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  items: CartItem[];
}

interface AuthStore {
  isLoggedIn: boolean;
  isAuthModalOpen: boolean;
  user: {
    name: string;
    email: string;
  } | null;
  orders: Order[];
  login: (email: string, name: string) => void;
  logout: () => void;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  addOrder: (order: Order) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      isAuthModalOpen: false,
      user: null,
      orders: [
        {
          id: "ORD-7721",
          date: "2024-03-15",
          total: 12500,
          status: "Delivered",
          items: [
            { id: "1", name: "Cotton Spandex Single Jersey", price: 450, image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=800", gsm: "180", quantity: 20 }
          ]
        },
        {
          id: "ORD-9902",
          date: "2024-04-02",
          total: 8200,
          status: "Shipped",
          items: [
            { id: "2", name: "Viscose Spandex Interlock", price: 580, image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=800", gsm: "220", quantity: 15 }
          ]
        }
      ],

      login: (email: string, name: string) => set({ 
        isLoggedIn: true, 
        user: { email, name },
        isAuthModalOpen: false 
      }),
      
      logout: () => set({ isLoggedIn: false, user: null }),
      
      openAuthModal: () => set({ isAuthModalOpen: true }),
      
      closeAuthModal: () => set({ isAuthModalOpen: false }),

      addOrder: (order) => set((state) => ({ 
        orders: [order, ...state.orders] 
      }))
    }),
    {
      name: 'texongo-auth-storage',
    }
  )
);
