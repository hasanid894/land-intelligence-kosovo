# HARTA – Land Intelligence Kosovo

## 1. Puna e vetme e aplikacionit

Të ndihmojë përdoruesin të identifikojë dhe krahasojë parcelat më të përshtatshme për një investim të caktuar, përmes analizës së kritereve të dokumentuara dhe të dhënave të disponueshme.

## 2. Rrjedha kryesore – 5 ekrane

### Ekrani 1 – Përcaktimi i investimit

Përdoruesi përcakton:

- Llojin e investimit (objekt banesor, qendër tregtare, biznes, shtëpi etj.).
- Komunën ose zonën e preferuar.
- Sipërfaqen minimale të parcelës.
- Buxhetin e disponueshëm.

**Rezultati:** Krijohet një kërkesë e strukturuar që përcakton kriteret për kërkimin dhe vlerësimin e parcelave.

### Ekrani 2 – Kërkimi dhe harta

Aplikacioni paraqet:

- Parcelat që përputhen me kriteret e përdoruesit.
- Pozicionin e parcelave në hartë.
- Filtrat për sipërfaqe, çmim dhe lokacion.
- Informacionet kryesore për secilën parcelë.

**Rezultati:** Përdoruesi identifikon parcelat potencialisht relevante për investimin e tij.

### Ekrani 3 – Detajet e parcelës

Për secilën parcelë shfaqen:

- Lokacioni dhe komuna.
- Sipërfaqja dhe çmimi.
- Qasja në rrugë.
- Informacionet e disponueshme për infrastrukturën.
- Informacionet e disponueshme për destinimin dhe kushtet e përdorimit të tokës.
- Burimi dhe statusi i verifikimit të të dhënave.

**Rezultati:** Përdoruesi shqyrton karakteristikat kryesore të parcelës para analizës së përshtatshmërisë.

### Ekrani 4 – Analiza e përshtatshmërisë

Sistemi:

- Vlerëson parcelën sipas kritereve të përcaktuara për investimin.
- Llogarit një Suitability Score (rezultat të përshtatshmërisë).
- Identifikon avantazhet dhe kufizimet e parcelës.
- Shpjegon faktorët që ndikojnë në rezultatin e saj.
- Përdor AI për interpretimin dhe shpjegimin e rezultateve të strukturuara.

**Rezultati:** Përdoruesi kupton pse një parcelë mund të jetë më e përshtatshme ose më pak e përshtatshme për investimin e planifikuar.

### Ekrani 5 – Krahasimi i parcelave

Përdoruesi:

- Përzgjedh dy parcela për krahasim.
- Krahason çmimin, sipërfaqen dhe karakteristikat kryesore.
- Shqyrton Suitability Score për secilën parcelë.
- Identifikon avantazhet, kufizimet dhe informacionet që kërkojnë verifikim të mëtejshëm.

**Rezultati:** Përdoruesi merr një bazë më të strukturuar për vendimmarrjen paraprake rreth investimit.

## 3. Brenda MVP-së (IN SCOPE)

### Funksionalitetet kryesore

- Regjistrimi dhe autentikimi i përdoruesve.
- Dataset i kufizuar me parcela demonstrative.
- Përcaktimi i llojit të investimit dhe kritereve të kërkimit.
- Kërkimi dhe filtrimi i parcelave.
- Paraqitja e parcelave në hartë.
- Profili me informacione të detajuara për secilën parcelë.
- Analiza e përshtatshmërisë sipas kritereve të dokumentuara.
- Llogaritja e një Suitability Score të shpjegueshëm.
- Identifikimi i avantazheve dhe kufizimeve të parcelave.
- Krahasimi i dy parcelave.
- Funksion AI për interpretimin e kërkesave dhe shpjegimin e rezultateve të analizës.
- Shënimi i burimit dhe statusit të verifikimit të të dhënave.

### Kërkesat teknike

- React Native dhe Expo.
- TypeScript.
- Supabase PostgreSQL për databazën.
- Supabase Authentication për autentikimin.
- Row Level Security (RLS) për sigurinë e të dhënave.
- Supabase Edge Functions për funksionalitetin AI në server.
- Trajtimi i gjendjeve loading, empty, error dhe success.
- Trajtimi i dështimeve të rrjetit dhe të shërbimit AI.
- Testimi në telefon Android dhe përgatitja e APK-së për demonstrim.

## 4. Jashtë MVP-së (OUT OF SCOPE)

Funksionalitete që mund të shqyrtohen për versionet e ardhshme:

- Marketplace i plotë për shitblerjen e tokave.
- Pagesat dhe abonimet brenda aplikacionit.
- Mbulimi i plotë i të gjitha parcelave në Kosovë.
- Integrimet automatike me kadastër dhe institucione publike.
- Verifikimi automatik i dokumenteve ligjore.
- Parashikimi i çmimeve të ardhshme të pronave.
- Analiza e detajuar financiare dhe kthimit të investimit.
- Moduli i tatimeve dhe menaxhimit të pronës.
- Analiza e avancuar e kushteve klimatike dhe rreziqeve gjeologjike.
- Raporte profesionale të certifikuara.
- Integrimet me sistemet e jashtme të agjencive të patundshmërive.

## 5. Kufizimet dhe besueshmëria

Për prototipin do të përdoren të dhëna sintetike (demonstrative), të identifikuara qartë si të tilla.

Suitability Score do të llogaritet sipas kritereve dhe peshave të dokumentuara. Sistemi do të shpjegojë faktorët që ndikojnë në rezultat, në mënyrë që përdoruesi të kuptojë se si është bërë vlerësimi.

AI do të interpretojë dhe shpjegojë të dhënat e strukturuara, por nuk do të gjenerojë karakteristika të paverifikuara të parcelave. Informacionet që mungojnë do të shënohen si të padisponueshme ose për verifikim.

Analiza e përshtatshmërisë është orientuese dhe nuk zëvendëson verifikimin ligjor, urbanistik, kadastral ose profesional.

## 6. Objektivi i MVP-së

Të demonstrojë procesin e plotë nga përcaktimi i një investimi deri te identifikimi, analiza dhe krahasimi i dy parcelave, duke treguar se si analiza e strukturuar e të dhënave dhe inteligjenca artificiale mund të mbështesin vendimmarrjen paraprake për investime në tokë.