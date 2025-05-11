import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import LoginPage from "../components/pages/Login";
import Todo from "../components/pages/Todo";
import Icon from 'react-native-vector-icons/FontAwesome';
import RegisterScreen from "../components/pages/Register";
import Setting from "../components/pages/Setting";
import ForgotPasswordScreen from "../components/pages/ForgotPassword";
import { useAuth } from "../context/AuthContext";
import { createDrawerNavigator } from '@react-navigation/drawer';
import MapScreen from "../components/pages/Map";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export const AppNavigation = () => {
    const { user, authLoading } = useAuth();

    if (authLoading) return null; // hoặc splash screen

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {user ? (
                    <Stack.Screen name="inapp" component={InappNavigation} />
                ) : (
                    <Stack.Screen name="auth" component={AuthNavigation} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const AuthNavigation = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="login" component={LoginPage} />
            <Stack.Screen name="register" component={RegisterScreen} />
            <Stack.Screen name="resetPassword" component={ForgotPasswordScreen} />
        </Stack.Navigator>
    );
}

const InappNavigation = () => {
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
                let iconName = "";
                if (route.name === "Todo") {
                    iconName = "list";
                }
                if (route.name === "Map") {
                    iconName = "map";
                }
                if (route.name === "Profile") {
                    iconName = "user";
                }
                if (route.name === "Setting") {
                    iconName = "gear";
                }
                return <Icon name={iconName} color={color} size={20} />
            },
            tabBarActiveTintColor: "#38B78D",
            tabBarInactiveTintColor: "gray"
        })}>
            <Tab.Screen name="Todo" component={Todo} />
            <Tab.Screen name="Map" component={MapScreen}/>
            <Tab.Screen name="Setting"  component={Setting}/> 
            <Tab.Screen name="Profile" component={DrawerTab} options={{headerShown: false}}/>
        </Tab.Navigator>
    );
}

function DrawerTab() {
    return (
      <Drawer.Navigator>
        <Drawer.Screen name="Todo" component={Todo} />
        <Drawer.Screen name="Setting" component={Setting} />
      </Drawer.Navigator>
    );
}