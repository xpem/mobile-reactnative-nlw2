import React, { useState, useEffect } from "react";
import { View, ScrollView, Text } from "react-native";
import PageHeader from "../../components/PageHeader";
import TeacherItem, { Teacher } from "../../components/TeacherItem";
import { Feather } from "@expo/vector-icons";
import {
  TextInput,
  BorderlessButton,
  RectButton,
} from "react-native-gesture-handler";
import api from "../../services/api";
import styles from "./styles";
import AsyncStorage from "@react-native-community/async-storage";
import { useFocusEffect } from "@react-navigation/native";

function TeacherList() {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [subject, setSubject] = useState("");
  const [week_day, setWeekDay] = useState("");
  const [time, setTime] = useState("");
  const [teachers, setTeachers] = useState([]);
  const [favorites, setFavorites] = useState<number[]>([]);


  function loadFavorites(){
    AsyncStorage.getItem("favorites").then((resp) => {
      if (resp) {
        const favoritedTeachers = JSON.parse(resp);
        const favoritedTeachersIds = favoritedTeachers.map((teacher: Teacher) => {
          return teacher.id;
        });
        console.log(favoritedTeachersIds);
        setFavorites(favoritedTeachersIds);
      }
    })
  }


  useFocusEffect(() => {
    setTimeout(() => {
      loadFavorites();
    }, 2000);
  });

  // useFocusEffect(() => {
  //   loadFavorites();
  // });
  
  async function handleFiltesSubmit() {
    loadFavorites()
    const resp = await api.get("classes", {
      params: { subject, week_day, time },
    });
    console.log(resp.data);
    setTeachers(resp.data);
    setIsFilterVisible(false);
    // ciencias domingo 2:00
  }

  function handleToggleFilterVisible() {
    setIsFilterVisible(!isFilterVisible);
  }

  return (
    <View>
      <PageHeader
        title="Proffys disponíveis"
        headerRight={
          <BorderlessButton onPress={handleToggleFilterVisible}>
            <Feather name="filter" size={20} color="#fff"></Feather>
          </BorderlessButton>
        }
      >
        {/* condicional de visibilidade do item */}
        {isFilterVisible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>
            <TextInput
              style={styles.input}
              value={subject}
              onChangeText={(text) => setSubject(text)}
              placeholder="Qual a matéria?"
              placeholderTextColor="#c1bccc"
            ></TextInput>
            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da semana</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Qual o dia?"
                  value={week_day}
                  onChangeText={(text) => setWeekDay(text)}
                  placeholderTextColor="#c1bccc"
                ></TextInput>
              </View>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Qual o horário?"
                  value={time}
                  onChangeText={(text) => setTime(text)}
                  placeholderTextColor="#c1bccc"
                ></TextInput>
              </View>
            </View>
            <RectButton
              style={styles.submitButton}
              onPress={handleFiltesSubmit}
            >
              <Text style={styles.submitButtonText}>Filtrar</Text>
            </RectButton>
          </View>
        )}
      </PageHeader>
      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {teachers.map((teacher: Teacher) => {
          return (
            <TeacherItem
              key={teacher.id}
              teacher={teacher}
              favorited={favorites.includes(teacher.id)}
            ></TeacherItem>
          );
        })}
      </ScrollView>
    </View>
  );
}

export default TeacherList;
