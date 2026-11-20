import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { classes, students, teacherLessons } from '../../api/mockData';
import { Avatar, Button, Card, Header, Screen, T } from '../../components/ui';
import { useApp } from '../../store/AppStore';
import { colors } from '../../theme';
import type { Attendance as Att } from '../../types';

const opts: { v: Att; label: string; bg: string }[] = [
  { v: 'present', label: '✓', bg: colors.mint },
  { v: 'absent', label: '✕', bg: colors.coral },
  { v: 'sick', label: '🤒', bg: colors.sun },
];

export default function Attendance() {
  const { lessonId } = useLocalSearchParams<{ lessonId: string }>();
  const { state, markAttendance, markAllPresent } = useApp();
  const lesson = teacherLessons.find((l) => l.id === lessonId)!;
  const c = classes.find((x) => x.id === lesson.classId)!;
  const att = state.attendance[lessonId] ?? {};
  const done = lesson.studentIds.filter((id) => att[id]).length;

  return (
    <Screen>
      <Header title="Посещаемость" subtitle={`${c.name} · ${lesson.time}`} back />
      <Text style={[T.meta, { marginBottom: 10 }]}>Отмечено {done} из {lesson.studentIds.length}. Пришедшие получат +10 ⭐. Болезнь не ломает серию.</Text>
      {lesson.studentIds.map((sid) => {
        const st = students.find((s) => s.id === sid)!;
        return (
          <Card key={sid}>
            <View style={T.row}>
              <Avatar name={st.name} />
              <Text style={[T.h3, { flex: 1 }]}>{st.name}</Text>
              {opts.map((o) => (
                <Pressable
                  key={o.v}
                  onPress={() => markAttendance(lessonId, sid, o.v)}
                  style={{ width: 40, height: 40, borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: att[sid] === o.v ? o.bg : colors.line }}
                >
                  <Text style={{ color: att[sid] === o.v ? '#fff' : colors.muted, fontWeight: '900' }}>{o.label}</Text>
                </Pressable>
              ))}
            </View>
          </Card>
        );
      })}
      <Button title="Все пришли" kind="ghost" onPress={() => markAllPresent(lessonId, lesson.studentIds)} />
      <Button title="Дальше: похвалить группу" kind="mint" disabled={done < lesson.studentIds.length} onPress={() => router.push({ pathname: '/teacher/praise', params: { lessonId } })} />
    </Screen>
  );
}
