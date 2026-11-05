# Yol Haritası ve Hatırlatmalar

Bu dosya iki şeyi tutar: onaylanan MVP aşamaları ve zamanı gelince Sarper'a hatırlatılacak işler. Ne inşa edileceğinin tanımı için kaynak: `mvp-spec.md`.

Genel kural: arayüz olabildiğince okunur ve sade kalacak (Sarper'ın isteği).

## Aşamalar

| Aşama | İş | Sonunda telefonda görülen |
|---|---|---|
| 0. Veri testi | Ticketmaster anahtarıyla Almanya, sonra Türkiye için otomatik sayım. **İlk iş budur.** | Telefonda bir şey yok. Şehir şehir etkinlik sayısı raporu; Münih'teki birkaç kulüple karşılaştırma; başlangıç grup listesi |
| 1. İskelet + anonim giriş | Proje, sekmeler, otomatik hesap | Uygulama açılır, 4 sekme görünür, kullanıcı adı durur, hesap silinebilir |
| 2. Ana şehir + türler | Tür ağacı, sıralama | Şehir seçimi, alt tür sorusu, sürükleyerek sıralama |
| 3. Harita: seçim | Şehir parçaları, dokunma, onay | Seçim renkleri, onay butonu, km bilgisi, profil listesi. **Ek şehir seçiminde "paid feature" etiketi** |
| 4. Harita: halka | Sürükleme jesti | Canlı km, birden fazla halka, doğru küçülme. "Paid feature" etiketi |
| 5. Gruplar ve festivaller | Arama, sayfa, takip | Grup ve festival sayfaları. Takipte, grubun türünü izlemiyorsan **"Bu türü eklemek ister misin?"** mesajı. Karşılama akışı tamam |
| 6. Etkinlikler | Veri hattı | Gerçek konserler, kart, filtreler, Gideceklerim, bilet butonu, Takvime ekle, Bildir |
| 7. Bildirimler | Push ve zil | Test etkinliğinde telefona bildirim, zil ayarları |
| 8. Gazete | Örnek özetlerle akış (otomasyon yok) | Etiketli haberler, kaynak adı, uygulama içinde açılan haber |
| 9. Topluluk / resmi sayfa | Durumlar ve form | İki sayfa türü, sigil, sahiplenme formu (gerçek grup girişi betada) |
| 10. Beta hazırlığı | Mağaza hazırlığı | TestFlight ve Google Play dahili test. **Sarper bu süreçte adım adım yardım istiyor** |

## Bilgisayarda test

Her aşama önce bilgisayarda, sonra telefonda denenir. İki yol var:

| Yol | Ne zaman | Neyi göstermez |
|---|---|---|
| **Tarayıcı** (Expo web) | Aşama 1'den itibaren; ekranlar, formlar, listeler için en hızlısı | Push bildirimi ve telefona özgü bazı dokunma hisleri |
| **Android emülatörü** (Android Studio, ücretsiz; bilgisayarda sanal telefon) | Aşama 3'ten önce kurulur; harita jestleri ve gerçeğe yakın deneme için | Dokunma hissi fare ile sınırlı; son karar gerçek telefonda verilir |

Çalıştırma komutları proje `README.md` dosyasındadır.

## Hatırlatmalar

### Şimdi (Aşama 0)
- [x] Ticketmaster geliştirici anahtarı.
- [x] Münih karşılaştırması (Backstage). Sonuç: `data-test.md`. Ticketmaster kulüp konserlerinin çoğunu göstermiyor.
- [ ] Eventim ve Reservix e-postaları: Sarper uygulama adıyla bireysel e-posta adresi alınca gönderecek. Metinler `outreach-emails.md` dosyasında.
- [x] JamBase ücretsiz planıyla Münih kapsamı ölçüldü: 13 konserin 11'i bulundu. Sonuç: `data-test.md`.
- [ ] Etkinlik kaynağı kesinleşmeden: JamBase bağlantılarına kendi satış ortaklığı kodumuzu eklememize yazılı izin veriyor mu? (Şu anki kurallar yasaklıyor.)

### Küçük iyileştirmeler
- [ ] Sıralama listesinde sürüklerken arkadaki satırlar sekiyor ve görsel bir kusur oluşuyor (Sarper telefonda gördü, acil değil).

### Bildirimlerden önce (Aşama 7)
- [ ] Android push için ücretsiz Firebase projesi.

### Yakın çevre testinden sonra, geniş testten önce
- [ ] Domain: gigdar.com (Sarper ilk testlerden sonra alacak; o zamana kadar rezerve değil).
- [ ] Gizlilik politikası sayfası ve görünür iletişim e-postası.
- [ ] iPhone testçileri için Apple Developer Program (99 $/yıl).
- [ ] Haber özetleri için hukuki görüş.
- [ ] Başlangıç grup listesini yaklaşık 200'e çıkarmak.

### Beta (gruplar ve gerçek kullanıcılar)
- [ ] Resmi grup hesabı girişi; kalıcı hesap (anonim hesap bunu taşıyamaz).
- [ ] Google Play: 12 testçi, 14 gün kesintisiz.
- [ ] Ticketmaster affiliate başvurusu (Impact), Eventim affiliate başvurusu (Awin).
- [ ] Türkiye için yerel bilet ortakları: Biletix, Passo, Biletinial, Bubilet ile görüşme.

### Ücretli sürümden önce
- [ ] **Ticketmaster'a yazılı sor:** premium model ve veri saklama süreleri, koşullara uygun mu? Hukukçuya da danış.
- [ ] Mali müşavir: bireysel mi şirket mi; AB'de trader bilgilerinin görünmesi.
- [ ] Mağaza komisyonlarını güncel oranlarla tekrar hesapla.
