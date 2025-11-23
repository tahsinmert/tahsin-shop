export interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

class CartStore {
  items = $state<CartItem[]>([]);
  isOpen = $state(false);

  totalItems = $derived(
    this.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  totalPrice = $derived(
    this.items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  );

  addItem(product: Omit<CartItem, 'quantity'>) {
    const existingItem = this.items.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.items.push({ ...product, quantity: 1 });
    }
  }

  removeItem(id: number) {
    this.items = this.items.filter(item => item.id !== id);
  }

  updateQuantity(id: number, quantity: number) {
    const item = this.items.find(item => item.id === id);
    if (item) {
      if (quantity <= 0) {
        this.removeItem(id);
      } else {
        item.quantity = quantity;
      }
    }
  }

  clearCart() {
    this.items = [];
  }

  openCart() {
    this.isOpen = true;
  }

  closeCart() {
    this.isOpen = false;
  }

  toggleCart() {
    this.isOpen = !this.isOpen;
  }
}

export const cart = new CartStore();

