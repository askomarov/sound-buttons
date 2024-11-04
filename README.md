# Гайд по работе со сборкой

Для начала работы у вас должент быть установлен Node.js 18

## 🚀 Структура проекта

Внутри проекта вы увидете следующие папки и файлы:

```text
/
├── public/
│   ├── favicon.svg
│   ├── fonts/
│   └── svg/
├── src/
│   ├── components/
│   │   ├── Container/
│   │   │   ├── Container.astro
│   │   │   └── Container.scss
│   │   └── ...
│   └── icons/
│   └── img/
│   ├── layouts/
│   │   ├── root/
│   │   │   └── root.astro
│   │   ├── Main/
│   │   │   └── Main.astro
│   │   └── ...
│   ├── pages/
│   │   ├── index.astro
│   │   ├── sitemap.astro
│   │   └── ui-kit.astro
│   ├── styles/
│   │   ├── components/
│   │   ├── global/
│   │   ├── vendors/
│   │   └── index.scss
│   ├── scripts/
│   │   ├── modules/
│   │   ├── utils/
│   │   └── index.js
├── util/
└── package.json
```

Все статические файлы, например `svg` или шрифты, могут лежать в папке `public/`. Оттуда все файлы автоматически попадают в билд.

## 🐱‍💻 Команды

Все команды запускаются из корня проекта:

| Command                               | Action                                                |
| :------------------------------------ | :---------------------------------------------------- |
| `npm install`                         | Установить зависимости                                |
| `npm run dev`                         | Запустить локальный дев сервер `localhost:4321`       |
| `npm run start`                       | Запустить сервер c IP адресом `localhost:IP`          |
| `npm run build`                       | Собрать билд для продакшна `./dist/`                  |
| `npm run preview`                     | Посмотреть билд локально перед деплоем                |
| `npm run astro -- --help`             | Получить помощь в использовании Astro CLI             |
| `npm run lint`                        | Запустить линтер с автоисправлениями                  |
| `npm run gen:component name`          | Создать компонент Astro по шаблону в папку components |
| `npm run gen:component name --ui`     | Создать ui компонент Astro по шаблону                 |
| `npm run gen:component name --layout` | Создать layout компонент Astro по шаблону             |

## 🎴 Картинки

Есть два варианта для использования картинок:

1. Использовать компонент астро Picture. Он автоматически генерирует х1, х2, webp и avif. Автоматически подставляет ширину и высоту. [Документация](https://docs.astro.build/en/guides/img/)
2. В сборке настроен Old Style Way с помощью gulp

Миксин генерирует все изображения из изначальной картинки (х1, х2, webp, avif)
нужно только изначально прокинуть картинку х2

Используйте по согласованию с бэком или если бэка нет.
Обязательно нужно указать ширину, чтобы правильно сгенерировались картинки х1.5
если не подходит, то используйте миксин из ui/Picture/Picture.astro
генерация и оптимизация картинок через gulp webp, gulp optimize

```Astro
---
import { Picture } from "astro:assets";
import myImage from "@img/my-image.jpg";
---

<Picture
  src={myImage}
  alt="example image"
  quality={"high"}
  formats={["webp"]}
  width={image.width / 2}
  height={image.height / 2}
  densities={[2]}
/>
```

**⚠️ Если вы используете исходные `png` картинки или преобразовываете через `fallbackFormat="png"` (а так же динамическое использование `fallbackFormat=myImage.format`)
делайте в компоненте проверку как ниже т.к. `squooshImageService` который используется в оптимизации картинок, не умеет оптимизировать png.**

```Astro
---
import myImagePng from "@img/my-image-png.png";
---

<Picture
  ...
  quality={myImage.format === "png" ? null : "high"}
  ...
/>
```

**Оптимизируйте `png` исходники вручную через [tinypng](https://tinypng.com/).**

## Картинки из public folder

```html
<img src="./img/mountain-min.jpg" width="320" height="213" alt="image" />
```

## Картинки в стилях из public folder

```css
background-image: url('/img/mountain-min.jpg');
```

# Lenis is a lightweight, robust, and performant smooth scroll library.

https://github.com/darkroomengineering/lenis

js библиотека для плавной прокрутки

хорошо работает вместе с gsap - библиотекой для анимации, обязательно подключить стили и базовые js настройки.
Файл стилей лежит в папке 'src/styles/vendors/lenis.scss'

```js
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export const lenis = new Lenis();

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);
```

Lenis - имеет фунцкцию scrollTo(target), подробнее в доке.
Пример, клик по якорным ссылкам, имортирую уже инициализоварнный класс lenis из index.js файла

```js
const anchorLinks = document.querySelectorAll('[data-link]');
// как вариант передать instance lenis в функцию при ее вызове
// или эту фунцкию написать там где создается lenis и не передавать через параметр
const ininAcnhorLinks = (lenis) => {
  if (anchorLinks) {
    anchorLinks.forEach((link) => {
      link.addEventListener('click', (evt) => {
        evt.preventDefault();
        const target = document.querySelector(`${link.getAttribute('href')}`);
        if (!target) return;
        lenis.scrollTo(target);
      });
    });
  }
};
export { ininAcnhorLinks };
```

### Баг с блокировкой скрола при использовании lenis

При использовании данной библиотеки для плавной прокрутки, просто навесив стили для body

```css
.scroll-lock {
  overflow: hidden;
}
```

не сработает, нужно блокировать сам lenis через js в те моменты где срабатывает блок скрола, например при открытии модального окна, добавив код ниже:

```js
lenis.isScrolling = false;
lenis.isLocked = true;
lenis.isStopped = true;
```

и разблокировать при закрытии модалки:

```js
lenis.isScrolling = false;
lenis.isLocked = false;
lenis.isStopped = false;
```

При блокировки скрола, если нужно сохранить скролл во вложенном элементе, например при открытии бургер меню, в меню должна быть вертикальная прокрутка на не высоких (коротких) экранах - для этого элемента с прокрутой необходимо добавить атрибут:

`data-lenis-prevent`

> как атрибут `data-scroll-lock-scrollable` при использовании библиотеки scroll-lock

## Модальные окна

Настроен базовый компонент модалки, со стилями и всем необходимым js кодом.
Сам class Modals находится тут `src/scripts/modules/modals/modals.js`.
Использует самописный класс для блокировки Фокуса, при открытии модалки, чтобы нельзя было навигировать с клавиатуры по элементам под модалкой.
Используется npm пакет `scroll-lock` для блокировки скрола.
Настроено закрытие модалки по клику на Ecs,вне модального окна и по клику на любой элемент внутри модалки с атрибутом `data-close-modal`

astro компонент тут `src/components/Modal/Modal.astro`
стили рядом `src/components/Modal/Modal.scss`

### Пример использования ModalSuccess

```js
---
import Modal from '@components/Modal/Modal'

interface Props {}

const {} = Astro.props
---
<Modal name="success" className="modal-success">
  <h3 class="modal-success__title">Thank you!</h3>
  <p class="modal-success__text">
    Our manager will contact you as soon as possible
  </p>
  <button
    type="button"
    class="modal-success__close-button"
    data-close-modal
  >
    Close modal
  </button>
</Modal>
```

Модалки подключаются в layout или отдельно на нужной странице.
Для этого в layout есть именованный слот

```html
<Layout title="{title}" description="{description}">
  <header />
  <main>
    <slot />
  </main>
  <footer />
  <slot name="modals" />
</Layout>
```

Затем на странице где используется данный layout прокидывается импортированный компонент модалки

```html
---
import Layout from '@layouts/layout'
import ModalSuccess from '@components/ModalSuccess/ModalSuccess'
---

<Layout title="Главная" description="Описание">
  <!-- другие секции и компоненты-->

  <Fragment slot="modals">
    <ModalSuccess />
  </Fragment>
</Layout>
```

Для вызова модалки по клику на html элемент достаточно добавить на него атрибут с именем модалки `modal='success'`

```html
<button type="button" aria-label="открыть модалку" modal="success">
  Modal Success
</button>
```

В примерах есть еще модалка которая имеет прокрутку внутри, когда надо показать много контента, например, политику или какието правила. Для этого модалке надо установить атрибут `fixedHeight`
`<Modal name="policy" fixedHeight>`
этим просто ограничивается по высоте блок .modal\_\_content и заданы стили для кастомного скролл бара.

```html
<Modal name="policy" fixedHeight>
  <h3>policy modal</h3>
  <p>с прокруткой</p>
  <div class="modal__scroll-content" data-scroll-lock-scrollable>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
      expedita tenetur...
      <!-- очень много контента-->
      asperiores quae perspiciatis aliquam animi aut, reiciendis sequi repellat
      unde illum, consectetur ape
    </p>
  </div>
</Modal>
```

```css
.modal--fixed-height {
  .modal__content {
    display: flex;
    flex-direction: column;
    max-height: 480px;
    height: 100%;
    width: 100%;
    max-width: 1024px;
  }

  .modal__scroll-content {
    display: flex;
    overflow-y: auto;
    max-height: 100%;
    padding-right: 8px;

    @include scroll-bar;
  }
}
```

Для стилизации скрол бара есть миксин `src/styles/global/mixins.scss`

```scss
@mixin scroll-bar {
  &::-webkit-scrollbar {
    width: 12px;
    height: 12px;
  }

  &::-webkit-scrollbar-track {
    // background-color: transparent;
    background-color: green;
    border-radius: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba($color: red, $alpha: 0.6);
    border-radius: 6px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: red;
  }
}
```

## ♠️ Иконки

Все иконки должны быть в папке `src/icons`.
Используйте компонент Icon, он вставляет svg инлайном на страницу.
Спрайт собирается автоматически при множественном использовании одной иконки на конкретной странице.

```Astro
---
import { Icon } from 'astro-icon/components'
---

<div class="icon">
  <Icon name="icon-close" />
</div>
```

Подробнее узнать можно [тут](https://www.npmjs.com/package/astro-icon).

Не используйте `<img>` для этого кейса, если нужно использовать `svg` в тэге `<img>`, добавляйте `svg` в папку `public/`.

## 📦 Слоты <slot>

Примеры использования можно посмотреть в [доке](https://docs.astro.build/en/core-concepts/astro-components/#slots), хотел лишь добавить что, если в вашем компоненте нужна проверка, принимает ли он слот или нет (например чтобы не генерировать лишнии пустые блоки которыми обернут слот) испрользуйте проверку 👇

```Astro
<div class="card">
  ...
  {Astro.slots.has("buttons") && (
    <div class="card__buttons">
      <slot name="buttons">
      </slot>
    </div>
  )}
  ...
</div>
```

Слоты можно прокидывать через промежуточные компоненты: [пример из доки](https://docs.astro.build/en/core-concepts/astro-components/#transferring-slots)

## 🧜 Полиморфные компоненты

В проекте есть полиморфные компоненты (Button) на основе пропса `as="..."`, в который нужно передать желаемый `html` тэг. Это позволяет указать TS чтобы он подтянул нативные пропсы(аттрибуты) сам исходя из переданного тэга. Вы так же вы можете расширить TS-тип добавив нужные вам пропсы `type Props<Tag extends HTMLTag> = Polymorphic<{as: Tag}> & { ..здесь ваши пропсы.. }`.

## ⚙ Работа с экшенами

Для работы экшенов при создании репозитория нужно обязательно в разделе `Actions => General` выбрать чекбокс "Allow GitHub Actions to create and approve pull requests" ([Скриншот](https://cln.sh/v99g2JdV)).

Директория dist добавлена в файл gitigonre. Для создания папки dist на проекте настроены экшены.
Для работы с ними на сайте гитхаба необходимо зайти во вкладку **Actions** и выполнить следующие действия:

1. Выбрать экшн, который нужно запустить. В сборке настроен экшен - Build, который собирает билд проекта в отдельную ветку `build`.
2. Нажать на кнопку `Run workflow`. В выпадающем списке убедиться, что экшн будет запущен из ветки master и нажать зеленую кнопку `Run workflow`.
3. После этого во вкладке Actions мы можем посмотреть на процесс выполнения нашего экшена. Когда экшн отработает корректно, напротив его названия появится зеленый значок, это означает что ошибок при его выполнении нет и он отработал корректно. После этого в списке веток репозитория должна появиться ветка `build`, в которой будет лежать наш собранный проект.

## 🤖 Автоматический деплой на хост gitHub

Нужно подключить gitHub pages в настройках репозитория:
`Settings => pages => Source => GitHub Pages`.

Адрес хоста добавьте в информацию о репозитории (сверху справа на странице репозитория github).
Хост будет автоматически обновляться после заливки в мастер.

## 👀 Хотите узнать больше?

Посмотрите [документацию Astro](https://docs.astro.build).

Используйте готовые компоненты из [Лиги решений](http://htmlonelove.top/liga-reshare/).

## 🐱‍🐉 Проблемы и предложения по сборке

Присылайте свои [issues](https://github.com/htmlonelove/liga-astro-template/issues) в gitHub репозиторий

### bugs
