# Промпти для ШІ-генератора картинок — 60 страв «Аерогриль»

Підійде будь-який генератор: ChatGPT (зображення), Midjourney, Gemini, Leonardo, Firefly.

## 1. Куди класти і як називати

- **Папка:** `Лапчук Сергій/АЄРОГРИЛЬ/img/dishes/` (вона вже створена).
- **Ім'я файлу:** точно як у таблиці нижче, наприклад `chicken-thighs.jpg`. Латиницею, малими літерами, з дефісами.
- **Формат:** бажано JPG. PNG або WEBP теж підійдуть: головне — правильне ім'я, формат я сам переведу в JPG.
- **Розмір:** горизонтальна картинка **4:3**, від 1200 px завширшки (ідеально 1600×1200).
- Можна робити частинами. Що буде в папці, те я й заміню, а решта страв поки лишиться зі старими фото.
- Коли закинете картинки, напишіть мені **«продовж»**. Я перевірю кожну, стисну для швидкого завантаження, підключу до сайту й опублікую.

## 2. Загальний стиль (додавайте до КОЖНОГО промпту)

Щоб усі 60 фото виглядали як одна книга рецептів, на початок кожного промпту вставляйте цей блок:

```
Editorial food photography for a modern cookbook, landscape 4:3.
The dish was freshly cooked in an air fryer and is served on a matte off-white stoneware plate
on a warm cream linen tablecloth (soft beige, #FBF6EF tones). Camera at a 45-degree
three-quarter angle, 50mm lens, shallow depth of field. Soft natural daylight from the left,
gentle soft shadows. Warm appetizing palette with subtle terracotta and olive-green accents
(a small terracotta ramekin or a sprig of fresh herbs as the only props).
The food sits in the centre with generous empty margins on all sides, so the image can be
cropped to a square or a circle. Hyper-realistic textures, golden crispy surfaces,
light steam where the food is hot. No text, no logos, no watermark, no people, no hands,
no air fryer appliance in the frame.
```

**Негативний промпт** (якщо генератор його підтримує):
```
text, letters, watermark, logo, hands, people, cartoon, illustration, 3d render, plastic look,
oversaturated, blurry, burnt, messy table, dark moody background, raw meat
```

Для Midjourney додайте в кінці: `--ar 4:3 --style raw --v 7`

## 3. Страви: ім'я файлу + опис

Кожен промпт = **загальний стиль** + **опис страви** з таблиці.

### Курка (10)

| № | Страва | Файл | Опис страви (додати після стилю) |
|---|---|---|---|
| 1 | Курячі стегна з кісткою і шкіркою | `chicken-thighs.jpg` | Four bone-in skin-on chicken thighs with deeply golden, blistered crispy skin, dusted with smoked paprika, juices glistening, lemon wedge and thyme sprig on the side. |
| 2 | Філе стегна без кістки | `chicken-thighs-boneless.jpg` | Boneless chicken thigh fillets with a sticky honey-soy glaze, caramelised edges, sprinkled with sesame seeds and sliced green onion, one piece cut to show juicy interior. |
| 3 | Курячі крильця хрусткі | `chicken-wings.jpg` | A pile of extra-crispy golden chicken wings, half tossed in glossy red buffalo sauce, small ramekin of blue cheese dip, celery sticks. |
| 4 | Куряче філе (грудка) соковите | `chicken-breast.jpg` | Juicy chicken breast seasoned with paprika and oregano, sliced on the diagonal to show moist white interior, light golden crust, fresh herbs. |
| 5 | Курячі гомілки | `drumsticks.jpg` | Six roasted chicken drumsticks with crackling amber skin, turmeric and paprika rub, arranged in a fan. |
| 6 | Курка ціла | `whole-chicken.jpg` | Whole roast chicken with evenly golden crisp skin, lemon halves and rosemary sprigs around it, on a wide oval plate. |
| 7 | Домашні нагетси | `nuggets.jpg` | Homemade chicken nuggets in crunchy panko crust, irregular hand-cut shapes, one broken open to show white meat, small bowl of honey-mustard dip. |
| 8 | Курячі окорочки цілі | `chicken-legs.jpg` | Two whole chicken leg quarters with crispy golden skin, scored at the joint, garlic cloves and thyme. |
| 9 | Шашлички з курячого стегна | `chicken-skewers.jpg` | Wooden skewers of yogurt-marinated chicken thigh cubes with charred edges, lemon wedges, fresh parsley, small bowl of garlic yogurt sauce. |
| 10 | Котлета по-київськи | `chicken-kyiv.jpg` | Classic Ukrainian chicken Kyiv with a crisp golden breadcrumb coating, cut open with melted green dill butter flowing out, mashed potatoes on the side. |

### М'ясо (9)

| № | Страва | Файл | Опис страви |
|---|---|---|---|
| 11 | Свинячі відбивні | `pork-chops.jpg` | Two thick bone-in pork chops with a golden mustard crust, one sliced showing juicy blush-pink centre, rosemary. |
| 12 | Котлети та фрикадельки | `meatballs.jpg` | Homemade pork-and-beef cutlets and a few round meatballs, browned and juicy, with a small bowl of sour cream and dill. |
| 13 | Ковбаски для смаження | `sausages.jpg` | Five plump browned pork sausages with blistered skin, grainy mustard and pickles on the side. |
| 14 | Свинячі реберця в соусі | `pork-ribs.jpg` | Glossy sticky barbecue pork ribs cut into portions, caramelised sauce, sprinkle of chopped parsley. |
| 15 | Яловичий стейк | `steak.jpg` | Ribeye steak sliced to show a perfect medium-rare pink centre, melting herb butter on top, flaky sea salt. |
| 16 | Котлети для бургерів | `burgers.jpg` | Three thick flat homemade beef burger patties (150 g each, 2 cm thick) fresh from the air fryer, with straight even sides and a flat top (not domed). In the centre of each patty a shallow round thumb dimple is still clearly visible as a gentle depression. The patty in front has NO cheese, so the dimple and the deeply browned seared crust are in focus. One patty in the back has a single slice of cheddar just melting at the edges. Glistening juices, flaky salt, a few twists of black pepper. No buns, no lettuce, no tomato. |
| 17 | Хрустка свиняча грудинка кубиками | `pork-belly.jpg` | Crispy pork belly cubes with crackling golden skin, bowl of soy dipping sauce, sliced chilli. |
| 18 | Бекон хрусткий | `bacon.jpg` | Strips of perfectly crisp bacon arranged on a plate, deep reddish-brown and rippled. |
| 19 | Шашлик зі свинячої шиї | `pork-shashlyk.jpg` | Ukrainian-style pork neck shashlik chunks with charred edges, raw red onion rings, fresh dill, flatbread lavash underneath. |

### Риба та морепродукти (6)

| № | Страва | Файл | Опис страви |
|---|---|---|---|
| 20 | Лосось (філе зі шкірою) | `salmon.jpg` | Salmon fillet with crispy skin, flaky coral-pink interior, lemon slices and fresh dill. |
| 21 | Креветки з часником | `shrimp.jpg` | Pink garlic shrimp curled into a C-shape, glistening with olive oil, chopped parsley and lemon. |
| 22 | Біла риба в паніровці | `breaded-fish.jpg` | Golden panko-breaded white fish fillet pieces, one broken open to show flaky white fish, tartar sauce and lemon wedge. |
| 23 | Скумбрія ціла | `mackerel.jpg` | Whole roasted mackerel with diagonal cuts on the skin, crispy silver-golden skin, lemon and dill. |
| 24 | Тріска або хек (філе) | `cod.jpg` | Baked cod fillet with a light paprika crust, pearly white flakes, lemon half and herbs. |
| 25 | Кальмари в паніровці | `squid-rings.jpg` | Crispy golden breaded calamari rings piled up, tartar sauce, lemon wedges. |

### Картопля (7)

| № | Страва | Файл | Опис страви |
|---|---|---|---|
| 26 | Картопля фрі зі свіжої картоплі | `fries-fresh.jpg` | Homemade golden french fries, 10 mm thick, crispy, sprinkled with flaky salt, in a paper-lined bowl. |
| 27 | Картопля по-селянськи | `potato-wedges.jpg` | Rustic skin-on potato wedges with paprika and herbs, golden edges. |
| 28 | Печена картопля ціла | `baked-potato.jpg` | Whole baked potatoes with crispy salted skin, one split open with a melting knob of butter and chives. |
| 29 | Картопля-гармошка | `hasselback.jpg` | Hasselback potatoes with thin crispy fanned slices, garlic butter, parmesan and thyme. |
| 30 | Батат фрі | `sweet-potato-fries.jpg` | Orange sweet potato fries, crispy edges, smoked paprika, small bowl of aioli. |
| 31 | Деруни | `deruny.jpg` | Ukrainian potato pancakes deruny, golden and lacy-crisp at the edges, stacked, with a bowl of sour cream and dill. |
| 32 | Молода картопля з кропом | `new-potatoes.jpg` | Baby new potatoes halved and roasted, tossed in butter, fresh dill and garlic. |

### Овочі (9)

| № | Страва | Файл | Опис страви |
|---|---|---|---|
| 33 | Броколі з хрусткими краями | `broccoli.jpg` | Roasted broccoli florets with charred crispy tips, grated parmesan. |
| 34 | Брюссельська капуста | `brussels.jpg` | Halved brussels sprouts caramelised cut side, balsamic glaze drizzle. |
| 35 | Овочевий мікс | `veg-mix.jpg` | Colourful roasted vegetables: zucchini, red and yellow bell pepper, carrot, red onion, lightly charred. |
| 36 | Кукурудза в качанах | `corn.jpg` | Golden corn on the cob with charred spots, melting butter, flaky salt. |
| 37 | Цвітна капуста з куркумою | `cauliflower.jpg` | Roasted cauliflower florets golden with turmeric and cumin, crispy edges, fresh coriander. |
| 38 | Кабачки кружечками з часником | `zucchini.jpg` | Golden roasted zucchini rounds, garlic sour-cream dip, fresh dill. |
| 39 | Печериці запечені | `mushrooms.jpg` | Roasted button mushrooms, glossy and browned, garlic and parsley. |
| 40 | Баклажани скибками | `eggplant.jpg` | Roasted eggplant slices with golden surface, cherry tomatoes and garlic, fresh basil. |
| 41 | Спаржа | `asparagus.jpg` | Bright green roasted asparagus spears, lightly charred tips, lemon zest. |

### Заморожене (7)

| № | Страва | Файл | Опис страви |
|---|---|---|---|
| 42 | Заморожена картопля фрі | `fries-frozen.jpg` | Thin uniform crispy french fries on a plate with a small bowl of ketchup. |
| 43 | Смажені пельмені з морозилки | `frozen-dumplings.jpg` | Crispy golden air-fried pelmeni dumplings, bowl of sour cream with dill. |
| 44 | Заморожена піца | `frozen-pizza.jpg` | Whole round pizza margherita with bubbling melted mozzarella and crisp crust on a wooden board. |
| 45 | Розігріти вчорашню піцу | `reheat-pizza.jpg` | Two reheated pizza slices with crispy bottoms and melted cheese, pepperoni. |
| 46 | Нагетси з пачки | `frozen-nuggets.jpg` | Uniform shaped chicken nuggets, kids' plate style with ketchup and cucumber sticks. |
| 47 | Рибні палички | `fish-sticks.jpg` | Golden crispy fish fingers stacked, green peas and lemon. |
| 48 | Заморожена овочева суміш | `frozen-veg.jpg` | Roasted mixed vegetables: carrot cubes, green beans, peas, corn, lightly browned. |

### Сніданки та закуски (7)

| № | Страва | Файл | Опис страви |
|---|---|---|---|
| 49 | Яйця «варені» без води | `eggs.jpg` | Peeled boiled eggs halved showing jammy yellow yolks, flaky salt and chives. |
| 50 | Сирники | `syrnyky.jpg` | Ukrainian cottage cheese pancakes syrnyky, golden on both sides, stacked, sour cream and berries. |
| 51 | Гарячі бутерброди та грінки | `toasts.jpg` | Hot open sandwiches with melted bubbling cheese, ham and tomato slices on toasted bread. |
| 52 | Хрусткий нут-снек | `chickpeas.jpg` | Small bowl of crunchy roasted chickpeas with smoked paprika. |
| 53 | Омлет у формі | `omelette.jpg` | Fluffy baked omelette in a small round dish, cherry tomatoes and melted cheese, herbs. |
| 54 | Сухарики з хліба | `croutons.jpg` | Golden garlic bread croutons in a bowl, rustic cubes, herbs. |
| 55 | Слойки з сиром | `puff-pastry.jpg` | Flaky golden puff pastry triangles with melted cheese, layered pastry visible. |

### Десерти (5)

| № | Страва | Файл | Опис страви |
|---|---|---|---|
| 56 | Печені яблука з корицею | `baked-apples.jpg` | Baked apples filled with walnuts and honey, cinnamon sticks, soft wrinkled skin. |
| 57 | Брауні | `brownie.jpg` | Fudgy chocolate brownie squares with a crackly top, one cut showing gooey interior. |
| 58 | Печиво з шоколадом | `cookies.jpg` | Chocolate chip cookies with golden edges and soft centres, one broken in half. |
| 59 | Сирна запіканка | `zapekanka.jpg` | Ukrainian cottage cheese casserole zapekanka slice with golden top, sour cream and berry jam. |
| 60 | Мафіни | `muffins.jpg` | Blueberry muffins with domed golden tops, one broken open showing berries. |

## 4. Бонус (необов'язково)

| Файл | Для чого | Опис |
|---|---|---|
| `cover.jpg` (1200×630) | Картинка-прев'ю, коли посилання надсилають у Viber/Telegram | Overhead flat lay of several air-fried dishes (chicken thighs, fries, roasted vegetables, salmon) on a warm cream linen table, terracotta accents, lots of negative space on the left for a title. |

## 5. Партія 2: випічка й перекуси (12 страв)

Правила ті самі: **загальний стиль** з розділу 2 + опис страви, файл кладіть у `img/dishes/` під іменем з таблиці. Коли закинете, напишіть **«продовж»**.

### Сніданки та перекуси (7)

| № | Страва | Файл | Опис страви (додати після стилю) |
|---|---|---|---|
| 61 | Хот-доги з хрусткою сосискою | `hot-dogs.jpg` | Two hot dogs in toasted golden buns, sausages with crispy blistered skin and diagonal scored cuts, zigzag of yellow mustard and ketchup, crispy fried onions and pickle slices on top. |
| 62 | Сосиски в листковому тісті | `sausage-rolls.jpg` | Sausages wrapped in a spiral of golden flaky puff pastry, glossy egg-washed and sprinkled with sesame seeds, several on a plate, one cut in half showing the sausage. |
| 63 | Хачапурі по-аджарськи | `khachapuri.jpg` | Georgian Adjarian khachapuri boat-shaped bread with golden puffy rim, filled with melted bubbling cheese, a runny egg yolk and a knob of butter in the centre. |
| 64 | Піца на тортильї | `tortilla-pizza.jpg` | Thin crispy tortilla pizza with tomato sauce, melted mozzarella and salami slices, cut into four wedges, sprinkle of dried oregano. |
| 65 | Кесадилья з куркою і сиром | `quesadilla.jpg` | Golden crispy chicken quesadilla cut into triangles and stacked, gooey melted cheese stretching, corn and red pepper visible, small bowl of sour cream. |
| 66 | Часниковий багет | `garlic-bread.jpg` | Sliced baguette garlic bread with golden crisp edges, glistening garlic herb butter and fresh parsley, a few slices with melted cheese. |
| 67 | Бейгли з йогурту | `yogurt-bagels.jpg` | Four homemade golden bagels topped with sesame seeds, one cut in half with cream cheese spread, rustic look. |

### Випічка та десерти (5)

| № | Страва | Файл | Опис страви |
|---|---|---|---|
| 68 | Заморожені круасани | `croissants.jpg` | Three freshly baked butter croissants with deep golden flaky layers, one torn open showing airy honeycomb interior, small dish of jam. |
| 69 | Булочки-равлики з корицею | `cinnamon-rolls.jpg` | Soft cinnamon rolls with visible brown sugar cinnamon swirl, drizzled with white cream cheese glaze, in a small round baking dish. |
| 70 | Слойки з яблуками | `apple-turnovers.jpg` | Golden puff pastry apple turnovers triangle-shaped with fork-pressed edges and two slits on top, a bit of caramelised apple filling peeking out, dusted with powdered sugar. |
| 71 | Банановий хліб | `banana-bread.jpg` | Moist banana bread loaf with a cracked golden-brown top, two thick slices cut showing walnuts inside, a fresh banana beside it. |
| 72 | Бананові пончики-кульки | `banana-donuts.jpg` | Small round banana donut holes rolled in cinnamon sugar, piled in a bowl, one broken open showing fluffy interior. |

## 6. Заміна: котлети для бургерів

Старе фото не відповідало рецепту: там опуклі котлети під сиром, а ямки не видно.

- **Файл:** `burgers.jpg`. Покладіть його в `img/dishes/` поверх старого (замінити).
- Потім напишіть **«продовж»**.

Готовий промпт, копіюйте цілком:

```
Editorial food photography for a modern cookbook, landscape 4:3.
The dish was freshly cooked in an air fryer and is served on a matte off-white stoneware plate
on a warm cream linen tablecloth (soft beige, #FBF6EF tones). Camera at a 45-degree
three-quarter angle, 50mm lens, shallow depth of field. Soft natural daylight from the left,
gentle soft shadows. Warm appetizing palette with subtle terracotta and olive-green accents
(a small terracotta ramekin or a sprig of fresh herbs as the only props).
The food sits in the centre with generous empty margins on all sides, so the image can be
cropped to a square or a circle. Hyper-realistic textures, golden crispy surfaces,
light steam where the food is hot. No text, no logos, no watermark, no people, no hands,
no air fryer appliance in the frame.

Three thick flat homemade beef burger patties (150 g each, 2 cm thick) fresh from the air fryer, with straight even sides and a flat top (not domed). In the centre of each patty a shallow round thumb dimple is still clearly visible as a gentle depression. The patty in front has NO cheese, so the dimple and the deeply browned seared crust are in focus. One patty in the back has a single slice of cheddar just melting at the edges. Glistening juices, flaky salt, a few twists of black pepper. No buns, no lettuce, no tomato.
```

Негативний промпт: `buns, bread, lettuce, tomato, domed rounded patty, meatball shape, cheese covering everything, raw meat, text, watermark, hands`
