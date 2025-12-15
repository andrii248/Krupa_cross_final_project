import React, { useMemo } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import { useThemeContext } from "../../context/ThemeContext";

export type CartItemProps = {
  item: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  };
  onDecrease: () => void;
  onIncrease: () => void;
  onRemove: () => void;
};

const CartItemComponent: React.FC<CartItemProps> = ({
  item,
  onDecrease,
  onIncrease,
  onRemove,
}) => {
  const { colors } = useThemeContext();

  const totalPrice = useMemo(
    () => item.price * item.quantity,
    [item.price, item.quantity]
  );

  return (
    <View style={[styles.item, { backgroundColor: colors.card }]}>
      <Text style={[styles.itemText, { color: colors.text }]}>
        {item.name} — {item.quantity} x {item.price}$ = {totalPrice}$
      </Text>

      <View style={styles.row}>
        <TouchableOpacity onPress={onDecrease}>
          <Text style={[styles.smallButton, { color: colors.text }]}>-</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onIncrease}>
          <Text style={[styles.smallButton, { color: colors.text }]}>+</Text>
        </TouchableOpacity>

        <Button title="Remove" onPress={onRemove} />
      </View>
    </View>
  );
};

export const CartItem = React.memo(CartItemComponent);

const styles = StyleSheet.create({
  item: {
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 0,
  },
  itemText: { fontSize: 16, marginBottom: 6 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 4,
  },
  smallButton: { fontSize: 20, paddingHorizontal: 8 },
});
