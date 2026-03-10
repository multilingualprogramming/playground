/*
 * SPDX-FileCopyrightText: 2026 John Samuel <johnsamuelwrites@gmail.com>
 *
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

"use strict";

/* ──────────────────────────────────────────────────────────────────
   Level 1 — Basics: variables, arithmetic, for loop.
────────────────────────────────────────────────────────────────── */
export const EXAMPLES = {
  en: `# English — arithmetic and loops
let a = 10
let b = 3

print("a + b =", a + b)
print("a - b =", a - b)
print("a * b =", a * b)
print("a / b =", a / b)
print("a % b =", a % b)

for i in range(1, 5):
    print(i, "squared =", i * i)
`,
  fr: `# Français — arithmétique et boucles
soit a = 10
soit b = 3

afficher("a + b =", a + b)
afficher("a - b =", a - b)
afficher("a * b =", a * b)
afficher("a / b =", a / b)
afficher("a % b =", a % b)

pour i dans intervalle(1, 5):
    afficher(i, "au carré =", i * i)
`,
  es: `# Español — aritmética y bucles
sea a = 10
sea b = 3

imprimir("a + b =", a + b)
imprimir("a - b =", a - b)
imprimir("a * b =", a * b)
imprimir("a / b =", a / b)
imprimir("a % b =", a % b)

para i en rango(1, 5):
    imprimir(i, "al cuadrado =", i * i)
`,
  de: `# Deutsch — Arithmetik und Schleifen
sei a = 10
sei b = 3

ausgeben("a + b =", a + b)
ausgeben("a - b =", a - b)
ausgeben("a * b =", a * b)
ausgeben("a / b =", a / b)
ausgeben("a % b =", a % b)

für i in bereich(1, 5):
    ausgeben(i, "Quadrat =", i * i)
`,
  it: `# Italiano — aritmetica e cicli
sia a = 10
sia b = 3

stampa("a + b =", a + b)
stampa("a - b =", a - b)
stampa("a * b =", a * b)
stampa("a / b =", a / b)
stampa("a % b =", a % b)

per x in intervallo(1, 5):
    stampa(x, "al quadrato =", x * x)
`,
  pt: `# Português — aritmética e ciclos
seja a = 10
seja b = 3

imprima("a + b =", a + b)
imprima("a - b =", a - b)
imprima("a * b =", a * b)
imprima("a / b =", a / b)
imprima("a % b =", a % b)

para x em intervalo(1, 5):
    imprima(x, "ao quadrado =", x * x)
`,
  nl: `# Nederlands — rekenen en lussen
laat a = 10
laat b = 3

afdrukken("a + b =", a + b)
afdrukken("a - b =", a - b)
afdrukken("a * b =", a * b)
afdrukken("a / b =", a / b)
afdrukken("a % b =", a % b)

voor x in bereik(1, 5):
    afdrukken(x, "kwadraat =", x * x)
`,
  pl: `# Polski — arytmetyka i pętle
niech a = 10
niech b = 3

drukuj("a + b =", a + b)
drukuj("a - b =", a - b)
drukuj("a * b =", a * b)
drukuj("a / b =", a / b)
drukuj("a % b =", a % b)

dla x w zakres(1, 5):
    drukuj(x, "kwadrat =", x * x)
`,
  sv: `# Svenska — aritmetik och loopar
lat a = 10
lat b = 3

skriv("a + b =", a + b)
skriv("a - b =", a - b)
skriv("a * b =", a * b)
skriv("a / b =", a / b)
skriv("a % b =", a % b)

for x i intervall(1, 5):
    skriv(x, "i kvadrat =", x * x)
`,
  da: `# Dansk — aritmetik og løkker
lad a = 10
lad b = 3

skriv("a + b =", a + b)
skriv("a - b =", a - b)
skriv("a * b =", a * b)
skriv("a / b =", a / b)
skriv("a % b =", a % b)

for x i interval(1, 5):
    skriv(x, "i anden =", x * x)
`,
  fi: `# Suomi — aritmetiikka ja silmukat
olkoon a = 10
olkoon b = 3

tulosta("a + b =", a + b)
tulosta("a - b =", a - b)
tulosta("a * b =", a * b)
tulosta("a / b =", a / b)
tulosta("a % b =", a % b)

jokaiselle x sisalla vali(1, 5):
    tulosta(x, "toiseen =", x * x)
`,
  hi: `# हिन्दी — अंकगणित और लूप
मान a = 10
मान b = 3

छापो("a + b =", a + b)
छापो("a - b =", a - b)
छापो("a * b =", a * b)
छापो("a / b =", a / b)
छापो("a % b =", a % b)

के_लिए x में परास(1, 5):
    छापो(x, "वर्ग =", x * x)
`,
  ar: `# العربية — الحساب والحلقات
ليكن a = 10
ليكن b = 3

اطبع("a + b =", a + b)
اطبع("a - b =", a - b)
اطبع("a * b =", a * b)
اطبع("a / b =", a / b)
اطبع("a % b =", a % b)

لكل x في مدى(1, 5):
    اطبع(x, "تربيع =", x * x)
`,
  bn: `# বাংলা — গাণিতিক হিসাব ও লুপ
ধরি a = 10
ধরি b = 3

ছাপাও("a + b =", a + b)
ছাপাও("a - b =", a - b)
ছাপাও("a * b =", a * b)
ছাপাও("a / b =", a / b)
ছাপাও("a % b =", a % b)

জন্য x মধ্যে পরিসর(1, 5):
    ছাপাও(x, "বর্গ =", x * x)
`,
  ta: `# தமிழ் — கணக்கீடு மற்றும் சுழல்கள்
இருக்கட்டும் a = 10
இருக்கட்டும் b = 3

அச்சிடு("a + b =", a + b)
அச்சிடு("a - b =", a - b)
அச்சிடு("a * b =", a * b)
அச்சிடு("a / b =", a / b)
அச்சிடு("a % b =", a % b)

ஒவ்வொரு x இல் வரம்பு(1, 5):
    அச்சிடு(x, "வர்க்கம் =", x * x)
`,
  zh: `# 中文 — 算术运算和循环
令 a = 10
令 b = 3

打印("a + b =", a + b)
打印("a - b =", a - b)
打印("a * b =", a * b)
打印("a / b =", a / b)
打印("a % b =", a % b)

对于 x 里 范围(1, 5):
    打印(x, "的平方 =", x * x)
`,
  ja: `# 日本語 — 算術演算とループ
変数 a = 10
変数 b = 3

表示("a + b =", a + b)
表示("a - b =", a - b)
表示("a * b =", a * b)
表示("a / b =", a / b)
表示("a % b =", a % b)

毎 x 中 範囲(1, 5):
    表示(x, "の2乗 =", x * x)
`,
};

/* ──────────────────────────────────────────────────────────────────
   Level 2 — Medium: functions, while loop, list building.
   Computes the Fibonacci sequence up to a limit using a while loop.
────────────────────────────────────────────────────────────────── */
export const EXAMPLES_MEDIUM = {
  en: `# English — while loops and lists
def fibonacci(limit):
    a = 0
    b = 1
    sequence = []
    while a <= limit:
        sequence = sequence + [a]
        tmp = a + b
        a = b
        b = tmp
    return sequence

result = fibonacci(100)
print("Fibonacci sequence:")
for n in result:
    print(n)
`,
  fr: `# Français — boucles tantque et séquences
déf fibonacci(limite):
    a = 0
    b = 1
    séquence = []
    tantque a <= limite:
        séquence = séquence + [a]
        tmp = a + b
        a = b
        b = tmp
    retour séquence

résultat = fibonacci(100)
afficher("Suite de Fibonacci :")
pour n dans résultat:
    afficher(n)
`,
  es: `# Español — bucles mientras y secuencias
def fibonacci(limite):
    a = 0
    b = 1
    secuencia = []
    mientras a <= limite:
        secuencia = secuencia + [a]
        tmp = a + b
        a = b
        b = tmp
    devolver secuencia

resultado = fibonacci(100)
imprimir("Sucesión de Fibonacci:")
para n en resultado:
    imprimir(n)
`,
  de: `# Deutsch — Schleifen und Folgen
def fibonacci(grenze):
    a = 0
    b = 1
    folge = []
    solange a <= grenze:
        folge = folge + [a]
        tmp = a + b
        a = b
        b = tmp
    rückgabe folge

ergebnis = fibonacci(100)
ausgeben("Fibonacci-Folge:")
für n in ergebnis:
    ausgeben(n)
`,
  it: `# Italiano — cicli mentre e sequenze
definisci fibonacci(limite):
    a = 0
    b = 1
    sequenza = []
    mentre a <= limite:
        sequenza = sequenza + [a]
        tmp = a + b
        a = b
        b = tmp
    ritorna sequenza

risultato = fibonacci(100)
stampa("Sequenza di Fibonacci:")
per n in risultato:
    stampa(n)
`,
  pt: `# Português — ciclos enquanto e sequências
defina fibonacci(limite):
    a = 0
    b = 1
    sequencia = []
    enquanto a <= limite:
        sequencia = sequencia + [a]
        tmp = a + b
        a = b
        b = tmp
    retorne sequencia

resultado = fibonacci(100)
imprima("Sequência de Fibonacci:")
para n em resultado:
    imprima(n)
`,
  nl: `# Nederlands — terwijl-lussen en rijen
definieer fibonacci(limiet):
    a = 0
    b = 1
    rij = []
    terwijl a <= limiet:
        rij = rij + [a]
        tmp = a + b
        a = b
        b = tmp
    retourneer rij

resultaat = fibonacci(100)
afdrukken("Fibonacci-rij:")
voor n in resultaat:
    afdrukken(n)
`,
  pl: `# Polski — pętle dopóki i ciągi
funkcja fibonacci(granica):
    a = 0
    b = 1
    ciag = []
    dopoki a <= granica:
        ciag = ciag + [a]
        tmp = a + b
        a = b
        b = tmp
    zwroc ciag

wynik = fibonacci(100)
drukuj("Ciąg Fibonacciego:")
dla n w wynik:
    drukuj(n)
`,
  sv: `# Svenska — medan-slingor och följder
definiera fibonacci(grans):
    a = 0
    b = 1
    foljd = []
    medan a <= grans:
        foljd = foljd + [a]
        tmp = a + b
        a = b
        b = tmp
    retur foljd

resultat = fibonacci(100)
skriv("Fibonacci-följd:")
for n i resultat:
    skriv(n)
`,
  da: `# Dansk — mens-løkker og følger
definer fibonacci(graense):
    a = 0
    b = 1
    folge = []
    mens a <= graense:
        folge = folge + [a]
        tmp = a + b
        a = b
        b = tmp
    returner folge

resultat = fibonacci(100)
skriv("Fibonacci-følge:")
for n i resultat:
    skriv(n)
`,
  fi: `# Suomi — kun-silmukat ja jonot
maarittele fibonacci(raja):
    a = 0
    b = 1
    jono = []
    kun a <= raja:
        jono = jono + [a]
        tmp = a + b
        a = b
        b = tmp
    palauta jono

tulos = fibonacci(100)
tulosta("Fibonacci-jono:")
jokaiselle n sisalla tulos:
    tulosta(n)
`,
  hi: `# हिन्दी — जबतक लूप और अनुक्रम
परिभाषा fibonacci(सीमा):
    a = 0
    b = 1
    अनुक्रम = []
    जबतक a <= सीमा:
        अनुक्रम = अनुक्रम + [a]
        tmp = a + b
        a = b
        b = tmp
    वापसी अनुक्रम

परिणाम = fibonacci(100)
छापो("फ़िबोनाची अनुक्रम:")
के_लिए n में परिणाम:
    छापो(n)
`,
  ar: `# العربية — حلقات طالما والمتتاليات
دالة فيبوناتشي(حد):
    a = 0
    b = 1
    متتالية = []
    طالما a <= حد:
        متتالية = متتالية + [a]
        tmp = a + b
        a = b
        b = tmp
    إرجاع متتالية

نتيجة = فيبوناتشي(100)
اطبع("متتالية فيبوناتشي:")
لكل n في نتيجة:
    اطبع(n)
`,
  bn: `# বাংলা — যতক্ষণ লুপ ও ধারা
সংজ্ঞা fibonacci(সীমা):
    a = 0
    b = 1
    ধারা = []
    যতক্ষণ a <= সীমা:
        ধারা = ধারা + [a]
        tmp = a + b
        a = b
        b = tmp
    ফেরত ধারা

ফলাফল = fibonacci(100)
ছাপাও("ফিবোনাচি ধারা:")
জন্য n মধ্যে ফলাফল:
    ছাপাও(n)
`,
  ta: `# தமிழ் — வரை சுழல்கள் மற்றும் தொடர்கள்
வரையறு fibonacci(எல்லை):
    a = 0
    b = 1
    தொடர் = []
    வரை a <= எல்லை:
        தொடர் = தொடர் + [a]
        tmp = a + b
        a = b
        b = tmp
    திருப்பு தொடர்

முடிவு = fibonacci(100)
அச்சிடு("ஃபிபோனாச்சி தொடர்:")
ஒவ்வொரு n இல் முடிவு:
    அச்சிடு(n)
`,
  zh: `# 中文 — 当循环和数列
函数 fibonacci(上限):
    a = 0
    b = 1
    数列 = []
    当 a <= 上限:
        数列 = 数列 + [a]
        tmp = a + b
        a = b
        b = tmp
    返回 数列

结果 = fibonacci(100)
打印("斐波那契数列:")
对于 n 里 结果:
    打印(n)
`,
  ja: `# 日本語 — 間ループと数列
関数 fibonacci(上限):
    a = 0
    b = 1
    数列 = []
    間 a <= 上限:
        数列 = 数列 + [a]
        tmp = a + b
        a = b
        b = tmp
    戻る 数列

結果 = fibonacci(100)
表示("フィボナッチ数列:")
毎 n 中 結果:
    表示(n)
`,
};

/* ──────────────────────────────────────────────────────────────────
   Level 3 — Advanced: recursion, list comprehensions, exceptions.
   Computes factorials recursively, uses a list comprehension to
   build results, then demonstrates exception handling.
────────────────────────────────────────────────────────────────── */
export const EXAMPLES_ADVANCED = {
  en: `# English — recursion, comprehensions, and exceptions
def factorial(n):
    if n < 0:
        raise ValueError("negative input")
    if n == 0:
        return 1
    return n * factorial(n - 1)

results = [factorial(i) for i in range(8)]
print("Factorials:")
for i in range(8):
    print(i, "! =", results[i])

try:
    factorial(-1)
except ValueError as error:
    print("Caught:", error)
`,
  fr: `# Français — récursion, compréhensions et exceptions
déf factorial(n):
    si n < 0:
        lever ValueError("entrée négative")
    si n == 0:
        retour 1
    retour n * factorial(n - 1)

résultats = [factorial(i) pour i dans intervalle(8)]
afficher("Factorielles :")
pour i dans intervalle(8):
    afficher(i, "! =", résultats[i])

essayer:
    factorial(-1)
sauf ValueError comme erreur:
    afficher("Capturé :", erreur)
`,
  es: `# Español — recursión, comprensiones y excepciones
def factorial(n):
    si n < 0:
        lanzar ValueError("entrada negativa")
    si n == 0:
        devolver 1
    devolver n * factorial(n - 1)

resultados = [factorial(i) para i en rango(8)]
imprimir("Factoriales:")
para i en rango(8):
    imprimir(i, "! =", resultados[i])

intentar:
    factorial(-1)
excepto ValueError como error:
    imprimir("Capturado:", error)
`,
  de: `# Deutsch — Rekursion, Komprehensionen und Ausnahmen
def factorial(n):
    wenn n < 0:
        auslösen ValueError("negative Eingabe")
    wenn n == 0:
        rückgabe 1
    rückgabe n * factorial(n - 1)

ergebnisse = [factorial(i) für i in bereich(8)]
ausgeben("Fakultäten:")
für i in bereich(8):
    ausgeben(i, "! =", ergebnisse[i])

versuchen:
    factorial(-1)
ausnahme ValueError als fehler:
    ausgeben("Gefangen:", fehler)
`,
  it: `# Italiano — ricorsione, comprensioni ed eccezioni
definisci factorial(n):
    se n < 0:
        solleva ValueError("input negativo")
    se n == 0:
        ritorna 1
    ritorna n * factorial(n - 1)

risultati = [factorial(i) per i in intervallo(8)]
stampa("Fattoriali:")
per i in intervallo(8):
    stampa(i, "! =", risultati[i])

prova:
    factorial(-1)
eccetto ValueError come errore:
    stampa("Catturato:", errore)
`,
  pt: `# Português — recursão, compreensões e exceções
defina factorial(n):
    se n < 0:
        lance ValueError("entrada negativa")
    se n == 0:
        retorne 1
    retorne n * factorial(n - 1)

resultados = [factorial(i) para i em intervalo(8)]
imprima("Fatoriais:")
para i em intervalo(8):
    imprima(i, "! =", resultados[i])

tente:
    factorial(-1)
exceto ValueError como erro:
    imprima("Capturado:", erro)
`,
  nl: `# Nederlands — recursie, lijstbegrippen en uitzonderingen
definieer factorial(n):
    als n < 0:
        werp ValueError("negatieve invoer")
    als n == 0:
        retourneer 1
    retourneer n * factorial(n - 1)

resultaten = [factorial(i) voor i in bereik(8)]
afdrukken("Faculteiten:")
voor i in bereik(8):
    afdrukken(i, "! =", resultaten[i])

probeer:
    factorial(-1)
behalve ValueError zoals fout:
    afdrukken("Gevangen:", fout)
`,
  pl: `# Polski — rekurencja, wyrażenia i wyjątki
funkcja factorial(n):
    jesli n < 0:
        podnies ValueError("ujemne wejście")
    jesli n == 0:
        zwroc 1
    zwroc n * factorial(n - 1)

wyniki = [factorial(i) dla i w zakres(8)]
drukuj("Silnie:")
dla i w zakres(8):
    drukuj(i, "! =", wyniki[i])

sprobuj:
    factorial(-1)
wyjatek ValueError jako blad:
    drukuj("Złapano:", blad)
`,
  sv: `# Svenska — rekursion, listuttryck och undantag
definiera factorial(n):
    om n < 0:
        kasta ValueError("negativt indata")
    om n == 0:
        retur 1
    retur n * factorial(n - 1)

resultat = [factorial(i) for i i intervall(8)]
skriv("Faktorial:")
for i i intervall(8):
    skriv(i, "! =", resultat[i])

forsok:
    factorial(-1)
utom ValueError som fel:
    skriv("Fångad:", fel)
`,
  da: `# Dansk — rekursion, listeudtryk og undtagelser
definer factorial(n):
    hvis n < 0:
        kast ValueError("negativt input")
    hvis n == 0:
        returner 1
    returner n * factorial(n - 1)

resultater = [factorial(i) for i i interval(8)]
skriv("Fakulteter:")
for i i interval(8):
    skriv(i, "! =", resultater[i])

prov:
    factorial(-1)
undtagen ValueError som fejl:
    skriv("Fanget:", fejl)
`,
  fi: `# Suomi — rekursio, listarakenteet ja poikkeukset
maarittele factorial(n):
    jos n < 0:
        nosta ValueError("negatiivinen syöte")
    jos n == 0:
        palauta 1
    palauta n * factorial(n - 1)

tulokset = [factorial(i) jokaiselle i sisalla vali(8)]
tulosta("Kertomia:")
jokaiselle i sisalla vali(8):
    tulosta(i, "! =", tulokset[i])

yrita:
    factorial(-1)
paitsi ValueError nimella virhe:
    tulosta("Kiinniotettu:", virhe)
`,
  hi: `# हिन्दी — पुनरावृत्ति, कॉम्प्रिहेंशन और अपवाद
परिभाषा factorial(n):
    अगर n < 0:
        उठाओ ValueError("ऋणात्मक इनपुट")
    अगर n == 0:
        वापसी 1
    वापसी n * factorial(n - 1)

परिणाम = [factorial(i) के_लिए i में परास(8)]
छापो("क्रमगुणित:")
के_लिए i में परास(8):
    छापो(i, "! =", परिणाम[i])

प्रयास:
    factorial(-1)
अपवाद ValueError रूपमें त्रुटि:
    छापो("पकड़ा:", त्रुटि)
`,
  ar: `# العربية — التكرار والمتفهمات والاستثناءات
دالة مضروب(n):
    إذا n < 0:
        ارفع ValueError("مدخل سالب")
    إذا n == 0:
        إرجاع 1
    إرجاع n * مضروب(n - 1)

نتائج = [مضروب(i) لكل i في مدى(8)]
اطبع("المضروبات:")
لكل i في مدى(8):
    اطبع(i, "! =", نتائج[i])

حاول:
    مضروب(-1)
استثناء ValueError كـ مشكلة:
    اطبع("تم الإمساك:", مشكلة)
`,
  bn: `# বাংলা — পুনরাবৃত্তি, কম্প্রিহেনশন ও ব্যতিক্রম
সংজ্ঞা factorial(n):
    যদি n < 0:
        তোলো ValueError("ঋণাত্মক ইনপুট")
    যদি n == 0:
        ফেরত 1
    ফেরত n * factorial(n - 1)

ফলাফল = [factorial(i) জন্য i মধ্যে পরিসর(8)]
ছাপাও("ফ্যাক্টোরিয়াল:")
জন্য i মধ্যে পরিসর(8):
    ছাপাও(i, "! =", ফলাফল[i])

চেষ্টা:
    factorial(-1)
ব্যতিক্রম ValueError হিসাবে ত্রুটি:
    ছাপাও("ধরা পড়েছে:", ত্রুটি)
`,
  ta: `# தமிழ் — மீண்டும் அழைப்பு, புரிதல்கள் மற்றும் விதிவிலக்குகள்
வரையறு factorial(n):
    என்றால் n < 0:
        எழுப்பு ValueError("எதிர்மறை உள்ளீடு")
    என்றால் n == 0:
        திருப்பு 1
    திருப்பு n * factorial(n - 1)

முடிவுகள் = [factorial(i) ஒவ்வொரு i இல் வரம்பு(8)]
அச்சிடு("ஃபாக்டோரியல்:")
ஒவ்வொரு i இல் வரம்பு(8):
    அச்சிடு(i, "! =", முடிவுகள்[i])

முயற்சி:
    factorial(-1)
விதிவிலக்கு ValueError ஆக பிழை:
    அச்சிடு("பிடிக்கப்பட்டது:", பிழை)
`,
  zh: `# 中文 — 递归、列表推导和异常
函数 factorial(n):
    如果 n < 0:
        抛出 ValueError("负数输入")
    如果 n == 0:
        返回 1
    返回 n * factorial(n - 1)

结果 = [factorial(i) 对于 i 里 范围(8)]
打印("阶乘:")
对于 i 里 范围(8):
    打印(i, "! =", 结果[i])

尝试:
    factorial(-1)
除了 ValueError 作为 错误:
    打印("捕获:", 错误)
`,
  ja: `# 日本語 — 再帰、内包表記、例外
関数 factorial(n):
    もし n < 0:
        発生 ValueError("負の入力")
    もし n == 0:
        戻る 1
    戻る n * factorial(n - 1)

結果 = [factorial(i) 毎 i 中 範囲(8)]
表示("階乗:")
毎 i 中 範囲(8):
    表示(i, "! =", 結果[i])

試行:
    factorial(-1)
例外 ValueError として エラー:
    表示("捕捉:", エラー)
`,
};
