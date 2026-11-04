# Gigdar: Fikir Özeti ve Feature Listesi

Board: docs/board/index.html (veri: docs/board/board-data.js)

## Problem & Fikir
- Vizyon: metal ile başla, temel oturunca diğer tüm müzik türlerine ölçekle.
- Metal dinleyicisi için yakına hangi grupların geldiğini derli toplu gösteren bir yer yok; ya grubun tur sayfasına ya da şehir şehir bakmak gerekiyor.
- Çözüm: tür, alt tür, grup ve bölgeye göre filtrelenen, alakalı bir şey olunca haber veren platform. Etkinliğe basınca bilet sitesine yönlendirme.
- Felsefe: "her şeyi gösteren algoritma" değil, kullanıcının seçimlerine göre çalışan odaklı yapı.

## Rakipler
- Bandsintown: takip et, şehir seç, bildirim al işini en iyi yapan; 80M+ kullanıcı. Sanatçı odaklı. Bölge: tek şehir + en fazla 150 mil (~240 km) yarıçap; çoklu şehir bildirimi ve ülke katmanı yok (diğer şehirler sadece manuel aranabiliyor). Tür etiketleri kaba, alt tür katmanı yok. Bandsintown for Artists ile menajerler tur tarihi girip takipçilere (konuma göre hedefli) mesaj atabiliyor.
- Songkick: eskiden standarttı, artık zayıf; uyarılar güvenilmez.
- Günlük uygulamaları (Concert Archives, Gigvault, Banded): geçmiş konser günlüğü. Kullanıcılar gelecek ve geçmiş için ayrı app kullanıyor.
- Gigora vb.: binlerce metal konserini tür, şehir, tarihe göre listeliyor; sadece listeleme farklılaştırıcı değil.
- Fırsat: gelecek konser uyarısı + geçmiş konser günlüğü + metal topluluğu tek yerde.

## Farklılaştırıcılar
1. Alt tür taksonomisi (atmospheric black, OSDM, sludge...).
2. Bölge katmanları, sınır ötesi şehirler dahil (Münih: Salzburg, Viyana, Zürih, Prag).
3. Dijital Battle Vest: gidilen her konser bir patch.
- Ek öneri: "en fazla X saat yol giderim" seçeneği; önerilen şehirlerde tren/araba süresi.

## Riskler & Açık Sorular
- Veri kaynağı: Ticketmaster açık API; Bandsintown/Songkick erişimi kısıtlı.
- Küçük kulüp konserleri dağınık (mekan siteleri, Instagram, Facebook).
- Muhtemel veri modeli: API'lar + organizatör/grup girişi + topluluk katkısı.
- Alt tür etiketleri nereden gelecek (MusicBrainz, küratörlük).
- Sosyal ağ ayrı bir ürün: moderasyon, GDPR, boş akış sorunu.
- Gelir modeli: freemium (ücretsiz: ana şehir + ana şehre gelen grup bildirimleri; premium ~1 $/ay veya ~10 $/yıl: ek şehirler, ek lokasyon bildirimleri, tur anonsları, tür uyarıları, "bilet satışa çıktı" uyarısı, takvim) + bilet affiliate + B2B. Detay: docs/mvp-spec.md bölüm 11.

## Platform
- Uygulama: Expo (React Native) + TypeScript. iOS ve Android, ileride aynı koddan web (menajer paneli).
- Ad: Gigdar (kodda tek bir yerden okunur).
- Backend: Supabase (Postgres + PostGIS, Auth, Storage, Edge Functions).
- Deneme sürümü: TestFlight + Google Play dahili test.
- Çalışma şekli: backend kararlarını Claude verir; ürünü, maliyeti, veri kaynaklarını veya hukuki konuları etkileyen kararlar birlikte verilir.

## Fikirler (tartışılıyor)
- Grup ve tür verisi için Metal Archives (Encyclopaedia Metallum). Resmi açık API'ı yok; kullanım koşulları ve izin netleştirilmeli, mümkünse doğrudan iletişime geçilmeli.
- Platformu grup menajerlerine açmak: doğrulanmış menajer/grup hesapları tur tarihlerini kendisi girer; ileride doğrudan haber/duyuru yayınlama.
- Tren/araba süreleri: bölge haritası tasarlandı (docs/mvp-spec.md bölüm 2); ilk sürümde kuş uçuşu mesafe, yol süresi sonra. Veri notu: Google Routes API teknik olarak uygun ama kalıcı önbellekleme koşulları kısıtlı; şehirler arası sabit tablo için OpenStreetMap tabanlı (araba) ve demiryolu açık verisi (tren) alternatifleri araştırılacak.

## Backlog (kenarda)
- Keşfet: grupların yüklediği 3-5 şarkılık havuzdan tür seçerek ya da sevilen türlerden shuffle ile rastgele şarkı dinleme (detay: docs/mvp-spec.md Backlog).
- Resmi grup hesapları için davetle doğrulama: grup hesap açmak isterse ekipten biri kanıt görüp davet gönderir (kanıt resmi kanaldan olabilir).
- Metal Archives iş birliği.
- Menajer paneli.

## Feature Listesi

### MVP
Ekran ekran detaylı tanım, kararlar, öneriler ve açık sorular: **docs/mvp-spec.md** (tek doğru kaynak).

Özet: Giriş & Profil (kayıtsız hesap) · Bölge Haritası (dokunma + halka, edit mode ve onay) · Türler (ağaç + sıralama) · Gruplar (arama, topluluk / resmi sayfa, sahiplenme formu) · Etkinlikler (Akış + Gideceklerim, NE / NEREDE filtreleri) · Gazete · Bildirim (zil) · Bilet yönlendirme · Veri hattı · test için "Planned to be a paid feature" etiketi.

### v2: Profil & Arkadaşlar
- Konser günlüğü ("katıldım")
- Battle Vest: patch/badge'ler
- Arkadaş ekleme / takipleşme
- "Kim gidiyor?": gidiyorum / ilgileniyorum
- Türlere göre gruplar ve insanlar keşfet
- Yıllık konser özeti (Spotify Wrapped tarzı, paylaşılabilir)
- Festival planlayıcı? (sahne programı, çakışma bulucu; henüz kesin değil)

### v3: İçerik & Topluluk
- Post paylaşma, kronolojik algoritmasız akış
- Fotoğraf paylaşma
- Mesajlaşma
- Haber paylaşan profiller
- Moderasyon araçları
