import React, { Component } from "react";
import { SectionList, StyleSheet, Text, View } from "react-native";
import Card from "./Card";

export default class SectionListBasics extends Component {
  render() {
    return (
      <View style={styles.container}>
        <SectionList
          sections={[
            {
              title: "D",
              data: [
                {
                  marque: "Doroto",
                  description: "Pour l'achat d'un pneu acheté, pneu offert !",
                  codePromo: "XCFTYUHJ.9876567",
                  reduction: "50",
                  symbole: "%",
                },
                {
                  marque: "Doroto",
                  description: "Pour l'achat d'un pneu, pneu offert !",
                  codePromo: "XCFTYUHJ.9876567",
                  reduction: "50",
                  symbole: "%",
                },
                {
                  marque: "Doroto",
                  description: "Pour l'achat d'un pneu, pneu offert !",
                  codePromo: "XCFTYUHJ.9876567",
                  reduction: "50",
                  symbole: "%",
                },
                {
                  marque: "Doroto",
                  description: "Pour l'achat d'un pneu, pneu offert !",
                  codePromo: "XCFTYUHJ.9876567",
                  reduction: "50",
                  symbole: "%",
                },
                {
                  marque: "Doroto",
                  description: "Pour l'achat d'un pneu, pneu offert !",
                  codePromo: "XCFTYUHJ.9876567",
                  reduction: "50",
                  symbole: "%",
                },
                {
                  marque: "Doroto",
                  description: "Pour l'achat d'un pneu, pneu offert !",
                  codePromo: "XCFTYUHJ.9876567",
                  reduction: "50",
                  symbole: "%",
                },
              ],
            },
            {
              title: "J",
              data: [
                {
                  marque: "Jeau Paul Vautier",
                  description:
                    "Pour l'achat d'un parfum, 20 € de reduction immediate !",
                  codePromo: "KJH.8728E629",
                  reduction: "20",
                  symbole: "€",
                },
                {
                  marque: "Jeau Paul Vautier",
                  description:
                    "Pour l'achat d'un parfum, 20 € de reduction immediate !",
                  codePromo: "KJH.8728E629",
                  reduction: "20",
                  symbole: "€",
                },
                {
                  marque: "Jeau Paul Vautier",
                  description:
                    "Pour l'achat d'un parfum, 20 € de reduction immediate !",
                  codePromo: "KJH.8728E629",
                  reduction: "20",
                  symbole: "€",
                },
                {
                  marque: "Jeau Paul Vautier",
                  description:
                    "Pour l'achat d'un parfum, 20 € de reduction immediate !",
                  codePromo: "KJH.8728E629",
                  reduction: "20",
                  symbole: "€",
                },
                {
                  marque: "Jeau Paul Vautier",
                  description:
                    "Pour l'achat d'un parfum, 20 € de reduction immediate !",
                  codePromo: "KJH.8728E629",
                  reduction: "20",
                  symbole: "€",
                },
                {
                  marque: "Jeau Paul Vautier",
                  description:
                    "Pour l'achat d'un parfum, 20 € de reduction immediate !",
                  codePromo: "KJH.8728E629",
                  reduction: "20",
                  symbole: "€",
                },
                {
                  marque: "Jeau Paul Vautier",
                  description:
                    "Pour l'achat d'un parfum, 20 € de reduction immediate !",
                  codePromo: "KJH.8728E629",
                  reduction: "20",
                  symbole: "€",
                },
                {
                  marque: "Jeau Paul Vautier",
                  description:
                    "Pour l'achat d'un parfum, 20 € de reduction immediate !",
                  codePromo: "KJH.8728E629",
                  reduction: "20",
                  symbole: "€",
                },
                {
                  marque: "Jeau Paul Vautier",
                  description:
                    "Pour l'achat d'un parfum, 20 € de reduction immediate !",
                  codePromo: "KJH.8728E629",
                  reduction: "20",
                  symbole: "€",
                },
              ],
            },
          ]}
          renderItem={({ item }) => (
            <Card>
              <Text>
                {item.marque} - {item.reduction} {item.symbole}
              </Text>
            </Card>
          )}
          renderSectionHeader={({ section }) => (
            <Text style={styles.sectionHeader}>{section.title}</Text>
          )}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: "bold",
    backgroundColor: "rgba(247,247,247,1.0)",
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
