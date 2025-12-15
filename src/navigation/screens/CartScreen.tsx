import React, { useCallback, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  Platform,
  UIManager,
  LayoutAnimation,
} from "react-native";
import { useThemeContext } from "../../context/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
} from "../../store/cartSlice";
import { CartItem } from "./CartItem";
import { PRIMARY_BLUE } from "../../theme/colors";

const MOCK_PERMITS = [
  {
    id: "permit-il-ca-001",
    name: "Oversize permit IL → CA",
    price: 150,
  },
  {
    id: "permit-tx-nv-002",
    name: "Overweight permit TX → NV",
    price: 145,
  },
  {
    id: "permit-ny-fl-003",
    name: "Overweight permit NY → FL",
    price: 340,
  },
  {
    id: "permit-wa-or-004",
    name: "Oversize permit WA → OR",
    price: 40,
  },
  {
    id: "permit-ca-az-005",
    name: "Overweight permit CA → AZ",
    price: 105,
  },
] as const;

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const getRandomPermit = () => {
  const index = Math.floor(Math.random() * MOCK_PERMITS.length);
  return MOCK_PERMITS[index];
};

export const CartScreen: React.FC = () => {
  const { colors } = useThemeContext();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const items = useAppSelector((state) => state.cart.items);

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const handleAddPermit = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    dispatch(addItem(getRandomPermit()));
  }, [dispatch]);

  const makeDecrease = useCallback(
    (itemId: string, currentQty: number) => () => {
      dispatch(
        updateQuantity({
          id: itemId,
          quantity: Math.max(1, currentQty - 1),
        })
      );
    },
    [dispatch]
  );

  const makeIncrease = useCallback(
    (itemId: string, currentQty: number) => () => {
      dispatch(
        updateQuantity({
          id: itemId,
          quantity: currentQty + 1,
        })
      );
    },
    [dispatch]
  );

  const makeRemove = useCallback(
    (itemId: string) => () => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      dispatch(removeItem(itemId));
    },
    [dispatch]
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Cart (permits)</Text>

      <Button title="Add random permit" onPress={handleAddPermit} />

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <CartItem
            item={item}
            onDecrease={makeDecrease(item.id, item.quantity)}
            onIncrease={makeIncrease(item.id, item.quantity)}
            onRemove={makeRemove(item.id)}
          />
        )}
        ListEmptyComponent={
          <Text style={[styles.empty, { color: colors.mutedText }]}>
            Cart is empty
          </Text>
        }
      />

      <View
        style={[
          styles.footer,
          {
            borderTopColor: colors.border,
          },
        ]}
      >
        <Text style={[styles.total, { color: colors.text }]}>
          Total: {total}$
        </Text>
        <Button
          title="Clear cart"
          onPress={() => dispatch(clearCart())}
          color={PRIMARY_BLUE}
        />
        <View style={{ height: 8 }} />
        <Button title="Back" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 12 },
  listContent: { marginTop: 16 },
  empty: { textAlign: "center", marginTop: 24, fontSize: 16 },
  footer: {
    marginTop: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingTop: 12,
  },
  total: { fontSize: 18, fontWeight: "600", marginBottom: 8 },
});
