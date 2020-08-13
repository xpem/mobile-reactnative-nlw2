import React, { useState, useEffect } from "react";
import { View } from "react-native";
import styles from "./styles";
import PageHeader from "../../components/PageHeader";
import { ScrollView } from "react-native-gesture-handler";
import TeacherItem, { Teacher } from "../../components/TeacherItem";
import AsyncStorage from "@react-native-community/async-storage";
import { useFocusEffect } from "@react-navigation/native";

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  async function loadFavorites() {
    console.log("leituras de favoritos");
    AsyncStorage.getItem("favorites").then((resp) => {
      if (resp) {
        const favoritedTeachers = JSON.parse(resp);

        setFavorites(favoritedTeachers);
      }
    });
  }

  useFocusEffect(() => {
    setTimeout(() => {
      loadFavorites();
    }, 2000);
  });

  return (
    <View>
      <PageHeader title="Meus proffys favoritos"></PageHeader>
      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {favorites.map((teacher: Teacher) => {
          return (
            <TeacherItem
              key={teacher.id}
              teacher={teacher}
              favorited
            ></TeacherItem>
          );
        })}
      </ScrollView>
    </View>
  );
}

export default Favorites;
