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

const backgroundImages = [
  require('../assets/images/baseball.jpg'),
  require('../assets/images/basketball.png'),
  require('../assets/images/football.jpg'),
  require('../assets/images/volleyball.jpg'),
];

export default function Page() {
  const [cart, setCart] = useState<MenuItem[]>([]);
  const [total, setTotal] = useState(0);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const fadeAnim = new Animated.Value(1);
  const [seatNumber, setSeatNumber] = useState('');
  const [backgroundImage, setBackgroundImage] = useState(backgroundImages[0]);

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

  useEffect(() => {
    // Generate a random index based on current timestamp to ensure it changes
    const timestamp = new Date().getTime();
    const randomIndex = Math.floor((timestamp % 1000) / 250); // Will give 0-3
    setBackgroundImage(backgroundImages[randomIndex]);

    // Alternative method using true random
    // const randomIndex = Math.floor(Math.random() * backgroundImages.length);
    // setBackgroundImage(backgroundImages[randomIndex]);

    // Force a re-render on window focus for web platforms
    if (Platform.OS === 'web') {
      const handleFocus = () => {
        const newRandomIndex = Math.floor(Math.random() * backgroundImages.length);
        setBackgroundImage(backgroundImages[newRandomIndex]);
      };

      window.addEventListener('focus', handleFocus);
      return () => window.removeEventListener('focus', handleFocus);
    }
  }, []);

  // Add this new effect to handle refresh
  useEffect(() => {
    if (Platform.OS === 'web') {
      const handleRefresh = () => {
        const newRandomIndex = Math.floor(Math.random() * backgroundImages.length);
        setBackgroundImage(backgroundImages[newRandomIndex]);
      };

      window.addEventListener('load', handleRefresh);
      return () => window.removeEventListener('load', handleRefresh);
    }
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
        source={backgroundImage}
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
            {menuItems.map((item) => (
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
                    <Text style={styles.removeButtonText}>Remove</Text>
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
                placeholder="Seat #"
                value={seatNumber}
                onChangeText={setSeatNumber}
                placeholderTextColor="#666"
              />
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
    padding: 20,
    paddingTop: 0,
    marginTop: 0,
    backgroundColor: '#B2B4B2',
    margin: 20,
    marginHorizontal: '10%',
    maxWidth: 1200,
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
    flex: 2,
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
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    width: '95%',
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
    width: 70,
    height: 70,
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
  },
  cart: {
    flex: 1,
    padding: 15,
    marginLeft: 0,
    marginTop: Platform.OS === 'web' ? 0 : 20,
    backgroundColor: 'transparent',
    borderRadius: 10,
    position: 'relative',
  },
  orderHeaderContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#2D2926',
    padding: 15,
    marginBottom: 80,
    marginHorizontal: -15,
    flex: 1,
    maxHeight: '75%',
    ...Platform.select({
      web: {
        boxShadow: '0 4px 12px rgba(0,0,0,0.2), 0 6px 20px rgba(0,0,0,0.1)',
      },
      default: {
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 6,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
      },
    }),
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
    backgroundColor: 'rgba(255, 198, 41, 0.8)',
    padding: 10,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#2D2926',
    marginBottom: 15,
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
    fontSize: 18,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
    padding: 10,
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
  cartItems: {
    width: '100%',
    marginTop: 10,
    marginBottom: 0,
    maxHeight: '90%',
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f8f9fa',
    marginBottom: 8,
    borderRadius: 8,
    ...Platform.select({
      web: {
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
      },
      default: {
        elevation: 2,
      },
    }),
  },
  cartItemName: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#2D2926',
  },
  cartItemPrice: {
    marginHorizontal: 12,
    fontSize: 15,
    fontWeight: '700',
    color: '#2ecc71',
  },
  removeButton: {
    backgroundColor: '#e74c3c',
    padding: 8,
    borderRadius: 6,
    minWidth: 70,
    alignItems: 'center',
  },
  removeButtonText: {
    color: 'white',
    fontSize: 13,
    fontWeight: '600',
  },
  checkoutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  seatInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#2D2926',
    borderRadius: 5,
    padding: 8,
    width: '45%',
    marginRight: 10,
    fontSize: 16,
    ...Platform.select({
      web: {
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      },
      default: {
        elevation: 2,
      },
    }),
  },
  checkoutButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
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
    padding: 15,
    backgroundColor: 'rgba(255, 198, 41, 0.8)',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#2D2926',
    alignItems: 'center',
    ...Platform.select({
      web: {
        boxShadow: '0 -4px 6px rgba(0,0,0,0.1)',
      },
      default: {
        elevation: 3,
      },
    }),
  },
}); 