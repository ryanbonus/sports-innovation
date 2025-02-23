import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
  Animated,
  TextInput,
} from 'react-native';

interface MenuItem {
  id: number;
  name: string;
  price: number;
  image: any;
  description: string;
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: 'Hot Dog',
    price: 5.99,
    image: require('../assets/images/hotdog.jpg'),
    description: 'Classic ballpark hot dog with your choice of toppings',
  },
  {
    id: 2, 
    name: 'Cotton Candy',
    price: 4.99,
    image: require('../assets/images/cotton-candy.jpg'),
    description: 'Sweet and fluffy cotton candy',
  },
  {
    id: 3,
    name: 'Popcorn',
    price: 6.99,
    image: require('../assets/images/popcorn.jpg'),
    description: 'Fresh buttered popcorn',
  },
  {
    id: 4,
    name: 'Pizza Slice',
    price: 7.99,
    image: require('../assets/images/pizza.jpg'),
    description: 'Hot and cheesy pizza slice with your choice of toppings',
  },
  {
    id: 5,
    name: 'Hamburger',
    price: 8.99,
    image: require('../assets/images/burger.jpg'),
    description: 'Juicy quarter-pound burger with lettuce, tomato, and cheese',
  },
  {
    id: 6,
    name: 'Soda',
    price: 3.99,
    image: require('../assets/images/soda.jpg'),
    description: 'Ice-cold fountain drink, free refills',
  },
  {
    id: 7,
    name: 'Peanuts',
    price: 4.50,
    image: require('../assets/images/peanuts.jpg'),
    description: 'Classic ballpark roasted peanuts in the shell',
  },
  
  {
    id: 8,
    name: 'Nachos',
    price: 6.99,
    image: require('../assets/images/nachos.jpg'),
    description: 'Crispy tortilla chips with warm cheese sauce and jalapeños',
  },
  {
    id: 10,
    name: 'Scrappys Fried Chicken',
    price: 6.99,
    image: require('../assets/images/Chicken.jpg'),
    description: 'Fried Chicken from the commons',
  },
  {
    id: 11,
    name: 'Starbucks Coffee',
    price: 10.99,
    image: require('../assets/images/Starbucks.jpg'),
    description: 'Starbucks Coffee from the commons',
  },
  {
    id: 12,
    name: 'Panda Express',
    price: 10.99,
    image: require('../assets/images/Panda Express.jpg'),
    description: 'Panda Express from the commons',
  },
  {
    id: 13,
    name: 'Chick-fil-A',
    price: 15.99,
    image: require('../assets/images/Chick-fil-A.jpg'),
    description: 'Chick-fil-A from the commons',
  },
];

export default function Page() {
  const [cart, setCart] = useState<MenuItem[]>([]);
  const [total, setTotal] = useState(0);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const fadeAnim = new Animated.Value(1);
  const [seatNumber, setSeatNumber] = useState('');

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0.2,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    const timer = setTimeout(() => {
      setShowScrollIndicator(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const showScrollHint = () => {
    setShowScrollIndicator(true);
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0.2,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Hide after 3 seconds
    setTimeout(() => {
      setShowScrollIndicator(false);
    }, 3000);
  };

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
    if (!seatNumber.trim()) {
      alert('Please enter your seat number');
      return;
    }
    alert(`Thank you for your order!\nTotal: $${total.toFixed(2)}\nDelivery to seat: ${seatNumber}\nExpected delivery wait: 10 minutes`);
    setCart([]);
    setTotal(0);
    setSeatNumber('');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/Basketball.jpg')}
        style={styles.headerBackground}
      />
      <View style={styles.headerContainer}>
        <View style={styles.headerContent}>
          <Text style={styles.header}>STADIUM CONCESSIONS</Text>
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.menuContainer}>
          {showScrollIndicator && (
            <Animated.View style={[styles.scrollIndicator, { opacity: fadeAnim }]}>
              <Text style={styles.scrollText}>⬇ Scroll to see more ⬇</Text>
            </Animated.View>
          )}
          <ScrollView 
            style={styles.menuList}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.menuListTitle}>Menu</Text>
            {menuItems.map((item, index) => (
              <View key={item.id} style={styles.menuItem}>
                <Image
                  style={styles.itemImage}
                  source={item.image}
                />
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemDescription}>{item.description}</Text>
                  <Text style={styles.itemPrice}>{item.price.toFixed(2)}</Text>
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
        </View>

        <View style={styles.cart}>
          <View style={styles.orderHeaderContainer}>
            <View style={styles.cartTitleContainer}>
              <Text style={styles.cartHeader}>Your Order</Text>
            </View>
            <ScrollView 
              style={styles.cartItems}
              showsVerticalScrollIndicator={false}
            >
              {cart.map((item, index) => (
                <View key={index} style={styles.cartItem}>
                  <Text style={styles.cartItemName}>{item.name}</Text>
                  <Text style={styles.cartItemPrice}>{item.price.toFixed(2)}</Text>
                  <TouchableOpacity
                    onPress={() => removeFromCart(index)}
                    style={styles.removeButton}
                  >
                    <Text style={styles.removeButtonText}>×</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          </View>
          
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total: ${total.toFixed(2)}</Text>
            <View style={styles.checkoutRow}>
              <TextInput
                style={styles.seatInput}
                placeholder="Enter Seat #"
                value={seatNumber}
                onChangeText={setSeatNumber}
                placeholderTextColor="#666"
              />
              <TouchableOpacity 
                style={styles.checkoutButton}
                onPress={handleCheckout}
              >
                <Text style={styles.buttonText}>Check Out</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingTop: 0,
    position: 'relative',
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    flexDirection: Platform.OS === 'web' ? 'row-reverse' : 'column',
    padding: Platform.OS === 'web' ? 20 : 10,
    marginTop: 0,
    backgroundColor: '#B2B4B2',
    margin: Platform.OS === 'web' ? 20 : 10,
    marginHorizontal: Platform.OS === 'web' ? '10%' : '5%',
    maxWidth: Platform.OS === 'web' ? 1200 : '100%',
    alignSelf: 'center',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#2D2926',
    ...Platform.select({
      web: {
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
      },
      default: {
        elevation: 3,
      },
    }),
  },
  header: {
    fontSize: 24,
    fontWeight: '900',
    textAlign: 'center',
    padding: 10,
    color: '#2D2926',
    textTransform: 'uppercase',
    letterSpacing: 1,
    zIndex: 1,
    ...Platform.select({
      web: {
        textShadow: '1px 1px 2px rgba(255,255,255,0.5)',
      },
      default: {
        // Add alternative styling for mobile if needed
      },
    }),
  },
  menuContainer: {
    flex: Platform.OS === 'web' ? 2 : 1,
    position: 'relative',
  },
  menuList: {
    flex: 2,
    backgroundColor: 'rgba(255, 198, 41, 0.8)',
    padding: 15,
    paddingBottom: 0,
    margin: 15,
    marginBottom: 0,
    marginLeft: Platform.OS === 'web' ? 10 : 15,
    marginRight: 5,
    maxWidth: '99%',
    alignSelf: 'flex-end',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#2D2926',
    ...Platform.select({
      web: {
        boxShadow: '0 4px 8px rgba(0,0,0,0.2), 0 6px 20px rgba(0,0,0,0.1)',
      },
      default: {
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
      },
    }),
  },
  menuItem: {
    flexDirection: 'row',
    padding: Platform.OS === 'web' ? 8 : 6,
    marginBottom: Platform.OS === 'web' ? 10 : 8,
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: '#2D2926',
    ...Platform.select({
      web: {
        boxShadow: '0 4px 8px rgba(0,0,0,0.2), 0 6px 20px rgba(0,0,0,0.1)',
      },
      default: {
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
      },
    }),
  },
  itemImage: {
    width: Platform.OS === 'web' ? 70 : 60,
    height: Platform.OS === 'web' ? 70 : 60,
    borderRadius: 8,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 8,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemDescription: {
    fontSize: 12,
    color: '#666',
    marginVertical: 4,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2ecc71',
  },
  addButton: {
    backgroundColor: '#2ecc71',
    padding: 6,
    borderRadius: 5,
    marginTop: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 2,
  },
  cart: {
    flex: Platform.OS === 'web' ? 1 : 0.8,
    padding: Platform.OS === 'web' ? 15 : 10,
    marginLeft: 0,
    marginTop: Platform.OS === 'web' ? 0 : 10,
    position: 'relative',
    height: Platform.OS === 'web' ? 'auto' : '80%',
  },
  orderHeaderContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#2D2926',
    padding: 15,
    marginBottom: Platform.OS === 'web' ? 80 : 140,
    marginHorizontal: -15,
    flex: Platform.OS === 'web' ? 1 : 0.7,
    maxHeight: Platform.OS === 'web' ? '75%' : '45%',
    height: 'auto',
    overflow: 'auto',
  },
  menuListTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2D2926',
    backgroundColor: '#FFFFFF',
    padding: 10,
    marginBottom: 15,
    marginHorizontal: 10,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#2D2926',
    ...Platform.select({
      web: {
        boxShadow: '0 4px 8px rgba(0,0,0,0.2), 0 6px 20px rgba(0,0,0,0.1)',
      },
      default: {
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
      },
    }),
  },
  cartTitleContainer: {
    padding: Platform.OS === 'web' ? 10 : 8,
    marginBottom: Platform.OS === 'web' ? 15 : 10,
    backgroundColor: 'rgba(255, 198, 41, 0.8)',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#2D2926',
    ...Platform.select({
      web: {
        boxShadow: '0 4px 8px rgba(0,0,0,0.2), 0 6px 20px rgba(0,0,0,0.1)',
      },
      default: {
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
      },
    }),
  },
  cartHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2D2926',
  },
  totalText: {
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginBottom: 8,
    backgroundColor: '#FFFFFF',
    padding: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#2D2926',
  },
  cartItems: {
    flex: 1,
    width: '100%',
    marginTop: 10,
    marginBottom: Platform.OS === 'web' ? 0 : 20,
    maxHeight: Platform.OS === 'web' ? '90%' : '100%',
    overflow: 'scroll',
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f8f9fa',
    marginBottom: 4,
    borderRadius: 4,
  },
  cartItemName: {
    flex: 1,
    fontSize: 12,
    fontWeight: '600',
    color: '#2D2926',
  },
  cartItemPrice: {
    marginHorizontal: 6,
    fontSize: 12,
    fontWeight: '700',
    color: '#2ecc71',
  },
  removeButton: {
    backgroundColor: '#e74c3c',
    padding: 4,
    borderRadius: 50,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    lineHeight: 12,
  },
  checkoutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: 6,
    marginBottom: 6,
    flexWrap: 'wrap',
    gap: 8,
  },
  seatInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#2D2926',
    borderRadius: 4,
    padding: 8,
    width: '45%',
    fontSize: 14,
    textAlign: 'center',
    height: 35,
  },
  checkoutButton: {
    backgroundColor: '#3498db',
    padding: 8,
    borderRadius: 4,
    width: '45%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#2D2926',
    height: 35,
  },
  headerContainer: {
    paddingHorizontal: 0,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    height: 200,
    marginBottom: 0,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '60%',
    backgroundColor: 'rgba(241, 230, 178, 0.9)',
    borderRadius: 10,
    padding: 5,
    zIndex: 1,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    ...Platform.select({
      web: {
        boxShadow: '0 0 0 1px rgba(128, 128, 128, 0.3)',
      },
      default: {
        borderWidth: 3,
        borderColor: 'rgba(128, 128, 128, 0.3)',
      },
    }),
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    opacity: 1,
    resizeMode: 'cover',
    zIndex: -1,
  },
  scrollIndicator: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    zIndex: 1000,
    alignItems: 'center',
    pointerEvents: 'none',
  },
  scrollText: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    color: '#fff',
    padding: 8,
    borderRadius: 20,
    fontSize: 14,
    overflow: 'hidden',
  },
  totalContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    paddingBottom: Platform.OS === 'web' ? 10 : 15,
    backgroundColor: '#ffc629',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2D2926',
    alignItems: 'center',
    height: Platform.OS === 'web' ? 'auto' : 100,
  },

}); 