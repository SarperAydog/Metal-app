# MVP Spesifikasyonu

Bu doküman MVP'nin ekran ekran tanımıdır ve **ne inşa edileceğine dair tek doğru kaynaktır**. Kaynak: Sarper ile yapılan tasarım konuşmaları (son güncelleme 2026-11-04). Board: docs/board/index.html. Aşamalar ve hatırlatmalar: docs/roadmap.md

Etiketler:
- **[Karar]**: Sarper onayladı, uygulanabilir.
- **[Öneri]**: Claude önerisi, Sarper henüz açıkça onaylamadı. Uygulamadan önce sor.
- **[Açık soru]**: Cevap bekleniyor. Uygulamadan önce sor.

---

## 0. Navigasyon
- [Karar] Alt sekme çubuğu: **Events · News (Gazete) · Search · Profile**. Bildirimler üstteki zil ikonunda.
- [Karar] Arayüz dili İngilizce. Metinler ileride çeviri için tek yerde tutulur.

## 1. Giriş & Profil
- [Karar] E-posta / şifre ile kayıt yok. Uygulama ilk açılışta otomatik hesap oluşturur, kullanıcı direkt girer.
- [Karar] Teknik: Supabase anonim hesap (anonymous sign-in). Veriler sunucuda (bildirim için şart); telefonda gereksiz veri biriktirilmez.
- [Karar] App silinir veya telefon değişirse anonim hesap kaybolur: test sürümü için kabul edildi.
- [Karar] Onboarding sırası:
  1. Kullanıcı adı
  2. Ana şehir seçimi
  3. Ek lokasyon haritası (bölüm 2)
  4. Türler + sıralama (bölüm 3)
  5. Grup takibi (atlanabilir)
  6. Bildirim izni
- [Karar] Profil sayfası: kullanıcı adı, ana şehir, **seçili şehirler listesi** (her satırda ana şehre mesafe + kaldır butonu; haritayla senkron), türler, takip edilen gruplar, ayarlar.
- [Karar] Ayarlar'da **"Hesabımı sil"**, gizlilik politikası linki ve görünür iletişim e-postası bulunur. Yakın çevre testinde yalnızca "Hesabımı sil" olur; link ve e-posta domain ile birlikte, geniş testten önce eklenir.
- [Karar] Kullanıcı adı MVP'de başkalarına görünmez ve benzersiz olması gerekmez.
- [Karar] İlk deneme sürümü anonim hesapla, gerçek grup katılımı olmadan yapılır. Hedef, uygulamanın nasıl çalıştığını görmek.
- Sonra (MVP dışı): "hesabını kalıcı yap" (e-posta / Apple / Google bağlama).

## 2. Bölge Haritası (ana farklılaştırıcı)
### Görünüm
- [Karar] Harita ana şehre zoomlu başlar.
- [Karar] Şehir sınırları çizili; her şehrin merkezinde bir sembol (pin / nokta).
- [Karar] Şehir durum renkleri:
  - **Sabit seçili** (onaylanmış): dolgu rengi.
  - **Bekleyen** (edit mode'da seçilmiş, henüz onaylanmamış): farklı renk ve/veya şehir sınırına outline.
  - **Seçili değil**: nötr.

### Jestler
- [Karar] **Sembole tek dokunuş**: şehri seç / bırak.
- [Karar] **Sembolden sürükleme**: o şehrin merkezinden halka çizer.
- [Karar] **Sembole basmadan sürükleme**: haritayı kaydırır.
- [Öneri] İki parmak: zoom. Şehir alanının herhangi bir yerine dokunmak da seç / bırak yapar.

### Halka
- [Karar] Halka herhangi bir şehrin sembolünden çekilebilir (sadece ana şehirden değil).
- [Karar] Bir şehir "halkanın içinde" = şehrin merkez noktası halkanın içinde.
- [Öneri] Sürüklerken yarıçap km olarak canlı gösterilir. Birden fazla halka olabilir; seçim halkaların birleşimi.

### Edit mode ve onay
- [Karar] Haritada değişiklik yapılınca (dokunma veya halka) **edit mode** başlar. Bu moddaki seçimler **bekleyen** durumdadır.
- [Karar] Edit mode'da ekranın uygun bir yerinde **"✓ Seçimi onayla"** butonu görünür. Kullanıcı onaylayana kadar seçmeye, kaldırmaya, halka büyütüp küçültmeye devam edebilir.
- [Karar] Edit mode içinde bir halka küçülünce sadece **o halkanın bekleyen seçimleri** kalkar. Elle seçilenler ve önceden onaylanmış şehirler etkilenmez.
- [Karar] Onaylanınca halkayla seçilen şehirler de elle seçilenler gibi **sabit seçili** olur ve halkalar kaybolur. Sonraki düzenleme yeni bir edit mode açar.
- [Öneri] Onay butonunun yanında "Vazgeç" (bekleyen değişiklikleri geri alır). Butonda bekleyen sayı yazsın: "✓ 7 şehri onayla". Onaylamadan haritadan çıkmaya çalışırsa "Değişiklikler kaydedilmedi" uyarısı.

### Diğer
- [Karar] Bir şehre dokununca ana şehre mesafesi gösterilir. MVP: kuş uçuşu km. Yol süresi sonraki aşama (backlog).
- [Karar] Seçili şehirler listesi profilde de tutulur, oradan da kaldırılabilir; haritayla senkron.
- [Karar] "Tüm ülke" = ana şehrin ülkesi. "İlgilendiğim ülkeler" katmanı sonra (backlog).
- [Öneri] Haritada her köy değil, nüfus eşiğini geçen veya bilinen konser mekanı olan şehirler gösterilir. Sınır ötesi şehirler dahil (ör. Münih için Salzburg, Viyana, Zürih, Prag).

### Teknik notlar (Claude karar verir)
- [Karar] **Puzzle harita:** sokak altlığı yok; harita yalnızca kendi şehir parçalarımızdan çizilir. Dış servis ve aylık maliyet gerekmez.
- [Karar] Parçalar kullanıcı için **şehirdir**, ilçe değil. Almanya'daki küçük idari birimler birleştirilip ana şehrin adıyla tek parça yapılır; Türkiye'de 81 il kullanılır. Parça sayısı Aşama 3'te ekranda görülerek ayarlanır.
- Parçalar ülkenin tamamını kapladığı için küçük kasabadaki etkinlik de bir şehre düşer. Bu yüzden parça sınırı resmi şehir sınırı değildir (ör. "München" çevresini de kapsar).
- [Karar] İlk ülkeler: Almanya, Avusturya, İsviçre, Çekya, Türkiye.
- Sınır verisi: geoBoundaries (kaynak gösterme zorunlu, lisans ülkeye göre değişir, her ülke eklenirken kontrol edilir); mobil için sadeleştirilmiş geometri. GADM kullanılmaz (ticari kullanım izne bağlı).
- Halka içi sorgusu ve mesafe: PostGIS (`ST_DWithin`, `ST_Distance`, geography).
- Kalıcı veri modeli: kullanıcının onaylanmış şehir listesi. Edit mode'daki bekleyen durum (halkalar dahil) istemcide tutulur, onayda sunucuya yazılır.

## 3. Türler
- [Karar] Ana tür ve alt tür olarak düzenlenmiş tür ağacı (ör. Black Metal > Atmospheric, Raw, Depressive...).
- [Karar] Ana tür seçilince soru: **"Tüm alt türler eklensin mi, yoksa özelleştirmek ister misin?"** Özelleştir seçilirse alt türlerin tik listesi / dropdown'ı açılır.
- [Karar] Seçilen türler ayrı bir alanda sürükle-bırak ile sıralanır (1 = en sevdiği).
- [Karar] Kullanıcı bir grubu takip edince, grubun türlerinden takip etmedikleri varsa: **"Bu türü takip etmiyorsun, eklemek ister misin?"**
- [Öneri] Sıra, etkinlik akışında ve ileride önerilerde ağırlık olarak kullanılır; bildirimleri etkilemez.
- Teknik: tür ağacı küratörlükle oluşturulur; bir grup birden fazla alt türe bağlanabilir.
- [Karar] Grup isimleri MusicBrainz'in serbest verisinden, tür bağlantıları Wikidata'dan gelir ve elle kontrol edilir. MusicBrainz tür etiketleri kullanılmaz (ticari olmayan lisans). Metal Archives ileride izinle dönebilir.
- [Karar] Başlangıç: elle kontrol edilmiş yaklaşık 50 grup, test bölgesinde yaklaşan konserleri olanlardan seçilir.

## 4. Gruplar
- [Karar] Instagram benzeri arama: isimle grup ara, sayfasını bul, takip et.
- [Karar] Grup sayfası: isim, ülke, alt türler, yaklaşan konserler, son duyurular, takip butonu, zil butonu.
- [Karar] İki sayfa durumu, kullanıcı için net ayrılmalı:
  1. **Topluluk sayfası**: grup kontrolü almadı; güncellemeler bizim veri hattımızdan gelir. "Bu sayfa grup tarafından yönetilmiyor" notu ve **"Bu sizin grubunuz mu? Sahiplenin"** butonu.
  2. **Resmi sayfa**: grup sahiplendi ve kendisi paylaşıyor; isim yanında resmi rozet. Rozet Instagram'ın mavi tikini kopyalamaz, metal kimliğine uygun bir mühür / sigil.
- [Karar] Her etkinlik ve duyuruda kaynak etiketi: "Grup tarafından duyuruldu" veya "Kaynak: Ticketmaster".
- [Karar] **Sahiplenme formu** ("Sahiplenin" butonu açar):
  1. Doğrulama adımları: grubun **resmi e-posta** hesabından ve **ikinci bir sosyal medya** hesabından iletişim talebi.
  2. Sahiplenince sahip olunacak haklar ve yetkilerin açıklaması.
  3. Ek talepler için serbest metin kutusu.
  - Başvuru ekibe düşer; ekip kanıtı görüp davet gönderir; davetle hesap resmi olur.
- [Karar] Deneme sürümünde iki sayfa durumu ve form görünür, ama gerçek grup girişi yoktur. Resmi hesap girişi, gruplar işin içine girdiğinde beta aşamasında güncellenir (anonim hesap resmi sayfayı taşıyamaz).
- [Karar] **Bildir butonu** (MVP): grup postlarında, etkinlik kartlarında ("bu bilgi yanlış") ve grup sayfalarında ("bu sayfa sahte"). Etkinlik bildirimleri veri kalitesini de artırır.
- [Karar] Sonraki güvenlik adımları: v2'de arkadaş ve takip ile engelleme; v3'te post, fotoğraf ve mesajlaşma ile tam filtreleme, raporlama ve engelleme, fotoğraf için otomatik filtre.
- [Öneri] Resmi sayfa yetkileri (formda listelenecek taslak): duyuru / görsel paylaşma, etkinlik ekleme ve düzeltme, profil bilgisi ve fotoğrafı, Keşfet için şarkı yükleme (v2), takipçi istatistikleri (B2B ile).

## 5. Etkinlikler
### Sekmeler
- [Karar] **Sekme 1: Akış.** Kronolojik, en yakın tarih üstte. Her etkinlik kompakt satır: tarih, grup(lar), şehir, mekan.
- [Karar] **Sekme 2: Gideceklerim.** Kullanıcının "Gitmek istiyorum" dediği etkinliklerin listesi.

### Kart
- [Karar] Satıra dokununca post gibi büyür: lineup, mekan, adres, tarih/saat, alt türler, ana şehre mesafe, kaynak etiketi, **"Gitmek istiyorum"** butonu, **bilet butonu** (affiliate link), **Bildir** ("bu bilgi yanlış").

### Filtreler: iki sekmeli filtre
- [Karar] **NE sekmesi** (tek seçimli): **Tümü** · Takip ettiğim gruplar · Takip ettiğim türler. Tümü = tür / grup fark etmeksizin bütün metal etkinlikleri.
- [Karar] **NEREDE sekmesi**:
  - **Tümü** = seçili bölgem (ana şehir + onaylanmış ek lokasyonlar). Varsayılan.
  - Sadece şehrim · Sadece ek lokasyonlarım.
  - **Tüm ülke**: ayrı bir slider. Açılınca diğer NEREDE seçimleri kapanır ve ana şehrin ülkesinin tamamı gösterilir. Kapatılınca önceki seçime döner.
- [Karar] NE ve NEREDE birlikte uygulanır (VE). Örnek: NE = Takip ettiğim gruplar, NEREDE = Sadece şehrim → şehrime gelen takip ettiğim grupların etkinlikleri.
- [Öneri] Arayüz: akışın üstünde iki kompakt çip, "NE: Tümü ▾" ve "NEREDE: Bölgem ▾". Dokununca ilgili sekmesi açık bir alt panel açılır. Aktif filtre her an görünür, akış alanı küçülmez.

## 6. Gazete
- [Karar] Takip edilen grupların haberlerinin ve görsellerinin aktığı feed. Kronolojik, algoritmasız.
- [Karar] Kaynaklar: resmi grup sayfalarının paylaşımları + bilinen metal haber sitelerinden gruba etiketli haberler. Haberler kısa bir post olarak gösterilir, detay için siteye yönlendirilir.
- [Karar] İlk testte Gazete **örnek özetlerle** çalışır: Claude çalışma sırasında yazar, Sarper kontrol eder. MVP'de haber otomasyonu ve grup sosyal medyası takibi yok. Uzun vadede uygulama içi yayıncılar (v3) bu işi devralabilir.
- [Karar] Ton / format referansı: Türkiye'deki Pasifagresif sayfasının haber başlığı ve içerik dili; telefonda Instagram postu / X paylaşımı mantığı.
- [Öneri] Haber kartı:
  - Üst: kaynak adı + logo, zaman.
  - Grup etiket(ler)i; dokununca grup sayfası.
  - Görsel: kaynağın görseli kullanılmaz.
  - Başlık + 1-2 satır özet.
  - Alt: "Habere git", paylaş. Dokununca uygulama içi tarayıcıda açılır.
- [Öneri] Resmi grup paylaşımları rozetli ve tam içerikli; haber siteleri kaynak logolu ve kısa. İki tür bir bakışta ayırt edilmeli.
- [Karar/Kısıt] Telif: kaynaktan cümle değil **yalnızca bilgi** alınır; kısa, renkli bir özet baştan yazılır. Tam metin ve kaynak görseli kullanılmaz. Kaynak adı ve haber linki her kartta görünür. Yayından önce Sarper kontrol eder. Geniş testten önce hukuki görüş alınır.
- [Öneri] İlk kaynak: Blabbermouth (kendi RSS'i var; yeniden kullanım koşulları yazılı olarak bulunamadı). Sonra birkaç site daha.

## 7. Bildirim (zil)
- [Karar] Grup bazında zil: tümü / sadece bölgemde / kapalı.
- [Karar] Tür bazlı uyarılar.
- [Karar] Olaylar: takip edilen grubun yeni tur duyurusu, bölgeye yeni etkinlik, bilet satışa çıktı.
- [Karar] Tür bazlı uyarılar ve "bilet satışa çıktı" premium planlanır (bölüm 11).
- [Öneri] Resmi sayfa duyuruları da bildirim olabilir (zil ayarına bağlı).

## 8. Bilet yönlendirme
- [Karar] Etkinlik kartındaki bilet butonu; affiliate link ile bilet sitesine yönlendirir.

## 9. Veri hattı (Claude sorumlu)
- [Karar] API ve veri tarafı Claude'da.
- Ticketmaster Discovery API + organizatör / grup girişi + haber kaynakları (RSS). Düzenli senkron; farklı kaynaklardan gelen aynı etkinliği birleştirme (dedupe).
- [Karar] Kaynak katmanları: (1) Ticketmaster Discovery API, sonra Impact üzerinden affiliate. (2) Eventim: Awin affiliate + resmi etkinlik verisi (Almanya için sorulacak, henüz doğrulanmadı). (3) Kulüp düzeyi: yalnızca izin, resmi akış veya organizatör girişiyle. Her ülke için yerel bilet ortakları aranır.
- [Karar] **Hiçbir site kazınmaz.** Metal Archives dahil.
- [Karar] Test bölgesi: önce Almanya (Sarper Münih'te), sonra Türkiye. Sayım otomatik yapılır; Sarper yalnızca Münih'teki birkaç kulüple karşılaştırma yapar.
- [Karar] Ticketmaster anahtarı hemen kullanılır, gerçek gruplarla çalışılır. Sonradan affiliate olmak aynı anahtara bağlanır.
- Ticketmaster önbellek kuralları: docs/decisions.md (2026-11-04).

## 10. "Ücretli olacak" etiketi (sadece MVP / test)
- [Karar] MVP'de bütün özellikler herkese açık.
- [Karar] Premium olması planlanan bir özelliğe girildiğinde ekranın kullanılmayan bir köşesinde para sembolü ve yanında **"Planned to be a paid feature"** yazısı çıkar, birkaç saniyede kaybolur.
- [Karar] Etiket haritada hem **ek şehir seçiminde** (Aşama 3) hem halkada (Aşama 4) çıkar.
- Hangi özellikler: bölüm 11'deki Premium listesi. Bunu tek bir yapılandırma listesinden yönet (ileride gerçek paywall'a dönüşecek).

## 11. Gelir modeli: Freemium
- [Karar] **Ücretsiz:** kayıtsız hesap, profil, tür ağacı + sıralama, sınırsız grup takibi, **ana şehir** takibi, **takip edilen grupların ana şehre gelen konser bildirimi** (Bandsintown'daki gibi), etkinlik akışı + filtreler, Gazete, bilet linkleri.
- [Karar] **Premium:** ek şehirler ve halkalar (bölge haritası), takip edilen grupların **ek lokasyonlardaki** konser bildirimleri ve tur anonsları, **tür bazlı uyarılar**, **"bilet satışa çıktı" uyarısı**, takvim senkronu, erken uyarılar (ön satış, biletler bitmek üzere). Mantık: kullanıcı elle bakarak bulabileceği bilgiyi otomatik alır.
- [Karar] Takvim ilk denemeye girer: etkinlik kartında tek yönlü **"Takvime ekle"** butonu ve ücretli etiketi.
- [Öneri] Erken uyarılar ilk deneme sürümüne girmez. "Biletler bitmek üzere" verisinin varlığı doğrulanmadı.
- [Karar] **Fiyat:** çok düşük, yaklaşık aylık 1 $ veya yıllık 10 $. Gelir hacimden.
- [Öneri] **Premium, v2+:** Battle Vest kozmetikleri, yıllık konser özeti (Wrapped tarzı), festival planlayıcı.
- [Öneri] **B2B:** grup / menajer / organizatör için takipçi içgörüleri (şehir + alt tür), "Sponsorlu" etiketli öne çıkarılan etkinlik.
- [Karar] **Her zaman:** bilet affiliate komisyonu. Ana gelir kalemi sayılmaz: Ticketmaster ön satışta ve genel satışın ilk 24 saatinde komisyon ödemiyor.
- [Not] App Store / Google Play abonelik komisyonu küçük bir aylık fiyatta oransal olarak ağır; yıllık planı öne çıkarmak mantıklı. Oranları yayına yakın tekrar kontrol et.

## 12. Vizyon ve ölçekleme
- [Karar] Metal ile başlanıyor (Sarper'ın alanı, boşluk açık). Temel oturunca sistem **diğer tüm müzik türlerine** açılacak.
- [Öneri] Bu yüzden: tür ağacı veri olarak tutulsun, kod ve metinler "metal"e sabitlenmesin (ör. `genre` tabloları, çeviri dosyalarında "metal" kelimesi parametre).

---

## Backlog (MVP dışı)
- **Keşfet: şarkı havuzu** (Sarper'ın fikri). Gruplar 3-5 şarkı seçip yükler; şarkılar bir havuza girer. Kullanıcı seçer: belirli bir tür ya da sevdiği türlerden shuffle. Karşısına rastgele şarkı çıkar; beğenirse grup sayfasına gider / takip eder.
  - [Karar] Şarkı yükleme resmi sayfa yetkisi olsun (sahiplenmeye güçlü bir sebep). Yüklerken grup çalınma iznini onaylar. Topluluk sayfaları için Bandcamp / YouTube önizleme gömme alternatifi. Ses barındırma maliyeti için 30-60 sn önizleme ile başlanabilir.
- **Yerel etkinlik haritası** (Sarper'ın fikri): şehre girince alt katmanda küçük bir harita; etkinlikler konumlarında küçük logo veya görselle görünür.
- Grup sosyal medyası takibi: önce YouTube (resmi API). Instagram ve X için erişim ve maliyet tekrar incelenir; kazıma yok.
- Uygulama içi yayıncıların Gazete'yi devralması (v3 ile).
- Yol süresi: kritik değil, kullanıcının kararına bırakılabilir. Gerekirse OSM tabanlı araba süreleri + demiryolu açık verisi; Google sadece canlı "rota göster".
- İlgilendiğim ülkeler katmanı.
- Metal Archives iş birliği (izin; plan B MusicBrainz + küratörlük).
- Menajer paneli.
- Hesabı kalıcı yapma (e-posta / Apple / Google).
