import React from "react";
import { StyleSheet, View } from "react-native";
import * as PropTypes from "prop-types";

const styles = StyleSheet.create({
  card: {
    borderRadius: 6,
    elevation: 3,
    backgroundColor: "#fff",
    shadowOffset: {
      width: 1,
      height: 1
    },
    shadowColor: "#333",
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 6
  },
  cardContent: {
    marginHorizontal: 80,
    marginVertical: 30
  }
});

export default function Card(props) {
  const { children } = props;
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>{children}</View>
    </View>
  );
}

Card.propTypes = {
  children: PropTypes.node.isRequired
};
