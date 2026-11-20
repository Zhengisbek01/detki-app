import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { students, teacherLessons } from '../../api/mockData';
import { Avatar, Button, Card, Header, Screen, T } from '../../components/ui';
import { useApp } from '../../store/AppStore';
import { colors } from '../../theme';

const stickers = ['💪', '🚀', '🎯', '🤝', '⭐'];

export default function Praise() {
  const { lessonId } = useLocalSearchParams<{ lessonId: string }>();
  const { state, setPraise, sendPraise } = useApp();
  const lesson = teacherLessons.find((l) => l.id === lessonId)!;
  const present = lesson.studentIds.filter((id) => state.attendance[lessonId]?.[id] === 'present');
  const chosen = state.praise[lessonId] ?? {};

  return (
    <Screen>
      <Header title="Похвала группе" back />
      <Text style={[T.meta, { marginBottom: 10 }]}>Выберите стикер тем, кто постарался. Ребёнок увидит его в наградах, родитель получит уведомление.</Text>
      {present.map((sid) => {
        const st = students.find((s) => s.id === sid)!;
        return (
          <Card key={sid}>
            <View style={[T.row, { marginBottom: 10 }]}>
              <Avatar name={st.name} />
              <Text style={T.h3}>{st.name}</Text>
            </View>
            <View style={T.wrap}>
              {stickers.map((e) => (
                <Pressable
                  key={e}
                  onPress={() => setPraise(lessonId, sid, chosen[sid] === e ? null : e)}
                  style={{ width: 48, height: 48, borderRadius: 16, alignItems: 'center', justifyContent: 'center', backgroundColor: chosen[sid] === e ? colors.violet : colors.violetSoft }}
                >
                  <Text style={{ fontSize: 24 }}>{e}</Text>
                </Pressable>
              ))}
            </View>
          </Card>
        );
      })}
      <Button
        title="Отправить похвалу"
        kind="mint"
        onPress={() => {
          sendPraise(lessonId, 'Ерлан Сапаров');
          router.dismissAll();
        }}
      />
    </Screen>
  );
}
