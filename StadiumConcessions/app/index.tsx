import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';

interface MenuItem {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: 'Hot Dog',
    price: 5.99,
    image: 'https://picsum.photos/seed/hotdog/200/200',
    description: 'Classic ballpark hot dog with your choice of toppings',
  },
  {
    id: 2, 
    name: 'Cotton Candy',
    price: 4.99,
    image: 'https://picsum.photos/seed/cottoncandy/200/200',
    description: 'Sweet and fluffy cotton candy',
  },
  {
    id: 3,
    name: 'Popcorn',
    price: 6.99,
    image: 'https://picsum.photos/seed/popcorn/200/200',
    description: 'Fresh buttered popcorn',
  },
];

export default function Page() {
  const [cart, setCart] = useState<MenuItem[]>([]);
  const [total, setTotal] = useState(0);

  const addToCart = (item: MenuItem) => {
    setCart([...cart, item]);
    setTotal(total + item.price);
  };

  const removeFromCart = (index: number) => {
    const newCart = [...cart];
    setTotal(total - newCart[index].price);
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const handleCheckout = () => {
    // TODO: Implement checkout logic
    alert('Thank you for your order! Total: $' + total.toFixed(2));
    setCart([]);
    setTotal(0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Stadium Concessions</Text>
      
      <View style={styles.content}>
        <ScrollView style={styles.menuList}>
          {menuItems.map((item) => (
            <View key={item.id} style={styles.menuItem}>
              <Image
                style={styles.itemImage}
                source={{ uri: item.image }}
              />
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDescription}>{item.description}</Text>
                <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => addToCart(item)}
                >
                  <Text style={styles.buttonText}>Add to Cart</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={styles.cart}>
          <Text style={styles.cartHeader}>Your Order</Text>
          <ScrollView style={styles.cartItems}>
            {cart.map((item, index) => (
              <View key={index} style={styles.cartItem}>
                <Text style={styles.cartItemName}>{item.name}</Text>
                <Text style={styles.cartItemPrice}>${item.price.toFixed(2)}</Text>
                <TouchableOpacity
                  onPress={() => removeFromCart(index)}
                  style={styles.removeButton}
                >
                  <Text style={styles.removeButtonText}>Remove</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total: ${total.toFixed(2)}</Text>
            <TouchableOpacity 
              style={styles.checkoutButton}
              onPress={handleCheckout}
            >
              <Text style={styles.buttonText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'web' ? 20 : 50,
  },
  content: {
    flex: 1,
    flexDirection: Platform.OS === 'web' ? 'row' : 'column',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20,
    textAlign: 'center',
  },
  menuList: {
    flex: 2,
  },
  menuItem: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    ...Platform.select({
      web: {
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      },
      default: {
        elevation: 2,
      },
    }),
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 15,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
    marginVertical: 5,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2ecc71',
  },
  addButton: {
    backgroundColor: '#2ecc71',
    padding: 8,
    borderRadius: 5,
    marginTop: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cart: {
    flex: 1,
    padding: 15,
    borderLeftWidth: Platform.OS === 'web' ? 1 : 0,
    borderTopWidth: Platform.OS === 'web' ? 0 : 1,
    borderColor: '#eee',
    marginLeft: Platform.OS === 'web' ? 20 : 0,
    marginTop: Platform.OS === 'web' ? 0 : 20,
  },
  cartHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cartItems: {
    maxHeight: 200,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  cartItemName: {
    flex: 1,
  },
  cartItemPrice: {
    marginHorizontal: 10,
  },
  removeButton: {
    backgroundColor: '#e74c3c',
    padding: 5,
    borderRadius: 5,
  },
  removeButtonText: {
    color: 'white',
    fontSize: 12,
  },
  totalContainer: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    width: 120,
    alignItems: 'center',
  },
}); 