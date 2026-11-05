# PROGRES — Land Intelligence Kosovo

**Data:** 05.11.2026  
**Teknologjitë:** React Native, Expo, TypeScript, Supabase/PostgreSQL  
**Ekipi:** Devlete Hasani dhe Erza Osmani

## 1. Misionet e realizuara

### M0 — AGENTS.md

- Është përgatitur skedari `AGENTS.md`, bazuar në dokumentacionin e projektit (`EKIPI.md`, `BISEDAT.md`, `HARTA.md`).
- Dokumenti përshkruan idenë e aplikacionit, përdoruesit, funksionalitetet dhe udhëzimet për zhvillim.

**Statusi: I përgatitur.**

### M1 — Leximi i të dhënave nga Supabase

- Aplikacioni lexon kërkesat ekzistuese nga tabela `public.investment_requests`.
- Kërkesat shfaqen në seksionin **Investment requests**.
- Janë implementuar gjendjet `loading`, `empty`, `error` dhe `retry`.
- Leximi dhe shfaqja e kërkesave janë testuar në telefon fizik Android përmes Expo Go.

**Statusi: Përfunduar dhe verifikuar.**

### M2 — Ruajtja e të dhënave në Supabase

- Formulari mundëson zgjedhjen e llojit të investimit, lokacionit dhe buxhetit.
- Është implementuar validimi i të dhënave.
- Kërkesa ruhet në Supabase përmes kolonave `investment_type`, `location` dhe `budget_eur`.
- Pas ruajtjes, shfaqet mesazhi i suksesit dhe rifreskohet lista e kërkesave.
- Ruajtja është testuar në telefon fizik dhe është konfirmuar në Supabase Table Editor.

**Shembull i verifikuar:**
- Investment type: Residential
- Location: Mitrovica
- Budget: €50,000

**Statusi: Përfunduar dhe verifikuar.**

### M3 — Kërkimi i parcelave nga Supabase

- Ekrani kryesor përdor tabelën `public.parcels` për të marrë rezultatet e kërkimit.
- Parcelat nuk lexohen më nga një listë lokale hardcoded gjatë ekzekutimit.
- Kërkimi përdor filtrat:
  - Komuna (`location`)
  - Sipërfaqja minimale (`area_m2`)
  - Buxheti maksimal (`price_eur`)
  - Të dhënat demonstrative (`is_demo = true`)
- Janë implementuar gjendjet `loading`, `empty`, `error` dhe `retry`.
- Rezultatet identifikohen si `DEMO DATA`.
- `suitability_score` paraqitet vetëm si vlerë ilustrative, jo si vlerësim i verifikuar investimi.
- Nuk është implementuar ende AI scoring.

**Testimi në telefon fizik Android:**

| Testi | Kriteret | Rezultati |
|---|---|---|
| 1 | Mitrovica, 500 m², €50,000 | 2 parcela |
| 2 | Mitrovica, 1,000 m², €50,000 | 1 parcelë |
| 3 | Peja, 2,000 m², €50,000 | 0 parcela |

Të tre skenarët dhanë rezultatet e pritshme. U verifikua edhe shfaqja e mesazhit kur nuk gjenden parcela që përputhen me kriteret.

**Statusi: Implementuar dhe verifikuar funksionalisht me të dhëna sintetike të ruajtura në Supabase.**

## 2. Kontributi i AI Agent

Për implementimin është përdorur **Codex** si AI coding assistant.

Agjenti ka ndihmuar në:
- Integrimin e operacioneve `SELECT` dhe `INSERT` me Supabase.
- Implementimin e filtrimit të parcelave.
- Implementimin e gjendjeve të ndërfaqes dhe trajtimit të gabimeve.
- Validimin e formularit dhe rifreskimin e të dhënave.
- Përditësimin e dokumentacionit teknik.

Implementimi është kontrolluar përmes TypeScript type checking dhe testimit manual në telefon fizik.

## 3. Verifikimi dhe testimi

- `npm.cmd run typecheck` — përfunduar me sukses.
- Hapja e aplikacionit në Android përmes Expo Go — me sukses.
- Leximi i kërkesave nga Supabase — verifikuar.
- Ruajtja e kërkesave në Supabase — verifikuar.
- Konfirmimi i rekordit të ruajtur në Supabase Table Editor — verifikuar.
- Filtrimi i parcelave sipas lokacionit, sipërfaqes dhe buxhetit — verifikuar në tre skenarë.
- Shfaqja e gjendjes bosh për kërkimin e parcelave — verifikuar.

**Testime ende të pakonfirmuara:** buxheti i pavlefshëm, gabimet e rrjetit, funksionaliteti `retry`, sjellja e tastierës dhe testimi në iOS.

## 4. Kufizimet aktuale

- `minimum_area` përdoret për filtrimin e parcelave, por nuk ruhet në tabelën `investment_requests`.
- Parcelat janë sintetike, megjithëse lexohen nga Supabase.
- `suitability_score` është ilustrues dhe nuk përfaqëson analizë reale investimi.
- Politikat aktuale RLS nuk sigurojnë izolim të të dhënave ndërmjet përdoruesve.
- Supabase Authentication dhe politikat RLS specifike për përdoruesit nuk janë implementuar ende.

## 5. Hapat e ardhshëm

1. Përmirësimi i modelit të të dhënave për MVP.
2. Implementimi i Supabase Authentication dhe izolimit të të dhënave.
3. Integrimi i të dhënave të dokumentuara dhe të verifikueshme për parcelat.
