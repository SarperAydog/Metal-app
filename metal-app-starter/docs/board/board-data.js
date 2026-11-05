/*
 * BOARD VERİSİ (Gigdar fikir board'u)
 * ------------------------------------------------------------
 * Bu dosya board'un tek doğru kaynağıdır. docs/board/index.html bu dosyayı okuyup çizer.
 * Board'u değiştirmek için bu dosyayı düzenle (Claude Code düzenler, Sarper tarayıcıda açıp bakar).
 *
 * Yapı: her frame bir sütun / kutu.
 *   id     : benzersiz kimlik
 *   ver    : içerik değişince 1 artır (tarayıcıdaki eski yerel düzenlemeleri geçersiz kılar)
 *   title  : frame başlığı
 *   color  : başlık rengi
 *   w      : genişlik (px)
 *   row    : hangi satırda (1 = en üst)
 *   sub    : sağ üstteki küçük etiket (opsiyonel)
 *   notes  : yapışkan notlar. c = renk, h = HTML içerik
 *
 * Not renkleri (anlamları):
 *   yellow = MVP kararı / özelliği      pink   = Claude önerisi (onay bekliyor)
 *   red    = risk / açık soru           grey   = backlog / teknik not
 *   blue   = rakip / pazar, B2B          green  = farklılaştırıcı / ücretsiz plan
 *   orange = v2 özelliği                purple = v3 özelliği / premium
 *
 * Not içinde: <span class="k">Etiket</span> küçük üst etiket, <b class="t">Başlık</b> not başlığı.
 * docs/mvp-spec.md ile çelişirse mvp-spec.md geçerlidir; board'u ona göre güncelle.
 */
window.BOARD_FRAMES = [
  {
    "id": "problem",
    "ver": 3,
    "title": "Problem, Fikir & Vizyon",
    "color": "#f5c400",
    "w": 520,
    "row": 1,
    "notes": [
      {
        "c": "yellow",
        "h": "<b class=\"t\">Problem</b>Metal dinleyicisi için yakına hangi grupların geldiğini derli toplu gösteren bir yer yok. Ya grubun tur sayfasına ya da şehir şehir bakmak gerekiyor."
      },
      {
        "c": "yellow",
        "h": "<b class=\"t\">Çözüm</b>Tür, alt tür, grup ve bölgeye göre filtrelenen, alakalı bir şey olunca haber veren bir platform. Etkinliğe basınca bilet sitesine yönlendirme."
      },
      {
        "c": "yellow",
        "h": "<b class=\"t\">Felsefe</b>\"Sevebileceğin her şeyi gösteren algoritma\" değil. Senin seçtiklerine göre çalışan, odaklı bir yapı."
      },
      {
        "c": "yellow",
        "h": "<b class=\"t\">Topluluk tarafı</b>Profil, gidilen konserler, patch/badge, fotoğraf, takipleşme, mesajlaşma, haber paylaşan profiller."
      },
      {
        "c": "yellow",
        "h": "<span class=\"k\">Karar</span><b class=\"t\">Vizyon: ölçekleme</b>Metal ile başlıyoruz çünkü alanı biliyoruz ve boşluk açık. Temel oturunca aynı sistem <b>diğer tüm müzik türlerine</b> açılacak."
      },
      {
        "c": "pink",
        "h": "<span class=\"k\">Claude notu</span><b class=\"t\">Ölçeklemeye hazır kur</b>Tür ağacı, rozetler ve metinler \"metal\"e sabitlenmesin; tür ağacı veri olarak tutulsun. <b>Gigdar</b> adı metale bağlı olmadığı için tüm türleri taşıyabilir."
      },
      {
        "c": "yellow",
        "h": "<span class=\"k\">Karar</span><b class=\"t\">Uygulama adı: Gigdar</b>gigdar.com ve marka araması temiz. Instagram @gigdar alınmış, farklı bir kullanıcı adı kullanılacak. Kodda ad tek bir yerden okunur."
      }
    ]
  },
  {
    "id": "rakip",
    "title": "Rakipler: Pazar Durumu",
    "color": "#3b9cff",
    "w": 740,
    "row": 1,
    "notes": [
      {
        "c": "blue",
        "h": "<b class=\"t\">Bandsintown</b>Bugün \"takip et, şehir seç, bildirim al\" işini en iyi yapan. 80M+ kayıtlı kullanıcı, derin bilet entegrasyonları.<ul><li>Sanatçı odaklı</li><li>Bölge: tek şehir + en fazla 150 mil (~240 km) yarıçap</li><li>Çoklu şehir bildirimi ve ülke katmanı yok</li><li>Tür etiketleri kaba, alt tür katmanı yok</li></ul>"
      },
      {
        "c": "blue",
        "h": "<b class=\"t\">Songkick</b>Eskiden standarttı, artık zayıf. Uyarılar güvenilmez, app geri plana itilmiş."
      },
      {
        "c": "blue",
        "h": "<b class=\"t\">Günlük uygulamaları</b>Concert Archives, Gigvault, Banded.<br>Geçmiş konser günlüğü burada. Çoğu kişi gelecek için bir app, geçmiş için başka bir app kullanıyor."
      },
      {
        "c": "blue",
        "h": "<b class=\"t\">Gigora (ve benzerleri)</b>Dünya çapında 4.000+ metal konserini tür, şehir, tarihe göre listeliyor.<br><br>Sadece \"metal konserlerini listelemek\" yeterince farklı değil."
      },
      {
        "c": "grey",
        "h": "<b class=\"t\">Fırsat</b>Gelecek konser uyarısı + geçmiş konser günlüğü + metal topluluğu tek yerde. Kimse ikisini birlikte iyi yapmıyor."
      }
    ]
  },
  {
    "id": "fark",
    "title": "Farklılaştırıcılar",
    "color": "#38b24a",
    "w": 520,
    "row": 1,
    "notes": [
      {
        "c": "green",
        "h": "<b class=\"t\">1. Alt tür taksonomisi</b>Metalciler \"metal\" demez: atmospheric black, OSDM, sludge... Bunu doğru yapmak genel platformların yetişemeyeceği bir avantaj."
      },
      {
        "c": "green",
        "h": "<b class=\"t\">2. Bölge katmanları</b>En güçlü fikir. Münih'ten bakınca Salzburg, Viyana, Zürih, Prag gidilebilir. Sınır ötesi şehirler dahil."
      },
      {
        "c": "green",
        "h": "<b class=\"t\">3. Dijital Battle Vest</b>Gidilen her konser ceketine bir patch olarak dikiliyor. Metal kültürüyle birebir oturur, paylaşılabilir, uygulamanın kimliği olabilir."
      },
      {
        "c": "green",
        "h": "<b class=\"t\">Ek öneri</b>Şehir listesinin yanında \"en fazla X saat yol giderim\" seçeneği. Önerilen şehirlerde mesafe yerine tren/araba süresi."
      }
    ]
  },
  {
    "id": "risk",
    "ver": 4,
    "title": "Riskler & Açık Sorular",
    "color": "#e8553f",
    "w": 520,
    "row": 1,
    "notes": [
      {
        "c": "red",
        "h": "<b class=\"t\">En büyük risk: veri</b>Etkinlik verisi nereden gelecek?<ul><li>Ticketmaster: açık API, hemen kullanılıyor, affiliate sonra aynı anahtara bağlanır; koşullar API'den gelir elde etmeyi kısıtlıyor, ücretli sürümden önce yazılı sorulacak</li><li>Eventim: Awin affiliate; resmi etkinlik verisi sorulacak</li><li>Bandsintown / Songkick: erişim kısıtlı, partnerlik gerekebilir</li><li>Hiçbir site kazınmaz</li></ul>"
      },
      {
        "c": "red",
        "h": "<b class=\"t\">Küçük kulüp konserleri</b>Metal'in ruhu burada ama veriler mekan siteleri, Instagram, Facebook'ta dağınık."
      },
      {
        "c": "red",
        "h": "<b class=\"t\">Muhtemel veri modeli</b>Birkaç API + organizatör ve grupların kendi etkinliğini girmesi + topluluk katkısı."
      },
      {
        "c": "red",
        "h": "<b class=\"t\">Alt tür etiketleri</b>İsimler MusicBrainz'den, türler Wikidata'dan, elle kontrol. MusicBrainz tür etiketleri ticari kullanıma kapalı. Başlangıç: yaklaşık 50 grup."
      },
      {
        "c": "red",
        "h": "<b class=\"t\">Sosyal ağ = ayrı ürün</b><ul><li>Moderasyon</li><li>GDPR</li><li>Boş akış (cold start) sorunu</li></ul>Bu yüzden sonraki fazlara."
      },
      {
        "c": "grey",
        "h": "<b class=\"t\">Gelir modeli</b>Freemium + bilet affiliate komisyonu + grup/organizatör (B2B) premium. Ayrıntı: \"Gelir Modeli\" frame'i."
      }
    ]
  },
  {
    "id": "m-profil",
    "ver": 4,
    "title": "MVP · 1. Giriş & Profil",
    "color": "#f5c400",
    "w": 520,
    "row": 2,
    "sub": "MVP",
    "notes": [
      {
        "c": "yellow",
        "h": "<span class=\"k\">Karar</span><b class=\"t\">Kayıtsız başlangıç</b>E-posta / şifre yok. Uygulama ilk açılışta otomatik bir hesap oluşturur, kullanıcı direkt girer."
      },
      {
        "c": "yellow",
        "h": "<span class=\"k\">Karar</span><b class=\"t\">Anonim hesap</b>Teknik olarak Supabase anonim hesap: veriler sunucuda (bildirim için şart), telefonda gereksiz veri birikmez. App silinirse hesap kaybolur: test için kabul."
      },
      {
        "c": "yellow",
        "h": "<span class=\"k\">Akış</span><b class=\"t\">Onboarding sırası</b><ol style=\"margin:4px 0 0;padding-left:18px\"><li>Kullanıcı adı</li><li>Ana şehir</li><li>Ek lokasyon haritası</li><li>Türler + sıralama</li><li>Grup takibi (atlanabilir)</li><li>Bildirim izni</li></ol>"
      },
      {
        "c": "yellow",
        "h": "<span class=\"k\">Ekran</span><b class=\"t\">Profil sayfası</b>Kullanıcı adı, ana şehir, <b>seçili şehirler listesi</b> (her satırda mesafe + kaldır), türler, takip edilen gruplar, ayarlar."
      },
      {
        "c": "yellow",
        "h": "<span class=\"k\">Karar</span><b class=\"t\">Ayarlar</b>Hesabımı sil. Gizlilik politikası linki ve iletişim e-postası domain ile, geniş testten önce. Kullanıcı adı başkalarına görünmez, benzersiz olması gerekmez. Arayüz İngilizce."
      },
      {
        "c": "grey",
        "h": "<span class=\"k\">Sonra</span><b class=\"t\">Hesabı kalıcı yap</b>İleride e-posta / Apple / Google bağlama, telefon değişince veri kaybolmasın."
      }
    ]
  },
  {
    "id": "m-harita",
    "ver": 4,
    "title": "MVP · 2. Bölge Haritası",
    "color": "#f5c400",
    "w": 960,
    "row": 2,
    "sub": "MVP · ana farklılaştırıcı",
    "notes": [
      {
        "c": "yellow",
        "h": "<span class=\"k\">Ekran</span><b class=\"t\">Açılış</b>Harita ana şehre zoomlu başlar. Şehir sınırları çizili, her şehrin merkezinde bir sembol."
      },
      {
        "c": "yellow",
        "h": "<span class=\"k\">Jest</span><b class=\"t\">Üç jest</b><ul><li><b>Sembole tek dokun</b>: şehri seç / bırak</li><li><b>Sembolden sürükle</b>: halka çiz</li><li><b>Sembole basmadan sürükle</b>: haritayı kaydır</li><li>İki parmak: zoom</li></ul>Şehir alanının herhangi bir yerine dokunmak da seç / bırak yapar."
      },
      {
        "c": "yellow",
        "h": "<span class=\"k\">Etkileşim</span><b class=\"t\">Halka</b>Herhangi bir şehrin sembolünden çekilebilir, yarıçap km olarak canlı yazar. Merkez noktası halkanın içine düşen şehirler seçilir. Birden fazla halka olabilir."
      },
      {
        "c": "yellow",
        "h": "<span class=\"k\">Karar</span><b class=\"t\">Edit mode</b>Haritada değişiklik yapılınca edit mode başlar. Yapılan seçimler <b>bekleyen</b> durumdadır; ekranın uygun bir yerinde <b>✓ Seçimi onayla</b> butonu çıkar. Onaylanana kadar kullanıcı seçmeye, halka büyütüp küçültmeye devam edebilir."
      },
      {
        "c": "yellow",
        "h": "<span class=\"k\">Karar</span><b class=\"t\">Onay sonrası</b>Onaylanınca halkayla seçilen şehirler de elle seçilenler gibi <b>sabit seçili</b> olur, halkalar kaybolur. Sonraki düzenleme yeni bir edit mode açar."
      },
      {
        "c": "yellow",
        "h": "<span class=\"k\">Karar</span><b class=\"t\">Halka küçülünce</b>Edit mode içinde halka küçülünce sadece o halkanın bekleyen seçimleri kalkar. Elle seçilenler ve önceden onaylananlar kalır."
      },
      {
        "c": "yellow",
        "h": "<span class=\"k\">Görsel</span><b class=\"t\">Durum renkleri</b><ul><li>Sabit seçili: dolgu rengi</li><li>Bekleyen (edit mode): farklı renk / şehir sınırına outline</li><li>Seçili değil: nötr</li></ul>"
      },
      {
        "c": "yellow",
        "h": "<span class=\"k\">Etkileşim</span><b class=\"t\">Mesafe bilgisi</b>Bir şehre dokununca ana şehre mesafesi gösterilir. MVP: kuş uçuşu km; yol süresi sonra."
      },
      {
        "c": "yellow",
        "h": "<span class=\"k\">Ekran</span><b class=\"t\">Seçili şehirler listesi</b>Profilde, haritayla senkron, oradan da kaldırılabilir."
      },
      {
        "c": "pink",
        "h": "<span class=\"k\">Claude önerisi</span><b class=\"t\">Edit mode detayları</b>Onaylamadan çıkmaya çalışırsa \"Değişiklikler kaydedilmedi\" uyarısı. Onay butonunun yanında \"Vazgeç\". Bekleyen şehir sayısı butonda yazsın: \"✓ 7 şehri onayla\"."
      },
      {
        "c": "pink",
        "h": "<span class=\"k\">Claude önerisi</span><b class=\"t\">Görünen şehirler</b>Her köy değil: nüfus eşiği veya bilinen konser mekanı olan şehirler. Sınır ötesi dahil."
      },
      {
        "c": "grey",
        "h": "<span class=\"k\">Teknik</span><b class=\"t\">Altyapı</b>MapLibre, geoBoundaries sınır verisi, PostGIS ile halka sorgusu."
      },
      {
        "c": "yellow",
        "h": "<span class=\"k\">Karar</span><b class=\"t\">Puzzle harita</b>Sokak altlığı yok, harita yalnızca şehir parçalarından çizilir. Parçalar ilçe değil şehir: Almanya'da küçük birimler ana şehir adıyla birleşir, Türkiye'de 81 il. İlk ülkeler: Almanya, Avusturya, İsviçre, Çekya, Türkiye."
      },
      {
        "c": "yellow",
        "h": "<span class=\"k\">Karar</span><b class=\"t\">Ücretli etiketi</b>\"Planned to be a paid feature\" hem ek şehir seçiminde hem halkada çıkar."
      }
    ]
  },
  {
    "id": "m-tur",
    "ver": 5,
    "title": "MVP · 3. Türler",
    "color": "#f5c400",
    "w": 520,
    "row": 2,
    "sub": "MVP",
    "notes": [
      {
        "c": "yellow",
        "h": "<span class=\"k\">Ekran</span><b class=\"t\">Tür ağacı</b>Ana türler ve alt türler (ör. Black Metal > Atmospheric, Raw, Depressive...)."
      },
      {
        "c": "yellow",
        "h": "<span class=\"k\">Karar</span><b class=\"t\">Ana tür seçilince</b>Soru sorulmaz, tüm alt türler dahil olur. Kartta \"Change subgenres\" görünür; isteyen oradan tik listesiyle daraltır."
      },
      {
        "c": "yellow",
        "h": "<span class=\"k\">Ekran</span><b class=\"t\">Sıralama alanı</b>Seçilen ana türler sürükle-bırak ile sıralanır (1 = en sevdiğin). Alt türler sıralanmaz. Akışta ağırlık olarak kullanılır."
      },
      {
        "c": "yellow",
        "h": "<span class=\"k\">Karar</span><b class=\"t\">Grup takibinde öneri</b>Kullanıcı bir grubu takip edince, grubun türlerinden takip etmedikleri varsa: \"Bu türü takip etmiyorsun, eklemek ister misin?\""
      },
      {
        "c": "grey",
        "h": "<span class=\"k\">Teknik</span><b class=\"t\">Veri</b>Tür ağacı küratörlükle kurulur; bir grup birden fazla alt türe bağlanabilir. İsimler MusicBrainz, türler Wikidata, elle kontrol. Başlangıç yaklaşık 50 grup."
      }
    ]
  },
  {
    "id": "m-grup",
    "ver": 4,
    "title": "MVP · 4. Gruplar ve Festivaller",
    "color": "#f5c400",
    "w": 740,
    "row": 2,
    "sub": "MVP",
    "notes": [
      {
        "c": "yellow",
        "h": "<span class=\"k\">Ekran</span><b class=\"t\">Arama</b>Instagram tarzı arama çubuğu. İsimle grup bul, sayfasına git, takip et."
      },
      {
        "c": "yellow",
        "h": "<span class=\"k\">Karar</span><b class=\"t\">Festival sayfaları</b>Festivallerin de grup sayfaları gibi kendi sayfaları olur: bulunur, açılır, takip edilir. İçerik önerisi: yer, tarih, lineup, bilet, yeni grup bildirimi."
      },
      {
        "c": "yellow",
        "h": "<span class=\"k\">Ekran</span><b class=\"t\">Grup sayfası</b>İsim, ülke, alt türler, yaklaşan konserler, son duyurular, takip ve zil butonları."
      },
      {
        "c": "yellow",
        "h": "<span class=\"k\">Durum 1</span><b class=\"t\">Topluluk sayfası</b>Grup kontrolü almadı, güncellemeler bizden. \"Bu sayfa grup tarafından yönetilmiyor\" notu + <b>\"Bu sizin grubunuz mu? Sahiplenin\"</b> butonu."
      },
      {
        "c": "yellow",
        "h": "<span class=\"k\">Durum 2</span><b class=\"t\">Resmi sayfa</b>Grup sahiplendi ve kendisi paylaşıyor. İsim yanında resmi rozet (metal kimliğine uygun mühür / sigil)."
      },
      {
        "c": "yellow",
        "h": "<span class=\"k\">Karar</span><b class=\"t\">Kaynak etiketi</b>Her etkinlik / duyuruda: \"Grup tarafından duyuruldu\" veya \"Kaynak: Ticketmaster\"."
      },
      {
        "c": "yellow",
        "h": "<span class=\"k\">Karar</span><b class=\"t\">Sahiplenme formu</b><ol style=\"margin:4px 0 0;padding-left:18px\"><li>Doğrulama adımları: <b>resmi e-posta</b> hesabından + <b>ikinci bir sosyal medya</b> hesabından iletişim talebi</li><li>Sahiplenince kazanılacak haklar ve yetkiler açıklaması</li><li>Ek talepler için serbest metin kutusu</li></ol>Başvuru ekibe düşer, ekip kanıtı görüp davet gönderir."
      },
      {
        "c": "yellow",
        "h": "<span class=\"k\">Karar</span><b class=\"t\">Deneme sürümü</b>Sayfa durumları ve form görünür, gerçek grup girişi yok. Resmi hesap girişi betada güncellenir."
      },
      {
        "c": "yellow",
        "h": "<span class=\"k\">Karar</span><b class=\"t\">Bildir butonu</b>Grup postu, etkinlik kartı (\"bu bilgi yanlış\") ve grup sayfası (\"bu sayfa sahte\"). Uygulamada görünen iletişim e-postası."
      },
      {
        "c": "pink",
        "h": "<span class=\"k\">Claude önerisi</span><b class=\"t\">Resmi sayfa yetkileri</b>Taslak liste: duyuru / görsel paylaşma, etkinlik ekleme-düzeltme, profil bilgisi ve fotoğraf, Keşfet için şarkı yükleme (v2), takipçi istatistikleri (B2B ile)."
      }
    ]
  },
  {
    "id": "m-etkinlik",
    "ver": 4,
    "title": "MVP · 5. Etkinlikler",
    "color": "#f5c400",
    "w": 960,
    "row": 3,
    "sub": "MVP",
    "notes": [
      {
        "c": "yellow",
        "h": "<span class=\"k\">Sekme 1</span><b class=\"t\">Akış</b>Kronolojik, en yakın tarih üstte. Her etkinlik kompakt satır: tarih, grup(lar), şehir, mekan."
      },
      {
        "c": "yellow",
        "h": "<span class=\"k\">Sekme 2</span><b class=\"t\">Gideceklerim</b>Kullanıcının \"Gitmek istiyorum\" dediği etkinliklerin listesi. Kartta bir \"Gitmek istiyorum\" butonu olur."
      },
      {
        "c": "yellow",
        "h": "<span class=\"k\">Ekran</span><b class=\"t\">Kart detayı</b>Satıra dokununca post gibi büyür: lineup, mekan, adres, tarih/saat, alt türler, ana şehre mesafe, kaynak etiketi, <b>Gitmek istiyorum</b>, <b>bilet butonu</b> (affiliate), <b>Takvime ekle</b> (ücretli etiketiyle), <b>Bildir</b> (\"bu bilgi yanlış\")."
      },
      {
        "c": "yellow",
        "h": "<span class=\"k\">Filtre</span><b class=\"t\">NE sekmesi</b>Tek seçimli: <b>Tümü</b> · Takip ettiğim gruplar · Takip ettiğim türler.<br>Tümü = türü / grubu fark etmeksizin bütün metal etkinlikleri."
      },
      {
        "c": "yellow",
        "h": "<span class=\"k\">Filtre</span><b class=\"t\">NEREDE sekmesi</b><b>Tümü</b> = seçili bölgem (ana şehir + ek lokasyonlar). Altında: Sadece şehrim · Sadece ek lokasyonlarım.<br><b>Tüm ülke</b> ayrı bir slider: açılınca diğerleri kapanır, ana şehrin ülkesinin tamamı gösterilir."
      },
      {
        "c": "yellow",
        "h": "<span class=\"k\">Karar</span><b class=\"t\">Birleşim</b>NE ve NEREDE birlikte uygulanır. Ör: NE = Gruplarım, NEREDE = Sadece şehrim → şehrime gelen takip ettiğim gruplar."
      },
      {
        "c": "pink",
        "h": "<span class=\"k\">Claude önerisi</span><b class=\"t\">Filtre arayüzü</b>Akışın üstünde iki kompakt çip: \"NE: Tümü ▾\" ve \"NEREDE: Bölgem ▾\". Dokununca kendi sekmesiyle alt panel açılır. Akış alanını yemez, aktif filtre her an görünür."
      }
    ]
  },
  {
    "id": "m-gazete",
    "ver": 4,
    "title": "MVP · 6. Gazete",
    "color": "#f5c400",
    "w": 740,
    "row": 3,
    "sub": "MVP",
    "notes": [
      {
        "c": "yellow",
        "h": "<span class=\"k\">Ekran</span><b class=\"t\">Gazete akışı</b>Takip edilen grupların haberleri ve görselleri. Kronolojik, algoritmasız."
      },
      {
        "c": "yellow",
        "h": "<span class=\"k\">Karar</span><b class=\"t\">Kaynaklar</b>Resmi grup sayfalarının paylaşımları + bilinen metal haber sitelerinden gruba etiketli haberler. Haberler kısa post olarak gösterilir, detay için siteye yönlendirilir."
      },
      {
        "c": "yellow",
        "h": "<span class=\"k\">Referans</span><b class=\"t\">Ton</b>Pasifagresif'in haber başlığı / içerik dili. Telefonda Instagram postu / X paylaşımı mantığı."
      },
      {
        "c": "pink",
        "h": "<span class=\"k\">Claude önerisi</span><b class=\"t\">Haber kartı</b><ul><li>Üst: kaynak adı + logo, zaman</li><li>Grup etiket(ler)i, dokununca grup sayfası</li><li>Başlık + 1-2 satır özet</li><li>Alt: \"Habere git\", paylaş</li></ul>Dokununca uygulama içi tarayıcıda açılır."
      },
      {
        "c": "pink",
        "h": "<span class=\"k\">Claude önerisi</span><b class=\"t\">Resmi vs haber</b>Resmi grup paylaşımları rozetli ve tam içerikli; haber siteleri kaynak logolu ve kısa. Göz iki türü anında ayırt etsin."
      },
      {
        "c": "red",
        "h": "<span class=\"k\">Dikkat</span><b class=\"t\">Telif</b>Kaynaktan yalnızca bilgi alınır, kısa özet baştan yazılır. Tam metin ve kaynak görseli yok; kaynak adı ve link var. Geniş testten önce hukuki görüş."
      },
      {
        "c": "yellow",
        "h": "<span class=\"k\">Karar</span><b class=\"t\">İlk test: örnek özetler</b>Claude çalışma sırasında yazar, Sarper kontrol eder. MVP'de otomasyon ve sosyal medya takibi yok. Uzun vadede uygulama içi yayıncılar devralabilir."
      }
    ]
  },
  {
    "id": "m-diger",
    "ver": 4,
    "title": "MVP · 7. Bildirim, Bilet, Veri, Navigasyon",
    "color": "#f5c400",
    "w": 740,
    "row": 3,
    "sub": "MVP",
    "notes": [
      {
        "c": "yellow",
        "h": "<span class=\"k\">Bildirim</span><b class=\"t\">Zil (YouTube tarzı)</b>Grup bazında: tümü / sadece bölgemde / kapalı. Tür bazlı uyarılar. Olaylar: yeni tur duyurusu, bölgeye yeni etkinlik, bilet satışa çıktı. Tür uyarıları ve \"bilet satışa çıktı\" premium planlanır."
      },
      {
        "c": "yellow",
        "h": "<span class=\"k\">Gelir</span><b class=\"t\">Bilet yönlendirme</b>Etkinlik kartındaki bilet butonu, affiliate link."
      },
      {
        "c": "yellow",
        "h": "<span class=\"k\">Veri</span><b class=\"t\">Veri hattı (Claude'da)</b>Ticketmaster API + Eventim (Awin, resmi veri sorulacak) + organizatör / grup girişi + haber kaynakları. Düzenli senkron, tekrar eden etkinlikleri birleştirme. Hiçbir site kazınmaz. Test: önce Almanya, sonra Türkiye."
      },
      {
        "c": "yellow",
        "h": "<span class=\"k\">Karar</span><b class=\"t\">\"Ücretli olacak\" etiketi</b>MVP'de her şey açık. Premium olması planlanan bir özelliğe girilince ekranın boş bir köşesinde para sembolü + \"Planned to be a paid feature\" yazısı çıkar, birkaç saniyede kaybolur."
      },
      {
        "c": "yellow",
        "h": "<span class=\"k\">Karar</span><b class=\"t\">Alt sekme çubuğu</b>Events · News (Gazete) · Search · Profile. Bildirimler üstteki zil ikonunda."
      }
    ]
  },
  {
    "id": "v2",
    "ver": 3,
    "title": "v2: Profil & Arkadaşlar",
    "color": "#f08a1c",
    "w": 520,
    "row": 4,
    "notes": [
      {
        "c": "orange",
        "h": "<span class=\"k\">Profil</span><b class=\"t\">Konser günlüğü</b>\"Katıldım\" işareti, geçmiş konserler ve festivaller."
      },
      {
        "c": "orange",
        "h": "<span class=\"k\">Profil</span><b class=\"t\">Battle Vest</b>Katılınan konser ve festivallerin patch / badge'leri, profilde ceket olarak."
      },
      {
        "c": "orange",
        "h": "<span class=\"k\">Sosyal</span><b class=\"t\">Arkadaş / takip</b>Birbirini ekleme, takipleşme. Engelleme bu aşamada şart."
      },
      {
        "c": "orange",
        "h": "<span class=\"k\">Sosyal</span><b class=\"t\">\"Kim gidiyor?\"</b>Gidiyorum / ilgileniyorum. Arkadaşların hangi konsere gittiğini görme."
      },
      {
        "c": "orange",
        "h": "<span class=\"k\">Keşif</span><b class=\"t\">Türlere göre keşfet</b>Gruplar ve insanlar türlere göre ayrılmış."
      },
      {
        "c": "orange",
        "h": "<span class=\"k\">Sarper</span><b class=\"t\">Yıllık Konser Özeti</b>Spotify Wrapped tarzı, paylaşılabilir."
      },
      {
        "c": "orange",
        "h": "<span class=\"k\">Sarper</span><b class=\"t\">Festival Planlayıcı?</b>Sahne programı, çakışma bulucu. (Soru işareti Sarper'ın: henüz kesin değil.)"
      }
    ]
  },
  {
    "id": "v3",
    "ver": 2,
    "title": "v3: İçerik & Topluluk",
    "color": "#8a5cf5",
    "w": 520,
    "row": 4,
    "notes": [
      {
        "c": "purple",
        "h": "<span class=\"k\">İçerik</span><b class=\"t\">Post paylaşma</b>Takip ettiklerinin postları, kronolojik, algoritmasız akış."
      },
      {
        "c": "purple",
        "h": "<span class=\"k\">İçerik</span><b class=\"t\">Fotoğraf paylaşma</b>Instagram benzeri, konser / etkinliğe bağlı."
      },
      {
        "c": "purple",
        "h": "<span class=\"k\">Sosyal</span><b class=\"t\">Mesajlaşma</b>Kullanıcılar arası DM."
      },
      {
        "c": "purple",
        "h": "<span class=\"k\">Topluluk</span><b class=\"t\">Haber profilleri</b>Gruplarla ilgili haber paylaşan profiller, takip edilebilir."
      },
      {
        "c": "purple",
        "h": "<span class=\"k\">Güven</span><b class=\"t\">Moderasyon</b>Raporlama, engelleme, içerik filtreleme; fotoğraf için otomatik filtre."
      }
    ]
  },
  {
    "id": "backlog",
    "ver": 5,
    "title": "Backlog: Kenarda",
    "color": "#8e8e93",
    "w": 740,
    "row": 4,
    "sub": "Sonra dönülecek",
    "notes": [
      {
        "c": "grey",
        "h": "<span class=\"k\">Sarper'ın fikri</span><b class=\"t\">Keşfet: şarkı havuzu</b>Gruplar 3-5 şarkı seçip yükler, şarkılar bir havuza girer. Kullanıcı seçer: <b>belirli bir tür</b> ya da <b>sevdiği türlerden shuffle</b>. Karşısına rastgele şarkı çıkar, beğenirse gruba gider / takip eder."
      },
      {
        "c": "grey",
        "h": "<span class=\"k\">Karar</span><b class=\"t\">Keşfet kuralları</b><ul><li>Şarkı yüklemek resmi sayfa yetkisi: sahiplenmeye güçlü bir sebep</li><li>Yüklerken grup, uygulamada çalınma iznini onaylar</li><li>Topluluk sayfaları için Bandcamp / YouTube önizleme gömme</li><li>Maliyet için 30-60 sn önizleme ile başla</li></ul>"
      },
      {
        "c": "grey",
        "h": "<span class=\"k\">Bölge</span><b class=\"t\">Yol süresi</b>MVP kuş uçuşu km. Sonra: OSM tabanlı araba süreleri + demiryolu açık verisi; Google sadece canlı \"rota göster\"."
      },
      {
        "c": "grey",
        "h": "<span class=\"k\">Bölge</span><b class=\"t\">İlgilendiğim ülkeler</b>Ana şehrin ülkesi dışında ek ülke katmanları."
      },
      {
        "c": "grey",
        "h": "<span class=\"k\">Sarper'ın fikri</span><b class=\"t\">Yerel etkinlik haritası</b>Şehre girince alt katmanda küçük bir harita; etkinlikler konumlarında küçük logo veya görselle görünür."
      },
      {
        "c": "grey",
        "h": "<span class=\"k\">Gazete</span><b class=\"t\">Sosyal medya takibi</b>Önce YouTube (resmi API). Instagram ve X için erişim ve maliyet tekrar incelenir. Kazıma yok."
      },
      {
        "c": "grey",
        "h": "<span class=\"k\">Veri</span><b class=\"t\">Metal Archives iş birliği</b>Resmi API yok. İzin / iş birliği için iletişim. Plan B: MusicBrainz + küratörlük."
      },
      {
        "c": "grey",
        "h": "<span class=\"k\">Menajer</span><b class=\"t\">Menajer paneli</b>Tur tarihi girişi, resmi duyuru, içgörüler. Çift giriş yükünü kaldırmalı."
      },
      {
        "c": "grey",
        "h": "<span class=\"k\">Sarper</span><b class=\"t\">UI & UX notları</b>(Boş başlık, Sarper doldurmak için açtı.)"
      }
    ]
  },
  {
    "id": "gelir",
    "ver": 4,
    "title": "Gelir Modeli: Freemium",
    "color": "#2bb3a3",
    "w": 960,
    "row": 4,
    "notes": [
      {
        "c": "green",
        "h": "<span class=\"k\">Karar</span><b class=\"t\">Ücretsiz</b><ul><li>Kayıtsız hesap, profil</li><li>Tür ağacı + sıralama</li><li>Sınırsız grup takibi</li><li><b>Ana şehir</b> takibi</li><li><b>Takip edilen grupların ana şehre gelen konser bildirimi</b> (Bandsintown gibi)</li><li>Etkinlik akışı + filtreler</li><li>Gazete</li><li>Bilet linkleri</li></ul>"
      },
      {
        "c": "purple",
        "h": "<span class=\"k\">Karar</span><b class=\"t\">Premium (\"ağza bal\")</b><ul><li>Ek şehirler ve halkalar (bölge haritası)</li><li>Takip edilen grupların <b>ek lokasyonlardaki</b> konser bildirimleri ve tur anonsları</li><li>Tür uyarıları</li><li>\"Bilet satışa çıktı\" uyarısı</li><li>Takvim senkronu</li><li>Erken uyarılar: ön satış, biletler bitmek üzere</li></ul>"
      },
      {
        "c": "yellow",
        "h": "<span class=\"k\">Karar</span><b class=\"t\">Fiyat</b>Çok düşük tutulacak: yaklaşık <b>aylık 1 $</b> ya da <b>yıllık 10 $</b>. Gelir hacimden gelir."
      },
      {
        "c": "purple",
        "h": "<span class=\"k\">Premium</span><b class=\"t\">Kimlik & keyif (v2+)</b><ul><li>Battle Vest kozmetikleri</li><li>Yıllık konser özeti (Wrapped tarzı)</li><li>Festival planlayıcı</li></ul>"
      },
      {
        "c": "blue",
        "h": "<span class=\"k\">B2B</span><b class=\"t\">Grup / menajer / organizatör</b>Takipçi içgörüleri (şehir + alt tür), \"Sponsorlu\" etiketli öne çıkarılan etkinlik."
      },
      {
        "c": "grey",
        "h": "<span class=\"k\">Her zaman</span><b class=\"t\">Affiliate</b>Ücretsiz kullanıcı dahil bilet satışından komisyon. Ana gelir sayılmaz: Ticketmaster ön satışta ve genel satışın ilk 24 saatinde ödemiyor."
      },
      {
        "c": "yellow",
        "h": "<span class=\"k\">MVP</span><b class=\"t\">Testte her şey açık</b>Planlanan ücretli özelliklerde köşede kaybolan \"Planned to be a paid feature\" etiketi."
      },
      {
        "c": "pink",
        "h": "<span class=\"k\">Claude notu</span><b class=\"t\">Düşük fiyatın matematiği</b>App Store / Google Play abonelikten komisyon alıyor (küçük geliştirici programlarında genelde %15). 1 $'lık aylık abonelikte bu kesinti oransal olarak ağır. Yıllık planı öne çıkarmak mantıklı. Oranları yayına yakın tekrar kontrol et."
      }
    ]
  }
];
