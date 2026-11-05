# Aşama 0: Veri Testi Sonucu

Tarih: 2026-11-04. Kaynak: Ticketmaster Discovery API. Sayımlar test günündeki gelecek etkinliklerdir. Betikler: `scripts/stage0-data-test.mjs`, `scripts/stage0-band-coverage.mjs`.

## Sonuç

Ticketmaster büyük turneleri ve arena konserlerini gösteriyor, ama Almanya'daki kulüp konserlerinin çoğunu göstermiyor. Tek başına Almanya için yeterli değil.

## Münih karşılaştırması

Backstage'in herkese açık takvimi tek seferlik elle okundu (otomatik toplama yok, veri saklanmadı). 4-14 Kasım 2026 arasındaki metal ağırlıklı 13 konser Ticketmaster'da arandı:

| Ölçüm | Sonuç |
|---|---|
| Backstage'de metal ağırlıklı konser (11 gün) | 13 |
| Aynı tarihte Ticketmaster'da bulunan | **0** |

Aranan konserler: Nasty, Rising Insane, Avalanche Effect, Walls of Jericho, Dust Bolt, The Browning, President, Phil Campbell's Bastard Sons, Archspire, Converge, Gloryhammer, Tanzt!, ALLT.

Backstage'in sitesinde satış noktası olarak Eventim, München Ticket, Metaltix ve Reservix yazıyor, Ticketmaster yazmıyor. Ticketmaster'daki mekan kayıtları: Backstage 1 konser, Feierwerk 0, Strom kayıt yok, Olympiahalle 15.

Sınır: Karşılaştırma tek mekan ve 11 günle yapıldı. Feierwerk ve Strom'un takvimleri karşılaştırılmadı.

## Ülke sayıları

| Ülke | Tüm etkinlik | Müzik | Rock | Metal etiketli | Metal şehir sayısı |
|---|---:|---:|---:|---:|---:|
| Almanya | 3007 | 1101 | 689 | 53 | 15 |
| Avusturya | 144 | 81 | 56 | 4 | 1 |
| İsviçre | 299 | 181 | 100 | 10 | 4 |
| Çekya | 436 | 335 | 232 | 26 | 8 |
| Türkiye | 1830 | 971 | 431 | 14 | 3 |

## Grup bazlı örnek

30 tanınmış metal grubu tam adla arandı. 30'u da grup kaydı olarak bulundu, 8'inin bu beş ülkede etkinliği çıktı. Bu oran tek başına eksik veri demek değildir, çünkü grup o sırada turnede olmayabilir.

## Veri kalitesi

- **Türkiye:** Bilet bağlantılarının tamamı Biletix'e gidiyor (örnekte 200/200). Türkiye'de ayrı bir bilet ortağı ihtiyacını azaltabilir.
- **Mekan adı:** Örneklerde adı boş gelen etkinlikler var: Almanya 82/200, Avusturya 17/56, İsviçre 36/100. Çekya ve Türkiye'de yok. İncelenen örnekte adres ve konum vardı, bu yüzden kartta adres gösterilebilir.
- **Tür etiketi güvenilir değil:** "Metal" aramasına Polyphia ve Genevieve Stokes gibi metal olmayan isimler karışıyor. "Ghost" adı bir müzikale eşleşiyor. Eşleştirme grup kimliğiyle yapılmalı ve elle kontrol edilmeli.
- **Sahte kayıtlar:** "Ticketmaster Suite Hamburg", "Fast Track - O2 arena" ve otel/VIP paketleri konser gibi listeleniyor, elenmeli.
- **Şehir adı:** Münih yalnızca "Munich" ile bulunuyor ("München" 0 sonuç). Prag "Praha 9" gibi semtlere bölünüyor. Şehir eşleştirmesi ada değil, konuma göre yapılmalı.

## Ek kaynak araştırması

Tarih: 2026-11-04. Bu tablo sağlayıcıların sayfalarına dayanır, kapsamı henüz ölçülmedi.

| Kaynak | Durum | Maliyet | Değerlendirme |
|---|---|---|---|
| [Reservix](https://www.reservix.net/en/affiliate-partnership/) | Affiliate sayfası API ile etkinlik entegrasyonundan söz ediyor; yılda 180.000 etkinlik, 7.500 organizatör. API ayrıntıları yayımlanmamış, sayfa yüksek erişimli sitelere hitap ediyor | Komisyon modeli | Sorulacak. Backstage'in satış noktaları arasında |
| [Eventim DE (Awin)](https://ui.awin.com/merchant-profile/11388) | Komisyon ve site içi entegrasyon var; veri akışından ve mobil uygulamadan söz edilmiyor | Komisyon modeli | Sorulacak. Backstage'in satış noktaları arasında |
| [JamBase](https://data.jambase.com/data) | Eventim ve Reservix dahil birçok kaynağı birleştirdiğini söylüyor; Almanya kapsamı yazmıyor. [14 günlük deneme](https://data.jambase.com/legal/trial-terms) yalnızca değerlendirme için, kart istemiyor, bitince veri silinir | Ücretsiz plan [gelir modeli olmayan projeler](https://data.jambase.com/legal/developer-terms) için; ticari plan [aylık 500 $'dan başlıyor](https://data.jambase.com/pricing) (sayfadaki tablo 600 $ diyor) | Kapsam denemeyle ölçülebilir. Ticari kullanım sıfır maliyet kuralını bozar |
| [Bandsintown](http://help.artists.bandsintown.com/en/articles/3372745-can-i-have-access-to-the-api-and-an-api-key-if-i-m-not-an-artist) | Sanatçı olmayan uygulamalar için özel onay gerekiyor; trafik tahminiyle başvurulur | Belirtilmemiş | Kullanıcı sayısı oluşunca sorulabilir |
| [Songkick](https://dlthub.com/context/source/songkick) | İkincil kaynaklara göre yeni anahtar verilmiyor; resmi sayfa doğrulanamadı | Bilinmiyor | Şimdilik geçilir |
| Metaltix, concerts-metal.com | Resmi API veya ortaklık bulunamadı; bulunan tek yol kazıma | Bilinmiyor | Kazıma yasak. Yalnızca izinle |

## JamBase testi

Tarih: 2026-11-05. Aynı 13 Backstage konseri JamBase'de grup adıyla arandı (`scripts/stage0-jambase-coverage.mjs`).

| Kaynak | Aynı tarihte bulunan |
|---|:---:|
| Ticketmaster | 0/13 |
| JamBase | **11/13** |

Bulunamayanlar: Phil Campbell's Bastard Sons ve Tanzt!. İkisi ad farkından kaynaklanabilir, ayrıca kontrol edilmedi. JamBase'de Münih için Feierwerk ve Strom kayıtları da çıktı (ilk sayfada 61 ve 40 etkinlik). Bu sayılar ad eşleşmesine dayanır, tek tek doğrulanmadı.

Sınır: Tek mekan ve 11 gün. Bu test 17 istek kullandı.

JamBase kota yanıtı: `limitType: soft`, `blocksAtQuota: false`. Yani kota aşılırsa istekler durmuyor, istek başına 0,05 $ yazılıyor. Sert limit bizim kodumuzda: `scripts/lib/jambase-client.mjs`.

## Açık nokta

Kalıcı kaynak, Reservix ve Eventim yanıtlarından sonra seçilecek. E-postalar: `outreach-emails.md`.
