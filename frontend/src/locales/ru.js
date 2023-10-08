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
                name: 'Поле "Ваш ник" обязательно для заполнения',
                password: 'Поле "Пароль" обязательно для заполнения',
                errorAuth: 'Неверные учетные данные',
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
                uniq: 'Канал с таким названием уже существуют',
                name: 'Обязательное поле',
            }
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
                uniq: 'Канал с таким названием уже существуют',
                name: 'Обязательное поле',
            },
        },

    },
};