import { router } from 'expo-router';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { categories } from '../../api/mockData';
import { Button, Card, Chip, Header, Input, Screen, Section, T } from '../../components/ui';
import { PLATFORM_COMMISSION } from '../../services/finance';
import { useApp } from '../../store/AppStore';

export default function NewClass() {
  const { addClass } = useApp();
  const [name, setName] = useState('');
  const [cat, setCat] = useState('Спорт');
  const [age, setAge] = useState('6–10 лет');
  const [format, setFormat] = useState<'Офлайн' | 'Онлайн'>('Офлайн');
  const [langs, setLangs] = useState<string[]>(['Русский']);
  const [address, setAddress] = useState('');
  const [days, setDays] = useState('');
  const [price, setPrice] = useState('3000');

  const toggleLang = (l: string) => setLangs((p) => (p.includes(l) ? p.filter((x) => x !== l) : [...p, l]));
  const category = categories.find((c) => c.name === cat)!;

  const submit = () => {
    addClass({
      emoji: category.emoji, color: category.color, name, teacherId: 't1', teacherName: 'Ерлан Сапаров', legalForm: 'ИП',
      age, address: format === 'Онлайн' ? 'Онлайн' : address, distance: '—', price: Number(price), days, category: cat,
      seats: '12 мест', seatsStatus: 'ok', lang: langs.join('/'), description: '',
    });
    router.back();
  };

  return (
    <Screen>
      <Header title="Новое занятие" back />
      <Card style={{ alignItems: 'center', borderWidth: 2, borderStyle: 'dashed', borderColor: '#D7D3EA', backgroundColor: 'transparent', shadowOpacity: 0 }}>
        <Text style={{ fontSize: 34 }}>📷</Text>
        <Text style={T.h3}>Добавить фото</Text>
        <Text style={T.meta}>до 6 фото зала и занятий (expo-image-picker)</Text>
      </Card>
      <Input label="Название" value={name} onChangeText={setName} placeholder="Каратэ для начинающих" />
      <Section title="Категория" />
      <View style={T.wrap}>{categories.slice(1).map((c) => <Chip key={c.name} label={`${c.emoji} ${c.name}`} on={cat === c.name} onPress={() => setCat(c.name)} />)}</View>
      <Section title="Возраст · формат" />
      <View style={T.wrap}>
        {['3–5 лет', '6–10 лет', '8–12 лет', '12–16 лет'].map((a) => <Chip key={a} label={a} on={age === a} onPress={() => setAge(a)} />)}
        {(['Офлайн', 'Онлайн'] as const).map((f) => <Chip key={f} label={f} on={format === f} onPress={() => setFormat(f)} />)}
      </View>
      <Section title="Язык занятия" />
      <View style={[T.wrap, { marginBottom: 12 }]}>{['Русский', 'Қазақша', 'English'].map((l) => <Chip key={l} label={l} on={langs.includes(l)} onPress={() => toggleLang(l)} />)}</View>
      {format === 'Офлайн' && <Input label="Адрес" value={address} onChangeText={setAddress} placeholder="Есиль, Сыганак 18" />}
      <Input label="Дни и время" value={days} onChangeText={setDays} placeholder="Пн, Ср, Пт · 17:00" />
      <Input label="Цена разового занятия, ₸" keyboardType="number-pad" value={price} onChangeText={setPrice} />
      <Text style={T.meta}>Комиссия платформы {PLATFORM_COMMISSION * 100}% удерживается с каждой оплаты.</Text>
      <Button title="Отправить на модерацию" disabled={!name || !days || !Number(price)} onPress={submit} />
      <Text style={[T.meta, { textAlign: 'center' }]}>Ответ модератора — до 2 рабочих дней</Text>
    </Screen>
  );
}
