# Dizzy Shop — Mini App (mijozlar uchun)

Faqat mijozlar ko'radigan qism. **Admin panel bu yerda yo'q** — admin butunlay Telegram botda (`/admin`).

## Bo'limlar

🏠 Bosh sahifa — banner, yangi/mashhur/chegirmadagi mahsulotlar
🛍️ Katalog — 6 ta bo'lim (Kiyim, Anime, Gaming, Streetwear, Poyabzal, Aksessuar) + qidiruv
❤️ Sevimlilar
🛒 Savat — demo buyurtma berish
👤 Profil — buyurtmalar tarixi, qo'llanma (bot admin tomonidan tahrirlanadi)

Birinchi ochilishda qisqa tanishtiruv ekrani chiqadi (matni ham bot admin panelidan tahrirlanadi).

## O'rnatish

```bash
cd web
npm install
cp .env.example .env
# .env: VITE_API_BASE_URL — backend API manzili
npm run dev
```

## Build va Vercelga deploy

```bash
npm run build
```

Vercelda:
1. Yangi loyiha oching, shu `web/` papkani ulang (Framework: Vite).
2. Environment Variable qo'shing: `VITE_API_BASE_URL=https://sizning-api-domeningiz.com/api`
3. Deploy qiling — Vercel sizga link beradi (masalan `https://dizzy-shop.vercel.app`).
4. Shu linkni bot `.env` faylidagi `WEBAPP_URL`ga qo'ying va botni qayta ishga tushiring.
5. @BotFather → sizning bot → Bot Settings → Menu Button (yoki Mini App) → shu linkni ulang.

## Muhim

- Bu ilova hech qanday admin funksiyasini o'zida saqlamaydi.
- Barcha ma'lumot (mahsulot, chegirma, qo'llanma matni) backend API orqali keladi va bot admin panelidan o'zgaradi.
- Foydalanuvchi identifikatsiyasi Telegram `initData` orqali serverda tekshiriladi — frontend hech qachon "men shu ID man" deb o'zidan xabar bermaydi.
