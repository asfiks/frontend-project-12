export default {
  translation: {
    chat: 'Hexlet Chat',
    buttonExit: 'Выйти',
    login: {
      name: 'Ваш ник',
      enter: 'Войти',
      password: 'Пароль',
      noAcc: 'Нет аккаунта? ',
      signup: 'Регистрация',
      validation: {
        name: 'Заполните это поле',
        password: 'Заполните это поле',
        errorAuth: 'Неверные имя пользователя или пароль',
      },
    },
    signup: {
      registration: 'Регистрация',
      username: 'Имя пользователя',
      password: 'Пароль',
      passConfirm: 'Подтвердите Пароль',
      signup: 'Зарегистрироваться',
      validation: {
        username: 'Обязательное поле',
        usernameMinMax: 'От 3 до 20 символов',
        password: 'Обязательное поле',
        passwordMin: 'Не менее 6 символов',
        passConfirm: 'Пароли должны совпадать',
        errorSignup: 'Такой пользователь уже существует',
        usernameIsHas: 'Такой пользователь уже существует',
      },
    },
    channels: {
      channels: 'Каналы',
      buttonAdd: '+',
      symbolChannel: '#',
      remove: 'Удалить',
      rename: 'Переименовать',
    },
    modalAdd: {
      addChannel: 'Добавить канал',
      buttonCreate: 'Создать канал',
      buttonCancel: 'Отменить',
      validation: {
        uniq: 'Должно быть уникальным',
        nameMinMax: 'От 3 до 20 символов',
        name: 'Обязательное поле',
      },
    },
    modalRemoveChannel: {
      removeChannel: 'Удалить канал',
      confirm: 'Уверены?',
      buttonRemove: 'Удалить',
      buttonCancel: 'Отменить',
    },
    modalRemaneChannel: {
      renameChannel: 'Переименовать канал',
      buttonCancel: 'Отменить',
      buttonSend: 'Отправить',
      validation: {
        uniq: 'Должно быть уникальным',
        nameMinMax: 'От 3 до 20 символов',
        name: 'Обязательное поле',
      },
    },
    messages: {
      counter: {
        key_zero: '{{count}} сообщений',
        key_one: '{{count}} сообщение',
        key_few: '{{count}} сообщения',
        key_many: '{{count}} сообщений',
      },
      new: 'Новое сообщение',
      input: 'Введите сообщение...',
    },
    toast: {
      remove: 'Канал удалён',
      add: 'Канал создан',
      rename: 'Канал переименован',
      error: 'Ошибка',
    },
  },
};
