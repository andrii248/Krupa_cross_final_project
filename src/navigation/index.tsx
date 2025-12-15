import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HeaderButton, Text } from "@react-navigation/elements";
import {
  createStaticNavigation,
  StaticParamList,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import { Login } from "./screens/Login";
import { Home } from "./screens/Home";
import { Profile } from "./screens/Profile";
import { Settings } from "./screens/Settings";
import { TripsScreen } from "./screens/Updates";
import { NotFound } from "./screens/NotFound";
import { TripDetails } from "./screens/TripDetails";
import { BORDER_COLOR, MUTED_TEXT, PRIMARY_BLUE } from "../theme/colors";
import { CartScreen } from "./screens/CartScreen";

// Bottom tab navigator: Home / Trips / Regulations / Account
const HomeTabs = createBottomTabNavigator({
  screens: {
    // Home tab – dashboard / main screen
    Home: {
      screen: Home,
      options: {
        title: "Home",
        tabBarIcon: ({ color, size }) => (
          // home icon
          <Ionicons name="home-outline" size={size} color={color} />
        ),
      },
    },

    // Trips tab – trip flow (location search, details, payment)
    Trips: {
      screen: TripsScreen,
      options: {
        title: "Trips",
        tabBarIcon: ({ color, size }) => (
          // history / notes icon
          <Ionicons name="reader-outline" size={size} color={color} />
        ),
      },
    },

    // Regulations tab – states regulations screen
    Regulations: {
      screen: Settings,
      options: {
        title: "Regulations",
        tabBarIcon: ({ color, size }) => (
          // law / document icon
          <Ionicons name="document-text-outline" size={size} color={color} />
        ),
      },
    },

    // Account tab – account / settings screen
    Account: {
      screen: Profile,
      options: {
        title: "Account",
        tabBarIcon: ({ color, size }) => (
          // user icon
          <Ionicons name="person-outline" size={size} color={color} />
        ),
      },
    },

    // // Cart screen
    // Cart: {
    //   screen: CartScreen,
    //   options: { title: "Cart" },
    // },
  },
  screenOptions: {
    tabBarActiveTintColor: PRIMARY_BLUE,
    tabBarInactiveTintColor: MUTED_TEXT,
    headerTitleAlign: "center",
    tabBarStyle: {
      height: 64,
      borderTopWidth: 1,
      borderTopColor: BORDER_COLOR,
    },
    tabBarLabelStyle: {
      fontSize: 12,
    },
  },
});

// Root stack with login + tabs + extra screens
const RootStack = createNativeStackNavigator({
  screens: {
    Login: {
      screen: Login,
      options: { headerShown: false },
    },
    HomeTabs: {
      screen: HomeTabs,
      options: {
        title: "Home",
        headerShown: false,
      },
    },
    TripDetails: {
      screen: TripDetails,
      options: {
        title: "Trip details",
      },
    },

    Cart: {
      screen: CartScreen,
      options: { title: "Cart" },
    },

    Profile: {
      screen: Profile,
      linking: {
        path: ":user(@[a-zA-Z0-9-_]+)",
        parse: {
          user: (value) => value.replace(/^@/, ""),
        },
        stringify: {
          user: (value) => `@${value}`,
        },
      },
    },
    Settings: {
      screen: Settings,
      options: ({ navigation }) => ({
        presentation: "modal",
        headerRight: () => (
          <HeaderButton onPress={navigation.goBack}>
            <Text>Close</Text>
          </HeaderButton>
        ),
      }),
    },
    NotFound: {
      screen: NotFound,
      options: {
        title: "404",
      },
      linking: {
        path: "*",
      },
    },
  },
});

// Export navigation object used in App.tsx
export const Navigation = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
