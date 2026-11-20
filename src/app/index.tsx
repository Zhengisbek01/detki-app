import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { api } from '../api/client';
import { Button, Card, Chip, Input, Screen, T, Toast, useToast } from '../components/ui';
import { useApp } from '../store/AppStore';
import { colors } from '../theme';
import { roleTitles } from '../roles';
import type { Lang, Role } from '../types';

const L: Record<Lang, { w: string; c: string; s: string }> = {
  ru: { w: 'Добро пожаловать!', c: 'Выберите язык', s: 'Секции и кружки рядом с домом' },
  kk: { w: 'Қош келдіңіз!', c: 'Тілді таңдаңыз', s: 'Үйге жақын үйірмелер мен секциялар' },
  en: { w: 'Welcome!', c: 'Choose language', s: 'Clubs and classes near home' },
};


export default function Onboarding() {
  const { state, ready, setLang, login } = useApp();
  const [step, setStep] = useState<'phone' | 'code'>('phone');
  const [phone, setPhone] = useState('+7 ');
  const [code, setCode] = useState('');
  const [c1, setC1] = useState(true);
  const [c2, setC2] = useState(true);
  const [role, setRole] = useState<Role>('parent');
  const [loading, setLoading] = useState(false);
  const [toast, show] = useToast();

  useEffect(() => {
    if (ready && state.onboarded) router.replace(`/${state.role}`);
  }, [ready, state.onboarded, state.role]);

  if (!ready || state.onboarded) {
    return <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><ActivityIndicator color={colors.violet} /></View>;
  }
  const l = L[state.lang];

  const sendCode = async () => {
    if (!c1) return show('Нужно согласие на обработку персональных данных');
    setLoading(true);
    const r = await api.sendSmsCode(phone);
    setLoading(false);
    if (!r.ok) return show('Проверьте номер телефона');
    setStep('code');
    show('Код отправлен (демо: любые 4 цифры)');
  };

  const verify = async () => {
    setLoading(true);
    const r = await api.verifySmsCode(phone, code);
    setLoading(false);
    if (!r.ok) return show('Введите 4 цифры');
    login(phone, role);
    router.replace(`/${role}`);
  };

  return (
    <Screen blob="violet">
      <View style={{ alignItems: 'center', marginTop: 24, marginBottom: 20 }}>
        <Text style={{ fontSize: 72 }}>🎒</Text>
        <Text style={[T.h2, { fontSize: 26, textAlign: 'center', marginTop: 8 }]}>{l.w}</Text>
        <Text style={[T.meta, { fontSize: 15 }]}>{l.s}</Text>
      </View>

      <Text style={[T.meta, { marginBottom: 8 }]}>{l.c}</Text>
      <View style={[T.wrap, { marginBottom: 16 }]}>
        {(['kk', 'ru', 'en'] as Lang[]).map((x) => (
          <Chip key={x} label={{ kk: 'Қазақша', ru: 'Русский', en: 'English' }[x]} on={state.lang === x} onPress={() => setLang(x)} />
        ))}
      </View>

      {step === 'phone' ? (
        <>
          <Input label="Номер телефона" keyboardType="phone-pad" value={phone} onChangeText={setPhone} />
          <Text style={[T.meta, { marginBottom: 8 }]}>Войти как (демо)</Text>
          <View style={[T.wrap, { marginBottom: 12 }]}>
            {(Object.keys(roleTitles) as Role[]).map((r) => (
              <Chip key={r} label={`${roleTitles[r].e} ${roleTitles[r].t}`} on={role === r} onPress={() => setRole(r)} />
            ))}
          </View>
          <Card>
            <Check on={c1} onPress={() => setC1(!c1)} text="Согласие на сбор и обработку персональных данных (Закон РК «О персональных данных и их защите»)" />
            <Check on={c2} onPress={() => setC2(!c2)} text="Согласие на обработку данных ребёнка законным представителем" />
          </Card>
          <Button title="Получить код" onPress={sendCode} loading={loading} />
        </>
      ) : (
        <>
          <Input label={`Код из SMS на ${phone}`} keyboardType="number-pad" maxLength={4} value={code} onChangeText={setCode} placeholder="••••" />
          <Button title="Войти" onPress={verify} loading={loading} />
          <Button title="Изменить номер" kind="ghost" onPress={() => setStep('phone')} />
        </>
      )}
      <Toast text={toast} />
    </Screen>
  );
}

function Check({ on, onPress, text }: { on: boolean; onPress: () => void; text: string }) {
  return (
    <Pressable onPress={onPress} style={[T.row, { alignItems: 'flex-start', paddingVertical: 6 }]}>
      <View style={{ width: 24, height: 24, borderRadius: 8, backgroundColor: on ? colors.violet : colors.line, alignItems: 'center', justifyContent: 'center' }}>
        {on && <Text style={{ color: '#fff', fontWeight: '900' }}>✓</Text>}
      </View>
      <Text style={[T.text, { flex: 1, fontSize: 13 }]}>{text}</Text>
    </Pressable>
  );
}
